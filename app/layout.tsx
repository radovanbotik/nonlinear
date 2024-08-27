import type { Metadata } from "next";
import { Inter, Roboto, Oswald, Archivo_Narrow } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "./components/Container";

const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"] });
const rc = Archivo_Narrow({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="//dark">
      <body className={`${roboto.className}  //bg-black //bg-[#d0ff4b] dark:bg-black`}>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
