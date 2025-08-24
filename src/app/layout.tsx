
import type { Metadata } from "next";
import "./globals.css";
import ClientOnlyToaster from "@/toast/ClientOnlyToaster";


export const metadata: Metadata = {
  title: "My App",
  description: "With Cascadia Mono & Code",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" >
      <body className="antialiased ">
        {children}
        <ClientOnlyToaster/>
      </body>
    </html>
  );
}
