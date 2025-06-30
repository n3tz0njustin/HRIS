"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Users, Shield, Globe } from "lucide-react"

interface SettingsOverviewProps {
  onNavigate: (page: string) => void
}

export default function SettingsOverview({ onNavigate }: SettingsOverviewProps) {
  const modules = [
    {
      id: "general-settings",
      title: "General Settings",
      description: "Configure system-wide settings and preferences",
      icon: Settings,
      color: "bg-blue-500",
    },
    {
      id: "user-management",
      title: "User Management",
      description: "Manage user accounts, roles, and permissions",
      icon: Users,
      color: "bg-green-500",
    },
    {
      id: "system-compliance-security",
      title: "System Compliance & Security",
      description: "Configure security settings and compliance features",
      icon: Shield,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">Configure and manage your HRIS system settings.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A+</div>
            <p className="text-xs text-muted-foreground">Excellent security</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
