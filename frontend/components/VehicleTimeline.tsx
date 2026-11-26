type Props = {
    events: any[];
};

const getEventIcon = (type: string) => {

    switch (type) {

        case "TOW":
            return "🚛";

        case "RELEASE":
        case "AUTO_RELEASE":
            return "🔓";

        case "FINE":
            return "🚨";

        case "TRANSFER":
            return "🔄";

        case "PAYMENT":
            return "💳";

        default:
            return "📌";
    }
};

const getEventColor = (type: string) => {

    switch (type) {

        case "TOW":
            return "border-red-500";

        case "RELEASE":
        case "AUTO_RELEASE":
            return "border-green-500";

        case "FINE":
            return "border-yellow-500";

        case "TRANSFER":
            return "border-blue-500";

        default:
            return "border-gray-400";
    }
};

const VehicleTimeline = ({ events }: Props) => {

    if (!events || events.length === 0) {

        return null;
    }

    return (

        <div className="mt-6">

            <h2 className="text-lg font-bold mb-4">
                📜 Vehicle Timeline
            </h2>

            <div className="relative border-l-2 border-gray-300 ml-3">

                {events.map((event, index) => (

                    <div
                        key={index}
                        className="mb-6 ml-6 relative"
                    >

                        {/* Timeline Dot */}
                        <div
                            className={`absolute -left-[34px] top-1 w-5 h-5 rounded-full bg-white border-4 ${getEventColor(event.type)}`}
                        />

                        <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">

                            <div className="flex items-center gap-2 mb-2">

                                <span className="text-xl">
                                    {getEventIcon(event.type)}
                                </span>

                                <h3 className="font-bold">
                                    {event.title}
                                </h3>

                            </div>

                            <p className="text-gray-700 whitespace-pre-line">
                                {event.description}
                            </p>

                            <p className="text-xs text-gray-500 mt-3">
                                {new Date(
                                    event.createdAt
                                ).toLocaleString()}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default VehicleTimeline;