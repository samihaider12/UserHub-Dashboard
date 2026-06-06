"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@/lib/types";
import { useEffect } from "react";

const userSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(["active", "inactive"], { required_error: "Status is required" }),
});

type UserForm = z.infer<typeof userSchema>;

interface UserFormDialogProps {
  mode: "add" | "edit";
  user?: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserFormDialog({
  mode,
  user,
  open,
  onOpenChange,
}: UserFormDialogProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues:
      mode === "edit" && user
        ? {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: "user",
            status: "active" as const,
          }
        : {
            first_name: "",
            last_name: "",
            email: "",
            role: "",
            status: "active" as const,
          },
  });

useEffect(() => {
  if (mode === "edit" && user && open) {
    reset({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  }
}, [user, mode, open, reset]);

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
      handleClose();
    },
    onError: () => {
      toast.error("Failed to create user");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: number; body: { first_name: string; last_name: string; email: string } }) =>
      updateUser(data.id, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
      handleClose();
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const onSubmit = (data: UserForm) => {
    if (mode === "add") {
      createMutation.mutate({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });
    } else if (user) {
      updateMutation.mutate({
        id: user.id,
        body: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New User" : "Edit User"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                placeholder="John"
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-xs text-destructive">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                placeholder="Doe"
                {...register("last_name")}
              />
              {errors.last_name && (
                <p className="text-xs text-destructive">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              defaultValue={mode === "edit" ? "user" : undefined}
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-xs text-destructive">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              defaultValue="active"
              onValueChange={(value) =>
                setValue("status", value as "active" | "inactive")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-xs text-destructive">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === "add" ? "Creating..." : "Updating..."}
                </>
              ) : mode === "add" ? (
                "Create User"
              ) : (
                "Update User"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
