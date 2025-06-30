"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, MapIcon as Sitemap, UserCheck } from "lucide-react"

interface CoreHROverviewProps {
  onNavigate: (page: string) => void
}

export default function CoreHROverview({ onNavigate }: CoreHROverviewProps) {
  const modules = [
    {
      id: "employee-database",
      title: "Employee Database",
      description: "Manage comprehensive employee records and information",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      id: "document-management",
      title: "Document Management",
      description: "Store and organize HR documents and policies",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      id: "org-chart",
      title: "Organizational Chart",
      description: "Visualize company structure and reporting relationships",
      icon: Sitemap,
      color: "bg-purple-500",
    },
    {
      id: "self-service-portal",
      title: "Self-Service Portal",
      description: "Employee self-service for personal information management",
      icon: UserCheck,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Core HR Management</h2>
        <p className="text-muted-foreground">Manage your organization's core HR functions and employee data.</p>
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
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Sitemap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across 3 locations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
