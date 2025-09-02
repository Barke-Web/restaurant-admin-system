"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { MenuTable } from "@/components/menu/menu-table"

export default function MenuPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Menu Management</h1>
          <p className="text-muted-foreground">Manage your restaurant menu items</p>
        </div>

        <MenuTable />
      </div>
    </MainLayout>
  )
}
