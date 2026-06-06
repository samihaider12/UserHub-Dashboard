"use client";

import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Users, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:block">
              UserHub
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/users">
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Users</span>
              </Button>
            </Link>
          </nav>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
