"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  name: string
  email: string
  password?: string
  role: "Admin" | "Manager" | "Cashier"
  lastActive: string
  status: "Active" | "Inactive"
}

interface UsersTableProps {
  users: User[]
  onUpdateUserRole: (userId: string, role: User["role"]) => void
  onUpdateUserStatus: (userId: string, status: User["status"]) => void
}

export function UsersTable({ users, onUpdateUserRole, onUpdateUserStatus }: UsersTableProps) {
  const getStatusBadge = (status: User["status"]) => {
    return status === "Active" ? (
      <Badge variant="outline" className="border-green-600 text-green-600">
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="border-gray-500 text-gray-500">
        Inactive
      </Badge>
    )
  }

  const getStatusVariant = (status: User["status"]) =>
    status === "Active" ? "default" : "outline"

  const sortedUsers = [...users].sort(
    (a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
  )


  // Add 3 mock users if the users array is empty
  const displayedUsers = users.length > 0 ? users : [
    {
      id: "1",
      name: "John Admin",
      email: "john@restaurant.com",
      password: "admin123",
      role: "Admin",
      lastActive: new Date().toISOString(),
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Manager",
      email: "sarah@restaurant.com",
      password: "manager123",
      role: "Manager",
      lastActive: new Date(new Date().getTime() - 3600 * 1000).toISOString(),
      status: "Active",
    },
    {
      id: "3",
      name: "Mike Cashier",
      email: "mike@restaurant.com",
      password: "cashier123",
      role: "Cashier",
      lastActive: new Date(new Date().getTime() - 7200 * 1000).toISOString(),
      status: "Inactive",
    },
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Password</th>
                  <th className="p-2 text-left">Role</th>
                  <th className="p-2 text-left">Last Active</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 font-medium">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.password || "—"}</td>
                    <td className="p-2">
                      <Select value={user.role} onValueChange={(value) => onUpdateUserRole(user.id, value as User["role"])}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Cashier">Cashier</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2 text-muted-foreground">{new Date(user.lastActive).toLocaleString()}</td>
                    <td className="p-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className={user.status === "Active" ? "border-green-600 text-green-600" : "border-gray-500 text-gray-500"}
                        onClick={() => onUpdateUserStatus(user.id, user.status === "Active" ? "Inactive" : "Active")}
                      >
                        {user.status}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Admin:</strong> Full access - Can manage users, sales, orders, and system settings
            </p>
            <p>
              <strong>Manager:</strong> Can manage sales, orders, and view reports
            </p>
            <p>
              <strong>Cashier:</strong> Can manage orders and view basic sales data
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
