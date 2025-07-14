import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 bg-indigo-400">
        <h1 className="text-2xl font-bold">Day 11</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-white hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-white hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-white hover:underline">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  );
}
