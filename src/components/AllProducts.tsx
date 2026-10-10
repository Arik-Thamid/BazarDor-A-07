import React from 'react';

interface IProduct  {
    id: string | number;
    image: string;
    nameBn: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | string;
        pct: number;
    };
};

const AllProducts = async () => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products');
    const data: IProduct[] = await res.json();
    console.log(data)
    return (
        <div className='m-8'>
            <div className='p-4'>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            সব পণ্য
                        </h1>

                        <p className="mt-3 text-base text-gray-600">
                            মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-base text-gray-700">
                            সাজান
                        </span>

                        
                        <select
                            defaultValue="default"
                            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm outline-none transition-all hover:border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="price-low">দাম: কম থেকে বেশি</option>
                            <option value="price-high">দাম: বেশি থেকে কম</option>
                            <option value="name">নাম অনুযায়ী</option>
                        </select>
                        

                    </div>
                </div>


            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
                {
                    data.map((item) => (
                        <div
                            key={item.id}
                            className="w-full rounded-[22px] border border-[#dce5dd] bg-[#fbfdfb] p-5"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0]">
                                    <span className="text-3xl" aria-hidden="true">
                                        {item.image}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#15251c]">
                                        {item.nameBn}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        প্রতি {item.unit === "kg" ? "কেজি" : item.unit === "litre" ? "লিটার" : item.unit}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-end justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        আজকের দাম
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-[#173c2b]">
                                        {item.today.toLocaleString("bn-BD")} টাকা
                                    </p>
                                </div>

                                <span
                                    className={`mb-1 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${item.change.dir === "up"
                                        ? "bg-red-50 text-red-600"
                                        : item.change.dir === "down"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {item.change.dir === "up"
                                        ? "▲"
                                        : item.change.dir === "down"
                                            ? "▼"
                                            : "— "}

                                    {Math.abs(item.change.pct).toLocaleString("bn-BD", {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                    })}%
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllProducts;