"use client";

import { Loader2, RotateCcw, ShieldCheck } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface OTPFormProps {
    otp: string;
    setOtp: (value: string) => void;

    loading: boolean;
    error: string;
    success: string;

    timer: number;

    verifyOTP: () => Promise<void>;
    resendOTP: () => Promise<void>;
}

export default function OTPForm({
    otp,
    setOtp,
    loading,
    error,
    success,
    timer,
    verifyOTP,
    resendOTP,
}: OTPFormProps) {

    const handleOTPChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value
            .replace(/\D/g, "")
            .slice(0, 6);

        setOtp(value);
    };

    return (
        <Card className="w-full max-w-md shadow-xl border-0">

            <CardHeader className="text-center space-y-4">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <ShieldCheck className="h-8 w-8 text-green-700" />
                </div>

                <div>
                    <CardTitle className="text-2xl font-bold">
                        Verify OTP
                    </CardTitle>

                    <CardDescription>
                        Enter the 6-digit OTP sent to your mobile number.
                    </CardDescription>
                </div>

            </CardHeader>

            <CardContent className="space-y-5">

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                {success && (
                    <Alert>
                        <AlertDescription>
                            {success}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-2">

                    <label className="text-sm font-medium">
                        OTP
                    </label>

                    <Input
                        value={otp}
                        onChange={handleOTPChange}
                        placeholder="123456"
                        maxLength={6}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        className="text-center text-xl tracking-[0.4em]"
                        disabled={loading}
                    />

                </div>
                <Button
                    type="button"
                    onClick={verifyOTP}
                    disabled={loading || otp.length !== 6}
                    className="w-full"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Verify OTP"
                    )}
                </Button>

                <div className="flex items-center justify-center">

                    {timer > 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Resend OTP in{" "}
                            <span className="font-semibold">
                                {timer}s
                            </span>
                        </p>
                    ) : (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={resendOTP}
                            disabled={loading}
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Resend OTP
                        </Button>
                    )}

                </div>

            </CardContent>
        </Card>
    );
}