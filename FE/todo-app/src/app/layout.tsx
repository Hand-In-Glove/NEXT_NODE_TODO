import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Todo App",
	description: "A handy high-spec workload facilitator."
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ReactQueryClientProvider>
			<html lang="en">
				<body className={inter.className}>
					<Navbar />

					{children}
				</body>
			</html>
		</ReactQueryClientProvider>
	);
}
