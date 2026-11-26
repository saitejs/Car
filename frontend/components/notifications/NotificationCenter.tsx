"use client";

import {

    Bell,

} from "lucide-react";

import {

    useEffect,
    useState,

} from "react";

import axios from "axios";

import {

    motion,
    AnimatePresence,

} from "framer-motion";

type Props = {

    userId: number;
};

export default function NotificationCenter({
    userId,
}: Props) {

    const [open, setOpen] =
        useState(false);

    const [notifications, setNotifications] =
        useState<any[]>([]);

    const fetchNotifications = async () => {

        try {

            const res = await axios.get(

                `http://127.0.0.1:3001/message/${userId}`

            );

            setNotifications(res.data);

        } catch (err) {

            console.log(err);
        }
    };

    useEffect(() => {

        fetchNotifications();

        const interval = setInterval(
            fetchNotifications,
            5000
        );

        return () =>
            clearInterval(interval);

    }, []);

    const unreadCount =
        notifications.filter(
            (n) => !n.isRead
        ).length;

    return (

        <div className="relative">

            {/* BELL */}
            <button

                onClick={() =>
                    setOpen(!open)
                }

                className="

                    relative

                    text-black
                    dark:text-white

                "
            >

                <Bell size={28} />

                {unreadCount > 0 && (

                    <span
                        className="

                            absolute

                            -top-2
                            -right-2

                            bg-red-500

                            text-white

                            text-xs

                            rounded-full

                            h-5
                            w-5

                            flex
                            items-center
                            justify-center

                        "
                    >

                        {unreadCount}

                    </span>

                )}

            </button>

            {/* DRAWER */}
            <AnimatePresence>

                {open && (

                    <motion.div

                        initial={{
                            opacity: 0,
                            y: -20,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        exit={{
                            opacity: 0,
                            y: -20,
                        }}

                        className="

                            absolute
                            right-0
                            mt-4

                            w-[380px]

                            max-h-[500px]
                            overflow-y-auto

                            bg-white
                            dark:bg-zinc-900

                            border

                            border-zinc-200
                            dark:border-zinc-800

                            rounded-3xl

                            shadow-2xl

                            z-50

                            p-4

                        "
                    >

                        <h2
                            className="

                                text-2xl
                                font-bold

                                text-black
                                dark:text-white

                                mb-4

                            "
                        >

                            🔔 Notifications

                        </h2>

                        <div className="space-y-3">

                            {notifications.length === 0 && (

                                <p
                                    className="

                                        text-zinc-500
                                        dark:text-zinc-400

                                    "
                                >

                                    No notifications yet

                                </p>

                            )}

                            {notifications.map(
                                (
                                    notification,
                                    index
                                ) => (

                                    <motion.div

                                        key={index}

                                        initial={{
                                            opacity: 0,
                                            x: 20,
                                        }}

                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}

                                        className="

                                            bg-zinc-100
                                            dark:bg-zinc-800

                                            rounded-2xl

                                            p-4

                                            transition-colors

                                        "
                                    >

                                        <p
                                            className="

                                                text-black
                                                dark:text-white

                                                font-medium

                                            "
                                        >

                                            {
                                                notification.content
                                            }

                                        </p>

                                        <p
                                            className="

                                                text-sm

                                                text-zinc-500
                                                dark:text-zinc-400

                                                mt-2

                                            "
                                        >

                                            {

                                                new Date(
                                                    notification.createdAt
                                                ).toLocaleString()

                                            }

                                        </p>

                                    </motion.div>
                                )
                            )}

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>
    );
}