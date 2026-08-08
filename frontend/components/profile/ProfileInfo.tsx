"use client";

interface ProfileInfoProps {
  user: {
    full_name: string;
    email: string;
    joined: string;
    active: boolean;
  };
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const info = [
    {
      label: "Full Name",
      value: user.full_name,
    },
    {
      label: "Email",
      value: user.email,
    },
    {
      label: "Joined",
      value: user.joined,
    },
    {
      label: "Status",
      value: user.active ? "Active" : "Inactive",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Personal Information
      </h2>

      <div className="space-y-5">
        {info.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b border-slate-800 pb-3"
          >
            <span className="text-slate-400">
              {item.label}
            </span>

            <span className="font-medium text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
