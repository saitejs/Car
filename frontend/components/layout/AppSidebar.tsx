"use client";

import Link from "next/link";

import {

    Home,
    Shield,
    Car,
    Users,
    Menu,
    AlertTriangle,
    Clock3,
    MessageSquare,
    User,

} from "lucide-react";

type Props = {

    role: "admin" | "officer" | "user";

    mobileOpen?: boolean;
};

export default function AppSidebar({
    role,
    mobileOpen,
}: Props) {

    const links = {

        admin: [

            {
                label: "Dashboard",
                href: "/admin",
                icon: Home,
            },

            {
                label: "Users",
                href: "/admin/users",
                icon: Users,
            },

            {
                label: "Vehicles",
                href: "/admin/vehicles",
                icon: Car,
            },
        ],

        officer: [

            {
                label: "Dashboard",
                href: "/officer-dashboard",
                icon: Shield,
            },

            {
                label: "Tow Operations",
                href: "/officer-dashboard",
                icon: Car,
            },
        ],

        user: [

            {
                label: "Dashboard",
                href: "/user",
                icon: Home,
            },

            {
                label: "My Vehicles",
                href: "/user",
                icon: Car,
            },
        ],
    };

    return (

        <aside

            className={`

                fixed
                top-0
                left-0

                h-screen

                w-72

                bg-white
                dark:bg-zinc-950

                border-r

                border-zinc-200
                dark:border-zinc-800

                p-6

                z-50

                transition-transform
                duration-300

                ${mobileOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                }

            `}
        >

            <div className="mb-10">

                <h1
                    className="

                        text-3xl
                        font-black

                        text-black
                        dark:text-white

                    "
                >

                    🚦 SmartTow

                </h1>

                <p
                    className="

                        text-zinc-500
                        dark:text-zinc-400

                        mt-2

                    "
                >

                    Governance Platform

                </p>

            </div>

            <nav className="space-y-3">

                {links[role].map((item, index) => {

                    const Icon = item.icon;

                    return (

                        <Link
                            key={index}
                            href={item.href}
                        >

                            <div
                                className="

                                    flex
                                    items-center
                                    gap-4

                                    p-4

                                    rounded-2xl

                                    text-zinc-700
                                    dark:text-zinc-300

                                    hover:bg-zinc-100
                                    dark:hover:bg-zinc-900

                                    transition-all

                                    cursor-pointer

                                "
                            >

                                <Icon size={22} />

                                <span className="font-medium">

                                    {item.label}

                                </span>

                            </div>

                        </Link>

                    );
                })}

            </nav>

        </aside>
    );
}