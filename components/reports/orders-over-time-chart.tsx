"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for orders over time (last 30 days)
const ordersOverTimeData = [
  { date: "Jan 1", orders: 12 },
  { date: "Jan 2", orders: 19 },
  { date: "Jan 3", orders: 15 },
  { date: "Jan 4", orders: 22 },
  { date: "Jan 5", orders: 18 },
  { date: "Jan 6", orders: 25 },
  { date: "Jan 7", orders: 28 },
  { date: "Jan 8", orders: 20 },
  { date: "Jan 9", orders: 24 },
  { date: "Jan 10", orders: 30 },
  { date: "Jan 11", orders: 27 },
  { date: "Jan 12", orders: 32 },
  { date: "Jan 13", orders: 29 },
  { date: "Jan 14", orders: 35 },
  { date: "Jan 15", orders: 38 },
]

export function OrdersOverTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Orders Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ordersOverTimeData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-muted-foreground" fontSize={12} />
            <YAxis className="text-muted-foreground" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--card-foreground))",
              }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--accent))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
