"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCwIcon, ClockIcon, UsersIcon, TrendingUpIcon, BarChartIcon } from "lucide-react"

interface RealTimeReportsPageProps {
  onBack: () => void
}

export default function RealTimeReportsPage({ onBack }: RealTimeReportsPageProps) {
  const [liveData, setLiveData] = useState({
    activeEmployees: 145,
    newHiresToday: 2,
    pendingLeaveRequests: 3,
    averageAttendanceRate: 98.2,
  })
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData({
        activeEmployees: 140 + Math.floor(Math.random() * 10),
        newHiresToday: Math.floor(Math.random() * 3),
        pendingLeaveRequests: Math.floor(Math.random() * 5),
        averageAttendanceRate: Number.parseFloat((95 + Math.random() * 5).toFixed(1)),
      })
      setLastUpdated(new Date())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Real-time Reports</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Live HR Metrics</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCwIcon className="h-4 w-4 animate-spin-slow" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <UsersIcon className="h-8 w-8 text-primary mb-2" />
              <p className="text-3xl font-bold">{liveData.activeEmployees}</p>
              <p className="text-sm text-muted-foreground">Active Employees</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <TrendingUpIcon className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-3xl font-bold">{liveData.newHiresToday}</p>
              <p className="text-sm text-muted-foreground">New Hires Today</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <ClockIcon className="h-8 w-8 text-yellow-500 mb-2" />
              <p className="text-3xl font-bold">{liveData.pendingLeaveRequests}</p>
              <p className="text-sm text-muted-foreground">Pending Leave Requests</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <BarChartIcon className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-3xl font-bold">{liveData.averageAttendanceRate}%</p>
              <p className="text-sm text-muted-foreground">Avg. Attendance Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-y-auto border rounded-md p-4 text-sm bg-muted/20">
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">[{new Date().toLocaleTimeString()}]</span> John Doe submitted a leave
                request.
              </li>
              <li>
                <span className="font-semibold">[{new Date().toLocaleTimeString()}]</span> New employee profile created
                for Sarah Lee.
              </li>
              <li>
                <span className="font-semibold">[{new Date().toLocaleTimeString()}]</span> Performance review for Mike
                Ross initiated.
              </li>
              <li>
                <span className="font-semibold">[{new Date().toLocaleTimeString()}]</span> Document "Q1 Financial
                Report" accessed by Admin.
              </li>
              <li>
                <span className="font-semibold">[{new Date().toLocaleTimeString()}]</span> Payroll processing for March
                completed.
              </li>
              <li>
                <span className="font-semibold">[{new Date().toLocaleTimeString()}]</span> New job posting for "Senior
                Developer" published.
              </li>
              <li>
                <span className="font-semibold">[{new Date().toLocaleTimeString()}]</span> Employee feedback submitted
                by Emily White.
              </li>
              <li>
                <span className="font-semibold">[{new Date().toLocaleTimeString()}]</span> Training module "Leadership
                Skills" completed by 5 employees.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
