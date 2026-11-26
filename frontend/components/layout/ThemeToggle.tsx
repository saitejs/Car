"use client";

import { Moon, Sun } from "lucide-react";

import { useEffect, useState } from "react";

const ThemeToggle = () => {

    const [dark, setDark] =
        useState(false);

    useEffect(() => {

        const savedTheme =
            localStorage.getItem("theme");

        if (savedTheme === "dark") {

            document.documentElement
                .classList.add("dark");

            setDark(true);
        }

    }, []);

    const toggleTheme = () => {

        if (dark) {

            document.documentElement
                .classList.remove("dark");

            localStorage.setItem(
                "theme",
                "light"
            );

        } else {

            document.documentElement
                .classList.add("dark");

            localStorage.setItem(
                "theme",
                "dark"
            );
        }

        setDark(!dark);
    };

    return (

        <button
            onClick={toggleTheme}
            className="
                w-12 h-12
                rounded-2xl
                bg-zinc-100
                dark:bg-zinc-800
                flex items-center justify-center
                transition
            "
        >

            {dark ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}

        </button>
    );
};

export default ThemeToggle;