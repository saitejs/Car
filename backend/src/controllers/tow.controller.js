const prisma = require("../lib/prisma");

const towVehicle = async (req, res) => {
    try {
        const {
            numberPlate,
            reason,
            pickupLocation,
            impoundYard,
            officerId,
            notes,
        } = req.body;

        // 1. Find Vehicle
        const vehicle = await prisma.vehicle.findUnique({
            where: {
                numberPlate,
            },
        });

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }

        // 2. Check if already towed
        if (vehicle.status === "TOWED") {
            return res.status(400).json({
                success: false,
                message: "Vehicle already towed",
            });
        }

        // 3. Find Officer
        const officer = await prisma.officer.findUnique({
            where: {
                id: officerId,
            },
        });

        if (!officer) {
            return res.status(404).json({
                success: false,
                message: "Officer not found",
            });
        }

        // 4. Create Tow Record
        const towRecord = await prisma.towRecord.create({
            data: {
                vehicleId: vehicle.id,

                officerId: officer.id,

                reason,
                pickupLocation,
                impoundYard,

                notes,
            },
        });

        // 5. Update Vehicle Status
        await prisma.vehicle.update({
            where: {
                id: vehicle.id,
            },
            data: {
                status: "TOWED",
            },
        });

        // 6. Create Vehicle Event
        await prisma.vehicleEvent.create({
            data: {
                vehicleId: vehicle.id,

                vehicleNumber: vehicle.numberPlate,

                type: "TOW",

                title: "Vehicle Towed",

                description: `Vehicle was towed from ${pickupLocation} and moved to ${impoundYard}`,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Vehicle towed successfully",
            towRecord,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    towVehicle,
};