"use client";

import Link from "next/link";

import {
    Car,
    Shield,
    User,
    AlertTriangle,
    Trophy,
} from "lucide-react";

const Sidebar = () => {

    return (

        <div className="w-64 h-screen bg-white
dark:bg-zinc-900

text-black
dark:text-white p-6 fixed left-0 top-0 border-r border-zinc-200
dark:border-zinc-800">

            <h1 className="text-3xl font-bold mb-10">
                🚗 Smart Mobility
            </h1>

            <div className="space-y-3">

                <Link
                    href="/user"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100
dark:hover:bg-zinc-800 transition"
                >
                    <User size={20} />
                    User Dashboard
                </Link>

                <Link
                    href="/officer-dashboard"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100
dark:hover:bg-zinc-800 transition"
                >
                    <Shield size={20} />
                    Officer Dashboard
                </Link>

                <Link
                    href="/admin"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition"
                >
                    <AlertTriangle size={20} />
                    Admin Dashboard
                </Link>

                <Link
                    href="/rewards"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition"
                >
                    <Trophy size={20} />
                    Rewards
                </Link>

            </div>

        </div>
    );
};

export default Sidebar;