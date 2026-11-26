"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import ActiveTowStatusCard from "@/components/ActiveTowStatusCard";
import VehicleTimeline from "@/components/VehicleTimeline";
import VehicleStatusBadge from "@/components/VehicleStatusBadge";
import toast from "react-hot-toast";
import TrustScoreCard from "@/components/TrustScoreCard";
import TrustScoreChart from "@/components/TrustScoreChart";
import RewardBadgeCard from "@/components/RewardBadgeCard";
import StreakCard from "@/components/StreakCard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import NotificationCenter from "@/components/notifications/NotificationCenter";


import DashboardShell from "@/components/layout/DashboardShell";
import StatCard from "@/components/ui/StatCard";

import { Button } from "@/components/ui/button";

import {
    Shield,
    AlertTriangle,
    Flame,
    Trophy,
} from "lucide-react";
import GlassAlertCard from "@/components/ui/GlassAlertCard";
import PremiumTable from "@/components/ui/PremiumTable";
import { socket } from "@/src/contact-owner/lib/socket";


export default function UserPage() {

    const router = useRouter();

    const [vehicles, setVehicles] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [previousMessageCount, setPreviousMessageCount] = useState(0);
    const [user, setUser] = useState<any>(null);

    const [activeTab, setActiveTab] = useState("profile");

    const [loading, setLoading] = useState(true);

    const [fines, setFines] = useState<any[]>([]);

    const [events, setEvents] = useState<any[]>([]);

    const [transferPhone, setTransferPhone] = useState("");

    const [openTransfer, setOpenTransfer] = useState<number | null>(null);
    const [contacts, setContacts] = useState<any[]>([]);

    const [contactPhone, setContactPhone] = useState("");

    const [relation, setRelation] = useState("");

    const [trustScore, setTrustScore] = useState<any>(null);

    const [rewardStatus, setRewardStatus] = useState<any>(null);
    const [streakData, setStreakData] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [fineSearch, setFineSearch] = useState("");
    const [fineFilter, setFineFilter] = useState("ALL");
    const [currentFinePage, setCurrentFinePage] = useState(1);

    const [messageSearch, setMessageSearch] = useState("");

    const [messageFilter, setMessageFilter] = useState("ALL");

    const [currentMessagePage, setCurrentMessagePage] = useState(1);

    const [ctoVehicleNumber, setCtoVehicleNumber] = useState("");

    const [ctoMessage, setCtoMessage] = useState("");

    const [ctoRemaining, setCtoRemaining] = useState(2);

    const [ctoInbox, setCtoInbox] = useState<any[]>([]);

    const [ctoSearch, setCtoSearch] = useState("");

    const [ctoFilter, setCtoFilter] = useState("ALL");

    const [currentCtoPage, setCurrentCtoPage] = useState(1);

    const ctoPerPage = 5;

    const messagesPerPage = 5;

    const finesPerPage = 5;

    // 🚛 Tow Status Map
    const [towStatusMap, setTowStatusMap] = useState<any>({});

    // 🔔 Unread messages count
    const unreadCount = messages.filter((m) => !m.isRead).length;

    // 🚛 Fetch Tow Status
    const fetchTowStatus = async (numberPlate: string) => {

        try {

            const response = await axios.get(
                `http://127.0.0.1:3001/tow/active/${numberPlate}`
            );

            setTowStatusMap((prev: any) => ({
                ...prev,
                [numberPlate]: response.data,
            }));

        } catch (error: any) {

            // Vehicle not towed OR no active tow
            setTowStatusMap((prev: any) => ({
                ...prev,
                [numberPlate]: {
                    isTowed: false,
                },
            }));

        }
    };
    // 🔥 LOAD USER + DATA
    const loadData = async () => {

        try {

            const storedUser = JSON.parse(
                typeof window !== "undefined"
                    ? localStorage.getItem("user") || "null"
                    : "null"
            );

            if (storedUser?.id) {

                setUser(storedUser);

                // FETCH VEHICLES, MESSAGES, FINES
                const [vehicleRes, messageRes, fineRes, contactRes, trustScoreRes, rewardRes, streakRes, ctoInboxRes] =
                    await Promise.all([

                        axios.get(
                            `http://127.0.0.1:3001/vehicle/user/${storedUser.id}`
                        ),

                        axios.get(
                            `http://127.0.0.1:3001/message/${storedUser.id}`
                        ),

                        axios.get(
                            `http://127.0.0.1:3001/fine/user/${storedUser.id}`
                        ),
                        axios.get(
                            `http://127.0.0.1:3001/emergency-contact/${storedUser.id}`
                        ),
                        axios.get(
                            `http://127.0.0.1:3001/trust-score/user/${storedUser.id}`
                        ),
                        axios.get(
                            `http://127.0.0.1:3001/trust-score/reward/${storedUser.id}`
                        ),
                        axios.get(
                            `http://127.0.0.1:3001/streak/${storedUser.id}`
                        ),
                        axios.get(
                            `http://127.0.0.1:3001/contact-owner/inbox/${storedUser.id}`
                        ),

                    ]);

                // setVehicles(vehicleRes.data);

                // setFines(fineRes.data);

                // setContacts(contactRes.data);
                // setTrustScore(trustScoreRes.data);

                // setRewardStatus(rewardRes.data);
                // setStreakData(streakRes.data);

                // For the DEBUG Purpose 
                // const vehicleRes =
                //     await axios.get(
                //         `http://127.0.0.1:3001/vehicle/user/${storedUser.id}`
                //     );

                // console.log("vehicle ok");

                // const messageRes =
                //     await axios.get(
                //         `http://127.0.0.1:3001/message/${storedUser.id}`
                //     );

                // console.log("message ok");

                // const fineRes =
                //     await axios.get(
                //         `http://127.0.0.1:3001/fine/user/${storedUser.id}`
                //     );

                // console.log("fine ok");

                // const contactRes =
                //     await axios.get(
                //         `http://127.0.0.1:3001/emergency-contact/${storedUser.id}`
                //     );

                // console.log("Contact ok");

                // const trustScoreRes =
                //     await axios.get(
                //         `http://127.0.0.1:3001/trust-score/user/${storedUser.id}`
                //     );

                // console.log("trustScore ok");

                // const rewardRes =
                //     await axios.get(
                //         `http://127.0.0.1:3001/trust-score/reward/${storedUser.id}`
                //     );

                // console.log("reward ok");

                // const streakRes =
                //     await axios.get(
                //         `http://127.0.0.1:3001/streak/${storedUser.id}`
                //     );

                console.log("streak ok");
                console.log(
                    "STREAK RESPONSE:",
                    streakRes.data
                );


                setVehicles(vehicleRes.data);
                setMessages(messageRes.data)

                setFines(fineRes.data);

                setContacts(contactRes.data);
                setTrustScore(trustScoreRes.data);

                setRewardStatus(rewardRes.data);
                setStreakData(streakRes.data);
                setCtoInbox(ctoInboxRes.data);



                // 🚛 FETCH TOW STATUS FOR ALL VEHICLES
                for (const vehicle of vehicleRes.data) {

                    await fetchTowStatus(vehicle.numberPlate);

                }

                const msgs = messageRes.data.map((m: any) => ({
                    ...m,
                    isRead: false,
                }));

                setMessages(msgs);
                // 🔔 SHOW LIVE NOTIFICATION
                if (
                    previousMessageCount > 0 &&
                    msgs.length > previousMessageCount
                ) {

                    const latestMessage =
                        msgs[0];

                    toast.success(
                        latestMessage.content
                    );
                }

                setPreviousMessageCount(
                    msgs.length
                );
                // FETCH EVENTS FOR ALL VEHICLES
                const allEvents =
                    await Promise.all(

                        vehicleRes.data.map(
                            async (vehicle: any) => {

                                const eventRes =
                                    await axios.get(
                                        `http://127.0.0.1:3001/vehicle/events/${vehicle.numberPlate}`
                                    );

                                return {

                                    vehicleNumber: vehicle.numberPlate,

                                    events: eventRes.data,
                                };
                            }
                        )
                    );

                setEvents(allEvents);
            }

        } catch (err) {

            console.error(
                "Error loading user data",
                err
            );

        } finally {

            setLoading(false);

        }
    };



    // 🔔 REAL-TIME AUTO REFRESH
    useEffect(() => {

        if (!user?.id) return;

        const eventName =
            `user_${user.id}`;

        const handler =
            (data: any) => {

                toast.success(
                    data.message
                );

                loadData();
            };

        socket.on(
            eventName,
            handler
        );

        return () => {

            socket.off(
                eventName,
                handler
            );
        };

    }, [user?.id]);

    useEffect(() => {

        loadData();

    }, []);

    // 🔥 Mark as read when opening messages tab
    useEffect(() => {

        if (activeTab === "messages") {

            setMessages((prev) =>
                prev.map((m) => ({ ...m, isRead: true }))
            );

        }

    }, [activeTab]);

    // 🛑 Loading state
    if (loading) {

        console.log(
            "Loading:",
            loading
        );

        console.log(
            "User:",
            user
        );

        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    // 🛑 No user found
    if (!user) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                No user found. Please login.
            </div>
        );
    }

    const filteredFines = fines.filter(
        (fine: any) => {

            const matchesSearch =
                fine.vehicleNumber
                    .toLowerCase()
                    .includes(
                        fineSearch.toLowerCase()
                    );

            const matchesFilter =

                fineFilter === "ALL"

                    ? true

                    : fineFilter === "PAID"

                        ? fine.isPaid

                        : !fine.isPaid;

            return (
                matchesSearch &&
                matchesFilter
            );
        }
    );

    const totalFinePages =
        Math.ceil(
            filteredFines.length /
            finesPerPage
        );

    const paginatedFines =
        filteredFines.slice(

            (currentFinePage - 1)
            * finesPerPage,

            currentFinePage
            * finesPerPage
        );

    const filteredMessages =
        messages.filter(
            (message: any) => {

                const search =
                    messageSearch.toLowerCase();

                const matchesSearch =

                    message.content
                        ?.toLowerCase()
                        .includes(search)

                    ||

                    message.vehicleNumber
                        ?.toLowerCase()
                        .includes(search);

                const matchesFilter =

                    messageFilter === "ALL"

                        ? true

                        : messageFilter === "READ"

                            ? message.isRead

                            : !message.isRead;

                return (
                    matchesSearch &&
                    matchesFilter
                );
            }
        );
    const totalMessagePages =
        Math.ceil(
            filteredMessages.length /
            messagesPerPage
        );

    const paginatedMessages =
        filteredMessages.slice(

            (currentMessagePage - 1)
            * messagesPerPage,

            currentMessagePage
            * messagesPerPage
        );


    const sendCtoMessage = async () => {

        try {

            const storedUser =
                JSON.parse(
                    localStorage.getItem("user") || "null"
                );

            const res =
                await axios.post(

                    "http://127.0.0.1:3001/contact-owner/send",

                    {

                        senderId:
                            storedUser.id,

                        vehicleNumber:
                            ctoVehicleNumber,

                        message:
                            ctoMessage,
                    }
                );

            toast.success(
                "Message sent successfully"
            );

            setCtoRemaining(
                res.data.remaining
            );

            setCtoVehicleNumber("");

            setCtoMessage("");

            loadData();

        } catch (err: any) {

            toast.error(

                err?.response?.data?.message ||

                "Failed to send message"
            );
        }
    };

    const filteredCto =
        ctoInbox.filter(
            (msg: any) => {

                const search =
                    ctoSearch.toLowerCase();

                const matchesSearch =

                    msg.vehicleNumber
                        ?.toLowerCase()
                        .includes(search)

                    ||

                    msg.message
                        ?.toLowerCase()
                        .includes(search);

                const matchesFilter =

                    ctoFilter === "ALL"

                        ? true

                        : ctoFilter === "READ"

                            ? msg.isRead

                            : !msg.isRead;

                return (
                    matchesSearch &&
                    matchesFilter
                );
            }
        );

    const totalCtoPages =
        Math.ceil(
            filteredCto.length /
            ctoPerPage
        );

    const paginatedCto =
        filteredCto.slice(

            (currentCtoPage - 1)
            * ctoPerPage,

            currentCtoPage
            * ctoPerPage
        );

    return (

        <DashboardLayout role="user">

            <DashboardShell
                userId={user.id}>

                <div className="space-y-8">

                    {/* PAGE HEADER */}
                    <div>

                        <h1 className="text-4xl font-bold text-black dark:text-white">
                            Welcome Back 👋
                        </h1>

                        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">
                            Monitor your mobility reputation,
                            safety and governance activity.
                        </p>

                    </div>

                    {/* ANALYTICS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <StatCard
                            title="Trust Score"
                            value={trustScore?.score || 0}
                            icon={<Shield size={28} />}
                            color="from-emerald-600 to-emerald-400"
                        />

                        <StatCard
                            title="Active Fines"
                            value={fines.length}
                            icon={<AlertTriangle size={28} />}
                            color="from-red-600 to-red-400"
                        />

                        <StatCard
                            title="Safe Driving Streak"
                            value={`${streakData?.streakDays || 0} Days`}
                            icon={<Flame size={28} />}
                            color="from-orange-500 to-red-500"
                        />

                        <StatCard
                            title="Rewards Earned"
                            value={rewardStatus?.eligible ? 1 : 0}
                            icon={<Trophy size={28} />}
                            color="from-yellow-500 to-amber-400"
                        />

                    </div>

                    {/* CHART + SIDE PANELS */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        <div className="xl:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-6">

                            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
                                📊 Trust Analytics
                            </h2>

                            <TrustScoreChart
                                trustScore={trustScore}
                            />

                        </div>

                        <div className="space-y-6">

                            <RewardBadgeCard
                                rewardStatus={rewardStatus}
                            />

                            <StreakCard
                                streakData={streakData}
                            />

                        </div>

                    </div>

                    {/* TABS */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md p-6 transition-colors">

                        <div className="flex flex-wrap gap-3 mb-8 border-b pb-4">

                            {[
                                "profile",
                                "vehicles",
                                "messages",
                                "fines",
                                "contacts",
                                "cto",
                            ].map((tab) => (

                                <Button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    variant={
                                        activeTab === tab
                                            ? "default"
                                            : "outline"
                                    }
                                    className="rounded-2xl capitalize"
                                >

                                    {tab === "messages" ? (

                                        <div className="flex items-center gap-2">

                                            Messages

                                            {unreadCount > 0 && (

                                                <span className="bg-red-500 text-black dark:text-white text-xs px-2 py-1 rounded-full">
                                                    {unreadCount}
                                                </span>

                                            )}

                                        </div>

                                    ) : (

                                        tab

                                    )}

                                </Button>

                            ))}

                        </div>

                        {/* PROFILE */}
                        {activeTab === "profile" && (

                            <div className="space-y-6">

                                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6 transition-colors">

                                    <h2 className="text-3xl font-bold text-black dark:text-white mb-6">
                                        👤 My Profile
                                    </h2>

                                    <div className="space-y-3 text-lg text-black dark:text-white">
                                        <p>
                                            <strong>Name:</strong> {user?.name}
                                        </p>

                                        <p>
                                            <strong>Phone:</strong> {user?.phone}
                                        </p>

                                        <p>
                                            <strong>Role:</strong> {user?.role}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        )}

                        {/* VEHICLES */}
                        {activeTab === "vehicles" && (

                            <div className="space-y-6">

                                <div className="flex justify-between items-center">

                                    <h2 className="text-3xl font-bold text-black dark:text-white">
                                        🚗 My Vehicles
                                    </h2>

                                    <Button
                                        onClick={() =>
                                            router.push("/add-vehicle")
                                        }
                                        className="rounded-2xl"
                                    >
                                        ➕ Add Vehicle
                                    </Button>

                                </div>

                                <PremiumTable
                                    columns={[
                                        "numberPlate",
                                        "brand",
                                        "model",
                                        "status",
                                    ]}
                                    data={vehicles}
                                />

                                <div className="space-y-6">

                                    {vehicles.map((v) => (

                                        <div
                                            key={v.id}
                                            className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6 transition-colors"
                                        >

                                            <div className="flex justify-between items-start mb-4">

                                                <div>

                                                    <h3 className="text-2xl font-bold text-black dark:text-white">
                                                        {v.numberPlate}
                                                    </h3>

                                                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                                                        {v.brand} {v.model} ({v.year})
                                                    </p>

                                                </div>

                                                <VehicleStatusBadge status={v.status} />

                                            </div>

                                            <ActiveTowStatusCard
                                                towData={towStatusMap[v.numberPlate]}
                                            />

                                            <div className="mt-6 flex flex-wrap gap-3">

                                                <Button
                                                    onClick={() =>
                                                        setOpenTransfer(
                                                            openTransfer === v.id
                                                                ? null
                                                                : v.id
                                                        )
                                                    }
                                                    variant="outline"
                                                    className="rounded-2xl"
                                                >
                                                    🔄 Transfer Vehicle
                                                </Button>

                                            </div>

                                            {openTransfer === v.id && (

                                                <div className="mt-6 flex flex-col md:flex-row gap-4">

                                                    <input
                                                        placeholder="Enter new owner phone"
                                                        value={transferPhone}
                                                        onChange={(e) =>
                                                            setTransferPhone(e.target.value)
                                                        }
                                                        className=" border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl p-4 p-3 rounded-2xl flex-1"
                                                    />

                                                    <Button
                                                        onClick={async () => {

                                                            try {

                                                                await axios.post(
                                                                    "http://127.0.0.1:3001/vehicle/transfer",
                                                                    {
                                                                        numberPlate:
                                                                            v.numberPlate,

                                                                        phone:
                                                                            transferPhone,
                                                                    }
                                                                );

                                                                toast.success(
                                                                    "Vehicle transferred successfully"
                                                                );

                                                                loadData();

                                                            } catch (err: any) {

                                                                toast.error(
                                                                    err?.response?.data?.message ||
                                                                    "Transfer failed"
                                                                );
                                                            }
                                                        }}
                                                        className="rounded-2xl"
                                                    >
                                                        Transfer
                                                    </Button>

                                                </div>

                                            )}

                                            <div className="mt-8">

                                                <VehicleTimeline
                                                    events={
                                                        events.find(
                                                            (e: any) =>
                                                                e.vehicleNumber ===
                                                                v.numberPlate
                                                        )?.events || []
                                                    }
                                                />

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        )}

                        {/* MESSAGES */}

                        {activeTab === "messages" && (

                            <div className="space-y-4">

                                <h2 className="text-3xl font-bold text-black dark:text-white">
                                    💬 Messages
                                </h2>
                                <div className="flex flex-col md:flex-row gap-4 mb-6">

                                    <input

                                        placeholder="Search by vehicle or message..."

                                        value={messageSearch}

                                        onChange={(e) => {

                                            setMessageSearch(
                                                e.target.value
                                            );

                                            setCurrentMessagePage(1);
                                        }}

                                        className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl px-4 py-3 flex-1"

                                    />

                                    <select

                                        value={messageFilter}

                                        onChange={(e) => {

                                            setMessageFilter(
                                                e.target.value
                                            );

                                            setCurrentMessagePage(1);
                                        }}

                                        className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl px-4 py-3"

                                    >

                                        <option value="ALL">
                                            All Messages
                                        </option>

                                        <option value="READ">
                                            Read
                                        </option>

                                        <option value="UNREAD">
                                            Unread
                                        </option>

                                    </select>

                                </div>

                                {messages.length === 0 ? (

                                    <GlassAlertCard
                                        title="No Messages"
                                        message="You currently have no notifications."
                                    />

                                ) : (

                                    paginatedMessages.map((msg) => (

                                        <GlassAlertCard
                                            key={msg.id}
                                            title={new Date(msg.createdAt).toLocaleString()}
                                            message={msg.content}
                                        />

                                    ))

                                )}
                                <div className="flex justify-center items-center gap-4 mt-8">

                                    <Button

                                        disabled={
                                            currentMessagePage === 1
                                        }

                                        onClick={() =>
                                            setCurrentMessagePage(
                                                (prev) => prev - 1
                                            )
                                        }

                                    >

                                        Previous

                                    </Button>

                                    <span className="text-black dark:text-white">

                                        Page {currentMessagePage}
                                        of {totalMessagePages || 1}

                                    </span>

                                    <Button

                                        disabled={
                                            currentMessagePage ===
                                            totalMessagePages
                                        }

                                        onClick={() =>
                                            setCurrentMessagePage(
                                                (prev) => prev + 1
                                            )
                                        }

                                    >

                                        Next

                                    </Button>

                                </div>

                            </div>

                        )}

                        {/* FINES */}


                        {activeTab === "fines" && (

                            <div className="space-y-6">

                                <h2 className="text-3xl font-bold text-black dark:text-white">
                                    💰 My Fines
                                </h2>

                                <div className="flex flex-col md:flex-row gap-4 mb-6">

                                    <input

                                        placeholder="Search vehicle number..."

                                        value={fineSearch}

                                        onChange={(e) => {

                                            setFineSearch(
                                                e.target.value
                                            );

                                            setCurrentFinePage(1);
                                        }}

                                        className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl px-4 py-3 flex-1"

                                    />

                                    <select

                                        value={fineFilter}

                                        onChange={(e) => {

                                            setFineFilter(
                                                e.target.value
                                            );

                                            setCurrentFinePage(1);
                                        }}

                                        className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl px-4 py-3"

                                    >

                                        <option value="ALL">
                                            All Fines
                                        </option>

                                        <option value="PAID">
                                            Paid
                                        </option>

                                        <option value="UNPAID">
                                            Unpaid
                                        </option>

                                    </select>

                                </div>

                                {fines.length === 0 ? (

                                    <GlassAlertCard
                                        title="No Fines"
                                        message="Your driving record is clean."
                                    />

                                ) : (

                                    paginatedFines.map((fine) => (

                                        <div
                                            key={fine.id}
                                            className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6 transition-colors"
                                        >

                                            <div className="flex flex-col md:flex-row justify-between gap-6">

                                                <div className="space-y-2 text-black dark:text-white">

                                                    <h3 className="text-2xl font-bold text-black dark:text-white">
                                                        {fine.reason}
                                                    </h3>

                                                    <p>
                                                        Vehicle: {fine.vehicleNumber}
                                                    </p>

                                                    <p>
                                                        Location: {fine.tollLocation}
                                                    </p>

                                                    <p>
                                                        Officer: {fine.officerName}
                                                    </p>

                                                    <p>
                                                        {new Date(
                                                            fine.createdAt
                                                        ).toLocaleString()}
                                                    </p>

                                                    {fine.evidencePhoto && (

                                                        <button

                                                            onClick={() =>
                                                                setSelectedImage(
                                                                    `http://localhost:3001/${fine.evidencePhoto}`
                                                                )
                                                            }

                                                            className=" mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"

                                                        >

                                                            <span className="text-2xl">
                                                                📸
                                                            </span>

                                                            <span className="text-sm font-medium text-black dark:text-white">

                                                                View Evidence Image

                                                            </span>

                                                        </button>

                                                    )}

                                                    <button

                                                        onClick={() => {

                                                            window.open(`https://www.google.com/maps?q=${fine.latitude},${fine.longitude}`);
                                                        }}

                                                    >

                                                        📍 View Fine Location

                                                    </button>

                                                </div>

                                                <div className="text-right space-y-4">

                                                    <p className="text-4xl font-bold text-red-600">
                                                        ₹{fine.amount}
                                                    </p>

                                                    {fine.isPaid ? (

                                                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl font-semibold inline-block">
                                                            ✅ PAID
                                                        </div>

                                                    ) : (

                                                        <Button
                                                            onClick={async () => {

                                                                try {

                                                                    await axios.post(
                                                                        `http://127.0.0.1:3001/fine/pay/${fine.id}`
                                                                    );

                                                                    toast.success(
                                                                        "Fine paid successfully"
                                                                    );

                                                                    loadData();

                                                                } catch (err: any) {

                                                                    toast.error(
                                                                        err?.response?.data?.message ||
                                                                        "Payment failed"
                                                                    );
                                                                }
                                                            }}
                                                            className="rounded-2xl"
                                                        >
                                                            💳 Pay Fine
                                                        </Button>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    ))

                                )}

                                <div className="flex justify-center items-center gap-4 mt-8">

                                    <Button

                                        disabled={
                                            currentFinePage === 1
                                        }

                                        onClick={() =>
                                            setCurrentFinePage(
                                                (prev) => prev - 1
                                            )
                                        }

                                    >

                                        Previous

                                    </Button>

                                    <span className="text-black dark:text-white">

                                        Page {currentFinePage}
                                        of {totalFinePages || 1}

                                    </span>

                                    <Button

                                        disabled={
                                            currentFinePage ===
                                            totalFinePages
                                        }

                                        onClick={() =>
                                            setCurrentFinePage(
                                                (prev) => prev + 1
                                            )
                                        }

                                    >

                                        Next

                                    </Button>

                                </div>

                            </div>



                        )}

                        {/* CONTACTS */}
                        {activeTab === "contacts" && (

                            <div className="space-y-6">

                                <h2 className="text-3xl font-bold text-black dark:text-white">
                                    🚨 Trusted Contacts
                                </h2>

                                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6 space-y-4 transition-colors">

                                    <input
                                        placeholder="Phone Number"
                                        value={contactPhone}
                                        onChange={(e) =>
                                            setContactPhone(e.target.value)
                                        }
                                        className=" border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl p-4 p-3 rounded-2xl w-full"
                                    />

                                    <input
                                        placeholder="Relation"
                                        value={relation}
                                        onChange={(e) =>
                                            setRelation(e.target.value)
                                        }
                                        className=" border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl p-4 p-3 rounded-2xl w-full"
                                    />

                                    <Button
                                        onClick={async () => {

                                            try {

                                                await axios.post(
                                                    "http://127.0.0.1:3001/emergency-contact",
                                                    {
                                                        userId: user.id,
                                                        phone: contactPhone,
                                                        relation,
                                                    }
                                                );

                                                toast.success(
                                                    "Contact added successfully"
                                                );

                                                loadData();

                                                setContactPhone("");
                                                setRelation("");

                                            } catch (err: any) {

                                                toast.error(
                                                    err?.response?.data?.message ||
                                                    "Failed to add contact"
                                                );
                                            }
                                        }}
                                        className="rounded-2xl"
                                    >
                                        ➕ Add Contact
                                    </Button>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {contacts.map((contact) => (

                                        <div
                                            key={contact.id}
                                            className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6 transition-colors"
                                        >

                                            <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                                                {contact.relation}
                                            </h3>

                                            <p className="text-lg text-black dark:text-white">
                                                {contact.contactUser.phone}
                                            </p>

                                            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                                                {contact.contactUser.email}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        )}
                        {/* Contact the owner--"CTO" */}
                        {activeTab === "cto" && (

                            <div className="space-y-6">

                                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-md">

                                    <h2 className="text-2xl font-bold text-black dark:text-white mb-6">

                                        📨 Contact The Owner

                                    </h2>

                                    <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">

                                        Remaining messages today:
                                        <span className="font-bold ml-2">

                                            {ctoRemaining}/2

                                        </span>

                                    </div>

                                    <div className="space-y-4">

                                        <input

                                            placeholder="Vehicle Number"

                                            value={ctoVehicleNumber}

                                            onChange={(e) =>
                                                setCtoVehicleNumber(
                                                    e.target.value
                                                )
                                            }

                                            className=" w-full rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white px-4 py-3"

                                        />

                                        <textarea

                                            placeholder="Write your message..."

                                            value={ctoMessage}

                                            onChange={(e) =>
                                                setCtoMessage(
                                                    e.target.value
                                                )
                                            }

                                            className="w-full rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white px-4 py-3 h-32"

                                        />

                                        <Button
                                            onClick={sendCtoMessage}
                                        >

                                            Send Message

                                        </Button>

                                    </div>

                                </div>

                                {/* INBOX */}

                                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-md">

                                    <h2 className="text-xl font-bold mb-6 text-black dark:text-white">

                                        📥 CTO Inbox

                                    </h2>

                                    {/* SEARCH + FILTER */}

                                    <div className="flex flex-col md:flex-row gap-4 mb-6">

                                        <input

                                            placeholder="Search CTO messages..."

                                            value={ctoSearch}

                                            onChange={(e) => {

                                                setCtoSearch(
                                                    e.target.value
                                                );

                                                setCurrentCtoPage(1);
                                            }}

                                            className="flex-1 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white px-4 py-3"

                                        />

                                        <select

                                            value={ctoFilter}

                                            onChange={(e) => {

                                                setCtoFilter(
                                                    e.target.value
                                                );

                                                setCurrentCtoPage(1);
                                            }}

                                            className="rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white px-4 py-3"

                                        >

                                            <option value="ALL">
                                                All
                                            </option>

                                            <option value="READ">
                                                Read
                                            </option>

                                            <option value="UNREAD">
                                                Unread
                                            </option>

                                        </select>

                                    </div>

                                    {/* CTO LIST */}

                                    <div className="space-y-4">

                                        {paginatedCto.map(
                                            (msg: any) => (

                                                <div

                                                    key={msg.id}

                                                    className="border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4"

                                                >

                                                    <div className="flex justify-between mb-2">

                                                        <div className="font-bold text-black dark:text-white">

                                                            🚗 {msg.vehicleNumber}

                                                        </div>

                                                        <div className="text-xs text-zinc-500">

                                                            {new Date(
                                                                msg.createdAt
                                                            ).toLocaleString()}

                                                        </div>

                                                    </div>

                                                    <p className="text-zinc-700 dark:text-zinc-300">

                                                        {msg.message}

                                                    </p>

                                                </div>
                                            )
                                        )}

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

                {selectedImage && (

                    <div

                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"

                        onClick={() =>
                            setSelectedImage(null)
                        }

                    >

                        <div className="relative">

                            <img

                                src={selectedImage}

                                alt="Evidence"

                                className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl object-contain"

                            />

                            <button

                                onClick={() =>
                                    setSelectedImage(null)
                                }

                                className="absolute top-4 right-4 bg-black/70 text-white rounded-full w-10 h-10 text-xl"

                            >

                                ✕

                            </button>

                        </div>

                    </div>

                )}

            </DashboardShell>
        </DashboardLayout>
    );
}









