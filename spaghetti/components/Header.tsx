'use client'

import { useState } from 'react'
import { Menu, Github } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-center flex-grow">
            Spaghetti Bridge Weight Prediction using PINN
          </h1>
          <div className="flex items-center space-x-4">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="bg-gray-800 py-2">
          <div className="container mx-auto px-6">
            <Link href="/" className="block py-2 hover:text-blue-400">Home</Link>
            <Link href="/about" className="block py-2 hover:text-blue-400">About</Link>
            <Link href="/contact" className="block py-2 hover:text-blue-400">Contact</Link>
          </div>
        </div>
      )}
    </header>
  )
}

