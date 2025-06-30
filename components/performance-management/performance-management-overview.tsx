"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, MessageSquare, FileText, BarChart } from "lucide-react"

interface PerformanceManagementOverviewProps {
  onNavigate: (page: string) => void
}

export default function PerformanceManagementOverview({ onNavigate }: PerformanceManagementOverviewProps) {
  const modules = [
    {
      id: "goals-okrs",
      title: "Goal Setting & OKRs",
      description: "Set and track individual and team objectives",
      icon: Target,
      color: "bg-blue-500",
    },
    {
      id: "feedback",
      title: "360° Feedback",
      description: "Collect comprehensive feedback from peers and managers",
      icon: MessageSquare,
      color: "bg-green-500",
    },
    {
      id: "performance-reviews",
      title: "Performance Reviews",
      description: "Conduct structured performance evaluations",
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      id: "project-evaluation",
      title: "Project Evaluation",
      description: "Assess performance on specific projects and initiatives",
      icon: BarChart,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Performance Management</h2>
        <p className="text-muted-foreground">
          Track, evaluate, and improve employee performance across your organization.
        </p>
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
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">78% on track</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Due this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback Requests</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
