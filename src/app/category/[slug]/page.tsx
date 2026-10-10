import Link from "next/link";

const CategoryPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const res = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`
    );

    if (!res.ok) {
        throw new Error("পণ্য লোড করা যায়নি");
    }

    const data = await res.json();

  
    const products = Array.isArray(data) ? data : [];


    return (
        <div className="m-8">
            <div className="flex items-center gap-4 w-full bg-white p-8 shadow-2xs rounded-2xl">
                <div className="text-4xl ">
                  {products[0].image}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-[#15251c]">{products[0].categoryNameBn}</h2>
                    <h2>{products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন

                    </h2>
                </div>
            </div>

            <div className="p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">



                    <p className="mt-3 text-base text-gray-600">
                        মোট {products.length.toLocaleString("bn-BD")}টি
                        পণ্য দেখানো হচ্ছে
                    </p>


                    <div className="flex items-center gap-3">
                        <span className="text-base text-gray-700">
                            সাজান
                        </span>

                        <select
                            defaultValue="default"
                            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition-all hover:border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="price-low">
                                দাম: কম থেকে বেশি
                            </option>
                            <option value="price-high">
                                দাম: বেশি থেকে কম
                            </option>
                            <option value="name">নাম অনুযায়ী</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
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
                                    প্রতি{" "}
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
                                <p className="text-sm text-gray-500">
                                    আজকের দাম
                                </p>

                                <p className="mt-1 text-2xl font-bold text-[#173c2b]">
                                    {product.today.toLocaleString("bn-BD")} টাকা
                                </p>
                            </div>

                            <span
                                className={`mb-1 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${product.change.dir === "up"
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

                                {Math.abs(product.change.pct).toLocaleString(
                                    "bn-BD",
                                    {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                    }
                                )}
                                %
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
