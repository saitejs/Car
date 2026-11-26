"use client";

import { useState } from "react";
import { auth } from "@/firebase";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const router = useRouter();

    const sendOTP = async () => {
        let cleanedPhone = phone.replace(/\D/g, ""); // remove spaces, symbols

        if (cleanedPhone.length !== 10) {
            alert("Enter valid 10 digit number");
            return;
        }

        const fullPhone = "+91" + cleanedPhone;

        const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
        });

        const confirmation = await signInWithPhoneNumber(
            auth,
            fullPhone,
            verifier
        );

        (window as any).confirmationResult = confirmation;

        alert("OTP Sent");
        setStep(2);
    };

    const verifyOTP = async () => {
        const result = await (window as any).confirmationResult.confirm(otp);

        const firebaseUser = result.user;

        // 🔥 CALL YOUR BACKEND
        const res = await axios.post("http://127.0.0.1:3001/auth/login", {
            phone: firebaseUser.phoneNumber.replace("+91", ""),
        });

        if (res.data) {
            localStorage.setItem("user", JSON.stringify(res.data));
            router.push("/dashboard");
        } else {
            alert("User not found. Please register.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-white text-black p-6 rounded w-80">

                <h2 className="text-xl mb-4">Login with OTP</h2>

                {step === 1 && (
                    <>
                        <input
                            placeholder="Enter phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border p-2 w-full mb-3"
                        />

                        <button
                            onClick={sendOTP}
                            className="bg-blue-500 text-white w-full py-2 rounded"
                        >
                            Send OTP
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <input
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="border p-2 w-full mb-3"
                        />

                        <button
                            onClick={verifyOTP}
                            className="bg-green-500 text-white w-full py-2 rounded"
                        >
                            Verify OTP
                        </button>
                    </>
                )}

                <div id="recaptcha-container"></div>
            </div>
        </div>
    );
}