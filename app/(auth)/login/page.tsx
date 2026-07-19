// client component
'use client'
// dont use import { auth } from "@/lib/auth" in client component

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        setLoading(true);
        setError("");

        const { data, error } = await authClient.signIn.email({
            email, 
            password
        });

        if(error) {
            setError(error.message || "Something went wrong");
            setLoading(false);
            return;
        }
        if(data?.user?.role === "SHOP_OWNER") {
            router.push('/owner/dashboard');
        }
        else {
            router.push('/search');
        }
        setLoading(false);
    }
    return (
        <div className="bg-zinc-900/90 min-h-screen flex items-center justify-center">
            <div className="bg-black p-8 rounded-xl shadow-md w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        ShelfPing
                    </h1>
                    <p className="text-white text-sm mt-1">
                        Login to your account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* onclick is now action */}
                <form action={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="text-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="text-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-grey focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black py-2 rounded-lg text-sm font-medium hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center text-sm mt-6 text-white/80">
                    Don't have an account?{" "}
                    <Link 
                        href="/register" 
                        className="text-white font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default LoginPage;


