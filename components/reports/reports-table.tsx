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
  { id: 6, type: "Sale", orderNumber: "SAL-003", customerName: "Emily Clark", items: ["Burger", "Soda"], total: 20.5, date: "2024-01-13", status: "Completed" },
  { id: 7, type: "Order", orderNumber: "ORD-004", customerName: "Robert Green", items: ["Pizza", "Salad"], total: 30.0, date: "2024-01-12", status: "Completed" },
  { id: 8, type: "Sale", orderNumber: "SAL-004", customerName: "Linda Hall", items: ["Pasta", "Juice"], total: 25.0, date: "2024-01-12", status: "Completed" },
  { id: 9, type: "Order", orderNumber: "ORD-005", customerName: "James Lee", items: ["Steak", "Wine"], total: 50.0, date: "2024-01-11", status: "Completed" },
  { id: 10, type: "Sale", orderNumber: "SAL-005", customerName: "Patricia Lewis", items: ["Salmon", "Soda"], total: 28.0, date: "2024-01-11", status: "Completed" },
  { id: 11, type: "Order", orderNumber: "ORD-006", customerName: "William King", items: ["Chicken", "Fries"], total: 22.5, date: "2024-01-10", status: "Completed" },
  { id: 12, type: "Sale", orderNumber: "SAL-006", customerName: "Barbara Scott", items: ["Burger", "Juice"], total: 19.0, date: "2024-01-10", status: "Completed" },
  { id: 13, type: "Order", orderNumber: "ORD-007", customerName: "David Adams", items: ["Pizza", "Water"], total: 27.5, date: "2024-01-09", status: "Completed" },
  { id: 14, type: "Sale", orderNumber: "SAL-007", customerName: "Susan Baker", items: ["Pasta", "Wine"], total: 31.0, date: "2024-01-09", status: "Completed" },
  { id: 15, type: "Order", orderNumber: "ORD-008", customerName: "Richard Nelson", items: ["Salad", "Soda"], total: 15.5, date: "2024-01-08", status: "Completed" },
  { id: 16, type: "Sale", orderNumber: "SAL-008", customerName: "Karen Carter", items: ["Steak", "Juice"], total: 48.0, date: "2024-01-08", status: "Completed" },
  { id: 17, type: "Order", orderNumber: "ORD-009", customerName: "Charles Mitchell", items: ["Chicken", "Salad"], total: 23.0, date: "2024-01-07", status: "Completed" },
  { id: 18, type: "Sale", orderNumber: "SAL-009", customerName: "Nancy Perez", items: ["Burger", "Wine"], total: 21.5, date: "2024-01-07", status: "Completed" },
  { id: 19, type: "Order", orderNumber: "ORD-010", customerName: "Thomas Roberts", items: ["Pizza", "Juice"], total: 28.0, date: "2024-01-06", status: "Completed" },
  { id: 20, type: "Sale", orderNumber: "SAL-010", customerName: "Lisa Turner", items: ["Pasta", "Soda"], total: 29.0, date: "2024-01-06", status: "Completed" },
  { id: 21, type: "Order", orderNumber: "ORD-011", customerName: "Mark Phillips", items: ["Steak", "Water"], total: 49.0, date: "2024-01-05", status: "Completed" },
  { id: 22, type: "Sale", orderNumber: "SAL-011", customerName: "Sandra Campbell", items: ["Salmon", "Juice"], total: 26.0, date: "2024-01-05", status: "Completed" },
  { id: 23, type: "Order", orderNumber: "ORD-012", customerName: "Paul Parker", items: ["Chicken", "Wine"], total: 24.0, date: "2024-01-04", status: "Completed" },
  { id: 24, type: "Sale", orderNumber: "SAL-012", customerName: "Deborah Evans", items: ["Burger", "Water"], total: 20.0, date: "2024-01-04", status: "Completed" },
  { id: 25, type: "Order", orderNumber: "ORD-013", customerName: "Steven Edwards", items: ["Pizza", "Soda"], total: 27.5, date: "2024-01-03", status: "Completed" },
  { id: 26, type: "Sale", orderNumber: "SAL-013", customerName: "Michelle Collins", items: ["Pasta", "Juice"], total: 30.0, date: "2024-01-03", status: "Completed" },
  { id: 27, type: "Order", orderNumber: "ORD-014", customerName: "Kenneth Stewart", items: ["Salad", "Wine"], total: 16.5, date: "2024-01-02", status: "Completed" },
  { id: 28, type: "Sale", orderNumber: "SAL-014", customerName: "Carol Morris", items: ["Steak", "Soda"], total: 47.0, date: "2024-01-02", status: "Completed" },
  { id: 29, type: "Order", orderNumber: "ORD-015", customerName: "George Rogers", items: ["Chicken", "Juice"], total: 23.5, date: "2024-01-01", status: "Completed" },
  { id: 30, type: "Sale", orderNumber: "SAL-015", customerName: "Dorothy Reed", items: ["Burger", "Wine"], total: 22.0, date: "2024-01-01", status: "Completed" },
]


export function ReportsTable({ onFilteredData }: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [itemFilter, setItemFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState<"Order" | "Sale" | "">("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredData = useMemo(() => {
    if (!typeFilter) return []

    return mockReportsData.filter(item => {
      const matchesSearch =
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesItem =
        !itemFilter || item.items.some(i => i.toLowerCase().includes(itemFilter.toLowerCase()))

      const matchesType = item.type === typeFilter

      const itemDate = new Date(item.date)
      const matchesDate =
        (!startDate || itemDate >= new Date(startDate)) &&
        (!endDate || itemDate <= new Date(endDate))

      const matchesStatus = item.status === "Completed"

      return matchesSearch && matchesDate && matchesItem && matchesType && matchesStatus
    })
  }, [searchTerm, startDate, endDate, itemFilter, typeFilter])

  // Paginate
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    onFilteredData(filteredData)
    setCurrentPage(1) // reset to first page when filters change
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

        <div className="flex gap-4 flex-wrap mt-2">
          <Select value={typeFilter} onValueChange={(value: string) => setTypeFilter(value as any)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Choose report" />
            </SelectTrigger>
            <SelectContent>
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
              setTypeFilter("")
            }}
          >
            Clear Filters
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          {paginatedData.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Order #</th>
                  <th className="text-left p-4 font-medium">Customer</th>
                  <th className="text-left p-4 font-medium">Items</th>
                  <th className="text-left p-4 font-medium">Total</th>
                  <th className="text-left p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(item => (
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {typeFilter ? "No completed data found." : "Please select a report type to view data."}
            </div>
          )}
        </div>

        {/* Pagination */}
        {paginatedData.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
