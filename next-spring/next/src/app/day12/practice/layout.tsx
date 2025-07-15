import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <Link href="/day12/practice" className="text-2xl font-bold">
          Day 12 Practice
        </Link>
        <Link href="/day12/practice/task-ssr" className="text-lg underline">
          SSR
        </Link>
        <Link href="/day12/practice/task-ssg" className="text-lg underline">
          SSG
        </Link>
        <Link href="/day12/practice/task-csr" className="text-lg underline">
          CSR
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
