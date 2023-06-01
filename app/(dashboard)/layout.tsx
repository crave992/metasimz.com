"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../config/firebaseConfig';
import { Inter } from 'next/font/google'
import '../../public/styles/globals.scss'
import Header from '@/layout/dashboard/Header';
import Footer from '@/layout/dashboard/Footer';
import Sidebar from '@/layout/dashboard/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
      }
    });
    return unsubscribe;
  }, []);
  return (
    <html lang="en">
      <body className="inner">
        <div id="content">
          <div className="flex">
            <Sidebar></Sidebar>
            <div className="w-full">
              <Header></Header>
              {children}

            </div>
          </div>
          <Footer></Footer>
        </div>
      </body>
    </html>
  )
}
