import { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Mengecek preferensi mode gelap dari sistem
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div
      className={`navbar ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-base-100 text-black"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            className={`menu menu-sm dropdown-content ${
              isDarkMode ? "bg-gray-800" : "bg-base-100"
            } rounded-box z-[1] mt-4 w-52 p-2 shadow`}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <a
                href="https://saweria.co/pujin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donasi
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Dongok</a>
      </div>
      <div className="navbar-end">
        {/* Tidak ada toggle, mengikuti sistem */}
      </div>
    </div>
  );
};

export default Navbar;
