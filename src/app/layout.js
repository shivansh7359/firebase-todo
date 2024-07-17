import { Inter } from "next/font/google";
import "./globals.css";
import AuthUserProvider from "../../firebase/auth";
import { CustomProvider } from 'rsuite';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
      <CustomProvider>
        <AuthUserProvider>
          {children}
        </AuthUserProvider>
        </CustomProvider>
        </body>
    </html>
  );
}
