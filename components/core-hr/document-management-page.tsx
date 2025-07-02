"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, UploadIcon, DownloadIcon, TrashIcon, EyeIcon, FilterIcon } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  uploadedBy: string
  uploadDate: string
  size: string
  category: string
}

const initialDocuments: Document[] = [
  {
    id: "1",
    name: "Employee Handbook 2024",
    type: "PDF",
    uploadedBy: "Alice Smith",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    category: "Policy",
  },
  {
    id: "2",
    name: "HR Policy Manual",
    type: "PDF",
    uploadedBy: "Bob Johnson",
    uploadDate: "2023-11-01",
    size: "1.8 MB",
    category: "Policy",
  },
  {
    id: "3",
    name: "Onboarding Checklist",
    type: "DOCX",
    uploadedBy: "Charlie Brown",
    uploadDate: "2024-02-20",
    size: "156 KB",
    category: "Process",
  },
  {
    id: "4",
    name: "Leave Request Form",
    type: "PDF",
    uploadedBy: "Diana Prince",
    uploadDate: "2024-03-10",
    size: "89 KB",
    category: "Form",
  },
  {
    id: "5",
    name: "Performance Review Template",
    type: "XLSX",
    uploadedBy: "Edward Wilson",
    uploadDate: "2024-01-08",
    size: "245 KB",
    category: "Template",
  },
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
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Policy":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Process":
        return "bg-green-100 text-green-800 border-green-200"
      case "Form":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Template":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleUploadDocument = () => {
    alert("Upload Document functionality not implemented yet.")
  }

  const handleDownloadDocument = (id: string) => {
    alert(`Download Document with ID: ${id} functionality not implemented yet.`)
  }

  const handleViewDocument = (id: string) => {
    alert(`View Document with ID: ${id} functionality not implemented yet.`)
  }

  const handleDeleteDocument = (id: string) => {
    if (confirm(`Are you sure you want to delete this document?`)) {
      setDocuments(documents.filter((doc) => doc.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Document Management</h2>
          <p className="text-muted-foreground">Store, organize, and manage HR documents</p>
        </div>
        <Button onClick={onBack} variant="outline" className="bg-white/80 backdrop-blur-sm">
          Back to Overview
        </Button>
      </div>

      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            Document Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-10 bg-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <FilterIcon className="h-4 w-4" />
              Filter
            </Button>
            <Button
              onClick={handleUploadDocument}
              className="gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <UploadIcon className="h-4 w-4" />
              Upload Document
            </Button>
          </div>

          <div className="rounded-lg border bg-white/50 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50">
                  <TableHead>Document Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-accent/50 transition-colors">
                    <TableCell>
                      <div className="font-medium">{doc.name}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getCategoryColor(doc.category)}>
                        {doc.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        {doc.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                    <TableCell className="text-muted-foreground">{doc.uploadedBy}</TableCell>
                    <TableCell className="text-muted-foreground">{doc.uploadDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDocument(doc.id)}
                          className="h-8 w-8 hover:bg-blue-50"
                        >
                          <EyeIcon className="h-4 w-4 text-blue-600" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadDocument(doc.id)}
                          className="h-8 w-8 hover:bg-green-50"
                        >
                          <DownloadIcon className="h-4 w-4 text-green-600" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="h-8 w-8 hover:bg-red-50"
                        >
                          <TrashIcon className="h-4 w-4 text-red-600" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No documents found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="modern-card border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">
                {documents.filter((d) => d.category === "Policy").length}
              </p>
              <p className="text-sm text-blue-700">Policies</p>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-900">
                {documents.filter((d) => d.category === "Process").length}
              </p>
              <p className="text-sm text-green-700">Processes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-900">
                {documents.filter((d) => d.category === "Form").length}
              </p>
              <p className="text-sm text-purple-700">Forms</p>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card border-0 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-900">
                {documents.filter((d) => d.category === "Template").length}
              </p>
              <p className="text-sm text-orange-700">Templates</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
