type Props = {
    streakData: any;
};

const StreakCard = ({
    streakData,
}: Props) => {

    if (!streakData)
        return null;

    return (

        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-lg mb-6">

            <h2 className="text-2xl font-bold mb-4">
                🔥 Safe Driving Streak
            </h2>

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-5xl font-bold">
                        {streakData.streakDays}
                    </p>

                    <p className="text-lg">
                        Days Safe Driving
                    </p>

                </div>

                <div className="text-right">

                    <p className="text-xl font-semibold">
                        {streakData.level}
                    </p>

                    <p className="text-sm opacity-90 mt-2">
                        Keep maintaining clean driving behavior.
                    </p>

                </div>

            </div>

        </div>
    );
};

export default StreakCard;