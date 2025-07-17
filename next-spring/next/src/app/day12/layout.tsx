import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <header className="flex justify-between items-center p-4 bg-indigo-600 text-white">
        <Link href="/day12" className="text-2xl font-bold">
          Day 12
        </Link>
        <Link href="/day12/practice" className="text-lg underline">
          Practice
        </Link>
        <Link href="/day12/homework" className="text-lg underline">
          Homework
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
