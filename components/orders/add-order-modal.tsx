"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

// Predefined menu items with prices
const menuItems = [
  { id: "burger", name: "Classic Burger", price: 12.99 },
  { id: "pizza", name: "Margherita Pizza", price: 18.5 },
  { id: "pasta", name: "Chicken Alfredo", price: 15.75 },
  { id: "salad", name: "Caesar Salad", price: 9.99 },
  { id: "steak", name: "Grilled Steak", price: 24.99 },
  { id: "fish", name: "Salmon Fillet", price: 22.5 },
  { id: "soup", name: "Tomato Soup", price: 7.99 },
  { id: "sandwich", name: "Club Sandwich", price: 11.5 },
]

const paymentMethods = ["Credit Card", "Debit Card", "Cash", "Mobile Payment"]

interface AddOrderModalProps {
  onAddOrder: (order: {
    customerName: string
    items: Array<{ name: string; quantity: number; price: number }>
    paymentMethod: string
    discount: number
    status: "Pending" | "Ready" | "Completed" | "Cancelled"
  }) => void
}

export function AddOrderModal({ onAddOrder }: AddOrderModalProps) {
  const [open, setOpen] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [selectedItems, setSelectedItems] = useState<Array<{ id: string; quantity: number }>>([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [discount, setDiscount] = useState(0)

  const addItem = () => {
    setSelectedItems([...selectedItems, { id: "", quantity: 1 }])
  }

  const updateItem = (index: number, field: "id" | "quantity", value: string | number) => {
    const updated = [...selectedItems]
    if (field === "id") {
      updated[index].id = value as string
    } else {
      updated[index].quantity = value as number
    }
    setSelectedItems(updated)
  }

  const removeItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    const subtotal = selectedItems.reduce((total, item) => {
      const menuItem = menuItems.find((m) => m.id === item.id)
      return total + (menuItem ? menuItem.price * item.quantity : 0)
    }, 0)
    return Math.max(0, subtotal - discount)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName || selectedItems.length === 0 || !paymentMethod) return

    const orderItems = selectedItems
      .filter((item) => item.id)
      .map((item) => {
        const menuItem = menuItems.find((m) => m.id === item.id)!
        return {
          name: menuItem.name,
          quantity: item.quantity,
          price: menuItem.price,
        }
      })

    onAddOrder({
      customerName,
      items: orderItems,
      paymentMethod,
      discount,
      status: "Pending",
    })

    // Reset form
    setCustomerName("")
    setSelectedItems([])
    setPaymentMethod("")
    setDiscount(0)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                Add Item
              </Button>
            </div>
            {selectedItems.map((item, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Select value={item.id} onValueChange={(value) => updateItem(index, "id", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuItems.map((menuItem) => (
                        <SelectItem key={menuItem.id} value={menuItem.id}>
                          {menuItem.name} - ${menuItem.price.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-20">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 1)}
                    placeholder="Qty"
                  />
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => removeItem(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">Discount ($)</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              step="0.01"
              value={discount}
              onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
            />
          </div>

          {selectedItems.length > 0 && (
            <div className="space-y-2 p-3 bg-muted rounded-lg">
              <div className="font-semibold">Order Summary:</div>
              {selectedItems
                .filter((item) => item.id)
                .map((item, index) => {
                  const menuItem = menuItems.find((m) => m.id === item.id)
                  return (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {menuItem?.name} x{item.quantity}
                      </span>
                      <span>${((menuItem?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  )
                })}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!customerName || selectedItems.length === 0 || !paymentMethod}
              className="flex-1"
            >
              Add Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
