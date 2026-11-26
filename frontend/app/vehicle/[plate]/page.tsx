"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function VehiclePage({ params }: any) {
    const [vehicle, setVehicle] = useState<any>(null);
    const [callerNumber, setCallerNumber] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVehicle = async () => {
            const resolvedParams = await params;
            const plate = resolvedParams.plate;

            const res = await axios.get(
                `http://127.0.0.1:3001/vehicle/${plate}` // ✅ FIXED
            );

            setVehicle(res.data);
        };

        fetchVehicle();
    }, [params]);

    const callOwner = async () => {
        setLoading(true);
        const resolvedParams = await params;
        const plate = resolvedParams.plate;

        try {
            await axios.post("http://127.0.0.1:3001/vehicle/call", {
                numberPlate: plate,
                callerNumber,
            });
            setLoading(false);
            alert("📞 Calling owner...");
        } catch (err) {
            alert("❌ Failed to connect. Try again.");
        }



    };

    if (!vehicle) return <div>Loading...</div>;
    const isValidNumber = callerNumber.length === 10;
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-2 text-black">
                🚗 Vehicle Contact System
            </h1>
            <div className="bg-black p-6 rounded-lg shadow-md w-80 text-center">

                <h1 className="text-2xl font-bold mb-4">
                    🚗 {vehicle.numberPlate}
                </h1>
                <p className="text-sm text-gray-600 mb-4">
                    Enter your number to contact the vehicle owner
                </p>
                <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={callerNumber}
                    onChange={(e) => setCallerNumber(e.target.value)}
                    className="border w-full p-2 rounded mb-4"
                />

                <button
                    onClick={callOwner}
                    disabled={!isValidNumber || loading}
                    className={`w-full py-2 rounded ${isValidNumber
                        ? "bg-blue-500 text-white"
                        : "bg-gray-400 text-gray-700"
                        }`}
                >
                    {loading ? "Calling..." : "Call Owner"}
                </button>
            </div>
        </div>
    );
}