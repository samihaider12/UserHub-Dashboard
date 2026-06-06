"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { User } from "@/lib/types";
import { Loader2, Mail, Hash, User as UserIcon } from "lucide-react";
import Image from "next/image";

interface UserDetailDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading?: boolean;
}

export function UserDetailDialog({
  user,
  open,
  onOpenChange,
  isLoading,
}: UserDetailDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : user ? (
          <div className="flex flex-col items-center py-4">
            <Image
              src={`https://i.pravatar.cc/150?img=${user.id}`}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-20 h-20 rounded-full ring-4 ring-primary/10 mb-4"
              width={150}
              height={150}
            />

            <h3 className="text-xl font-semibold">
              {user.first_name} {user.last_name}
            </h3>
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <UserIcon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-sm font-medium">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">User ID</p>
                  <p className="text-sm font-medium">{user.id}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
