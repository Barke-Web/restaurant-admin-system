"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { ActivityLogTable } from "@/components/activity/activity-log-table"

export default function ActivityPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activity Log</h1>
          <p className="text-muted-foreground">View system activity and user actions</p>
        </div>

        <ActivityLogTable />
      </div>
    </MainLayout>
  )
}
