type Props = {
    status: string;
};

const VehicleStatusBadge = ({ status }: Props) => {

    switch (status) {

        case "ACTIVE":

            return (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🟢 ACTIVE
                </span>
            );

        case "TOWED":

            return (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🔴 TOWED
                </span>
            );

        case "TRANSFER_PENDING":

            return (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🟡 TRANSFER PENDING
                </span>
            );

        default:

            return (
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ⚪ UNKNOWN
                </span>
            );
    }
};

export default VehicleStatusBadge;