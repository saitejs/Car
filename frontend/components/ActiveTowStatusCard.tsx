type Props = {
    towData: any;
};

const towYardCoordinates: Record<
    string,
    [number, number]
> = {

    "Surat Traffic Yard":
        [21.1700, 72.8300],

    "Adajan Tow Yard":
        [21.1945, 72.7933],

};

const ActiveTowStatusCard = ({
    towData,
}: Props) => {

    if (!towData?.isTowed) {
        return null;
    }

    const tow = towData.towRecord;

    const openDirections = () => {

        const coords =
            towYardCoordinates[
            tow.impoundYard
            ];

        if (!coords) {

            alert(
                "Tow yard location unavailable"
            );

            return;
        }

        const [lat, lng] = coords;

        const mapsUrl =

            `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

        window.open(
            mapsUrl,
            "_blank"
        );
    };

    return (

        <div
            className=" bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-3xl p-6 mt-4 shadow-md transition-colors"
        >

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-6">

                <div className="text-4xl">
                    🚛
                </div>

                <div>

                    <h2
                        className=" text-2xl font-bold text-red-700 dark:text-red-400"
                    >

                        Vehicle Currently Impounded

                    </h2>

                    <p
                        className=" text-sm text-red-500 dark:text-red-300 mt-1"
                    >

                        Immediate action may be required

                    </p>

                </div>

            </div>

            {/* TOW DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                    <p
                        className=" text-sm text-zinc-500 dark:text-zinc-400"
                    >

                        Reason

                    </p>

                    <p
                        className=" font-semibold text-black dark:text-white mt-1"
                    >

                        {tow.reason}

                    </p>

                </div>

                <div>

                    <p
                        className=" text-sm text-zinc-500 dark:text-zinc-400"
                    >

                        Pickup Location

                    </p>

                    <p
                        className=" font-semibold text-black dark:text-white mt-1"
                    >

                        {tow.pickupLocation}

                    </p>

                </div>

                <div>

                    <p
                        className=" text-sm text-zinc-500 dark:text-zinc-400"
                    >

                        Impound Yard

                    </p>

                    <p
                        className=" font-semibold text-black dark:text-white mt-1"
                    >

                        {tow.impoundYard}

                    </p>

                </div>

                <div>

                    <p
                        className=" text-sm text-zinc-500 dark:text-zinc-400"
                    >

                        Tow Date

                    </p>

                    <p
                        className=" font-semibold text-black dark:text-white mt-1"
                    >

                        {new Date(
                            tow.createdAt
                        ).toLocaleString()}

                    </p>

                </div>

            </div>

            {/* OFFICER DETAILS */}
            <div
                className="mt-6 border-t border-red-200 dark:border-red-900 pt-6"
            >

                <h3
                    className=" text-lg font-bold text-black dark:text-white mb-4"
                >

                    👮 Officer Details

                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div>

                        <p
                            className=" text-sm text-zinc-500 dark:text-zinc-400"
                        >

                            Officer

                        </p>

                        <p
                            className=" font-medium text-black dark:text-white mt-1"
                        >

                            {tow.officer.name}

                        </p>

                    </div>

                    <div>

                        <p
                            className=" text-sm text-zinc-500 dark:text-zinc-400"
                        >

                            Designation

                        </p>

                        <p
                            className=" font-medium text-black dark:text-white mt-1"
                        >

                            {tow.officer.designation}

                        </p>

                    </div>

                    <div>

                        <p
                            className=" text-sm text-zinc-500 dark:text-zinc-400"
                        >

                            Police Station

                        </p>

                        <p
                            className=" font-medium text-black dark:text-white mt-1"
                        >

                            {tow.officer.policeStation}

                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-6">

                <button

                    onClick={openDirections}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-semibold transition-all shadow-md"

                >

                    🗺️ Get Directions
                </button>

            </div>

            {/* NOTES */}
            {tow.notes && (

                <div
                    className=" mt-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4"
                >

                    <p
                        className="text-sm text-zinc-500 dark:text-zinc-400 mb-2"
                    >

                        Notes

                    </p>

                    <p
                        className="text-black dark:text-white"
                    >

                        {tow.notes}

                    </p>

                </div>

            )}

        </div>
    );
};

export default ActiveTowStatusCard;