"use client";

import { Loader2, Phone } from "lucide-react";

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

interface PhoneFormProps {
    phone: string;
    setPhone: (value: string) => void;

    loading: boolean;
    error: string;
    success: string;

    sendOTP: () => Promise<void>;
}

export default function PhoneForm({
    phone,
    setPhone,
    loading,
    error,
    success,
    sendOTP,
}: PhoneFormProps) {
    const handlePhoneChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value
            .replace(/\D/g, "")
            .slice(0, 10);

        setPhone(value);
    };

    return (
        <Card className="w-full max-w-md shadow-xl border-0">
            <CardHeader className="space-y-4 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Phone className="h-8 w-8 text-green-700" />
                </div>

                <div>
                    <CardTitle className="text-2xl font-bold">
                        Welcome
                    </CardTitle>

                    <CardDescription>
                        Login using your mobile number
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
                        Mobile Number
                    </label>

                    <div className="flex">

                        <div className="flex items-center rounded-l-md border border-r-0 bg-muted px-4 font-medium">
                            +91
                        </div>

                        <Input
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="9876543210"
                            className="rounded-l-none"
                            maxLength={10}
                            inputMode="numeric"
                            autoComplete="tel-national"
                            disabled={loading}
                        />

                    </div>

                </div>
                <Button
                    type="button"
                    onClick={sendOTP}
                    disabled={loading || phone.length !== 10}
                    className="w-full"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending OTP...
                        </>
                    ) : (
                        "Send OTP"
                    )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                    By continuing, you agree to receive an OTP on your
                    registered mobile number.
                </p>

                {/* Firebase Invisible reCAPTCHA */}
                <div id="recaptcha-container" />

            </CardContent>
        </Card>
    );
}