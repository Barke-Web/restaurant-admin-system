"use client"

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="flex flex-col items-center">
                {/* Elegant gold spinner */}
                <div className="h-14 w-14 border-4 border-yellow-500/80 border-t-transparent rounded-full animate-spin mb-6 shadow-lg shadow-yellow-500/30" />

                {/* Text */}
                <p className="text-lg font-semibold text-yellow-500 tracking-wide">
                    Bringing everything together...        </p>
            </div>
        </div>
    )
}
