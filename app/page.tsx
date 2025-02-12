"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useSession } from "@/lib/auth-client";
import SignIn from "@/components/signin-form";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (session) {
        router.push("/chat");
      }
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />;
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}
