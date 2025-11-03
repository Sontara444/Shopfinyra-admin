import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-full bg-black text-white">
      {/* Logo / Title */}
      <div className="h-16 pl-8 flex items-center justify-start">
        <h1 className="text-2xl font-bold tracking-wide">ShopFinyra</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/products", label: "Products" },
          { href: "/orders", label: "Orders" },
          { href: "/customers", label: "customers" },
          { href: "/analytics", label: "Analytics" },
          { href: "/settings", label: "Settings" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
