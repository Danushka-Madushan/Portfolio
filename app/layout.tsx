import type { Metadata } from "next";
import { Providers } from './Providers';
import { FontRoboto } from './fonts/fonts';
import "./styles/index.css";
import { Toaster } from 'react-hot-toast';
import MouseMoveEffect from './components/MouseMoveEffect';

export const metadata: Metadata = {
  title: "Danushka-Madushan",
  description: "A versatile Software Engineer specializing in both backend development and cybersecurity",
  icons: {
    icon: '/favicon.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={`${FontRoboto.variable} antialiased`}>
        <Providers>
          <MouseMoveEffect/>
          {children}
          <Toaster position='bottom-center'/>
        </Providers>
      </body>
    </html>
  );
}
