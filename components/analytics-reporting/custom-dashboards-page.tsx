"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusIcon, EditIcon, LayoutDashboardIcon, TrashIcon } from "lucide-react"

interface Dashboard {
  id: string
  name: string
  description: string
  createdBy: string
  lastModified: string
}

const initialDashboards: Dashboard[] = [
  {
    id: "1",
    name: "HR Executive Dashboard",
    description: "Overview for HR leadership",
    createdBy: "Admin User",
    lastModified: "2024-03-15",
  },
  {
    id: "2",
    name: "Recruitment Funnel",
    description: "Track applicant progress",
    createdBy: "HR Specialist",
    lastModified: "2024-03-10",
  },
  {
    id: "3",
    name: "Employee Performance Summary",
    description: "Manager's view of team performance",
    createdBy: "Team Manager",
    lastModified: "2024-03-01",
  },
]

interface CustomDashboardsPageProps {
  onBack: () => void
}

export default function CustomDashboardsPage({ onBack }: CustomDashboardsPageProps) {
  const [dashboards, setDashboards] = useState<Dashboard[]>(initialDashboards)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDashboards = dashboards.filter(
    (dashboard) =>
      dashboard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dashboard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dashboard.createdBy.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateDashboard = () => {
    alert("Create New Dashboard functionality not implemented yet.")
  }

  const handleEditDashboard = (id: string) => {
    alert(`Edit Dashboard with ID: ${id} functionality not implemented yet.`)
  }

  const handleViewDashboard = (id: string) => {
    alert(`View Dashboard with ID: ${id} functionality not implemented yet.`)
  }

  const handleDeleteDashboard = (id: string) => {
    if (confirm(`Are you sure you want to delete dashboard with ID: ${id}?`)) {
      setDashboards(dashboards.filter((dashboard) => dashboard.id !== id))
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Custom Dashboards</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Dashboards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search dashboards..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateDashboard}>
              <PlusIcon className="h-4 w-4 mr-2" /> Create New Dashboard
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dashboard Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDashboards.map((dashboard) => (
                <TableRow key={dashboard.id}>
                  <TableCell className="font-medium">{dashboard.name}</TableCell>
                  <TableCell className="text-muted-foreground">{dashboard.description}</TableCell>
                  <TableCell>{dashboard.createdBy}</TableCell>
                  <TableCell>{dashboard.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDashboard(dashboard.id)}
                      title="View Dashboard"
                    >
                      <LayoutDashboardIcon className="h-4 w-4" />
                      <span className="sr-only">View Dashboard</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditDashboard(dashboard.id)}>
                      <EditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteDashboard(dashboard.id)}>
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredDashboards.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No dashboards found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
