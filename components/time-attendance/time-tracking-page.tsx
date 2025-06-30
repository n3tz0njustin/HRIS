"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchIcon, PlayIcon, PauseIcon, MonitorStopIcon as StopIcon } from "lucide-react"

interface TimeEntry {
  id: string
  employee: string
  date: string
  clockIn: string
  clockOut: string
  totalHours: string
  status: "Active" | "Completed" | "Break"
}

const initialTimeEntries: TimeEntry[] = [
  {
    id: "1",
    employee: "Alice Smith",
    date: "2024-03-15",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    totalHours: "8.5",
    status: "Completed",
  },
  {
    id: "2",
    employee: "Bob Johnson",
    date: "2024-03-15",
    clockIn: "08:30 AM",
    clockOut: "-",
    totalHours: "6.5",
    status: "Active",
  },
  {
    id: "3",
    employee: "Charlie Brown",
    date: "2024-03-15",
    clockIn: "09:15 AM",
    clockOut: "-",
    totalHours: "3.0",
    status: "Break",
  },
]

interface TimeTrackingPageProps {
  onBack: () => void
}

export default function TimeTrackingPage({ onBack }: TimeTrackingPageProps) {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(initialTimeEntries)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  const filteredEntries = timeEntries.filter(
    (entry) =>
      entry.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleClockIn = () => {
    alert("Clock In functionality not implemented yet.")
  }

  const handleClockOut = () => {
    alert("Clock Out functionality not implemented yet.")
  }

  const handleBreak = () => {
    alert("Break functionality not implemented yet.")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Time Tracking</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button onClick={handleClockIn} className="flex-1">
              <PlayIcon className="h-4 w-4 mr-2" /> Clock In
            </Button>
            <Button onClick={handleBreak} variant="outline" className="flex-1 bg-transparent">
              <PauseIcon className="h-4 w-4 mr-2" /> Break
            </Button>
            <Button onClick={handleClockOut} variant="destructive" className="flex-1">
              <StopIcon className="h-4 w-4 mr-2" /> Clock Out
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{currentTime}</div>
            <p className="text-sm text-muted-foreground">Today: March 15, 2024</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex-1 mb-4">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search time entries..."
              className="w-full rounded-lg bg-background pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.employee}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.clockIn}</TableCell>
                  <TableCell>{entry.clockOut}</TableCell>
                  <TableCell>{entry.totalHours}h</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        entry.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : entry.status === "Break"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredEntries.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No time entries found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
