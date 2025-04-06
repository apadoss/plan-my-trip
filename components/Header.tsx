import Link from "next/link";

const Header = () => {
    return (
        <header className="border-b border-gray-200 bg-white">
            <nav className="flex items-center justify-between p-6 lg:p-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/">
                        <h1 className="text-primary-dark text-4x1 font-bold">PlanMyTrip</h1>
                    </Link>
                </div>

                <div className="flex lg:flex-1 lg:justify-end lg:gap-4">
                    <Link href="/login" className="text-sm font-semibold leading-6">
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;