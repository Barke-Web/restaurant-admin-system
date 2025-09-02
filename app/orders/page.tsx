"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { AddOrderModal } from "@/components/orders/add-order-modal"
import { OrdersTable } from "@/components/orders/orders-table"
import { useOrders } from "@/lib/orders-store"

export default function OrdersPage() {
  const { orders, addOrder, updateOrderStatus } = useOrders()

  const handleAddOrder = (orderData: {
    customerName: string
    items: Array<{ name: string; quantity: number; price: number }>
    paymentMethod: string
    discount: number
    status: "Pending" | "Ready" | "Completed" | "Cancelled"
  }) => {
    addOrder(orderData)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground">Manage customer orders</p>
          </div>
          <AddOrderModal onAddOrder={handleAddOrder} />
        </div>

        <OrdersTable orders={orders} onUpdateOrderStatus={updateOrderStatus} />
      </div>
    </MainLayout>
  )
}
