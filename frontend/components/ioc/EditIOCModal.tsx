
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { IOC } from "@/lib/types/ioc";
import { useUpdateIOC } from "@/lib/hooks/useIOCs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface EditIOCModalProps {
  ioc: IOC;
}

export default function EditIOCModal({
  ioc,
}: EditIOCModalProps) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    severity: ioc.severity,
    source: ioc.source,
    description: ioc.description,
  });

  const mutation = useUpdateIOC();

  useEffect(() => {
    setForm({
      severity: ioc.severity,
      source: ioc.source,
      description: ioc.description,
    });
  }, [ioc]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(
      {
        id: ioc.id,
        data: form,
      },
      {
        onSuccess: () => {
          toast.success("IOC updated successfully");
          setOpen(false);
        },

        onError: () => {
          toast.error("Failed to update IOC");
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => e.stopPropagation()}
        >
          ✏️ Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="border-slate-800 bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle>Edit IOC</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            value={ioc.type}
            disabled
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 opacity-60"
          />

          <input
            value={ioc.value}
            disabled
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 opacity-60"
          />

          <select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            name="source"
            value={form.source}
            onChange={handleChange}
            placeholder="Source"
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Description"
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}