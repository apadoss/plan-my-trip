import Link from "next/link";
import { FaBars, FaSearch } from "react-icons/fa"; // Instala react-icons si no lo tienes

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        
        {/* Logo + Form */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <h1 className="text-primary-dark text-3xl font-bold">PlanMyTrip</h1>
          </Link>
          <Link href="/plan-my-trip" className="text-primary-dark text-2xl font-semibold">
            Itinerary
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-300 rounded-full px-4 py-2 w-full max-w-lg">
          <FaBars className="text-gray-600 mr-3" />
          <input
            type="text"
            placeholder="search destinations"
            className="bg-transparent flex-1 outline-none text-sm text-gray-800 placeholder-gray-600"
          />
          <FaSearch className="text-gray-600 ml-3" />
        </div>

        {/* Login / Signup */}
        <div className="text-primary-dark flex items-center gap-4">
          <Link href="/login" className="text-lg font-semibold">
            Login
          </Link>
          <Link href="/register" className="text-lg font-semibold">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
