import Chat from "@/components/chat";
import { AppSidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserDropDownMenu } from "@/components/user-dropdown";

export default function ChatPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink- justify-between items-center gap-2 border-b pr-4">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>

          <div className="flex gap-2 items-center">
            <UserDropDownMenu />
            <ThemeToggle />
          </div>
        </header>
        <Chat />
      </SidebarInset>
    </SidebarProvider>
  );
}
