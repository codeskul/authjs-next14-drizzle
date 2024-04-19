"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { loginSchema } from "@/zod-schemas";

import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/db/data/users";

export const login = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

export const oauthSignIn = async (
  provider: "google" | "github",
  callbackUrl?: string | null
) => {
  console.log("callbackUrl", callbackUrl);
  await signIn(provider, {
    callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
  });
};
