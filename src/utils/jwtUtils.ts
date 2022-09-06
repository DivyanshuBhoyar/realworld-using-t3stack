import { sign } from "jsonwebtoken";

interface SessionUser {
  username: string;
  email: string;
}

export const signJwt = (user: SessionUser) => {
  return sign(
    {
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET || "supersecret",
    {
      expiresIn: "1h",
    }
  );
};
