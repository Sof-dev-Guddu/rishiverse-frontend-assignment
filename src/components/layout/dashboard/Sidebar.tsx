import { Calendar, Home, Inbox, Loader2, LogOut, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GradientButton from "@/components/shared/button/GradientButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuth } from "@/store/features/auth/authSlice";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Students",
    url: "/dashboard/students",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
 interface DashboardSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // any additional props here if needed
}
export default function DashboardSidebar({ className, ...props }: DashboardSidebarProps) {
  const {state}=useSidebar()
  const dispatch=useAppDispatch()
  const router = useRouter();
   const authState = useAppSelector((state) => state.auth);
 //logout handler
  const handleLogout = () => {
  dispatch(clearAuth());      
  router.push("/");      
};
   return (
    <Sidebar
      collapsible="icon"
      className={cn('rounded-lg  ', className)}
      {...props}
    >
      <SidebarTrigger className="absolute -right-[14px] top-[0.4rem]" />
      <SidebarContent className=" flex justify-between   ">
        <SidebarGroup>
          <SidebarGroupContent className="flex justify-center items-center">
            <SidebarMenu className="w-[80%]">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent className="flex justify-center items-center ">
            <SidebarMenu className="w-[80%]">
              <SidebarMenuItem key="Setting">
                <SidebarMenuButton asChild>
                  <Link href="/setting">
                    <Settings />
                    <span>Setting</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <GradientButton disabled={authState.loading} onClick={handleLogout}>
                 <LogOut />
              {state === "expanded" && (
  authState.loading ? (
    <div className="flex items-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Logging out...</span>
    </div>
  ) : (
    "Logout"
  )
)}
              
                 </GradientButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}