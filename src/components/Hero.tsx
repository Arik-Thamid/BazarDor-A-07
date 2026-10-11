
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <section className="m-3 grid grid-cols-1 items-center gap-6 rounded-2xl bg-white px-5 py-6 sm:m-5 sm:px-8 md:grid-cols-2 md:gap-10">
            {/* Content */}
            <div className="flex flex-col items-start gap-4">
                <p className="rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                    {date}
                </p>

                <h1 className="text-2xl font-bold leading-relaxed text-gray-900 sm:text-3xl lg:text-4xl">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="text-sm leading-7 text-gray-600 sm:text-base">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                    বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                    দামের পরিবর্তন এক জায়গায়।
                </p>

                <Link
                    href="#সব-পণ্য"
                    className="btn border-none bg-green-700 text-white hover:bg-green-800"
                >
                    সব পণ্য দেখুন
                </Link>
            </div>

            {/* Image */}
            <div className="flex justify-center md:justify-end">
                <Image
                    src="/bazar-hero.svg"
                    width={400}
                    height={400}
                    alt="আজকের বাজারের পণ্যের চিত্র"
                    priority
                    className="h-auto w-full max-w-[300px] object-contain sm:max-w-[350px] lg:max-w-[400px]"
                />
            </div>
        </section>
    );
};

export default HeroSection;

