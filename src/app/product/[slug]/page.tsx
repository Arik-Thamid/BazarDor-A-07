import Link from "next/link";

type Market = {
    market: string;
    division?: string;
    min: number;
    max: number;
};

type ProductData = {
    nameBn?: string;
    image?: string;
    categoryIcon?: string;
    today?: number | string | null;
    yesterday?: number | string | null;
    lastWeek?: number | string | null;
    lastMonth?: number | string | null;
    change?: {
        dir?: "up" | "down" | string;
        pct?: number | null;
    };
    markets?: Market[];
    [key: string]: unknown;
};

const dataDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const res = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products/${slug}`,
       
    );

    const data = (await res.json()) as ProductData;

    const price = (value: number | string | null | undefined) =>
        value != null ? `${value} টাকা` : "—";

    const markets: Market[] = Array.isArray(data.markets) ? data.markets : [];
    console.log(markets)
    // সর্বনিম্ন ও সর্বোচ্চ বাজারদর বের করা
    const minPrice = markets.length
        ? Math.min(...markets.map((market) => market.min))
        : data.today;

    const maxPrice = markets.length
        ? Math.max(...markets.map((market) => market.max))
        : data.today;

    const changeColor =
        data.change?.dir === "up"
            ? "text-red-600"
            : data.change?.dir === "down"
                ? "text-green-600"
                : "text-gray-500";

    const changeIcon =
        data.change?.dir === "up"
            ? "▲"
            : data.change?.dir === "down"
                ? "▼"
                : "—";

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-5xl">

                {/* Breadcrumb */}
                <div className="mb-5 text-xs text-gray-500">
                    <Link className="hover-underline" href='/'>হোম</Link><span className="mx-2">›</span>
                    {/* {
                        markets.map(i=> <Link key={i.id} className="hover-underline" href={`/category`}>চাল</Link><span className="mx-2">›</span> )
                    } */}
                   
                    <span className="font-semibold text-gray-800">
                        {data.nameBn}
                    </span>
                </div>

                {/* Product Header */}
                <section className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-3xl">
                            {data.image || data.categoryIcon || "🍚"}
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                {data.nameBn}
                            </h1>
                            <p className="mt-1 text-xs text-gray-500">
                                প্রতি কেজি চালের বাজারদর
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl bg-[#f1f6f1] px-6 py-3 sm:text-center">
                        <p className="text-xs text-gray-500">
                            আজকের দাম
                        </p>
                        <p className="mt-1 text-2xl font-extrabold text-gray-800">
                            {price(data.today)}
                        </p>
                        <p className={`mt-1 text-xs font-semibold ${changeColor}`}>
                            {changeIcon} {Math.abs(data.change?.pct ?? 0)}%
                            <span className="ml-1 font-normal text-gray-500">
                                গতকালের তুলনায়
                            </span>
                        </p>
                    </div>
                </section>

                {/* Summary Cards */}
                <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-sm font-bold text-gray-800">
                        বাজারদরের সংক্ষিপ্তসার
                    </h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-gray-100 p-4">
                            <p className="text-xs text-gray-500">
                                সর্বনিম্ন দাম
                            </p>
                            <p className="mt-2 text-lg font-bold text-green-600">
                                {price(minPrice)}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                বাজারগুলোর মধ্যে সর্বনিম্ন
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-100 p-4">
                            <p className="text-xs text-gray-500">
                                সর্বোচ্চ দাম
                            </p>
                            <p className="mt-2 text-lg font-bold text-red-500">
                                {price(maxPrice)}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                বাজারগুলোর মধ্যে সর্বোচ্চ
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-100 p-4">
                            <p className="text-xs text-gray-500">
                                তালিকাভুক্ত বাজার
                            </p>
                            <p className="mt-2 text-lg font-bold text-green-600">
                                {markets.length} টি
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                বিভিন্ন এলাকার বাজার
                            </p>
                        </div>
                    </div>

                    {/* Historical Prices */}
                    <div className="mt-6">
                        <h2 className="mb-4 text-sm font-bold text-gray-800">
                            সময় অনুযায়ী চালের দাম
                        </h2>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {[
                                { label: "আজ", value: data.today },
                                { label: "গতকাল", value: data.yesterday },
                                { label: "গত সপ্তাহ", value: data.lastWeek },
                                { label: "গত মাস", value: data.lastMonth },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-xl border border-gray-100 bg-[#f8faf8] p-4"
                                >
                                    <p className="text-xs text-gray-500">
                                        {item.label}
                                    </p>
                                    <p className="mt-2 text-base font-bold text-gray-800">
                                        {price(item.value)}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        প্রতি কেজি
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Table */}
                    <div className="mt-6">
                        <h2 className="mb-4 text-sm font-bold text-gray-800">
                            বাজারভিত্তিক বাজারদর
                        </h2>

                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                                <thead className="bg-[#f7faf7] text-xs text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">
                                            ক্রম
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            বাজার
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            বিভাগ
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            সর্বনিম্ন
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            সর্বোচ্চ
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {markets.map((market, index) => (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className={`border-t border-gray-200 ${
                                                index % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-[#f2f6f1]"
                                            }`}
                                        >
                                            <td className="px-4 py-3 text-gray-500">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                {market.market}
                                            </td>

                                            <td className="px-4 py-3 text-gray-600">
                                                {market.division}
                                            </td>

                                            <td className="px-4 py-3 font-medium text-green-600">
                                                {price(market.min)}
                                            </td>

                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                {price(market.max)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-3 text-xs text-gray-400">
                            * বাজারভেদে দাম আলাদা হতে পারে। সব দাম প্রতি কেজিতে।
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default dataDetailsPage;
