import { Poppins } from "next/font/google";
import "./globals.css";
import "./estilos.css"
import Sidebar from "./components/Sidebar";
import "boxicons/css/boxicons.min.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Stalse MVP",
  description: "Created by Thomas Campanholi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Sidebar />
        <div className="core-container">
          {children}
        </div>
      </body>
    </html>
  );
}
