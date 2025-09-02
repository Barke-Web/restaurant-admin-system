"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Clock } from "lucide-react"

interface ActivityLog {
  id: string
  user: string
  action: string
  timestamp: string
  type: "sale" | "order" | "user" | "system"
}

// Mock activity log data
const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    user: "Admin",
    action: "Added new sale for Classic Burger",
    timestamp: "2024-01-15 14:30:25",
    type: "sale",
  },
  {
    id: "2",
    user: "Cashier",
    action: "Created order #128 for John Smith",
    timestamp: "2024-01-15 14:25:10",
    type: "order",
  },
  {
    id: "3",
    user: "Manager",
    action: "Updated order #127 status to Ready",
    timestamp: "2024-01-15 14:20:45",
    type: "order",
  },
  {
    id: "4",
    user: "Admin",
    action: "Added new user: Sarah Johnson",
    timestamp: "2024-01-15 14:15:30",
    type: "user",
  },
  {
    id: "5",
    user: "Cashier",
    action: "Created order #126 for Emily Wilson",
    timestamp: "2024-01-15 14:10:15",
    type: "order",
  },
  {
    id: "6",
    user: "System",
    action: "Daily backup completed successfully",
    timestamp: "2024-01-15 14:00:00",
    type: "system",
  },
  {
    id: "7",
    user: "Manager",
    action: "Updated menu item pricing",
    timestamp: "2024-01-15 13:55:20",
    type: "system",
  },
  {
    id: "8",
    user: "Admin",
    action: "Added new sale for Margherita Pizza",
    timestamp: "2024-01-15 13:50:35",
    type: "sale",
  },
  {
    id: "9",
    user: "Cashier",
    action: "Updated order #125 status to Completed",
    timestamp: "2024-01-15 13:45:10",
    type: "order",
  },
  {
    id: "10",
    user: "Manager",
    action: "Generated monthly sales report",
    timestamp: "2024-01-15 13:40:25",
    type: "system",
  },
]

export function ActivityLogTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Filter activity logs based on search query and type
  const filteredLogs = mockActivityLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || log.type === typeFilter
    return matchesSearch && matchesType
  })

  // Sort logs by timestamp (newest first)
  const sortedLogs = [...filteredLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Paginate logs
  const totalPages = Math.ceil(sortedLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLogs = sortedLogs.slice(startIndex, startIndex + itemsPerPage)

  const getTypeBadge = (type: ActivityLog["type"]) => {
    switch (type) {
      case "sale":
        return (
          <Badge variant="default" className="bg-green-500 text-white">
            Sale
          </Badge>
        )
      case "order":
        return (
          <Badge variant="default" className="bg-accent text-accent-foreground">
            Order
          </Badge>
        )
      case "user":
        return <Badge variant="secondary">User</Badge>
      case "system":
        return <Badge variant="outline">System</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activity Log
          </CardTitle>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sale">Sales</SelectItem>
                <SelectItem value="order">Orders</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => {
                const { date, time } = formatTimestamp(log.timestamp)
                return (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell className="max-w-md">{log.action}</TableCell>
                    <TableCell>{getTypeBadge(log.type)}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell className="text-muted-foreground">{time}</TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No activity logs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedLogs.length)} of{" "}
              {sortedLogs.length} results
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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
