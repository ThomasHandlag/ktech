import Link from "next/link";

const Day11Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col min-h-screen">
      <nav className="w-full p-4 bg-indigo-400">
        <div className="flex space-x-4">
          <div>
            <Link href="/day11" className="text-white hover:underline">
              Home
            </Link>
          </div>
          <div>
            <Link href="/day11/blog" className="text-white hover:underline">
              Blog
            </Link>
          </div>
          <div>
            <Link href="/day11/contact" className="text-white hover:underline">
              Contact
            </Link>
          </div>
          <div>
            <Link href="/day11/products" className="text-white hover:underline">
              Products
            </Link>
          </div>
          <div>
            <Link href="/day11/login" className="text-white hover:underline">
              Login
            </Link>
          </div>
        </div>
      </nav>
      <div className="p-6 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
}

export default Day11Layout;