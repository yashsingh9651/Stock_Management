import "./globals.css";
import { Inter } from "next/font/google";
import { ReduxProvider } from "../redux/provider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Akanksha Enterprises",
  description: "Billing and Stock Management",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
