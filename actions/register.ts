"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { registerSchema } from "@/zod-schemas";

import { getUserByEmail } from "@/db/data/users";
import { db } from "@/db";
import { users } from "@/db/schema/users";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  console.log(email, hashedPassword, name);

  await db
    .insert(users)
    .values({ id: users.id.default, name, email, password: hashedPassword });

  return {
    success: "User created!",
  };
};
