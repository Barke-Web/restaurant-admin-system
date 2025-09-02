"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock menu data
const mockMenuItems = [
  { id: 1, name: "Classic Burger", description: "Beef patty with lettuce, tomato, and cheese", price: 12.99, category: "Main Course", available: true, }, 
  { id: 2, name: "Margherita Pizza", description: "Fresh mozzarella, tomato sauce, and basil", price: 14.99, category: "Main Course", available: true, }, 
  { id: 3, name: "Caesar Salad", description: "Romaine lettuce with Caesar dressing and croutons", price: 8.99, category: "Appetizer", available: true, }, 
  { id: 4, name: "Chocolate Cake", description: "Rich chocolate cake with vanilla ice cream", price: 6.99, category: "Dessert", available: false, },
  { id: 5, name: "French Fries", description: "Crispy golden fries with sea salt", price: 4.99, category: "Side", available: true, },
  {
  id: 6,
  name: "Grilled Chicken Sandwich",
  description: "Juicy grilled chicken with lettuce and tomato",
  price: 11.99,
  category: "Main Course",
  available: true,
},
{
  id: 7,
  name: "Spaghetti Bolognese",
  description: "Spaghetti pasta with rich meat sauce",
  price: 13.99,
  category: "Main Course",
  available: true,
},
{
  id: 8,
  name: "Garlic Bread",
  description: "Toasted bread with garlic butter",
  price: 3.99,
  category: "Side",
  available: true,
},
{
  id: 9,
  name: "Tiramisu",
  description: "Classic Italian dessert with mascarpone cheese",
  price: 7.99,
  category: "Dessert",
  available: true,
},
{
  id: 10,
  name: "Minestrone Soup",
  description: "Vegetable soup with beans and pasta",
  price: 5.99,
  category: "Appetizer",
  available: true,
},
{
  id: 11,
  name: "Veggie Burger",
  description: "Grilled veggie patty with lettuce and tomato",
  price: 10.99,
  category: "Main Course",
  available: true,
},
{
  id: 12,
  name: "Chicken Caesar Wrap",
  description: "Grilled chicken with Caesar salad wrapped in a tortilla",
  price: 9.99,
  category: "Main Course",
  available: true,
},
{
  id: 13,
  name: "Mozzarella Sticks",
  description: "Fried mozzarella with marinara sauce",
  price: 6.49,
  category: "Appetizer",
  available: true,
},
{
  id: 14,
  name: "Lemon Tart",
  description: "Tangy lemon tart with a buttery crust",
  price: 6.99,
  category: "Dessert",
  available: true,
},
{
  id: 15,
  name: "Onion Rings",
  description: "Crispy battered onion rings",
  price: 4.49,
  category: "Side",
  available: true,
},
]

export function MenuTable() {
  const [menuItems, setMenuItems] = useState(mockMenuItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: true,
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      const item = {
        id: Date.now(),
        name: newItem.name,
        description: newItem.description,
        price: Number.parseFloat(newItem.price),
        category: newItem.category,
        available: newItem.available,
      }
      setMenuItems([item, ...menuItems])
      setNewItem({ name: "", description: "", price: "", category: "", available: true })
      setIsAddModalOpen(false)
      setCurrentPage(1) // reset to first page after adding
    }
  }

  const handleRemoveItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const toggleAvailability = (id: number) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Menu Management
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // reset to first page when searching
                }}
                className="pl-10 w-64"
              />
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Menu Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="Enter item name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="Enter item description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Appetizer">Appetizer</SelectItem>
                        <SelectItem value="Main Course">Main Course</SelectItem>
                        <SelectItem value="Side">Side</SelectItem>
                        <SelectItem value="Dessert">Dessert</SelectItem>
                        <SelectItem value="Beverage">Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddItem}>Add Item</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          {paginatedItems.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Description</th>
                  <th className="text-left p-4 font-medium">Price</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4 text-muted-foreground max-w-xs truncate">{item.description}</td>
                    <td className="p-4">{item.price.toFixed(2)}</td>
                    <td className="p-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={item.available ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleAvailability(item.id)}
                      >
                        {item.available ? "Available" : "Unavailable"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No menu items found matching your search.</div>
          )}
        </div>

        {/* Pagination */}
        {paginatedItems.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} results
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
