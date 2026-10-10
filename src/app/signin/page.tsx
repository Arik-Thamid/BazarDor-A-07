
"use client";

import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignInPage() {
    return (
        <main className="min-h-screen my-8 text-[#17251d]">
            <div className="mx-auto w-full my-4 max-w-92">
                {/* Heading */}
                <div className="mb-5 text-center">
                    <h1 className="text-2xl font-bold">
                        সাইন ইন
                    </h1>

                    <p className="mt-1 text-sm text-[#64748b]">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
                        অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                {/* Sign In Card */}
                <div className="rounded-2xl border border-[#dce5dc] bg-[#fbfcfb] p-5.5">
                    <form className="space-y-4">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-medium"
                            >
                                ইমেইল
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-lg border border-[#cbd5cf] bg-transparent px-3 py-2 text-sm outline-none transition placeholder:text-[#94a3b8] focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-medium"
                            >
                                পাসওয়ার্ড
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                minLength={8}
                                required
                                className="w-full rounded-lg border border-[#cbd5cf] bg-transparent px-3 py-2 text-sm outline-none transition placeholder:text-[#94a3b8] focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#07883e] py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#067534] active:scale-[0.99]"
                        >
                            সাইন ইন
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-4 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#d8dfd9]" />

                        <span className="text-sm text-[#475569]">
                            অথবা
                        </span>

                        <div className="h-px flex-1 bg-[#d8dfd9]" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            className="flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#26352c] px-2 py-1 text-center text-sm leading-4.5 transition hover:bg-[#edf4ee]"
                        >
                            <FaGoogle className="shrink-0 text-[#4285F4]" />

                            <span>
                                Google দিয়ে
                                <br />
                                চালিয়ে যান
                            </span>
                        </button>

                        <button
                            type="button"
                            className="flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#26352c] px-2 py-1 text-center text-sm leading-4.5 transition hover:bg-[#edf4ee]"
                        >
                            <FaGithub className="shrink-0" />

                            <span>
                                GitHub দিয়ে
                                <br />
                                চালিয়ে যান
                            </span>
                        </button>
                    </div>

                    {/* Sign Up */}
                    <p className="mt-3 text-center text-sm text-[#64748b]">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-green-700 underline underline-offset-2 hover:text-green-800"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                {/* Back Home */}
                <div className="mt-7 text-center">
                    <Link
                        href="/"
                        className="text-sm text-[#64748b] underline underline-offset-2 transition hover:text-green-700"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
}

