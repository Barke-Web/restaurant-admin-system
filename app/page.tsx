"use client"
import  Loading  from "@/components/ui/loading"
import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { SalesSummaryCard } from "@/components/dashboard/sales-summary-card"
import { TotalOrdersCard } from "@/components/dashboard/total-orders-card"
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table"
import { OrdersOverTimeChart } from "@/components/reports/orders-over-time-chart"
import { SalesDistributionChart } from "@/components/reports/sales-distribution-chart"
import { MonthlyRevenueChart } from "@/components/reports/monthly-revenue-chart"

export default function DashboardPage() {
    const [loading, setLoading] = useState(true)

   useEffect(() => {
    // Shorter simulated API call
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000) // 1 second instead of 2

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loading />
  }
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your restaurant admin dashboard</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <SalesSummaryCard />
          <TotalOrdersCard />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <OrdersOverTimeChart />
          <SalesDistributionChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          <MonthlyRevenueChart />
        </div>

        {/* Recent Orders Table */}
        <RecentOrdersTable />
      </div>
    </MainLayout>
  )
}
