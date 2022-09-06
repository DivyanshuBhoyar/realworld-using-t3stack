import { createRouter } from "./context";
import { z } from "zod";
import { hash, verify } from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { signJwt } from "../../utils/jwtUtils";
import { serialize } from "cookie";

// register input zod object
const registerInput = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Should be at-least 3 letters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(3, { message: "Password too small" }),
});
const loginInput = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Should be at-least 3 letters long" }),
  password: z.string().trim().min(3, { message: "Password too small" }),
});

const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
  select: {
    username: true,
    bio: true,
    email: true,
    image: true,
    password: true,
  },
});
type UserPersonalData = Prisma.UserGetPayload<typeof userPersonalData>;

export const authRouter = createRouter()
  .mutation("register", {
    input: registerInput,
    async resolve({ input, ctx }) {
      const hashedPassword = await hash(input.password);

      let user;
      try {
        user = await ctx.prisma.user.create({
          data: {
            username: input.username,
            email: input.email,
            password: hashedPassword,
          },
        });
      } catch (e) {
        // if the error is known
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "User already exists",
            });
          }
        }
        // unknown error
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }

      // generate JWT token
      const token = signJwt({
        username: user.username,
        email: user.email,
      });
      ctx.res.setHeader("Set-Cookie", serialize("token", token, { path: "/" }));

      return {
        user,
        success: true,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  })
  .query("byUsername", {
    input: z.object({
      username: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { username } = input;
      const post = await ctx.prisma.user.findUnique({
        where: { username },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with username '${username}'`,
        });
      }
      return { post, msg: "hi" };
    },
  })
  .mutation("login", {
    input: loginInput,
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      });
      if (!user)
        throw new TRPCError({
          message: "Account doesn't exist",
          code: "NOT_FOUND",
        });

      const { password, ...restUser } = user;
      const valid = await verify(password, input.password);
      if (!valid)
        throw new TRPCError({
          message: "Invalid credentials",
          code: "UNAUTHORIZED",
        });

      const token = signJwt({ username: user.username, email: user.email });
      // set cookie on next res
      ctx.res.setHeader("Set-Cookie", serialize("token", token, { path: "/" }));
      return {
        user: restUser,
        success: true,
      };
    },
  });
