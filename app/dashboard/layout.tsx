"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Truck,
  Package,
  Users,
  BarChart3,
  MapPin,
  Wallet,
  Settings,
  Bell,
  Search,
  Menu,
  LogOut,
  MessageSquare,
  User,
  Calendar,
  Clock,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Shipments", href: "/dashboard/shipments", icon: Package },
  { name: "Carriers", href: "/dashboard/carriers", icon: Truck },
  { name: "Fleet Management", href: "/dashboard/fleet", icon: MapPin },
  { name: "Financials", href: "/dashboard/financials", icon: Wallet },
]

const secondaryNav = [
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center h-16 px-6 border-b border-slate-200 dark:border-slate-800">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 font-bold text-xl"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <div className="bg-blue-600 text-white p-1 rounded">
                      <Truck className="h-5 w-5" />
                    </div>
                    <span>MarocTransit</span>
                  </Link>
                </div>
                <nav className="flex-1 overflow-auto py-4">
                  <div className="px-3 py-2">
                    <h3 className="px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Main
                    </h3>
                    <div className="mt-2 space-y-1">
                      {mainNav.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileNavOpen(false)}
                          className={cn(
                            "group flex items-center px-4 py-2 text-sm rounded-md font-medium",
                            isActive(item.href)
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                          )}
                        >
                          <item.icon
                            className={cn(
                              "mr-3 h-5 w-5",
                              isActive(item.href)
                                ? "text-blue-700 dark:text-blue-300"
                                : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300",
                            )}
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <h3 className="px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Other
                    </h3>
                    <div className="mt-2 space-y-1">
                      {secondaryNav.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileNavOpen(false)}
                          className={cn(
                            "group flex items-center px-4 py-2 text-sm rounded-md font-medium",
                            isActive(item.href)
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                          )}
                        >
                          <item.icon
                            className={cn(
                              "mr-3 h-5 w-5",
                              isActive(item.href)
                                ? "text-blue-700 dark:text-blue-300"
                                : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300",
                            )}
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl mr-6 hidden md:flex">
            <div className="bg-blue-600 text-white p-1 rounded">
              <Truck className="h-5 w-5" />
            </div>
            <span>MarocTransit</span>
          </Link>

          {/* Search */}
          <div className="relative w-full max-w-sm mr-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-slate-100 dark:bg-slate-800 border-none pl-9 rounded-full focus-visible:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Messages */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-5 w-5" />
                    <span className="sr-only">Messages</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Messages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">john@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/activity">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Activity</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar navigation */}
        <aside className="hidden md:flex md:w-64 border-r border-slate-200 dark:border-slate-800 flex-col">
          <nav className="flex-1 space-y-1 py-4">
            <div className="px-3 py-2">
              <h3 className="px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Main
              </h3>
              <div className="mt-2 space-y-1">
                {mainNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-4 py-2 text-sm rounded-md font-medium",
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5",
                        isActive(item.href)
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300",
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-3 py-2">
              <h3 className="px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Other
              </h3>
              <div className="mt-2 space-y-1">
                {secondaryNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-4 py-2 text-sm rounded-md font-medium",
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5",
                        isActive(item.href)
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300",
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Need help?</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Contact support</p>
                </div>
              </div>
              <Button className="w-full mt-3" size="sm">
                Contact Support
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

