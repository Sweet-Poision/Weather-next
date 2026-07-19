import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { WeatherProvider } from "@/context/weather-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather",
  description: "Mini project to see weather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const hour: number = new Date().getHours();
  const sunColor: string = '#fffbeb'
  const afternoonColor: string = '#ffffff'
  const nightColor: string = '#cbd5e1'
  const backgroundColor = (hour >= 12 && hour < 18) ? afternoonColor : ((hour >= 8 && hour < 12) || (hour >= 18 && hour < 21)) ? sunColor : nightColor;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col box-border select-none text-black" style={{backgroundColor : `${backgroundColor}`}}>
        <WeatherProvider>
          <Navbar />
          {children}
          <Footer />
        </WeatherProvider>
      </body>
    </html>
  );
}
