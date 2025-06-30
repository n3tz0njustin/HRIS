"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { SearchIcon, MapPinIcon, HomeIcon, BuildingIcon } from "lucide-react"

interface WorkSchedule {
  id: string
  employee: string
  workType: "Remote" | "Office" | "Hybrid"
  schedule: string
  location: string
  status: "Active" | "Pending" | "Approved"
}

const initialSchedules: WorkSchedule[] = [
  {
    id: "1",
    employee: "Alice Smith",
    workType: "Hybrid",
    schedule: "Mon-Wed: Office, Thu-Fri: Remote",
    location: "Main Office / Home",
    status: "Active",
  },
  {
    id: "2",
    employee: "Bob Johnson",
    workType: "Remote",
    schedule: "Mon-Fri: Remote",
    location: "Home Office",
    status: "Active",
  },
  {
    id: "3",
    employee: "Charlie Brown",
    workType: "Office",
    schedule: "Mon-Fri: 9AM-5PM",
    location: "Main Office",
    status: "Active",
  },
  {
    id: "4",
    employee: "Diana Prince",
    workType: "Hybrid",
    schedule: "Flexible Schedule Request",
    location: "Branch Office / Home",
    status: "Pending",
  },
]

interface FlexibleWorkSchedulingPageProps {
  onBack: () => void
}

export default function FlexibleWorkSchedulingPage({ onBack }: FlexibleWorkSchedulingPageProps) {
  const [schedules, setSchedules] = useState<WorkSchedule[]>(initialSchedules)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.workType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApproveSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((schedule) => (schedule.id === id ? { ...schedule, status: "Approved" } : schedule)),
    )
    alert(`Schedule for ${id} approved.`)
  }

  const getWorkTypeIcon = (type: string) => {
    switch (type) {
      case "Remote":
        return <HomeIcon className="h-4 w-4" />
      case "Office":
        return <BuildingIcon className="h-4 w-4" />
      case "Hybrid":
        return <MapPinIcon className="h-4 w-4" />
      default:
        return <MapPinIcon className="h-4 w-4" />
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Flexible Work Scheduling</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remote Workers</CardTitle>
            <HomeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">36% of workforce</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hybrid Workers</CardTitle>
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">26% of workforce</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Office Workers</CardTitle>
            <BuildingIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">38% of workforce</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Work Schedules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex-1 mb-4">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search schedules..."
              className="w-full rounded-lg bg-background pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Work Type</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.employee}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getWorkTypeIcon(schedule.workType)}
                      {schedule.workType}
                    </div>
                  </TableCell>
                  <TableCell>{schedule.schedule}</TableCell>
                  <TableCell>{schedule.location}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        schedule.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : schedule.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {schedule.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {schedule.status === "Pending" && (
                      <Button variant="ghost" size="sm" onClick={() => handleApproveSchedule(schedule.id)}>
                        Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredSchedules.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No schedules found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
