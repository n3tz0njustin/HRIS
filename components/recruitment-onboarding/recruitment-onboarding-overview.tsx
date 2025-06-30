"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Brain, GitBranch, Workflow } from "lucide-react"

interface RecruitmentOnboardingOverviewProps {
  onNavigate: (page: string) => void
}

export default function RecruitmentOnboardingOverview({ onNavigate }: RecruitmentOnboardingOverviewProps) {
  const modules = [
    {
      id: "applicant-tracking-system",
      title: "Applicant Tracking System",
      description: "Manage job applications and candidate pipeline",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      id: "tech-skill-assessments",
      title: "Tech Skill Assessments",
      description: "Evaluate candidates with technical assessments",
      icon: Brain,
      color: "bg-green-500",
    },
    {
      id: "custom-hiring-pipelines",
      title: "Custom Hiring Pipelines",
      description: "Create and manage custom recruitment workflows",
      icon: GitBranch,
      color: "bg-purple-500",
    },
    {
      id: "automated-onboarding",
      title: "Automated Onboarding",
      description: "Streamline new hire onboarding processes",
      icon: Workflow,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Recruitment & Onboarding</h2>
        <p className="text-muted-foreground">Streamline your hiring process from application to onboarding.</p>
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
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+15 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across 5 departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Hires This Month</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
