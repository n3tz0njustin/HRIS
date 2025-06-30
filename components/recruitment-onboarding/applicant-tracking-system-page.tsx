"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusIcon, EyeIcon, CheckIcon, XIcon } from "lucide-react"

interface Applicant {
  id: string
  name: string
  email: string
  position: string
  status: "New" | "Interviewing" | "Offered" | "Hired" | "Rejected"
}

const initialApplicants: Applicant[] = [
  { id: "1", name: "Emily White", email: "emily@example.com", position: "Software Engineer", status: "Interviewing" },
  { id: "2", name: "Daniel Green", email: "daniel@example.com", position: "Product Manager", status: "New" },
  { id: "3", name: "Olivia Black", email: "olivia@example.com", position: "UX Designer", status: "Offered" },
  { id: "4", name: "James Blue", email: "james@example.com", position: "Data Analyst", status: "Rejected" },
]

interface ApplicantTrackingSystemPageProps {
  onBack: () => void
}

export default function ApplicantTrackingSystemPage({ onBack }: ApplicantTrackingSystemPageProps) {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddApplicant = () => {
    alert("Add Applicant functionality not implemented yet.")
  }

  const handleViewApplicant = (id: string) => {
    alert(`View Applicant with ID: ${id} functionality not implemented yet.`)
  }

  const handleUpdateStatus = (id: string, newStatus: Applicant["status"]) => {
    setApplicants((prev) =>
      prev.map((applicant) => (applicant.id === id ? { ...applicant, status: newStatus } : applicant)),
    )
    alert(`Applicant ${id} status updated to ${newStatus}.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Applicant Tracking System</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applicant List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search applicants..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddApplicant}>
              <PlusIcon className="h-4 w-4 mr-2" /> Add Applicant
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell className="font-medium">{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.position}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        applicant.status === "New"
                          ? "bg-blue-100 text-blue-800"
                          : applicant.status === "Interviewing"
                            ? "bg-yellow-100 text-yellow-800"
                            : applicant.status === "Offered"
                              ? "bg-purple-100 text-purple-800"
                              : applicant.status === "Hired"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewApplicant(applicant.id)}>
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    {applicant.status !== "Hired" && applicant.status !== "Rejected" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdateStatus(applicant.id, "Hired")}
                          title="Mark as Hired"
                        >
                          <CheckIcon className="h-4 w-4 text-green-600" />
                          <span className="sr-only">Mark as Hired</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdateStatus(applicant.id, "Rejected")}
                          title="Mark as Rejected"
                        >
                          <XIcon className="h-4 w-4 text-red-600" />
                          <span className="sr-only">Mark as Rejected</span>
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredApplicants.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No applicants found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
