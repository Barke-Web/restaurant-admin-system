"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { AddSaleModal } from "@/components/sales/add-sale-modal"
import { SalesTable } from "@/components/sales/sales-table"

// Mock sales data
const initialSales = [
  {
    id: "1",
    item: "Classic Burger",
    quantity: 2,
    totalPrice: 25.98,
    date: "2024-01-15",
    discount: 0,
  },
  {
    id: "2",
    item: "Margherita Pizza",
    quantity: 1,
    totalPrice: 16.5,
    date: "2024-01-15",
    discount: 2.0,
  },
  {
    id: "3",
    item: "Chicken Alfredo",
    quantity: 3,
    totalPrice: 47.25,
    date: "2024-01-15",
    discount: 0,
  },
  {
    id: "4",
    item: "Caesar Salad",
    quantity: 1,
    totalPrice: 9.99,
    date: "2024-01-14",
    discount: 0,
  },
  {
    id: "5",
    item: "Grilled Steak",
    quantity: 2,
    totalPrice: 44.98,
    date: "2024-01-14",
    discount: 5.0,
  },
  {
    id: "6",
    item: "Salmon Fillet",
    quantity: 1,
    totalPrice: 22.5,
    date: "2024-01-14",
    discount: 0,
  },
  {
    id: "7",
    item: "Tomato Soup",
    quantity: 4,
    totalPrice: 31.96,
    date: "2024-01-13",
    discount: 0,
  },
  {
    id: "8",
    item: "Club Sandwich",
    quantity: 2,
    totalPrice: 21.0,
    date: "2024-01-13",
    discount: 2.0,
  },
  {
    id: "9",
    item: "Classic Burger",
    quantity: 1,
    totalPrice: 12.99,
    date: "2024-01-13",
    discount: 0,
  },
  {
    id: "10",
    item: "Margherita Pizza",
    quantity: 2,
    totalPrice: 37.0,
    date: "2024-01-12",
    discount: 0,
  },
  {
    id: "11",
    item: "Caesar Salad",
    quantity: 3,
    totalPrice: 27.97,
    date: "2024-01-12",
    discount: 2.0,
  },
  {
    id: "12",
    item: "Grilled Steak",
    quantity: 1,
    totalPrice: 24.99,
    date: "2024-01-12",
    discount: 0,
  },
]

export default function SalesPage() {
  const [sales, setSales] = useState(
  [...initialSales].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
)

  const handleAddSale = (newSale: {
    item: string
    quantity: number
    totalPrice: number
    discount: number
  }) => {
    const sale = {
      id: (sales.length + 1).toString(),
      ...newSale,
      date: new Date().toISOString().split("T")[0],
    }
    setSales((prev) => [sale, ...prev])
  }


  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales</h1>
            <p className="text-muted-foreground">Manage and view sales data</p>
          </div>
          <AddSaleModal onAddSale={handleAddSale} />
        </div>

        <SalesTable sales={sales} />
      </div>
    </MainLayout>
  )
}
