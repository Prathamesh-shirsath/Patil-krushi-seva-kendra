import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>

                <QueryProvider>

                    {children}
                    <Toaster richColors position="top-right" />

                </QueryProvider>

            </body>
        </html>
    );
}