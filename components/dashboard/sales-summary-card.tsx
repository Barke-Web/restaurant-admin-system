import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"
import { formatKES } from "@/utils/format"
// Mock data for sales summary
const salesData = {
  today: 2450.0,
  weekly: 18750.0,
  monthly: 75200.0,
}

export function SalesSummaryCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Sales Summary</CardTitle>
        <DollarSign className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Today's Sales */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <Calendar className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">Today's Sales</p>
                <p className="text-2xl font-bold text-foreground">  {formatKES(salesData.today)}</p>
              </div>
            </div>
          </div>

          {/* Weekly Sales */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <TrendingUp className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">Weekly Sales</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatKES(salesData.weekly)}
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Sales */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <DollarSign className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">Monthly Sales</p>
                <p className="text-2xl font-bold text-foreground">  {formatKES(salesData.monthly)}</p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/sales">
          <Button className="w-full mt-4 bg-transparent" variant="outline">
            View More Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
