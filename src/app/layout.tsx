import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProviderApollo } from "@/components/ProviderApollo";
import Header from "@/components/Header/Header";
import Container from "@/components/Container";
import ProviderRedux from "./store/ProviderRedux";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weatherbys Client",
  description: "Weatherbys Client with graphql",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderRedux>
          <ProviderApollo>
              <Container>
                <Header title="Todo Task"/>
                {children}
              </Container>
            </ProviderApollo>   
        </ProviderRedux>       
      </body>
    </html>
  );
}
