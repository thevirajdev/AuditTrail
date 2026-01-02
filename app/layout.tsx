import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Restaurant Platform',
  description: 'Premium restaurant ordering platform',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
