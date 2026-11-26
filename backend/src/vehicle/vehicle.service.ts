import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as QRCode from 'qrcode';
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class VehicleService {
    constructor(private prisma: PrismaService) { }

    // ✅ Get all vehicles
    async getAllVehicles() {
        return this.prisma.vehicle.findMany({

            include: {
                user: true,
            },

        });
    }

    async getVehicleCount() {
        return this.prisma.vehicle.count();
    }
    async getUserVehicles(userId: number) {
        return this.prisma.vehicle.findMany({
            where: { userId },
        });
    }

    // ✅ Create vehicle (basic - used in dashboard)
    async createVehicle(data: { numberPlate: string; phone: string }) {
        // 1. Find or create user
        let user = await this.prisma.user.findUnique({
            where: { phone: data.phone },
        });

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email: "default@email.com", // ✅ REQUIRED (temporary fix)
                    phone: data.phone,
                },
            });
        }

        // 2. Generate QR
        const qr = await QRCode.toDataURL(
            `http://localhost:3000/vehicle/${data.numberPlate}`
        );

        // 3. Create vehicle (use dummy values for required fields)
        const vehicle = await this.prisma.vehicle.create({
            data: {
                numberPlate: data.numberPlate,
                brand: "Unknown",
                model: "Unknown",
                year: "2024",
                likes: "N/A",
                dislikes: "N/A",
                userId: user.id,
                qrCode: qr,
            },
        });

        return vehicle;
    }

    // ✅ Call Owner (FIXED: no relation used)
    async callOwner(data: { numberPlate: string; callerNumber: string }) {
        // 1. Find vehicle
        const vehicle = await this.prisma.vehicle.findUnique({
            where: { numberPlate: data.numberPlate },
        });

        if (!vehicle) {
            throw new Error("Vehicle not found");
        }

        // 2. Find user manually
        const user = await this.prisma.user.findUnique({
            where: { id: vehicle.userId },
        });

        const ownerNumber = user?.phone;

        console.log(`Calling ${ownerNumber} from ${data.callerNumber}`);

        return {
            message: "Call Initiated",
        };
    }

    // ✅ Get single vehicle (no user info exposed)
    async getVehicleByPlate(numberPlate: string) {
        return this.prisma.vehicle.findUnique({
            where: { numberPlate },

            include: {
                user: true,
            },
        });
    }

    // ✅ Delete vehicle
    async deleteVehicle(id: number) {
        return this.prisma.vehicle.delete({
            where: { id },
        });
    }

    // ✅ Full registration (NEW SYSTEM)
    async registerVehicle(data: any) {
        // CHECK USER EXISTS

        const user =
            await this.prisma.user.findUnique({

                where: {
                    id: Number(data.userId)
                }
            });

        if (!user) {

            throw new Error(
                "User not found"
            );
        }
        if (!data.numberPlate) {

            throw new Error(
                "Vehicle number required"
            );
        }

        // 2. Generate QR
        const qr = await QRCode.toDataURL(
            `http://localhost:3000/vehicle/${data.numberPlate}`
        );

        // 3. Create vehicle with full data
        const vehicle = await this.prisma.vehicle.create({
            data: {
                numberPlate: data.numberPlate,
                brand: data.brand,
                model: data.model,
                year: data.year,
                likes: data.likes,
                dislikes: data.dislikes,
                userId: user.id,
                qrCode: qr,
            },
        });

        return vehicle;
    }

    async getVehicleEvents(vehicleNumber: string) {

        return this.prisma.vehicleEvent.findMany({

            where: {
                vehicleNumber,
            },

            orderBy: {
                createdAt: 'desc',
            },

        });
    }
    async addVehicle(data: any) {

        const qr = await QRCode.toDataURL(
            `http://localhost:3000/vehicle/${data.numberPlate}`
        );

        return this.prisma.vehicle.create({

            data: {
                numberPlate: data.numberPlate,
                brand: data.brand,
                model: data.model,
                year: data.year,
                likes: data.likes || "",
                dislikes: data.dislikes || "",
                userId: data.userId,
                qrCode: qr,
            },

        });
    }

    async transferVehicle(data: any) {

        // FIND VEHICLE
        const vehicle = await this.prisma.vehicle.findUnique({
            where: {
                numberPlate: data.numberPlate,
            },
        });

        if (!vehicle) {
            throw new Error("Vehicle not found");
        }
        // CHECK UNPAID FINES

        const unpaidFines = await this.prisma.fine.findMany({

            where: {
                vehicleNumber: data.numberPlate,
                isPaid: false,
            },

        });

        if (unpaidFines.length > 0) {

            throw new Error(
                "Vehicle has unpaid fines. Transfer blocked."
            );
        }

        // FIND NEW OWNER
        let newOwner = await this.prisma.user.findUnique({
            where: {
                phone: data.phone,
            },
        });

        // CREATE USER IF NOT EXISTS
        if (!newOwner) {

            newOwner = await this.prisma.user.create({
                data: {
                    phone: data.phone,
                    email: `${data.phone}@gmail.com`,
                },
            });
        }

        // SAVE HISTORY
        await this.prisma.vehicleOwnershipHistory.create({
            data: {
                vehicleNumber: data.numberPlate,

                oldUserId: vehicle.userId,
                newUserId: newOwner.id,
            },
        });

        // TRANSFER OWNERSHIP
        const updatedVehicle =
            await this.prisma.vehicle.update({

                where: {
                    numberPlate: data.numberPlate,
                },

                data: {
                    userId: newOwner.id,
                },
            });

        // CREATE EVENT
        await this.prisma.vehicleEvent.create({
            data: {
                vehicleNumber: data.numberPlate,

                type: "TRANSFER",

                title: "Ownership Transferred",

                description: `
Vehicle transferred to new owner
Phone: ${data.phone}
            `,
            },
        });

        return updatedVehicle;
    }
}