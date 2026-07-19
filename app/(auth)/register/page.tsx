// clien component
'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation"    // dont use "next/router"
import { useState } from "react";


const RegisterPage = () => {
    const router = useRouter();
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [role, setRole] = useState("CUSTOMER");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // not needed as auth.ts does it
        // if(password.length < 4) {
        //     setError("Password must be at least 4 characters");
        //     return;
        // }

        setLoading(true);
        setError("");

        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
            role
        })
        if(error) {
            setError(error.message || "Something went wrong");
            setLoading(false);
            return;
        }

        router.push('/login');
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        ShelfPing
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Create your account
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form action={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Minimum 4 characters"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Role Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            I am a:
                        </label>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setRole("CUSTOMER")}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                    role === "CUSTOMER"
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                }`}
                            >
                                🛒 Customer
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("SHOP_OWNER")}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                    role === "SHOP_OWNER"
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                }`}
                            >
                                🏪 Shop Owner
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center text-sm mt-6 text-gray-500">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
} 

export default RegisterPage;