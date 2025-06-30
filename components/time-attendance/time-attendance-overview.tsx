"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar, MapPin, BarChart } from "lucide-react"

interface TimeAttendanceOverviewProps {
  onNavigate: (page: string) => void
}

export default function TimeAttendanceOverview({ onNavigate }: TimeAttendanceOverviewProps) {
  const modules = [
    {
      id: "time-tracking",
      title: "Time Tracking",
      description: "Track employee work hours and attendance",
      icon: Clock,
      color: "bg-blue-500",
    },
    {
      id: "leave-management",
      title: "Leave Management",
      description: "Manage vacation, sick leave, and time-off requests",
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      id: "flexible-work-scheduling",
      title: "Flexible Work Scheduling",
      description: "Manage remote work and flexible schedules",
      icon: MapPin,
      color: "bg-purple-500",
    },
    {
      id: "time-attendance-reporting",
      title: "Time & Attendance Reporting",
      description: "Generate reports on attendance and time data",
      icon: BarChart,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Time & Attendance</h2>
        <p className="text-muted-foreground">Manage employee time tracking, attendance, and leave requests.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{module.title}</CardTitle>
              <div className={`p-2 rounded-md ${module.color}`}>
                <module.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{module.description}</CardDescription>
              <Button onClick={() => onNavigate(module.id)} className="w-full">
                Access {module.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leave Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remote Workers Today</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">36% of workforce</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
