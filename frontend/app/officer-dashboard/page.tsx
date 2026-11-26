"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TowMap from "@/components/TowMap";
// import OfficerLeaderboard from "@/components/OfficerLeaderboard";
import DashboardShell from "@/components/layout/DashboardShell";

import DashboardLayout from "@/components/layout/DashboardLayout";

import toast from "react-hot-toast";


import StatCard from "@/components/ui/StatCard";

import PremiumTable from "@/components/ui/PremiumTable";

import {
    Shield,
    AlertTriangle,
    Car,
    IndianRupee,
} from "lucide-react";

import { Button } from "@/components/ui/button";


export default function OfficerDashboard() {
    const [officer, setOfficer] = useState<any>(null);
    const [plate, setPlate] = useState("");
    const [vehicle, setVehicle] = useState<any>(null);


    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState("");
    const [stats, setStats] = useState<any>(null);
    const [activeTows, setActiveTows] = useState<any[]>([]);
    const [selectedRevenue, setSelectedRevenue] = useState("lifetime");
    const [latitude, setLatitude] = useState<number | null>(null);
    const [photo, setPhoto] = useState<File | null>(null);
    const [driverType, setDriverType] = useState("OWNER");
    const [driverIdentity, setDriverIdentity] = useState("");
    const [longitude, setLongitude] = useState<number | null>(null);
    // const [leaderboard, setLeaderboard] = useState<any[]>([]);

    const searchVehicle = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3001/vehicle/${plate}`
            );

            setVehicle(res.data);
        } catch (err) {
            toast.error("Vehicle not found");
        }
    };
    // const issueFine = async () => {
    //     try {
    //         await axios.post("http://localhost:3001/fine", {
    //             vehicleNumber: vehicle.numberPlate,
    //             reason,
    //             amount,
    //             tollLocation: officer.location,
    //             officerName: officer.name,
    //             officerId: officer.id,
    //         });

    //         toast.success("Fine Issued");

    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Failed");
    //     }
    // };

    const loadDashboardData = async (
        officerId: number
    ) => {

        try {

            const statsRes =
                await axios.get(
                    `http://127.0.0.1:3001/fine/stats/${officerId}`
                );

            setStats(
                statsRes.data
            );

            const towRes =
                await axios.get(
                    "http://127.0.0.1:3001/tow/active"
                );

            setActiveTows(
                towRes.data
            );

        } catch (err) {

            console.error(err);
        }
    };

    useEffect(() => {

        // const fetchLeaderboard = async () => {

        //     try {

        //         const response =
        //             await axios.get(
        //                 "http://127.0.0.1:3001/officer/leaderboard"
        //             );

        //         setLeaderboard(
        //             response.data
        //         );

        //     } catch (err) {

        //         console.error(
        //             "Leaderboard fetch failed",
        //             err
        //         );
        //     }
        // };

        navigator.geolocation
            .getCurrentPosition(
                (position) => {

                    setLatitude(
                        position.coords.latitude
                    );

                    setLongitude(
                        position.coords.longitude
                    );
                }
            );

        const storedOfficer = JSON.parse(
            localStorage.getItem("officer") || "null"
        );

        if (!storedOfficer) {
            return;
        }

        setOfficer(storedOfficer);

        loadDashboardData(
            storedOfficer.id
        );

        // axios
        //     .get(
        //         `http://127.0.0.1:3001/fine/stats/${storedOfficer.id}`
        //     )
        //     .then((res) => setStats(res.data))
        //     .catch((err) => console.error(err));

        // axios
        //     .get("http://127.0.0.1:3001/tow/active")
        //     .then((res) =>
        //         setActiveTows(res.data)
        //     )
        //     .catch((err) =>
        //         console.error(err)
        //     );


        // 👮 FETCH OFFICER LEADERBOARD
        // fetchLeaderboard();

    }, []);

    const handleFineSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!plate || !reason || !amount || !photo) {

            toast.error("All fields required");

            return;
        }

        const formData = new FormData();

        formData.append(
            "numberPlate",
            vehicle.numberPlate
        );
        formData.append("reason", reason);

        formData.append("amount", amount);

        formData.append("photo", photo);

        formData.append("officerName", officer.name);

        formData.append("tollLocation", officer.location);

        formData.append("latitude", latitude?.toString() || "");

        formData.append("longitude", longitude?.toString() || "");

        formData.append("officerId", String(officer.id));
        formData.append("driverType", driverType);

        formData.append("driverIdentity", driverIdentity);

        await axios.post(

            "http://localhost:3001/fine",

            formData,

            {

                headers: {

                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

        toast.success("Fine issued successfully");

        setReason("");

        setAmount("");

        setPhoto(null);

        searchVehicle();


    };

    if (!officer) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (

        <DashboardLayout role="admin">

            <DashboardShell
                userId={officer.id}>


                <div className="space-y-8">

                    {/* HEADER */}
                    <div>

                        <h1 className="text-4xl font-bold text-black dark:text-white">

                            👮 Officer Dashboard

                        </h1>

                        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">

                            Monitor enforcement operations,
                            towing activity and real-time governance.

                        </p>

                    </div>

                    {/* PREMIUM ANALYTICS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <StatCard
                            title="Active Tows"
                            value={activeTows.length}
                            icon={<Car size={28} />}
                            color="from-orange-500 to-red-500"
                        />

                        <StatCard
                            title="Today's Fines"
                            value={stats?.today || 0}
                            icon={<AlertTriangle size={28} />}
                            color="from-red-600 to-red-400"
                        />

                        <StatCard
                            title="Revenue"
                            value={`₹${stats?.todayRevenue || 0}`}
                            icon={<IndianRupee size={28} />}
                            color="from-emerald-600 to-emerald-400"
                        />

                        <StatCard
                            title="Officer Score"
                            value="98"
                            icon={<Shield size={28} />}
                            color="from-zinc-900 to-zinc-700"
                        />

                    </div>

                    {/* OFFICER INFO */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-6 transition-colors">

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">

                            👤 Officer Information

                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-700 dark:text-zinc-300">

                            <p>
                                <strong>Name:</strong> {officer.name}
                            </p>

                            <p>
                                <strong>Designation:</strong> {officer.designation}
                            </p>

                            <p>
                                <strong>Police Station:</strong> {officer.policeStation}
                            </p>

                            <p>
                                <strong>Location:</strong> {officer.location}
                            </p>

                        </div>

                    </div>

                    {/* VEHICLE SEARCH */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-8 transition-colors">

                        <h2 className="text-3xl font-bold text-black dark:text-white mb-6">

                            🚗 Vehicle Search & Enforcement

                        </h2>

                        <div className="flex flex-col xl:flex-row gap-4">

                            <input
                                placeholder="Enter Vehicle Number"
                                value={plate}
                                onChange={(e) =>
                                    setPlate(e.target.value)
                                }
                                className=" border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl p-4"
                            />

                            <Button
                                onClick={searchVehicle}
                                className="rounded-2xl px-8"
                            >

                                Search Vehicle

                            </Button>

                        </div>

                    </div>

                    {/* VEHICLE DETAILS */}
                    {vehicle && (

                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-8 space-y-6 transition-colors">

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="text-3xl font-bold text-black dark:text-white">

                                        {vehicle.numberPlate}

                                    </h2>

                                    <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">

                                        {vehicle.brand}

                                    </p>

                                </div>

                                <div>

                                    {vehicle.status === "ACTIVE" && (

                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl font-semibold">

                                            🟢 ACTIVE

                                        </span>

                                    )}

                                    {vehicle.status === "TOWED" && (

                                        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-2xl font-semibold">

                                            🔴 TOWED

                                        </span>

                                    )}

                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6">

                                    <h3 className="text-xl font-bold text-black dark:text-white mb-4">

                                        👤 Owner Information

                                    </h3>

                                    <div className="space-y-2 text-zinc-700 dark:text-zinc-300">

                                        <p>
                                            Phone: {vehicle.user?.phone}
                                        </p>

                                        <p>
                                            Brand: {vehicle.brand}
                                        </p>

                                    </div>

                                </div>

                                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6 transition-colors">

                                    <h3 className="text-xl font-bold text-black dark:text-white mb-4">

                                        ⚡ Enforcement Actions

                                    </h3>

                                    <div className="flex flex-wrap gap-4">

                                        {vehicle.status === "ACTIVE" && (

                                            <Button
                                                onClick={async () => {

                                                    try {

                                                        await axios.post(
                                                            "http://127.0.0.1:3001/tow/create",
                                                            {
                                                                numberPlate:
                                                                    vehicle.numberPlate,

                                                                reason:
                                                                    "Illegal Parking",

                                                                pickupLocation:
                                                                    "Ring Road",

                                                                impoundYard:
                                                                    "Surat Traffic Yard",

                                                                officerId:
                                                                    officer.id,

                                                                notes:
                                                                    "Officer initiated tow",
                                                            }
                                                        );

                                                        toast.success(
                                                            "Vehicle towed successfully"
                                                        );

                                                        // window.location.reload();
                                                        await loadDashboardData(
                                                            officer.id
                                                        );

                                                        searchVehicle();

                                                    } catch (err: any) {

                                                        toast.error(
                                                            err?.response?.data?.message ||
                                                            "Tow failed"
                                                        );
                                                    }
                                                }}
                                                variant="destructive"
                                                className="rounded-2xl"
                                            >

                                                🚛 Tow Vehicle

                                            </Button>

                                        )}

                                        {vehicle.status === "TOWED" && (

                                            <Button
                                                onClick={async () => {

                                                    try {

                                                        const towRes =
                                                            await axios.get(
                                                                `http://127.0.0.1:3001/tow/active/${vehicle.numberPlate}`
                                                            );

                                                        const towId =
                                                            towRes.data.towRecord.id;

                                                        await axios.post(
                                                            `http://127.0.0.1:3001/tow/release/${towId}`
                                                        );

                                                        toast.success(
                                                            "Vehicle released successfully"
                                                        );

                                                        // window.location.reload();
                                                        await loadDashboardData(
                                                            officer.id
                                                        );

                                                        searchVehicle();

                                                    } catch (err: any) {

                                                        toast.error(
                                                            err?.response?.data?.message ||
                                                            "Release failed"
                                                        );
                                                    }
                                                }}
                                                className="rounded-2xl bg-green-600 hover:bg-green-700"
                                            >

                                                🔓 Release Vehicle

                                            </Button>

                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* FINE FORM */}
                            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6">

                                <h3 className="text-2xl font-bold text-black dark:text-white mb-6">

                                    🚨 Issue Fine

                                </h3>

                                <div className="space-y-4">

                                    <select

                                        value={driverType}

                                        onChange={(e) =>

                                            setDriverType(
                                                e.target.value
                                            )

                                        }

                                    >

                                        <option value="OWNER">

                                            Owner Driving

                                        </option>

                                        <option value="OTHER">

                                            Other Driver

                                        </option>

                                    </select>

                                    {driverType === "OTHER" && (

                                        <input

                                            placeholder="Enter Aadhaar or DL"

                                            value={driverIdentity}

                                            onChange={(e) =>

                                                setDriverIdentity(
                                                    e.target.value
                                                )

                                            }

                                            className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl p-4"

                                        />

                                    )}

                                    <input
                                        placeholder="Fine Reason"
                                        value={reason}
                                        onChange={(e) =>
                                            setReason(e.target.value)
                                        }
                                        className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl p-4"
                                    />

                                    <input
                                        placeholder="Amount"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl p-4"
                                    />

                                    <input
                                        type="file"
                                        onChange={(e) => {

                                            const file =
                                                e.target.files?.[0];

                                            setPhoto(
                                                file || null
                                            );
                                        }}
                                        className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl p-4"
                                    />


                                    <Button
                                        type="button"
                                        onClick={handleFineSubmit}
                                        className="rounded-2xl"
                                    >

                                        🚨 Issue Fine

                                    </Button>

                                </div>

                            </div>

                        </div>

                    )}

                    {/* LIVE TOW MAP */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-6 transition-colors">

                        <h2 className="text-3xl font-bold text-black dark:text-white mb-6">

                            🗺️ Live Tow Operations

                        </h2>

                        <TowMap tows={activeTows} />

                    </div>

                </div>



            </DashboardShell>
        </DashboardLayout>
    );
}