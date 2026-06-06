"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchUserById } from "@/lib/api";
import { DashboardHeader } from "@/components/dashboard-header";
import { UserFormDialog } from "@/components/user-form-dialog";
import { UserDetailDialog } from "@/components/user-detail-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Users,
  AlertCircle,
} from "lucide-react";
import type { User } from "@/lib/types";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import Image from "next/image";

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-10 w-10 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-48" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-12" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-8 rounded" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default function UsersPage() {
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

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    enabled: isAuthenticated,
  });

  const handleViewUser = async (user: User) => {
    setSelectedUser(user);
    setDetailOpen(true);
    setDetailLoading(true);
    try {
      const fullUser = await fetchUserById(user.id);
      setSelectedUser(fullUser);
    } catch {
      // fallback to list data
    } finally {
      setDetailLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const filteredUsers =
    data?.data.filter(
      (user: User) =>
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground mt-1">
              Manage your team members and their account permissions
            </p>
          </div>
          <Button
            onClick={() => setAddOpen(true)}
            className="gap-2">
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
          </div>

          {isError ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <AlertCircle className="w-10 h-10 mb-3 text-destructive" />
              <p className="font-medium">Failed to load users</p>
              <p className="text-sm mt-1">Please try again later</p>
            </div>
          ) : !isLoading && filteredUsers.length === 0 && search ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Search className="w-10 h-10 mb-3" />
              <p className="font-medium">No users found</p>
              <p className="text-sm mt-1">Try adjusting your search query</p>
            </div>
          ) : !isLoading && filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Users className="w-10 h-10 mb-3" />
              <p className="font-medium">No users yet</p>
              <p className="text-sm mt-1">Get started by adding a new user</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12">Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead className="w-12">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableSkeleton />
                  ) : (
                    filteredUsers.map((user: User) => (
                      <TableRow
                        key={user.id}
                        className="cursor-pointer"
                        onClick={() => handleViewUser(user)}>
                        <TableCell>
                          <Image
                            src={`https://i.pravatar.cc/150?img=${user.id}`}
                            alt={user.first_name}
                            className="w-10 h-10 rounded-full ring-2 ring-background"
                            width={150}
                            height={150}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {user.first_name} {user.last_name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">
                            {user.email}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="font-mono">
                            {user.id}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => e.stopPropagation()}>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewUser(user);
                                }}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditUser(user);
                                }}>
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {!isError && data && (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <p className="text-sm text-muted-foreground">
                Page {data.page} of {data.total_pages} &middot; {data.total}{" "}
                total users
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= data.total_pages}
                  onClick={() => setPage((p) => p + 1)}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <UserFormDialog
        mode="add"
        open={addOpen}
        onOpenChange={setAddOpen}
      />

      <UserFormDialog
        mode="edit"
        user={selectedUser}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <UserDetailDialog
        user={selectedUser}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        isLoading={detailLoading}
      />
    </div>
  );
}
