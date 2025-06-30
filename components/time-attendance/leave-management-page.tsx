"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchIcon, PlusIcon, CheckIcon, XIcon } from "lucide-react"

interface LeaveRequest {
  id: string
  employee: string
  type: "Vacation" | "Sick" | "Personal" | "Maternity"
  startDate: string
  endDate: string
  days: number
  status: "Pending" | "Approved" | "Rejected"
  reason: string
}

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employee: "Alice Smith",
    type: "Vacation",
    startDate: "2024-04-01",
    endDate: "2024-04-05",
    days: 5,
    status: "Pending",
    reason: "Family vacation",
  },
  {
    id: "2",
    employee: "Bob Johnson",
    type: "Sick",
    startDate: "2024-03-20",
    endDate: "2024-03-22",
    days: 3,
    status: "Approved",
    reason: "Medical appointment",
  },
  {
    id: "3",
    employee: "Charlie Brown",
    type: "Personal",
    startDate: "2024-04-10",
    endDate: "2024-04-10",
    days: 1,
    status: "Pending",
    reason: "Personal matters",
  },
]

interface LeaveManagementPageProps {
  onBack: () => void
}

export default function LeaveManagementPage({ onBack }: LeaveManagementPageProps) {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRequests = leaveRequests.filter(
    (request) =>
      request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateRequest = () => {
    alert("Create Leave Request functionality not implemented yet.")
  }

  const handleApproveRequest = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status: "Approved" } : request)),
    )
    alert(`Leave request ${id} approved.`)
  }

  const handleRejectRequest = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status: "Rejected" } : request)),
    )
    alert(`Leave request ${id} rejected.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Leave Management</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leave requests..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateRequest}>
              <PlusIcon className="h-4 w-4 mr-2" /> New Request
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.employee}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell>{request.days}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === "Pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleApproveRequest(request.id)}
                          title="Approve"
                        >
                          <CheckIcon className="h-4 w-4 text-green-600" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRejectRequest(request.id)}
                          title="Reject"
                        >
                          <XIcon className="h-4 w-4 text-red-600" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRequests.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No leave requests found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
