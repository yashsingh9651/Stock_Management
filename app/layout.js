import "./globals.css";
import { ReduxProvider } from "../redux/provider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
export const metadata = {
  title: "Akanksha Enterprises",
  description: "Billing and Stock Management",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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