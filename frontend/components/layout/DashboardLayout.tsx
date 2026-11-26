"use client";

import {

    Menu,

} from "lucide-react";

import {

    useState,

} from "react";

import AppSidebar
    from "./AppSidebar";

type Props = {

    children: React.ReactNode;

    role:
    | "admin"
    | "officer"
    | "user";
};

export default function DashboardLayout({

    children,

    role,

}: Props) {

    const [mobileOpen, setMobileOpen] =
        useState(false);

    return (

        <div
            className="

                min-h-screen

                bg-zinc-100
                dark:bg-black

            "
        >

            <AppSidebar

                role={role}

                mobileOpen={mobileOpen}

            />

            {/* TOPBAR */}
            <div
                className="

                    lg:ml-72

                    border-b

                    border-zinc-200
                    dark:border-zinc-800

                    bg-white
                    dark:bg-zinc-950

                    sticky
                    top-0

                    z-40

                    transition-colors

                "
            >

                <div
                    className="

                        flex
                        items-center
                        justify-between

                        p-4

                    "
                >

                    <button

                        onClick={() =>
                            setMobileOpen(
                                !mobileOpen
                            )
                        }

                        className="

                            lg:hidden

                            text-black
                            dark:text-white

                        "
                    >

                        <Menu size={28} />

                    </button>

                    <div
                        className="

                            text-lg
                            font-semibold

                            text-black
                            dark:text-white

                        "
                    >

                        Smart Governance Dashboard

                    </div>

                </div>

            </div>

            {/* MAIN */}
            <main
                className="

                    lg:ml-72

                    p-4
                    md:p-8

                "
            >

                {children}

            </main>

        </div>
    );
}