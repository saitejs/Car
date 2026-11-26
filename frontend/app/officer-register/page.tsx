"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function OfficerRegister() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        designation: "",
        policeStation: "",
        location: "",
        officerId: "",
        password: "",
    });

    const handleSubmit = async () => {
        try {
            await axios.post(
                "http://localhost:3001/officer/register",
                form
            );

            alert("Officer Registered");

            router.push("/officer-login");
        } catch (err) {
            console.error(err);
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">

                <h1 className="text-2xl font-bold mb-4 text-center">
                    👮 Officer Registration
                </h1>

                {Object.keys(form).map((key) => (
                    <input
                        key={key}
                        type={key === "password" ? "password" : "text"}
                        placeholder={key}
                        value={(form as any)[key]}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                [key]: e.target.value,
                            })
                        }
                        className="border p-2 w-full mb-3 rounded text-black placeholder-gray-500"
                    />
                ))}

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white w-full py-2 rounded"
                >
                    Register Officer
                </button>
            </div>
        </div>
    );
}