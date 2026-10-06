"use client";

import type { SubmitEvent } from "react";
import { AuthDivider } from "../components/auth-divider";
import { AuthField } from "../components/auth-field";
import { SocialSignInButtons } from "../components/social-sign-in-buttons";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("Login:", { email, password });

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe: false,
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("Loading...");
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log("Success...");
        },
        onError: async (ctx) => {
          if (ctx.error.status === 403) {
            alert(
              "Email no verificado. Por favor, verifica tu email para continuar.",
            );
            await authClient.sendVerificationEmail({
              email: email,
              callbackURL: "/", // The redirect URL after verification
            });
            return;
          }

          // display the error message
          alert(ctx.error.message);
          console.log("Error...");
        },
      },
    );
  }

  return (
    <>
      <SocialSignInButtons />
      <AuthDivider />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthField
          id="email"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Contraseña"
          type="password"
          name="password"
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="mt-1 h-11 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Entrar
        </button>
      </form>
    </>
  );
}
