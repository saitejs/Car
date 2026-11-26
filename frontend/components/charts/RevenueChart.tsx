"use client";

import {

    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,

} from "recharts";

type Props = {

    data: {
        day: string;
        revenue: number;
    }[];
};

export default function RevenueChart({
    data,
}: Props) {

    return (

        <div className="

            bg-white
            dark:bg-zinc-900

            rounded-3xl

            shadow-md

            p-6

            transition-colors

        ">

            <h2 className="

                text-3xl
                font-bold

                text-black
                dark:text-white

                mb-6

            ">

                📈 Revenue Analytics

            </h2>

            <div className="h-[350px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <AreaChart data={data}>

                        <defs>

                            <linearGradient
                                id="revenueGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#10b981"
                                    stopOpacity={0.8}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#10b981"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <XAxis
                            dataKey="day"
                            stroke="#71717a"
                        />

                        <YAxis
                            stroke="#71717a"
                        />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10b981"
                            fillOpacity={1}
                            fill="url(#revenueGradient)"
                            strokeWidth={4}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}