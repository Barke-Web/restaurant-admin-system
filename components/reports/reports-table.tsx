"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ReportItem = {
  id: number
  type: "Order" | "Sale"
  orderNumber: string
  customerName: string
  items: string[]
  total: number
  date: string
  status: "Completed" | "Ready"
}

type ReportsTableProps = {
  onFilteredData: (data: ReportItem[]) => void
}

const mockReportsData: ReportItem[] = [
  { id: 1, type: "Order", orderNumber: "ORD-001", customerName: "John Doe", items: ["Burger", "Fries"], total: 24.99, date: "2024-01-15", status: "Completed" },
  { id: 2, type: "Sale", orderNumber: "SAL-001", customerName: "Jane Smith", items: ["Pizza", "Soda"], total: 18.5, date: "2024-01-15", status: "Completed" },
  { id: 3, type: "Order", orderNumber: "ORD-002", customerName: "Mike Johnson", items: ["Salad", "Water"], total: 12.99, date: "2024-01-14", status: "Ready" },
  { id: 4, type: "Sale", orderNumber: "SAL-002", customerName: "Sarah Wilson", items: ["Pasta", "Wine"], total: 32.0, date: "2024-01-14", status: "Completed" },
  { id: 5, type: "Order", orderNumber: "ORD-003", customerName: "Tom Brown", items: ["Steak", "Vegetables"], total: 45.99, date: "2024-01-13", status: "Completed" },
]

export function ReportsTable({ onFilteredData }: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [itemFilter, setItemFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | "Order" | "Sale">("all")

  // ✅ useMemo ensures no unnecessary recalculation
  const filteredData = useMemo(() => {
    return mockReportsData.filter(item => {
      const matchesSearch =
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesItem =
        !itemFilter || item.items.some(i => i.toLowerCase().includes(itemFilter.toLowerCase()))

      const matchesType = typeFilter === "all" || item.type === typeFilter

      const itemDate = new Date(item.date)
      const matchesDate =
        (!startDate || itemDate >= new Date(startDate)) &&
        (!endDate || itemDate <= new Date(endDate))

      const matchesStatus = item.status === "Completed"

      return matchesSearch && matchesDate && matchesItem && matchesType && matchesStatus
    })
  }, [searchTerm, startDate, endDate, itemFilter, typeFilter])

  // ✅ only call parent when filteredData changes
  useEffect(() => {
    onFilteredData(filteredData)
  }, [filteredData, onFilteredData])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Orders & Sales Report
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </CardTitle>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap mt-2">
          <Select value={typeFilter} onValueChange={(value: string) => setTypeFilter(value as any)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Order">Orders</SelectItem>
              <SelectItem value="Sale">Sales</SelectItem>
            </SelectContent>
          </Select>

          <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-40" />
          <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-40" />
          <Input placeholder="Filter by item" value={itemFilter} onChange={e => setItemFilter(e.target.value)} className="w-40" />

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setStartDate("")
              setEndDate("")
              setItemFilter("")
              setTypeFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Order #</th>
                <th className="text-left p-4 font-medium">Customer</th>
                <th className="text-left p-4 font-medium">Items</th>
                <th className="text-left p-4 font-medium">Total</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <Badge variant={item.type === "Order" ? "default" : "secondary"}>{item.type}</Badge>
                  </td>
                  <td className="p-4 font-medium">{item.orderNumber}</td>
                  <td className="p-4">{item.customerName}</td>
                  <td className="p-4">{item.items.join(", ")}</td>
                  <td className="p-4">${item.total.toFixed(2)}</td>
                  <td className="p-4">{item.date}</td>
                  <td className="p-4">
                    <Badge variant={item.status === "Completed" ? "default" : "secondary"}>
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No completed data found.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
