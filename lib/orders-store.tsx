"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Order {
  id: string
  orderNumber: string
  customerName: string
  totalPrice: number
  paymentMethod: string
  date: string
  discount: number
  status: "Pending" | "Ready" | "Completed" | "Cancelled"
  items: Array<{ name: string; quantity: number; price: number }>
}

interface OrdersContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "date" | "totalPrice">) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  getReadyOrders: () => Order[]
  getRecentOrders: (limit?: number) => Order[]
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

// Mock initial orders data
const initialOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#123",
    customerName: "John Smith",
    totalPrice: 45.99,
    paymentMethod: "Credit Card",
    date: "2024-01-15",
    discount: 0,
    status: "Ready",
    items: [
      { name: "Classic Burger", quantity: 2, price: 12.99 },
      { name: "Caesar Salad", quantity: 1, price: 9.99 },
    ],
  },
  {
    id: "2",
    orderNumber: "#124",
    customerName: "Sarah Johnson",
    totalPrice: 32.5,
    paymentMethod: "Cash",
    date: "2024-01-15",
    discount: 0,
    status: "Pending",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 18.5 },
      { name: "Tomato Soup", quantity: 1, price: 7.99 },
    ],
  },
  {
    id: "3",
    orderNumber: "#125",
    customerName: "Mike Davis",
    totalPrice: 67.25,
    paymentMethod: "Credit Card",
    date: "2024-01-15",
    discount: 0,
    status: "Ready",
    items: [
      { name: "Grilled Steak", quantity: 2, price: 24.99 },
      { name: "Chicken Alfredo", quantity: 1, price: 15.75 },
    ],
  },
  {
    id: "4",
    orderNumber: "#126",
    customerName: "Emily Wilson",
    totalPrice: 28.75,
    paymentMethod: "Debit Card",
    date: "2024-01-15",
    discount: 0,
    status: "Completed",
    items: [
      { name: "Club Sandwich", quantity: 2, price: 11.5 },
      { name: "Tomato Soup", quantity: 1, price: 7.99 },
    ],
  },
  {
    id: "5",
    orderNumber: "#127",
    customerName: "David Brown",
    totalPrice: 55.0,
    paymentMethod: "Credit Card",
    date: "2024-01-15",
    discount: 0,
    status: "Pending",
    items: [
      { name: "Salmon Fillet", quantity: 2, price: 22.5 },
      { name: "Caesar Salad", quantity: 1, price: 9.99 },
    ],
  },
  {
    id: "6",
    orderNumber: "#128",
    customerName: "Laura Martinez",
    totalPrice: 40.5,
    paymentMethod: "Cash",
    date: "2024-01-14",
    discount: 0,
    status: "Ready",
    items: [
      { name: "Classic Burger", quantity: 1, price: 12.99 },
      { name: "French Fries", quantity: 2, price: 4.99 },
      { name: "Chocolate Cake", quantity: 1, price: 6.99 },
    ],
  },
  {
    id: "7",
    orderNumber: "#129",
    customerName: "James Anderson",
    totalPrice: 38.0,
    paymentMethod: "Credit Card",
    date: "2024-01-14",
    discount: 0,
    status: "Completed",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 14.99 },
      { name: "Tomato Soup", quantity: 1, price: 7.99 },
    ],
  },
  {
    id: "8",
    orderNumber: "#130",
    customerName: "Olivia Thomas",
    totalPrice: 47.5,
    paymentMethod: "Debit Card",
    date: "2024-01-14",
    discount: 0,
    status: "Ready",
    items: [
      { name: "Grilled Steak", quantity: 1, price: 24.99 },
      { name: "Caesar Salad", quantity: 1, price: 9.99 },
      { name: "French Fries", quantity: 1, price: 4.99 },
      { name: "Chocolate Cake", quantity: 1, price: 6.99 },
    ],
  },
  {
    id: "9",
    orderNumber: "#131",
    customerName: "Ethan White",
    totalPrice: 25.98,
    paymentMethod: "Cash",
    date: "2024-01-13",
    discount: 0,
    status: "Pending",
    items: [
      { name: "Classic Burger", quantity: 2, price: 12.99 },
    ],
  },
  {
    id: "10",
    orderNumber: "#132",
    customerName: "Sophia Harris",
    totalPrice: 29.49,
    paymentMethod: "Credit Card",
    date: "2024-01-13",
    discount: 0,
    status: "Ready",
    items: [
      { name: "Chicken Alfredo", quantity: 1, price: 15.75 },
      { name: "Caesar Salad", quantity: 1, price: 9.99 },
      { name: "French Fries", quantity: 1, price: 3.75 },
    ],
  },
  {
    id: "11",
    orderNumber: "#133",
    customerName: "Benjamin Lewis",
    totalPrice: 34.5,
    paymentMethod: "Debit Card",
    date: "2024-01-12",
    discount: 0,
    status: "Completed",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 14.99 },
      { name: "Grilled Steak", quantity: 1, price: 24.99 },
    ],
  },
  {
    id: "12",
    orderNumber: "#134",
    customerName: "Isabella Walker",
    totalPrice: 22.99,
    paymentMethod: "Cash",
    date: "2024-01-12",
    discount: 0,
    status: "Ready",
    items: [
      { name: "Caesar Salad", quantity: 1, price: 9.99 },
      { name: "Tomato Soup", quantity: 1, price: 7.99 },
      { name: "French Fries", quantity: 1, price: 5.01 },
    ],
  },
  {
    id: "13",
    orderNumber: "#135",
    customerName: "Mason Young",
    totalPrice: 40.0,
    paymentMethod: "Credit Card",
    date: "2024-01-11",
    discount: 0,
    status: "Pending",
    items: [
      { name: "Grilled Steak", quantity: 1, price: 24.99 },
      { name: "Margherita Pizza", quantity: 1, price: 14.99 },
    ],
  },
  {
    id: "14",
    orderNumber: "#136",
    customerName: "Mia Hall",
    totalPrice: 27.98,
    paymentMethod: "Cash",
    date: "2024-01-11",
    discount: 0,
    status: "Completed",
    items: [
      { name: "Chicken Alfredo", quantity: 1, price: 15.75 },
      { name: "Caesar Salad", quantity: 1, price: 9.99 },
      { name: "French Fries", quantity: 1, price: 2.24 },
    ],
  },
  {
    id: "15",
    orderNumber: "#137",
    customerName: "Alexander Allen",
    totalPrice: 33.5,
    paymentMethod: "Debit Card",
    date: "2024-01-10",
    discount: 0,
    status: "Ready",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 14.99 },
      { name: "Tomato Soup", quantity: 1, price: 3.52 },
    ],
  },
]

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const addOrder = (orderData: Omit<Order, "id" | "orderNumber" | "date" | "totalPrice">) => {
    const totalPrice =
      orderData.items.reduce((total, item) => total + item.price * item.quantity, 0) - orderData.discount
    const newOrder: Order = {
      ...orderData,
      id: (orders.length + 1).toString(),
      orderNumber: `#${128 + orders.length}`,
      date: new Date().toISOString().split("T")[0],
      totalPrice: Math.max(0, totalPrice),
    }
    setOrders((prev) => [newOrder, ...prev])
  }

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const getReadyOrders = () => {
    return orders.filter((order) => order.status === "Ready")
  }

  const getRecentOrders = (limit = 5) => {
    return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit)
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getReadyOrders,
        getRecentOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
