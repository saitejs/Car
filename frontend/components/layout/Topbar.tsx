import ThemeToggle from "./ThemeToggle";

import NotificationCenter
    from "../notifications/NotificationCenter";

type Props = {

    userId: number;
};

const Topbar = ({
    userId,
}: Props) => {

    return (

        <div
            className="

                h-20

                bg-white
                dark:bg-zinc-900

                border-b

                border-zinc-200
                dark:border-zinc-800

                flex
                items-center
                justify-between

                px-8

                rounded-2xl

                shadow-sm

                transition-colors

            "
        >

            {/* LEFT */}
            <div>

                <h2
                    className="

                        text-2xl
                        font-bold

                        text-black
                        dark:text-white

                    "
                >

                    Smart Mobility Platform

                </h2>

                <p
                    className="

                        text-zinc-500
                        dark:text-zinc-400

                    "
                >

                    Governance • Safety • Reputation

                </p>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

                <NotificationCenter
                    userId={userId}
                />

                <ThemeToggle />

                <div
                    className="

                        w-10
                        h-10

                        rounded-full

                        bg-zinc-200
                        dark:bg-zinc-800

                        text-black
                        dark:text-white

                        flex
                        items-center
                        justify-center

                        font-bold

                    "
                >

                    S

                </div>

            </div>

        </div>
    );
};

export default Topbar;