import type { Metadata } from "next";
import { Providers } from '../Providers';
import { FontRoboto } from '../fonts/fonts';
import "../styles/index.css";
import MouseMoveEffect from '../components/MouseMoveEffect';
import Nav from '../components/navs/Nav';
import BackgroundGrid from '../components/BackgroundGrid';
import KitNav from '../components/navs/KitNav';

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
            <div className='h-screen'>
              {/* NavBar */}
              <Nav className='fixed right-1/2 left-1/2 z-20' />
              <KitNav />
              <div className='relative flex items-center w-full h-full justify-center'>
                <div className='w-[310px]'>
                  {/* Space Adjuster (cuz i don't know css) */}
                </div>
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
