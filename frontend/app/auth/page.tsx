"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const router = useRouter();

    const [selectedRole, setSelectedRole] = useState("");

    // USER / ADMIN
    const [phone, setPhone] = useState("");

    // OFFICER
    const [officerId, setOfficerId] = useState("");
    const [password, setPassword] = useState("");

    // USER / ADMIN LOGIN
    const handleUserLogin = async () => {
        try {
            const res = await axios.post(
                "http://127.0.0.1:3001/auth/login",
                {
                    phone,
                }
            );

            if (!res.data) {
                alert("User not found");
                return;
            }

            localStorage.setItem("user", JSON.stringify(res.data));

            // ADMIN
            if (res.data.role === "ADMIN") {
                router.push("/dashboard");
            } else {
                // USER
                router.push("/user");
            }
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    };

    // OFFICER LOGIN
    const handleOfficerLogin = async () => {
        try {
            const res = await axios.post(
                "http://127.0.0.1:3001/officer/login",
                {
                    officerId,
                    password,
                }
            );

            if (!res.data) {
                alert("Invalid officer credentials");
                return;
            }

            localStorage.setItem(
                "officer",
                JSON.stringify(res.data)
            );

            router.push("/officer-dashboard");

        } catch (err) {
            console.error(err);
            alert("Officer login failed");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8">

                <h1 className="text-3xl font-bold text-center mb-8 text-black">
                    🚔 Smart Vehicle System
                </h1>

                {/* ROLE BUTTONS */}
                <div className="flex gap-3 mb-8">

                    <button
                        onClick={() => setSelectedRole("ADMIN")}
                        className={`flex-1 py-3 rounded-lg font-bold ${selectedRole === "ADMIN"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                    >
                        ADMIN
                    </button>

                    <button
                        onClick={() => setSelectedRole("USER")}
                        className={`flex-1 py-3 rounded-lg font-bold ${selectedRole === "USER"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                    >
                        USER
                    </button>

                    <button
                        onClick={() => setSelectedRole("OFFICER")}
                        className={`flex-1 py-3 rounded-lg font-bold ${selectedRole === "OFFICER"
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                    >
                        OFFICER
                    </button>

                </div>

                {/* ADMIN LOGIN */}
                {selectedRole === "ADMIN" && (
                    <div className="border rounded-xl p-5 bg-gray-50">

                        <h2 className="text-2xl font-bold mb-4 text-black">
                            👑 Admin Login
                        </h2>

                        <input
                            placeholder="Enter Admin Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border border-gray-300 p-3 rounded-lg w-full mb-4 text-black"
                        />

                        <button
                            onClick={handleUserLogin}
                            className="bg-blue-600 text-white w-full py-3 rounded-lg font-bold"
                        >
                            Login as Admin
                        </button>

                    </div>
                )}

                {/* USER LOGIN */}
                {selectedRole === "USER" && (
                    <div className="border rounded-xl p-5 bg-gray-50">

                        <h2 className="text-2xl font-bold mb-4 text-black">
                            👤 User Login
                        </h2>

                        <input type="tel" inputMode="numeric" pattern="[0-9]*" maxLength={10} placeholder="Enter Phone Number" value={phone} onChange={(e) => {

                            const onlyNums =
                                e.target.value.replace(
                                    /\D/g,
                                    ""
                                );

                            setPhone(
                                onlyNums.slice(0, 10)
                            );
                        }}

                            className="border border-gray-300 p-3 rounded-lg w-full mb-4 text-black"

                        />

                        <button
                            onClick={handleUserLogin}
                            className="bg-green-600 text-white w-full py-3 rounded-lg font-bold"
                        >
                            Login as User
                        </button>

                    </div>
                )}

                {/* OFFICER LOGIN */}
                {selectedRole === "OFFICER" && (
                    <div className="border rounded-xl p-5 bg-gray-50">

                        <h2 className="text-2xl font-bold mb-4 text-black">
                            👮 Officer Login
                        </h2>

                        <input

                            placeholder="Enter Officer ID"

                            value={officerId}

                            onChange={(e) =>

                                setOfficerId(
                                    e.target.value
                                )

                            }

                            className="border border-gray-300 p-3 rounded-lg w-full mb-4 text-black"

                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-3 rounded-lg w-full mb-4 text-black"
                        />

                        <button
                            onClick={handleOfficerLogin}
                            className="bg-red-600 text-white w-full py-3 rounded-lg font-bold"
                        >
                            Login as Officer
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
}