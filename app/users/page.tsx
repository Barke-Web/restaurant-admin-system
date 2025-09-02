"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { UsersTable } from "@/components/users/users-table"
import { CreateUserForm } from "@/components/auth/signup-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Cashier"
  lastActive: string
  status: "Active" | "Inactive"
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Add new user
  const handleAddUser = (user: Omit<User, "id" | "lastActive" | "status"> & { password?: string }) => {
    const newUser: User = {
      id: Date.now().toString(),
      lastActive: new Date().toISOString(),
      status: "Active",
      ...user,
    }
    setUsers((prev) => [...prev, newUser])
  }

  // Update user role
  const handleUpdateUserRole = (userId: string, role: User["role"]) => {
    setUsers((prev) => prev.map(u => u.id === userId ? { ...u, role } : u))
  }

  // Update user status
  const handleUpdateUserStatus = (userId: string, status: User["status"]) => {
    setUsers((prev) => prev.map(u => u.id === userId ? { ...u, status } : u))
  }

  return (
    <MainLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground">Manage users and permissions</p>
          </div>

          {/* Add User Button with Modal */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsOpen(true)}>Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <CreateUserForm
                onSubmit={(data) => handleAddUser(data)}
                onClose={() => setIsOpen(false)} // closes modal after submit
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Table */}
        <UsersTable
          users={users}
          onUpdateUserRole={handleUpdateUserRole}
          onUpdateUserStatus={handleUpdateUserStatus}
        />
      </div>
    </MainLayout>
  )
}
