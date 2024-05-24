import "../scss/index.css";
import "./globals.css";

export const metadata = {
  title: "QR Compass",
  description: "Get your link transformed into a QR code",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
