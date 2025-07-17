// components/main-nav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react"; // Example icon library
import { mainRoutesList } from "@/lib/routes";
import { usePathname } from "next/navigation";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = "hover:underline capitalize px-4 py-2 rounded shadow";

  const pathname = usePathname();

  const isActive = (route: string): boolean => {
    const routeName = pathname.split("/");
    return routeName.includes(route.split("/").pop() || "");
  };

  return (
    <nav className="flex p-4 bg-gray-800 text-white overflow-y-scroll scrollbar">
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col gap-4">
        <Link
          href="/"
          className={`${linkClass} ${
            pathname === "/"
              ? "text-blue-500 bg-white"
              : "text-white bg-blue-500"
          }`}
        >
          Home
        </Link>
        {mainRoutesList.map((route, idx) => (
          <Link
            key={idx}
            href={route}
            className={`${linkClass} ${
              isActive(route)
                ? "text-blue-500 bg-white"
                : "text-white bg-blue-500"
            }`}
          >
            {route.split("/").pop()}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>Navigation</SheetTitle>
            <div className="flex flex-col space-y-4 pt-8 overflow-y-scroll scrollbar">
              {mainRoutesList.map((route, idx) => (
                <Link
                  key={idx}
                  href={route}
                  className={`hover:border-blue-400 border-b-2 capitalize px-4 py-2 ${
                    isActive(route) ? " border-blue-500" : "border-blue-200"
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {route.split("/").pop()}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
