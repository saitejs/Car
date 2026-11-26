type Props = {
    rewardStatus: any;
};

const RewardBadgeCard = ({
    rewardStatus,
}: Props) => {

    if (!rewardStatus)
        return null;

    return (

        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 shadow-lg mb-6">

            <h2 className="text-2xl font-bold mb-4">
                🏆 Driver Rewards
            </h2>

            {rewardStatus.eligible ? (

                <div>

                    <p className="text-3xl font-bold mb-2">
                        {rewardStatus.badge}
                    </p>

                    <p className="text-lg">
                        Congratulations!
                    </p>

                    <p>
                        You qualify as a safe &
                        responsible driver.
                    </p>

                </div>

            ) : (

                <div>

                    <p className="text-xl font-semibold mb-2">
                        Keep Driving Safely 🚗
                    </p>

                    <p>
                        Maintain high trust score
                        to unlock rewards.
                    </p>

                </div>

            )}

        </div>
    );
};

export default RewardBadgeCard;