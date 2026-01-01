import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap"
});

export const metadata = {
  title: "খামার আইডিয়া প্ল্যানার",
  description: "বাংলাদেশি কৃষকদের জন্য খামার স্থাপনার বুদ্ধিদীপ্ত আইডিয়া জেনারেটর"
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
