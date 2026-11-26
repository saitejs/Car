"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Messages() {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        console.log("Logged in user:", user); // 
        if (user?.id) {
            axios
                .get(`http://127.0.0.1:3001/message/${user.id}`)
                .then((res) => setMessages(res.data));

            // 🔥 mark all as read
            axios.patch(`http://127.0.0.1:3001/message/read/${user.id}`);
        }
    }, []);

    return (
        <div className="p-6 bg-black text-white min-h-screen">
            <h1 className="text-xl mb-4">📩 Your Messages</h1>

            {messages.length === 0 ? (
                <p>No messages yet</p>
            ) : (
                messages.map((m) => (
                    <div key={m.id} className={`p-3 mb-2 rounded ${m.isRead ? "bg-gray-800" : "bg-yellow-600"
                        }`}>
                        {m.content}
                    </div>
                ))
            )}
        </div>
    );
}
