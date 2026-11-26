"use client";

import { motion } from "framer-motion";

type Props = {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
};

const StatCard = ({
    title,
    value,
    icon,
    color = "from-zinc-900 to-zinc-700",
}: Props) => {

    return (

        <motion.div

            whileHover={{
                y: -4,
            }}

            transition={{
                duration: 0.2,
            }}

            className={`bg-gradient-to-br ${color} text-white rounded-3xl p-6 shadow-lg`}
        >

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-zinc-300 text-sm">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {value}
                    </h2>

                </div>

                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                    {icon}
                </div>

            </div>

        </motion.div>
    );
};

export default StatCard;