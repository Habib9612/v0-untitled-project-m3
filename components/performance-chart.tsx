"use client"

import { useEffect, useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PerformanceChartProps {
  isFleetView?: boolean
}

export default function PerformanceChart({ isFleetView = false }: PerformanceChartProps) {
  const [activeTab, setActiveTab] = useState("deliveries")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#2d3748"
    ctx.lineWidth = 1
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Generate data based on active tab
    let data: number[] = []

    if (activeTab === "deliveries") {
      data = isFleetView
        ? [124, 135, 128, 142, 148, 137, 152, 158, 162, 175, 169, 184, 198, 192]
        : [65, 72, 68, 75, 82, 78, 85, 88, 92, 95, 89, 94, 98, 92]
    } else if (activeTab === "costs") {
      data = isFleetView
        ? [14.8, 14.7, 14.9, 14.6, 14.5, 14.3, 14.4, 14.2, 14.3, 14.1, 14.2, 14.0, 14.1, 14.2]
        : [4.8, 4.7, 4.9, 4.6, 4.5, 4.3, 4.4, 4.2, 4.3, 4.1, 4.2, 4.0, 4.1, 4.2]
    } else if (activeTab === "efficiency") {
      data = isFleetView
        ? [82, 84, 81, 85, 88, 90, 92, 89, 93, 96, 94, 97, 89, 91]
        : [72, 74, 71, 75, 78, 80, 82, 85, 83, 86, 88, 87, 89, 91]
    }

    // Calculate scales
    const maxValue = Math.max(...data) * 1.1
    const minValue = activeTab === "costs" ? Math.min(...data) * 0.9 : 0
    const valueRange = maxValue - minValue

    // Draw grid lines and labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b"

    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight - i * (chartHeight / gridLines))
      const value = minValue + i * (valueRange / gridLines)

      // Grid line
      ctx.beginPath()
      ctx.strokeStyle = "#1e293b"
      ctx.lineWidth = 0.5
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      // Label
      ctx.fillText(activeTab === "costs" ? `$${value.toFixed(1)}` : Math.round(value).toString(), padding - 5, y)
    }

    // X-axis labels (days)
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
    const barWidth = chartWidth / days.length

    days.forEach((day, i) => {
      const x = padding + i * barWidth + barWidth / 2
      ctx.fillText(day, x, height - padding + 5)
    })

    // Draw data
    if (activeTab === "deliveries" || activeTab === "efficiency") {
      // Line chart for deliveries and efficiency
      ctx.beginPath()
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2
      ctx.lineJoin = "round"

      data.forEach((value, i) => {
        const x = padding + i * barWidth + barWidth / 2
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Add points
      data.forEach((value, i) => {
        const x = padding + i * barWidth + barWidth / 2
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight

        ctx.beginPath()
        ctx.fillStyle = "#1e293b"
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      })

      // Add gradient area under the line
      const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)")
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)")

      ctx.beginPath()
      ctx.fillStyle = gradient

      data.forEach((value, i) => {
        const x = padding + i * barWidth + barWidth / 2
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.lineTo(padding + chartWidth, height - padding)
      ctx.lineTo(padding, height - padding)
      ctx.closePath()
      ctx.fill()
    } else if (activeTab === "costs") {
      // Bar chart for costs
      data.forEach((value, i) => {
        const x = padding + i * barWidth + barWidth * 0.1
        const barW = barWidth * 0.8
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight

        // Draw bar
        ctx.beginPath()
        ctx.fillStyle = "#10b981"
        ctx.fillRect(x, y, barW, height - padding - y)

        // Add value label
        ctx.textAlign = "center"
        ctx.textBaseline = "bottom"
        ctx.fillStyle = "#64748b"
        ctx.font = "10px sans-serif"
        ctx.fillText(`$${value.toFixed(1)}`, x + barW / 2, y - 5)
      })
    }
  }, [activeTab, isFleetView])

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="deliveries">{isFleetView ? "Total Deliveries" : "Deliveries"}</TabsTrigger>
          <TabsTrigger value="costs">{isFleetView ? "Operating Costs" : "Costs"}</TabsTrigger>
          <TabsTrigger value="efficiency">{isFleetView ? "Fleet Utilization" : "Efficiency"}</TabsTrigger>
        </TabsList>
        <TabsContent value="deliveries" className="space-y-4">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {isFleetView
              ? "Total deliveries across all carriers over the last 14 days"
              : "On-time delivery performance over the last 14 days"}
          </div>
        </TabsContent>
        <TabsContent value="costs" className="space-y-4">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {isFleetView ? "Operating cost per mile over the last 14 days" : "Cost per mile over the last 14 days"}
          </div>
        </TabsContent>
        <TabsContent value="efficiency" className="space-y-4">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {isFleetView
              ? "Fleet utilization percentage over the last 14 days"
              : "Fleet utilization percentage over the last 14 days"}
          </div>
        </TabsContent>
      </Tabs>

      <div className="h-[240px] w-full">
        <canvas ref={canvasRef} width={500} height={240} className="w-full h-full" />
      </div>
    </div>
  )
}

