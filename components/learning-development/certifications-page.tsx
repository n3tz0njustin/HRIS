"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusIcon, EyeIcon, CalendarXIcon } from "lucide-react"

interface Certification {
  id: string
  employeeName: string
  name: string
  issuingBody: string
  issueDate: string
  expiryDate?: string
  status: "Active" | "Expired" | "Upcoming Expiry"
}

const initialCertifications: Certification[] = [
  {
    id: "1",
    employeeName: "Alice Smith",
    name: "PMP",
    issuingBody: "PMI",
    issueDate: "2022-01-01",
    expiryDate: "2025-01-01",
    status: "Active",
  },
  {
    id: "2",
    employeeName: "Bob Johnson",
    name: "AWS Certified Solutions Architect",
    issuingBody: "AWS",
    issueDate: "2021-06-15",
    expiryDate: "2024-07-15",
    status: "Upcoming Expiry",
  },
  {
    id: "3",
    employeeName: "Charlie Brown",
    name: "CompTIA Security+",
    issuingBody: "CompTIA",
    issueDate: "2019-03-01",
    expiryDate: "2022-03-01",
    status: "Expired",
  },
]

interface CertificationsPageProps {
  onBack: () => void
}

export default function CertificationsPage({ onBack }: CertificationsPageProps) {
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCertifications = certifications.filter(
    (cert) =>
      cert.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuingBody.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCertification = () => {
    alert("Add New Certification functionality not implemented yet.")
  }

  const handleViewDetails = (id: string) => {
    alert(`View Certification Details for ID: ${id} functionality not implemented yet.`)
  }

  const handleRenewCertification = (id: string) => {
    alert(`Renewing Certification with ID: ${id} functionality not implemented yet.`)
    // In a real app, this would update expiry date and status
    setCertifications((prev) =>
      prev.map((cert) => (cert.id === id ? { ...cert, status: "Active", expiryDate: "2027-01-01" } : cert)),
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search certifications..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddCertification}>
              <PlusIcon className="h-4 w-4 mr-2" /> Add New Certification
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Certification Name</TableHead>
                <TableHead>Issuing Body</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertifications.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.employeeName}</TableCell>
                  <TableCell>{cert.name}</TableCell>
                  <TableCell>{cert.issuingBody}</TableCell>
                  <TableCell>{cert.issueDate}</TableCell>
                  <TableCell>{cert.expiryDate || "N/A"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        cert.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : cert.status === "Upcoming Expiry"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(cert.id)}>
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                    {(cert.status === "Expired" || cert.status === "Upcoming Expiry") && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRenewCertification(cert.id)}
                        title="Renew Certification"
                      >
                        <CalendarXIcon className="h-4 w-4 text-primary" />
                        <span className="sr-only">Renew Certification</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredCertifications.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No certifications found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
