
"use client";

import { useState } from "react";
import { toast } from "sonner";

import { IOC } from "@/lib/types/ioc";
import { useDeleteIOC } from "@/lib/hooks/useIOCs";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

interface DeleteIOCDialogProps {
  ioc: IOC;
}

export default function DeleteIOCDialog({
  ioc,
}: DeleteIOCDialogProps) {
  const [open, setOpen] = useState(false);

  const mutation = useDeleteIOC();

  function handleDelete() {
    mutation.mutate(ioc.id, {
      onSuccess: () => {
        toast.success("IOC deleted successfully");
        setOpen(false);
      },

      onError: () => {
        toast.error("Unable to delete IOC");
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          onClick={(e) => e.stopPropagation()}
        >
          🗑 Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border-slate-800 bg-slate-900 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete IOC?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.

            <br />
            <br />

            <strong>{ioc.value}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}