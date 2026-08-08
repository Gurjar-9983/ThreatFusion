
"use client";

interface Props {
  onConfirm: () => void;
}

export default function DeleteReportDialog({
  onConfirm,
}: Props) {
  return (
    <button
      onClick={() => {
        if (
          window.confirm(
            "Delete this report?"
          )
        ) {
          onConfirm();
        }
      }}
      className="hidden"
    />
  );
}