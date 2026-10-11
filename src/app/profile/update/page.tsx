"use client";

import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const currentName = name || session?.user?.name || "";

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // BetterAuth documentation অনুযায়ী updateUser ব্যবহার করো
    // https://better-auth.com/docs/concepts/users-accounts#update-user
    const { data, error } = await authClient.updateUser({
      name: currentName,
    });

    if (error) {
      toast.error(error.message || "আপডেট ব্যর্থ হয়েছে!");
    } else {
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে! 🎉");
      router.push("/profile");
    }
    setLoading(false);
  };

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">তথ্য আপডেট করুন</h1>

      <div className="card bg-white border shadow">
        <div className="card-body">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">নাম</span>
              </label>
              <input
                type="text"
                placeholder="আপনার নাম"
                className="input input-bordered w-full"
                value={currentName}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success text-white w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "আপডেট করুন"
              )}
            </button>
          </form>

          <Link
            href="/profile"
            className="btn btn-ghost w-full mt-2"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}