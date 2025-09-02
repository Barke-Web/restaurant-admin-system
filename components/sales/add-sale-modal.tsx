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

interface AddSaleModalProps {
  onAddSale: (sale: {
    item: string
    quantity: number
    totalPrice: number
    discount: number
  }) => void
}

export function AddSaleModal({ onAddSale }: AddSaleModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [discount, setDiscount] = useState(0)

  const selectedMenuItem = menuItems.find((item) => item.id === selectedItem)
  const subtotal = selectedMenuItem ? selectedMenuItem.price * quantity : 0
  const totalPrice = subtotal - discount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMenuItem) return

    onAddSale({
      item: selectedMenuItem.name,
      quantity,
      totalPrice: Math.max(0, totalPrice),
      discount,
    })

    // Reset form
    setSelectedItem("")
    setQuantity(1)
    setDiscount(0)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Sale</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item">Item</Label>
            <Select value={selectedItem} onValueChange={setSelectedItem} required>
              <SelectTrigger>
                <SelectValue placeholder="Select an item" />
              </SelectTrigger>
              <SelectContent>
                {menuItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name} - ${item.price.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
              required
            />
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

          {selectedMenuItem && (
            <div className="space-y-2 p-3 bg-muted rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedMenuItem} className="flex-1">
              Add Sale
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
