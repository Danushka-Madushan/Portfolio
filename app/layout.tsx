import type { Metadata } from "next";
import { Providers } from './Providers';
import { FontRoboto } from './fonts/fonts';
import "./styles/index.css";
import { Toaster } from 'react-hot-toast';
import MouseMoveEffect from './components/MouseMoveEffect';
import Nav from './components/Nav';
import BackgroundGrid from './components/BackgroundGrid';

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
          <MouseMoveEffect />
          <div className="relative">
            {/* Background gradients */}
            <div className="pointer-events-none fixed inset-0">
              <div className="absolute bg-linear-to-b from-background via-background/90 to-background" />
              <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
              <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
            </div>
            {/* MotionGrid */}
            <BackgroundGrid />
            <div>
              {/* NavBar */}
              <Nav />
              {children}
            </div>
          </div>
          <Toaster position='bottom-center' />
        </Providers>
      </body>
    </html>
  );
}
