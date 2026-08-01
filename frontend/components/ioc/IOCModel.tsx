
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createIOC } from "@/lib/services/ioc";

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

  const [form, setForm] = useState({
    type: "ip",
    value: "",
    severity: "low",
    source: "",
    description: "",
  });

  const mutation = useMutation({
    mutationFn: createIOC,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["iocs"],
      });

      setOpen(false);

      setForm({
        type: "ip",
        value: "",
        severity: "low",
        source: "",
        description: "",
      });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(form);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add IOC</Button>
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border-slate-800 text-white">
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
                type: e.target.value,
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
            placeholder="Value"
            value={form.value}
            onChange={(e) =>
              setForm({
                ...form,
                value: e.target.value,
              })
            }
            className="w-full rounded border border-slate-700 bg-slate-800 p-2"
          />

          <select
            value={form.severity}
            onChange={(e) =>
              setForm({
                ...form,
                severity: e.target.value,
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
          />

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Creating..."
              : "Create IOC"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}