"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import DashboardShell from "@/components/layout/DashboardShell";

import StatCard from "@/components/ui/StatCard";

import PremiumTable from "@/components/ui/PremiumTable";

import TowMap from "@/components/TowMap";

import {
    IndianRupee,
    Car,
    Shield,
    AlertTriangle,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";

import RevenueChart from "@/components/charts/RevenueChart";

import toast from "react-hot-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";

import SkeletonStatCard
    from "@/components/ui/SkeletonStatCard";

import SkeletonChart
    from "@/components/ui/SkeletonChart";

export default function AdminDashboard() {

    const [stats, setStats] = useState<any>(null);

    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    const [activeTows, setActiveTows] = useState<any[]>([]);

    const [highRiskDrivers, setHighRiskDrivers] = useState<any[]>([]);
    const [searchPlate, setSearchPlate] = useState("");

    const [searchedVehicle, setSearchedVehicle] = useState<any>(null);

    const [adminMessage, setAdminMessage] = useState("");
    const [loading, setLoading] = useState(true);
    //Temporary data for Revenue Chart
    const revenueData = [

        { day: "Mon", revenue: 1200 },

        { day: "Tue", revenue: 1800 },

        { day: "Wed", revenue: 900 },

        { day: "Thu", revenue: 2400 },

        { day: "Fri", revenue: 2000 },

        { day: "Sat", revenue: 3100 },

        { day: "Sun", revenue: 2700 },
    ];

    useEffect(() => {

        // OFFICER LEADERBOARD
        axios
            .get(
                "http://127.0.0.1:3001/officer/leaderboard"
            )
            .then((res) =>
                setLeaderboard(res.data)
            );

        // ACTIVE TOWS
        axios
            .get(
                "http://127.0.0.1:3001/tow/active"
            )
            .then((res) =>
                setActiveTows(res.data)
            );

        // ADMIN STATS
        axios
            .get(
                "http://127.0.0.1:3001/admin/stats"
            )
            .then((res) =>
                setStats(res.data)

            );
        setLoading(false);

        // HIGH RISK USERS
        axios
            .get(
                "http://127.0.0.1:3001/admin/high-risk"
            )
            .then((res) =>
                setHighRiskDrivers(res.data)
            );

    }, []);

    const searchVehicle = async () => {

        try {

            const res = await axios.get(

                `http://127.0.0.1:3001/vehicle/${searchPlate}`

            );

            setSearchedVehicle(res.data);

        } catch (err) {

            toast.error("Vehicle not found");
        }
    };

    const sendAdminMessage = async () => {

        try {

            await axios.post(

                "http://127.0.0.1:3001/message",

                {

                    userId:
                        searchedVehicle.user.id,

                    content: adminMessage,
                }
            );

            toast.success("Message sent");

            setAdminMessage("");

        } catch (err) {

            toast.error("Failed to send message");
        }
    };

    if (loading) {

        return (

            <DashboardShell userId={1}>

                <div className="space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <SkeletonStatCard />
                        <SkeletonStatCard />
                        <SkeletonStatCard />
                        <SkeletonStatCard />

                    </div>

                    <SkeletonChart />

                </div>

            </DashboardShell>
        );
    }

    return (

        <DashboardLayout role="admin">

            <DashboardShell
                userId={1}>

                <motion.div

                    className="space-y-8"

                    initial={{
                        opacity: 0,
                    }}

                    animate={{
                        opacity: 1,
                    }}

                    transition={{
                        duration: 0.6,
                    }}
                >

                    {/* HEADER */}
                    <div>

                        <h1 className="text-4xl font-bold text-black dark:text-white">

                            🛡️ Admin Command Center

                        </h1>

                        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">

                            Monitor city-wide governance,
                            enforcement intelligence and
                            mobility analytics.

                        </p>

                    </div>

                    {/* ANALYTICS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

                        <StatCard
                            title="Total Revenue"
                            value={`₹${stats?.revenue || 0}`}
                            icon={<IndianRupee size={28} />}
                            color="from-emerald-600 to-emerald-400"
                        />

                        <StatCard
                            title="Active Tows"
                            value={activeTows.length}
                            icon={<Car size={28} />}
                            color="from-orange-500 to-red-500"
                        />

                        <StatCard
                            title="Total Officers"
                            value={stats?.officers || 0}
                            icon={<Shield size={28} />}
                            color="from-zinc-900 to-zinc-700"
                        />

                        <StatCard
                            title="High Risk Drivers"
                            value={highRiskDrivers.length}
                            icon={<AlertTriangle size={28} />}
                            color="from-red-600 to-red-400"
                        />

                        <StatCard
                            title="Total Users"
                            value={stats?.users || 0}
                            icon={<Users size={28} />}
                            color="from-blue-600 to-cyan-500"
                        />

                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-8 transition-colors">

                        <h2 className="text-3xl font-bold text-black dark:text-white mb-6">

                            🚗 Vehicle Intelligence Search

                        </h2>

                        <div className="flex flex-col xl:flex-row gap-4">

                            <input
                                placeholder="Enter Vehicle Number"
                                value={searchPlate}
                                onChange={(e) =>
                                    setSearchPlate(e.target.value)
                                }
                                className="

                border
                border-zinc-300
                dark:border-zinc-700

                bg-white
                dark:bg-zinc-800

                text-black
                dark:text-white

                rounded-2xl

                p-4

                flex-1

            "
                            />

                            <Button
                                onClick={searchVehicle}
                                className="rounded-2xl px-8"
                            >

                                Search Vehicle

                            </Button>

                        </div>

                    </div>
                    {searchedVehicle && (

                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-8 space-y-6 transition-colors">

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="text-3xl font-bold text-black dark:text-white">

                                        {searchedVehicle.numberPlate}

                                    </h2>

                                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">

                                        {searchedVehicle.brand}

                                    </p>

                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6">

                                    <h3 className="text-xl font-bold text-black dark:text-white mb-4">

                                        👤 Owner Details

                                    </h3>

                                    <div className="space-y-2 text-zinc-700 dark:text-zinc-300">

                                        <p>
                                            Phone:
                                            {searchedVehicle.user?.phone}
                                        </p>

                                        <p>
                                            Email:
                                            {searchedVehicle.user?.email}
                                        </p>

                                    </div>

                                </div>

                                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6">

                                    <h3 className="text-xl font-bold text-black dark:text-white mb-4">

                                        📨 Admin Messaging

                                    </h3>

                                    <textarea
                                        placeholder="Type admin message..."
                                        value={adminMessage}
                                        onChange={(e) =>
                                            setAdminMessage(e.target.value)
                                        }
                                        className="

                        w-full
                        h-32

                        border
                        border-zinc-300
                        dark:border-zinc-700

                        bg-white
                        dark:bg-zinc-900

                        text-black
                        dark:text-white

                        rounded-2xl

                        p-4

                    "
                                    />

                                    <Button
                                        onClick={sendAdminMessage}
                                        className="rounded-2xl mt-4"
                                    >

                                        Send Message

                                    </Button>

                                </div>

                            </div>

                        </div>

                    )}

                    <RevenueChart
                        data={revenueData}
                    />

                    {/* MAIN GRID */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                        {/* OFFICER LEADERBOARD */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-6 transition-colors">

                            <h2 className="text-3xl font-bold text-black dark:text-white mb-6">

                                👮 Officer Leaderboard

                            </h2>

                            <div className="space-y-4">

                                {leaderboard.map((officer, index) => (

                                    <div
                                        key={officer.id}
                                        className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-4 flex justify-between items-center transition-colors"
                                    >

                                        <div>

                                            <p className="font-bold text-black dark:text-white">

                                                #{index + 1} {officer.name}

                                            </p>

                                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">

                                                {officer.designation}

                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <p className="text-2xl font-bold text-emerald-600">

                                                {officer.reputationScore}

                                            </p>

                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">

                                                Reputation

                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* HIGH RISK DRIVERS */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-6 transition-colors">

                            <h2 className="text-3xl font-bold text-black dark:text-white mb-6">

                                🚨 High Risk Drivers

                            </h2>

                            <PremiumTable
                                columns={[
                                    "phone",
                                    "trustScore",
                                ]}
                                data={highRiskDrivers}
                            />

                        </div>

                    </div>

                    {/* LIVE TOW MAP */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-6 transition-colors">

                        <h2 className="text-3xl font-bold text-black dark:text-white mb-6">

                            🗺️ City Tow Intelligence

                        </h2>

                        <TowMap tows={activeTows} />

                    </div>

                </motion.div>

            </DashboardShell>

        </DashboardLayout>
    );
}