import "./globals.css";
import { ReduxProvider } from "../redux/provider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import {Poppins} from "next/font/google";
const poppins =Poppins({
  weight:'400',
  preload:false,
});
export const metadata = {
  title: "Akanksha Enterprises",
  description: "Billing and Stock Management",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ReduxProvider>
        <Providers>
        <Header/>
          {children}
        </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}