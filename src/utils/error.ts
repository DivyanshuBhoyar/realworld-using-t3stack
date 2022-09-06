import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

export const handleErrors = (e: unknown) => {
  if (e instanceof PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists",
      });
    }
  }

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong",
  });
};
