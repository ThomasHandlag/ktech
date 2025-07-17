"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart3, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { signOut } from "next-auth/react";

const DashboardSidebar = ({
  collapsed = false,
}: {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) => {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/day13practice/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Tasks",
      href: "/day13practice/dashboard/tasks",
      icon: BarChart3,
    },
    {
      name: "Users",
      href: "/day13practice/dashboard/users",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/day13practice/dashboard/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/day13practice/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
      </div>
      {/* Sidebar */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isCurrentActive = isActive(item.href);

            const linkContent = (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isCurrentActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0")} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
            return <div key={item.name}>{linkContent}</div>;
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="border-t p-4 flex flex-col items-start gap-3">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">
              john@example.com
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "hidden md:flex h-screen flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent />
    </div>
  );
};

export default DashboardSidebar;
