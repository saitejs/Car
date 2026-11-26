"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddVehiclePage() {

    const router = useRouter();

    const [form, setForm] = useState({
        numberPlate: "",
        brand: "",
        model: "",
        year: "",
        likes: "",
        dislikes: "",
    });

    const handleSubmit = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user") || "{}"
            );

            await axios.post(
                "http://127.0.0.1:3001/vehicle/add",
                {
                    ...form,
                    userId: user.id,
                }
            );

            alert("Vehicle Added");

            router.push("/user");

        } catch (err) {

            console.error(err);
            alert("Failed");

        }
    };

    return (

        <div className="p-10 max-w-xl mx-auto">

            <h1 className="text-3xl font-bold mb-6 text-white">
                ➕ Add Vehicle
            </h1>

            <div className="space-y-4">

                <input
                    placeholder="Vehicle Number"
                    className="border p-3 w-full rounded text-white"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            numberPlate: e.target.value,
                        })
                    }
                />


                <select
                    className="border p-3 w-full rounded text-white"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            brand: e.target.value,
                        })
                    }
                >

                    <option value="">
                        Select Brand
                    </option>

                    <option value="Toyota">
                        Toyota
                    </option>

                    <option value="Honda">
                        Honda
                    </option>

                    <option value="Hyundai">
                        Hyundai
                    </option>

                    <option value="Tata">
                        Tata
                    </option>

                    <option value="Mahindra">
                        Mahindra
                    </option>

                    <option value="Suzuki">
                        Suzuki
                    </option>

                    <option value="Kia">
                        Kia
                    </option>

                    <option value="BMW">
                        BMW
                    </option>

                </select>


                <input
                    placeholder="Model"
                    className="border p-3 w-full rounded text-white"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            model: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Year"
                    className="border p-3 w-full rounded text-white"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            year: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Likes"
                    className="border p-3 w-full rounded text-white"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            likes: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Dislikes"
                    className="border p-3 w-full rounded text-white"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            dislikes: e.target.value,
                        })
                    }
                />

                <button
                    onClick={handleSubmit}
                    className="bg-white text-black px-6 py-3 rounded"
                >
                    Add Vehicle
                </button>

            </div>

        </div>
    );
}