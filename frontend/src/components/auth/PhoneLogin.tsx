"use client";

import PhoneForm from "./PhoneForm";
import OTPForm from "./OTPForm";

import { usePhoneAuth } from "@/hooks/usePhoneAuth";

export default function PhoneLogin() {
    const {
        phone,
        setPhone,

        otp,
        setOtp,

        loading,

        error,
        success,

        timer,

        step,

        sendOTP,
        verifyOTP,
        resendOTP,
    } = usePhoneAuth();

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">

            {step === "PHONE" ? (
                <PhoneForm
                    phone={phone}
                    setPhone={setPhone}
                    loading={loading}
                    error={error}
                    success={success}
                    sendOTP={sendOTP}
                />
            ) : (
                <OTPForm
                    otp={otp}
                    setOtp={setOtp}
                    loading={loading}
                    error={error}
                    success={success}
                    timer={timer}
                    verifyOTP={verifyOTP}
                    resendOTP={resendOTP}
                />
            )}

        </div>
    );
}