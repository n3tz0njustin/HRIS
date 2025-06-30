"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, UploadIcon, DownloadIcon, TrashIcon, EyeIcon } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  uploadedBy: string
  uploadDate: string
}

const initialDocuments: Document[] = [
  { id: "1", name: "Employee Handbook 2024", type: "PDF", uploadedBy: "Alice Smith", uploadDate: "2024-01-15" },
  { id: "2", name: "HR Policy Manual", type: "PDF", uploadedBy: "Bob Johnson", uploadDate: "2023-11-01" },
  { id: "3", name: "Onboarding Checklist", type: "DOCX", uploadedBy: "Charlie Brown", uploadDate: "2024-02-20" },
  { id: "4", name: "Leave Request Form", type: "PDF", uploadedBy: "Diana Prince", uploadDate: "2024-03-10" },
]

interface DocumentManagementPageProps {
  onBack: () => void
}

export default function DocumentManagementPage({ onBack }: DocumentManagementPageProps) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUploadDocument = () => {
    // Placeholder for document upload logic
    alert("Upload Document functionality not implemented yet.")
  }

  const handleDownloadDocument = (id: string) => {
    // Placeholder for document download logic
    alert(`Download Document with ID: ${id} functionality not implemented yet.`)
  }

  const handleViewDocument = (id: string) => {
    // Placeholder for document view logic
    alert(`View Document with ID: ${id} functionality not implemented yet.`)
  }

  const handleDeleteDocument = (id: string) => {
    // Placeholder for document deletion logic
    if (confirm(`Are you sure you want to delete document with ID: ${id}?`)) {
      setDocuments(documents.filter((doc) => doc.id !== id))
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Document Management</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleUploadDocument}>
              <UploadIcon className="h-4 w-4 mr-2" /> Upload Document
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.uploadedBy}</TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDocument(doc.id)}>
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadDocument(doc.id)}>
                      <DownloadIcon className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteDocument(doc.id)}>
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredDocuments.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No documents found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
