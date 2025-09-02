"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, Search } from "lucide-react"
import { useState } from "react"
import { useOrders } from "@/lib/orders-store"

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const { getReadyOrders } = useOrders()
  const readyOrders = getReadyOrders()

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {readyOrders.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {readyOrders.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2">
              <h4 className="font-semibold text-sm mb-2">Notifications</h4>
              {readyOrders.length > 0 ? (
                readyOrders.map((order) => (
                  <DropdownMenuItem key={order.id} className="flex flex-col items-start p-3">
                    <span className="font-medium">{order.orderNumber} is ready</span>
                    <span className="text-xs text-muted-foreground">Customer: {order.customerName}</span>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
