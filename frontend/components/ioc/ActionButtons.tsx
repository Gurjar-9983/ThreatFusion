
"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={onView}
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}