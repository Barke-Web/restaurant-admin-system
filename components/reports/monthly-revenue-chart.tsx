"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for monthly revenue trend (last 12 months)
const monthlyRevenueData = [
  { month: "Feb", revenue: 45200 },
  { month: "Mar", revenue: 52800 },
  { month: "Apr", revenue: 48900 },
  { month: "May", revenue: 61200 },
  { month: "Jun", revenue: 58700 },
  { month: "Jul", revenue: 67300 },
  { month: "Aug", revenue: 72100 },
  { month: "Sep", revenue: 69800 },
  { month: "Oct", revenue: 74500 },
  { month: "Nov", revenue: 78200 },
  { month: "Dec", revenue: 82900 },
  { month: "Jan", revenue: 75200 },
]

export function MonthlyRevenueChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-card-foreground">{label}</p>
          <p className="text-sm text-accent">Revenue: ${payload[0].value.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-muted-foreground" fontSize={12} />
            <YAxis
              className="text-muted-foreground"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
