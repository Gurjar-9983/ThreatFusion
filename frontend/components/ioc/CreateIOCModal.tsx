
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createIOC } from "@/lib/services/ioc";
import type { CreateIOCRequest, IOCType } from "@/lib/types/ioc";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function CreateIOCModal() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<CreateIOCRequest>({
  type: "ip",
  value: "",
  severity: "low",
  source: "",
  description: "",
});

const mutation = useMutation({
    mutationFn: createIOC,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["iocs"],
      });

      toast.success("IOC created successfully");

      setForm({
        type: "ip",
        value: "",
        severity: "low",
        source: "",
        description: "",
      });

      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to create IOC");
    },
  });

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
    mutation.mutate(form);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            Add IOC
          </Button>
        }
      />

      <DialogContent className="border-slate-800 bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle>Create New IOC</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
          >
            <option value="ip">IP</option>
            <option value="domain">Domain</option>
            <option value="url">URL</option>
            <option value="hash">Hash</option>
          </select>

          <input
            name="value"
            placeholder="IOC Value"
            value={form.value}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
            required
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
            placeholder="Source"
            value={form.source}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create IOC"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}