"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, UserX, UserPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    red: "bg-rose-50 text-rose-600 border-rose-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <Card className={`border ${colorMap[color] || colorMap.blue}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-70">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/60">
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-12 w-12 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { isAuthenticated, hydrate } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    hydrate();
    setMounted(true);
  }, [hydrate]);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router, mounted]);

  const { data, isLoading } = useQuery({
    queryKey: ["users", "all"],
    queryFn: async () => {
      const [page1, page2] = await Promise.all([fetchUsers(1), fetchUsers(2)]);
      return [...page1.data, ...page2.data];
    },
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) return null;

  const totalUsers = data?.length ?? 0;
  const activeUsers = Math.ceil(totalUsers * 0.7);
  const inactiveUsers = totalUsers - activeUsers;
  const newUsers = Math.ceil(totalUsers * 0.15);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your user management system
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Total Users"
                value={totalUsers}
                icon={Users}
                color="blue"
              />
              <StatCard
                title="Active Users"
                value={activeUsers}
                icon={UserCheck}
                color="green"
              />
              <StatCard
                title="Inactive Users"
                value={inactiveUsers}
                icon={UserX}
                color="red"
              />
              <StatCard
                title="New Users"
                value={newUsers}
                icon={UserPlus}
                color="amber"
              />
            </>
          )}
        </div>

        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {data?.slice(0, 5).map((user: import("@/lib/types").User) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Image
                        src={`https://i.pravatar.cc/150?img=${user.id}`}
                        alt={user.first_name}
                        className="w-10 h-10 rounded-full ring-2 ring-background"
                        width={150}
                        height={150}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
