"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function OfficerLogin() {
    const router = useRouter();

    const [officerId, setOfficerId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3001/officer/login",
                {
                    officerId,
                    password,
                }
            );

            if (res.data) {
                localStorage.setItem(
                    "officer",
                    JSON.stringify(res.data)
                );

                alert("Officer Login Success");

                router.push("/officer-dashboard");
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">

                <h1 className="text-2xl font-bold mb-4 text-center">
                    👮 Officer Login
                </h1>

                <input
                    placeholder="Officer ID"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    className="border border-gray-300 p-2 w-full mb-3 rounded text-black"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 w-full mb-3 rounded text-black"
                />

                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white w-full py-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}