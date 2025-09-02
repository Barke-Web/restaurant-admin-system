"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { ReportsTable } from "@/components/reports/reports-table"
import { ExportOptions } from "@/components/reports/export-options"

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

export default function ReportsPage() {
  const [currentData, setCurrentData] = useState<ReportItem[]>([])

  return (
    <div className="flex">
      {/* ✅ Sidebar visible */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Reports</h1>

        {/* ✅ Export buttons appear here */}
        <ExportOptions data={currentData} />

        {/* ✅ Table */}
        <ReportsTable onFilteredData={setCurrentData} />
      </main>
    </div>
  )
}
