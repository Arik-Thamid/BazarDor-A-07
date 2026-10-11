'use client';

import { Product } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type SortValue = "default" | "price-asc" | "price-desc";

const SortDropdown = ({
    value,
    onChange,
}: {
    value: SortValue;
    onChange: (value: SortValue) => void;
}) => (
    <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortValue)}
        className="rounded-xl border border-[#dce5dd] bg-white px-3 py-2 text-base text-gray-700 outline-none focus:border-green-500"
    >
        <option value="default">স্বাভাবিক</option>
        <option value="price-asc">দাম কম থেকে বেশি</option>
        <option value="price-desc">দাম বেশি থেকে কম</option>
    </select>
);

const CategoryPage = () => {
    const params = useParams<{ slug?: string }>();
    const slug = params?.slug ?? "";

    const [products, setProducts] = useState<Product[]>([]);
    const [sortBy, setSortBy] = useState<SortValue>("default");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!slug) {
                setProducts([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            try {
                const res = await fetch(
                    `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
                    { cache: "no-store" }
                );

                if (!res.ok) {
                    throw new Error("পণ্য লোড করা যায়নি");
                }

                const data = await res.json();
                setProducts(Array.isArray(data) ? (data as Product[]) : []);
            } catch (error) {
                console.error(error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [slug]);

    const sortedProducts = useMemo(() => {
        const nextProducts = [...products];

        if (sortBy === "price-asc") {
            nextProducts.sort((a, b) => a.today - b.today);
        }

        if (sortBy === "price-desc") {
            nextProducts.sort((a, b) => b.today - a.today);
        }

        return nextProducts;
    }, [products, sortBy]);

    const categoryInfo = products[0];

    return (
        <div className="m-8">
            <div className="flex items-center gap-4 w-full bg-white p-8 shadow-2xs rounded-2xl">
                <div className="text-4xl">
                    {categoryInfo?.image ?? "🛍️"}
                </div>

                <div>
                    <h2 className="text-xl font-bold text-[#15251c]">
                        {categoryInfo?.categoryNameBn ?? "ক্যাটাগরি"}
                    </h2>
                    <h2>
                        {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </h2>
                </div>
            </div>

            <div className="p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <p className="mt-3 text-base text-gray-600">
                        মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="text-base text-gray-700">সাজান</span>
                        <SortDropdown value={sortBy} onChange={(value) => setSortBy(value)} />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="mt-6 rounded-2xl border border-[#dce5dd] bg-[#fbfdfb] p-6 text-center text-gray-600">
                    পণ্য লোড হচ্ছে...
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => (
                        <Link
                            href={`/product/${product.id}`}
                            key={product.id}
                            className="w-full rounded-[22px] border border-[#dce5dd] hover:border-green-500 bg-[#fbfdfb] p-5"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0]">
                                    <span className="text-3xl" aria-hidden="true">
                                        {product.image}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#15251c]">
                                        {product.nameBn}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        প্রতি {" "}
                                        {product.unit === "kg"
                                            ? "কেজি"
                                            : product.unit === "litre"
                                                ? "লিটার"
                                                : product.unit}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-end justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">আজকের দাম</p>

                                    <p className="mt-1 text-2xl font-bold text-[#173c2b]">
                                        {product.today.toLocaleString("bn-BD")} টাকা
                                    </p>
                                </div>

                                <span
                                    className={`mb-1 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
                                        product.change.dir === "up"
                                            ? "bg-red-50 text-red-600"
                                            : product.change.dir === "down"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-gray-100 text-gray-500"
                                    }`}
                                >
                                    {product.change.dir === "up"
                                        ? "▲"
                                        : product.change.dir === "down"
                                            ? "▼"
                                            : "—"}

                                    {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                    })}
                                    %
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
