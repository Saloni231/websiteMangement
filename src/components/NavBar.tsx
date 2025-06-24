// app/components/Navbar.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
      <div className="flex items-center space-x-6">
        <div className="text-xl font-bold text-[#6B46C1]">Kraken</div>
        <nav className="flex space-x-6 text-sm text-gray-600">
          <a href="#" className="hover:text-black">
            Marketplace
          </a>
          <a href="#" className="text-[#A78BFA] font-medium">
            My websites
          </a>
          <a href="#" className="hover:text-black">
            My Orders
          </a>
          <a href="#" className="hover:text-black">
            My projects
          </a>
          <a href="#" className="hover:text-black">
            Received orders
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M3 12h18M3 18h18"
            />
          </svg>
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405M19 17a2.003 2.003 0 00-1.436-1.922L15 14m-3-7h3.5M9 4h6a2 2 0 012 2v0a2 2 0 01-2 2H9a2 2 0 01-2-2v0a2 2 0 012-2z"
            />
          </svg>
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500">
          <User className="w-5 h-5 text-gray-500" />
        </Button>
      </div>
    </header>
  );
}
