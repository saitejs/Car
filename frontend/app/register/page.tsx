"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const carBrands = [
    { name: "Toyota", logo: "https://logo.clearbit.com/toyota.com" },
    { name: "Honda", logo: "https://logo.clearbit.com/honda.com" },
    { name: "Hyundai", logo: "https://logo.clearbit.com/hyundai.com" },
    { name: "Tata", logo: "https://logo.clearbit.com/tatamotors.com" },
    { name: "Mahindra", logo: "https://logo.clearbit.com/mahindra.com" },
    { name: "BMW", logo: "https://logo.clearbit.com/bmw.com" },
    { name: "Mercedes", logo: "https://logo.clearbit.com/mercedes-benz.com" },
    { name: "Audi", logo: "https://logo.clearbit.com/audi.com" },
];

export default function Register() {
    const [form, setForm] = useState({

        // USER

        name: "",

        email: "",

        phone: "",

        aadhaarNumber: "",

        drivingLicenseNumber: "",

        // VEHICLE

        ownsVehicle: false,

        numberPlate: "",

        brand: "",

        model: "",

        year: "",

        likes: "",

        dislikes: "",

    });

    const [qr, setQr] = useState("");


    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const register = async () => {

        if (

            !form.aadhaarNumber &&

            !form.drivingLicenseNumber

        ) {

            toast.error(
                "Provide Aadhaar or DL"
            );

            return;
        }

        try {

            // STEP 1
            // CREATE USER

            const userRes =
                await axios.post(

                    "http://127.0.0.1:3001/auth/register",

                    {

                        name: form.name,

                        email: form.email,

                        phone: form.phone,

                        aadhaarNumber:
                            form.aadhaarNumber,

                        drivingLicenseNumber:
                            form.drivingLicenseNumber,
                    }
                );

            localStorage.setItem(

                "user",

                JSON.stringify(
                    userRes.data
                )
            );

            // STEP 2
            // CREATE VEHICLE IF OWNER

            if (form.ownsVehicle) {

                await axios.post(

                    "http://127.0.0.1:3001/vehicle/register",

                    {

                        userId:
                            userRes.data.id,

                        numberPlate:
                            form.numberPlate,

                        brand:
                            form.brand,

                        model:
                            form.model,

                        year:
                            form.year,

                        likes:
                            form.likes,

                        dislikes:
                            form.dislikes,
                    }
                );
            }



            alert(
                "✅ Registration successful"
            );

        } catch (error) {

            console.error(error);

            alert(
                "❌ Something went wrong"
            );
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center">
            <div className="bg-gray-900 p-6 rounded w-[400px]">
                <h1 className="text-2xl mb-4">🚗 Register Your Car</h1>

                <input name="name" value={form.name} placeholder="Full Name" onChange={handleChange} className="input" />

                <input name="email" value={form.email} placeholder="Email" onChange={handleChange} className="input" />
                <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} className="input" />

                <input name="aadhaarNumber" value={form.aadhaarNumber} placeholder="Aadhaar Number" onChange={handleChange} className="input" />
                <input name="drivingLicenseNumber" value={form.drivingLicenseNumber} placeholder="Driving License Number" onChange={handleChange} className="input" />

                <label className="flex items-center gap-2 mb-4">

                    <input

                        type="checkbox"

                        checked={form.ownsVehicle}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                ownsVehicle:
                                    e.target.checked,
                            })

                        }

                    />

                    Do you own a vehicle?

                </label>


                {form.ownsVehicle && (

                    <>

                        <input name="numberPlate" value={form.numberPlate} placeholder="Number Plate" onChange={handleChange} className="input" />

                        {/* Brand Dropdown */}
                        <div className="grid grid-cols-4 gap-3 mb-4">
                            {carBrands.map((b) => (
                                <div
                                    key={b.name}
                                    onClick={() => setForm({ ...form, brand: b.name })}
                                    className={`p-2 border rounded cursor-pointer flex flex-col items-center ${form.brand === b.name ? "border-blue-500" : "border-gray-700"}`}
                                >
                                    <img src={b.logo} className="w-10 h-10 mb-1" />
                                    <p className="text-xs">{b.name}</p>
                                </div>
                            ))}
                        </div>

                        <input name="model" value={form.model} placeholder="Model" onChange={handleChange} className="input" />
                        <input name="year" value={form.year} placeholder="Year" onChange={handleChange} className="input" />

                        <textarea name="likes" value={form.likes} placeholder="What you like" onChange={handleChange} className="input" />
                        <textarea name="dislikes" value={form.dislikes} placeholder="What you dislike" onChange={handleChange} className="input" />

                    </>

                )}



                <button onClick={register} className="bg-blue-500 w-full py-2 rounded mt-2">
                    Register
                </button>

                {/* QR Output */}
                {qr && (
                    <div className="mt-4 text-center">
                        <img src={qr} />
                        <a href={qr} download="qr.png" className="block mt-2 text-blue-400">
                            Download QR
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}