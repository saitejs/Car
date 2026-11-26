"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

type Props = {
    trustScore: any;
};

const TrustScoreChart = ({
    trustScore,
}: Props) => {

    if (!trustScore)
        return null;

    // SORT EVENTS OLDEST → NEWEST
    const sortedEvents =
        [...trustScore.events].reverse();

    let runningScore = 100;

    const chartData =
        sortedEvents.map((event) => {

            runningScore += event.points;

            return {

                date: new Date(
                    event.createdAt
                ).toLocaleDateString(),

                score: runningScore,

                reason: event.reason,
            };
        });

    // ADD CURRENT SCORE
    chartData.push({

        date: "Now",

        score: trustScore.score,

        reason: "Current Score",
    });

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

            <h2 className="text-2xl font-bold mb-4 text-black">
                📈 Trust Score Trend
            </h2>

            <div className="h-[300px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={chartData}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="date" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="score"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default TrustScoreChart;