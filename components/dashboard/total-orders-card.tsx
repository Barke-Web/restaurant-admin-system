import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data for orders summary
const ordersData = {
  total: 156,
  pending: 12,
  ready: 8,
  completed: 136,
}

export function TotalOrdersCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Total Orders</CardTitle>
        <ShoppingCart className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-foreground">{ordersData.total}</p>
          <p className="text-sm text-muted-foreground">Total Orders Today</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-yellow-500" />
            </div>
            <p className="text-lg font-semibold">{ordersData.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>

          <div className="p-2 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center mb-1">
              <AlertCircle className="h-4 w-4 text-accent" />
            </div>
            <p className="text-lg font-semibold">{ordersData.ready}</p>
            <p className="text-xs text-muted-foreground">Ready</p>
          </div>

          <div className="p-2 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-lg font-semibold">{ordersData.completed}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>

        <Link href="/orders">
          <Button className="w-full mt-4 bg-transparent" variant="outline">
            View More
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
