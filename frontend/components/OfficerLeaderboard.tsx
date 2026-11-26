type Props = {
    officers: any[];
};

const OfficerLeaderboard = ({
    officers,
}: Props) => {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

            <h2 className="text-2xl font-bold mb-4 text-black">
                👮 Officer Reputation Leaderboard
            </h2>

            <div className="space-y-4">

                {officers.map((officer, index) => (

                    <div
                        key={officer.id}
                        className="flex justify-between items-center bg-gray-100 p-4 rounded-xl"
                    >

                        <div>

                            <p className="font-bold text-black">
                                #{index + 1} {officer.name}
                            </p>

                            <p className="text-gray-500 text-sm">
                                {officer.designation}
                            </p>

                        </div>

                        <div className="text-right">

                            <p className="font-bold text-lg text-green-600">
                                {officer.reputationScore}
                            </p>

                            <p className="text-sm text-gray-500">
                                Reputation Score
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default OfficerLeaderboard;