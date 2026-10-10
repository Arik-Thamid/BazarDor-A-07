
export default function Loading() {
    return (
        <main className="mx-auto max-w-7xl animate-pulse px-4 py-8">

            {/* Heading */}
            <div className="mb-6 space-y-3">
                <div className="h-7 w-48 rounded-md bg-gray-200" />
                <div className="h-4 w-72 max-w-full rounded-md bg-gray-200" />
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-gray-200 p-4"
                    >
                        <div className="mb-4 aspect-square rounded-lg bg-gray-200" />

                        <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />

                        <div className="h-3 w-1/2 rounded bg-gray-200" />
                    </div>
                ))}
            </div>
        </main>
    );
}
