"use client";

import { LogOut, ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function UserDropDownMenu() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const user = session?.user;

  const handleSignout = () => {
    signOut();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-none outline-none">
        <button className="relative flex h-8 items-center justify-center border-none outline-none">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user?.image || "https://github.com/shadcn.png"}
              alt={"user-image"}
            />
            <AvatarFallback className="bg-black text-white h-9 w-9 items-center justify-center flex">
              {"NA"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-[5px]"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="hover:cursor-pointer">
          <button className="flex w-full items-center" onClick={handleSignout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
