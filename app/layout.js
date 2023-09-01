import IncludableLabel from "@/components/IncludableLabel";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Feed Fixer",
  description: "Customize RSS Feeds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <IncludableLabel />
      </body>
    </html>
  );
}
