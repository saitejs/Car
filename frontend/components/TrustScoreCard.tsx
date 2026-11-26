type Props = {
    trustScore: any;
};

const getScoreColor = (score: number) => {

    if (score >= 90)
        return "text-green-600";

    if (score >= 70)
        return "text-yellow-600";

    return "text-red-600";
};

const getScoreLabel = (score: number) => {

    if (score >= 90)
        return "🟢 Platinum Driver";

    if (score >= 75)
        return "🔵 Trusted Driver";

    if (score >= 50)
        return "🟡 Risky Driver";

    return "🔴 High Risk Driver";
};

const TrustScoreCard = ({
    trustScore,
}: Props) => {

    if (!trustScore)
        return null;

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

            <h2 className="text-2xl font-bold mb-4 text-black">
                📊 Trust Score
            </h2>

            <div className="flex items-center gap-4">

                <div
                    className={`text-6xl font-bold ${getScoreColor(
                        trustScore.score
                    )}`}
                >
                    {trustScore.score}
                </div>

                <div>

                    <p className="text-lg font-semibold text-black">
                        {getScoreLabel(
                            trustScore.score
                        )}
                    </p>

                    <p className="text-gray-500">
                        Based on driving &
                        governance behavior
                    </p>

                    <div className="mt-4 w-full bg-gray-200 rounded-full h-4">

                        <div
                            className={`h-4 rounded-full ${trustScore.score >= 90
                                ? "bg-green-500"
                                : trustScore.score >= 75
                                    ? "bg-blue-500"
                                    : trustScore.score >= 50
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                }`}
                            style={{
                                width: `${Math.min(
                                    trustScore.score,
                                    100
                                )}%`,
                            }}
                        />

                    </div>

                    <p className="text-sm text-gray-500 mt-2">

                        {trustScore.score >= 90 &&
                            "Excellent mobility governance behavior."}

                        {trustScore.score >= 75 &&
                            trustScore.score < 90 &&
                            "Generally responsible driving behavior."}

                        {trustScore.score >= 50 &&
                            trustScore.score < 75 &&
                            "Moderate driving risk detected."}

                        {trustScore.score < 50 &&
                            "High-risk driving behavior detected."}

                    </p>

                </div>

            </div>

            {/* SCORE EVENTS */}

            <div className="mt-6">

                <h3 className="font-bold text-lg mb-3 text-black">
                    Recent Score Events
                </h3>

                <div className="space-y-3">

                    {trustScore.events
                        .slice(0, 5)
                        .map((event: any) => (

                            <div
                                key={event.id}
                                className="flex justify-between bg-gray-100 p-3 rounded-xl"
                            >

                                <div>

                                    <p className="font-semibold text-black">
                                        {event.reason}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            event.createdAt
                                        ).toLocaleString()}
                                    </p>

                                </div>

                                <div
                                    className={`font-bold ${event.points > 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >

                                    {event.points > 0
                                        ? "+"
                                        : ""}

                                    {event.points}

                                </div>

                            </div>

                        ))}

                </div>

            </div>

        </div>
    );
};

export default TrustScoreCard;