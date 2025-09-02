"use client"

import { Button } from "@/components/ui/button"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"

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

interface ExportOptionsProps {
  data: ReportItem[]
}

export function ExportOptions({ data }: ExportOptionsProps) {
  const exportPDF = () => {
    const doc = new jsPDF()

    doc.text("Reports", 14, 10)

    autoTable(doc, {
      head: [["ID", "Type", "Order #", "Customer", "Items", "Total", "Date", "Status"]],
      body: data.map((item) => [
        item.id,
        item.type,
        item.orderNumber,
        item.customerName,
        item.items.join(", "),
        item.total.toFixed(2),
        item.date,
        item.status,
      ]),
    })

    doc.save("reports.pdf")
  }

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        ID: item.id,
        Type: item.type,
        "Order #": item.orderNumber,
        Customer: item.customerName,
        Items: item.items.join(", "),
        Total: item.total,
        Date: item.date,
        Status: item.status,
      }))
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports")
    XLSX.writeFile(workbook, "reports.xlsx")
  }

  return (
    <div className="flex space-x-2 mb-5">
      <Button onClick={exportPDF}>Export PDF</Button>
      <Button onClick={exportExcel}>Export Excel</Button>
    </div>
  )
}
