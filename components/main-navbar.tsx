"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Truck, Menu, X, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const languages = [
    { name: "English", code: "en", flag: "🇬🇧" },
    { name: "Français", code: "fr", flag: "🇫🇷" },
    { name: "العربية", code: "ar", flag: "🇲🇦" },
  ]

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Solutions", href: "/#solutions" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-white">MarocTransit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-300 hover:text-orange-500 font-medium">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side: Language & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center text-gray-300">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>EN</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black border-gray-800">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
              >
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                Sign Up Free
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-300">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 sm:w-80 bg-black border-gray-800">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b border-gray-800 py-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                      <Truck className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-white">MarocTransit</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>

                <div className="flex-1 overflow-auto py-4">
                  <nav className="flex flex-col space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="border-t border-gray-800 py-4 space-y-3">
                  <div className="px-3">
                    <p className="text-xs text-gray-500 mb-2">Select Language</p>
                    <div className="grid grid-cols-3 gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className="flex flex-col items-center justify-center p-2 text-gray-300 hover:bg-gray-800 rounded-md"
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="text-xs mt-1">{lang.code.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="px-3 space-y-2">
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full justify-center text-gray-300 border-gray-700 hover:bg-gray-800"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full justify-center bg-orange-500 hover:bg-orange-600 text-white">
                        Sign Up Free
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

