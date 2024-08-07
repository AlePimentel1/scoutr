import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import SideNav from "@/components/side-nav/SideNav";
import { brockmann } from "@/lib/fonts";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from "next-intl/server";
import { CSPostHogProvider } from "./_analytics/provider";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Be Scoutr",
  description: "Somos una plataforma que impulsa a los scoutrs a alcanzar sus metas y sueños.",
  icons: [{ rel: "icon", url: "/favicon.webp" }],
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  const session = await getServerSession(authOptions)
  const messages = await getMessages()

  return (
    <html lang={locale} className={brockmann.className}>
      <body className="relative">
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '75%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(1,39,87,0.7) 20%, rgba(1,39,87,0.5) 70%)',
            boxShadow: '0 0 60px 60px rgba(1,39,87,0.5)',
            zIndex: -999,
          }}
        />
        <main>
          <SessionProvider session={session} baseUrl="/">
            <CSPostHogProvider>
              <NextIntlClientProvider messages={messages}>
                <div className="flex flex-col lg:flex-row">
                  <SideNav />
                  <div className="flex flex-col flex-1">
                    <Header />
                    {children}
                  </div>
                </div>
              </NextIntlClientProvider>
            </CSPostHogProvider>
          </SessionProvider>
        </main>
        <Toaster richColors />
      </body>
    </html >
  );
}
