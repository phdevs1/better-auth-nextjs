"use client";

import { authClient } from "@/lib/auth-client";

const placeholderUser = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
};

export const UserEmailInformation = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!session) {
    return <div>No session found.</div>;
  }

  return (
    <div className="shrink-0 text-right">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {session.user?.name}
      </p>
      <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
        {session.user?.email}
      </p>
    </div>
  );
};
