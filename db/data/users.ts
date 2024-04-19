import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema/users";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
    return user;
  } catch (error) {
    return null;
  }
};
