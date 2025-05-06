"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Truck,
  Package,
  Clock,
  Plus,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ShipmentMap from "@/components/shipment-map"
import PerformanceChart from "@/components/performance-chart"
import RecentActivityFeed from "@/components/recent-activity-feed"

export default function DashboardPage() {
  const [dashboardType, setDashboardType] = useState<"individual" | "company">("company")

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back! Here&apos;s an overview of your logistics operations.
          </p>
        </div>
        <Tabs
          value={dashboardType}
          onValueChange={(v) => setDashboardType(v as "individual" | "company")}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Individual View</TabsTrigger>
            <TabsTrigger value="company">Company View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Dashboard type-specific content */}
      {dashboardType === "individual" ? <IndividualDashboard /> : <CompanyDashboard />}
    </div>
  )
}

function IndividualDashboard() {
  return (
    <>
      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Truck className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-500 dark:text-green-400 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +4.3%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <Clock className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-red-500 dark:text-red-400 inline-flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -1.1%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-500 dark:text-green-400 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +10.1%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active shipments and map */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Shipments</CardTitle>
              <CardDescription>Your current shipments in transit</CardDescription>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Shipment
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0 divide-y divide-slate-100 dark:divide-slate-800">
              {[
                {
                  id: "SHP-3948",
                  status: "in_transit",
                  destination: "Atlanta, GA",
                  progress: 65,
                  eta: "2h 45m",
                  alert: false,
                },
                {
                  id: "SHP-3921",
                  status: "in_transit",
                  destination: "Miami, FL",
                  progress: 42,
                  eta: "5h 20m",
                  alert: true,
                },
                {
                  id: "SHP-3899",
                  status: "pending",
                  destination: "Dallas, TX",
                  progress: 0,
                  eta: "Pending",
                  alert: false,
                },
                {
                  id: "SHP-3876",
                  status: "in_transit",
                  destination: "Chicago, IL",
                  progress: 89,
                  eta: "30m",
                  alert: false,
                },
              ].map((shipment) => (
                <div key={shipment.id} className="flex items-center p-4 relative">
                  {shipment.alert && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Link
                          href={`/dashboard/shipments/${shipment.id}`}
                          className="text-sm font-medium hover:underline"
                        >
                          {shipment.id}
                        </Link>
                        <Badge
                          variant={shipment.status === "in_transit" ? "default" : "outline"}
                          className="ml-2 text-xs"
                        >
                          {shipment.status === "in_transit" ? "In Transit" : "Pending"}
                        </Badge>
                        {shipment.alert && (
                          <Badge
                            variant="outline"
                            className="ml-2 bg-amber-100 text-amber-700 border-amber-200 text-xs"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Delayed
                          </Badge>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Contact carrier</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Cancel shipment</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      Destination: {shipment.destination}
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={shipment.progress} className="h-2 flex-1" />
                      <span className="text-xs whitespace-nowrap">ETA: {shipment.eta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Button variant="ghost" size="sm" className="ml-auto" asChild>
              <Link href="/dashboard/shipments">
                View all shipments
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Shipment Tracking</CardTitle>
            <CardDescription>Real-time location of your active shipments</CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-[400px]">
            <ShipmentMap />
          </CardContent>
        </Card>
      </div>

      {/* Recent activity and performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your shipments</CardDescription>
          </CardHeader>
          <CardContent className="h-[340px] overflow-auto">
            <RecentActivityFeed />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Trends in your shipping volume and costs</CardDescription>
          </CardHeader>
          <CardContent className="h-[340px]">
            <PerformanceChart />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function CompanyDashboard() {
  return (
    <>
      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fleet</CardTitle>
            <Truck className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex flex-col">
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span>Active: 32</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>In Maintenance: 7</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span>Inactive: 3</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Package className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-500 dark:text-green-400 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2 mpg</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-500 dark:text-green-400 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.3
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">from last quarter</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <Clock className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93.7%</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-red-500 dark:text-red-400 inline-flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -0.8%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fleet overview with map */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Fleet Overview</CardTitle>
            <CardDescription>Real-time location of your trucks</CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-[400px]">
            <ShipmentMap isFleetView={true} />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Drivers</CardTitle>
              <CardDescription>Currently on duty</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              Manage
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0 divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { name: "Michael Chen", id: "DRV-112", route: "Chicago to Atlanta", progress: 65, status: "on_route" },
                { name: "Sarah Johnson", id: "DRV-098", route: "Miami to New York", progress: 42, status: "on_route" },
                { name: "David Wilson", id: "DRV-076", route: "Dallas to Phoenix", progress: 89, status: "on_route" },
                { name: "Emily Rodriguez", id: "DRV-104", route: "Seattle to Denver", progress: 12, status: "loading" },
              ].map((driver) => (
                <div key={driver.id} className="flex items-center p-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={driver.name} />
                    <AvatarFallback>
                      {driver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <Link href={`/dashboard/drivers/${driver.id}`} className="text-sm font-medium hover:underline">
                        {driver.name}
                      </Link>
                      <Badge variant={driver.status === "on_route" ? "default" : "outline"} className="ml-2 text-xs">
                        {driver.status === "on_route" ? "On Route" : "Loading"}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {driver.id} • {driver.route}
                    </div>
                    <Progress value={driver.progress} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Button variant="ghost" size="sm" className="ml-auto" asChild>
              <Link href="/dashboard/drivers">
                View all drivers
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Maintenance and Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
            <CardDescription>Upcoming maintenance tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { truck: "TRK-1042", task: "Oil Change", date: "Mar 25", priority: "Routine" },
                { truck: "TRK-1036", task: "Brake Inspection", date: "Mar 26", priority: "Critical" },
                { truck: "TRK-1039", task: "Tire Rotation", date: "Mar 27", priority: "Routine" },
                { truck: "TRK-1041", task: "Engine Diagnostics", date: "Mar 29", priority: "High" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{task.truck}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{task.task}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        task.priority === "Critical"
                          ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                          : task.priority === "High"
                            ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                            : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{task.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Button variant="ghost" size="sm" className="ml-auto" asChild>
              <Link href="/dashboard/maintenance">
                View all maintenance
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>Fleet performance over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[340px]">
            <PerformanceChart isFleetView={true} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

