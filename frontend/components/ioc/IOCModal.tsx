
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createIOC } from "@/lib/services/ioc";
import type { CreateIOCRequest } from "@/lib/types/ioc";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const INITIAL_FORM: CreateIOCRequest = {
  type: "ip",
  value: "",
  severity: "low",
  source: "",
  description: "",
};

export default function CreateIOCModal() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<CreateIOCRequest>(INITIAL_FORM);

  const mutation = useMutation({
    mutationFn: createIOC,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["iocs"],
      });

      toast.success("IOC created successfully");

      setForm(INITIAL_FORM);

      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to create IOC");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(form);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        Add IOC
      </DialogTrigger>

      <DialogContent className="border-slate-800 bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle>Create IOC</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value as CreateIOCRequest["type"],
              })
            }
            className="w-full rounded border border-slate-700 bg-slate-800 p-2"
          >
            <option value="ip">IP</option>
            <option value="domain">Domain</option>
            <option value="url">URL</option>
            <option value="hash">Hash</option>
          </select>

          <input
            placeholder="IOC Value"
            value={form.value}
            onChange={(e) =>
              setForm({
                ...form,
                value: e.target.value,
              })
            }
            className="w-full rounded border border-slate-700 bg-slate-800 p-2"
            required
          />

          <select
            value={form.severity}
            onChange={(e) =>
              setForm({
                ...form,
                severity: e.target.value as CreateIOCRequest["severity"],
              })
            }
            className="w-full rounded border border-slate-700 bg-slate-800 p-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            placeholder="Source"
            value={form.source}
            onChange={(e) =>
              setForm({
                ...form,
                source: e.target.value,
              })
            }
            className="w-full rounded border border-slate-700 bg-slate-800 p-2"
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full rounded border border-slate-700 bg-slate-800 p-2"
            rows={4}
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