
"use client";

import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignUpPage() {
    return (
        <main className="min-h-screen  my-8 text-[#17251d]">
            <div className="mx-auto w-full max-w-92">

                {/* Heading */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত জানতে দেখুন।
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-[#dce5dc] bg-[#fbfcfb] p-6 sm:p-7">

                    <form className="space-y-4">

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1.5 block text-sm font-medium"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="আপনার সম্পূর্ণ নাম"
                                required
                                className="w-full rounded-lg border border-[#cbd5cf] bg-transparent px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
                            />
                        </div>

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
                                className="w-full rounded-lg border border-[#cbd5cf] bg-transparent px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
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
                                className="w-full rounded-lg border border-[#cbd5cf] bg-transparent px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1.5 block text-sm font-medium"
                            >
                                পাসওয়ার্ড নিশ্চিত করুন
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="আবার লিখুন"
                                required
                                className="w-full rounded-lg border border-[#cbd5cf] bg-transparent px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#07883e] py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#067534] active:scale-[0.99]"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#d8dfd9]" />

                        <span className="text-sm text-gray-500">
                            অথবা
                        </span>

                        <div className="h-px flex-1 bg-[#d8dfd9]" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">

                        <button
                            type="button"
                            className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#26352c] px-2 py-2 text-center text-sm leading-5 transition hover:bg-[#edf4ee]"
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
                            className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#26352c] px-2 py-2 text-center text-sm leading-5 transition hover:bg-[#edf4ee]"
                        >
                            <FaGithub className="shrink-0" />

                            <span>
                                GitHub দিয়ে
                                <br />
                                চালিয়ে যান
                            </span>
                        </button>
                    </div>

                    {/* Sign In */}
                    <p className="mt-5 text-center text-sm text-gray-500">
                        অ্যাকাউন্ট আছে?{" "}

                        <Link
                            href="/sign-in"
                            className="font-medium text-green-700 underline underline-offset-2 hover:text-green-800"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>
                </div>

                {/* Back Home */}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm text-gray-500 underline underline-offset-2 transition hover:text-green-700"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
}
