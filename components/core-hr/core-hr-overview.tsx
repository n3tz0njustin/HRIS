"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, MapIcon as Sitemap, UserCog, ChevronRight } from "lucide-react"

interface CoreHROverviewProps {
  onNavigate: (page: string) => void
}

export default function CoreHROverview({ onNavigate }: CoreHROverviewProps) {
  const modules = [
    {
      id: "employee-database",
      title: "Employee Database",
      description: "Manage employee profiles, personal information, and employment details",
      icon: Users,
      color: "bg-blue-500",
      stats: "1,234 employees",
    },
    {
      id: "document-management",
      title: "Document Management",
      description: "Store, organize, and manage HR documents and employee files",
      icon: FileText,
      color: "bg-green-500",
      stats: "2,456 documents",
    },
    {
      id: "org-chart",
      title: "Organization Chart",
      description: "Visualize company structure and reporting relationships",
      icon: Sitemap,
      color: "bg-purple-500",
      stats: "12 departments",
    },
    {
      id: "self-service-portal",
      title: "Self-Service Portal",
      description: "Employee self-service for profile updates and document access",
      icon: UserCog,
      color: "bg-orange-500",
      stats: "Active portal",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          HR Management
        </h1>
        <p className="text-muted-foreground text-lg">Manage your organization's core HR functions and employee data.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((module) => {
          const IconComponent = module.icon
          return (
            <Card
              key={module.id}
              className="modern-card cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => onNavigate(module.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl ${module.color} text-white group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{module.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{module.stats}</span>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    Open →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="modern-card border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Active Employees</p>
                <p className="text-2xl font-bold text-blue-900">1,234</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Documents Stored</p>
                <p className="text-2xl font-bold text-green-900">2,456</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Departments</p>
                <p className="text-2xl font-bold text-purple-900">12</p>
              </div>
              <Sitemap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
