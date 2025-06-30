"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusIcon, PlayIcon, PauseIcon, EyeIcon } from "lucide-react"

interface OnboardingWorkflow {
  id: string
  name: string
  steps: number
  completionRate: number
  status: "Active" | "Paused" | "Draft"
  newHires: number
}

const initialWorkflows: OnboardingWorkflow[] = [
  {
    id: "1",
    name: "Software Engineer Onboarding",
    steps: 8,
    completionRate: 85,
    status: "Active",
    newHires: 12,
  },
  {
    id: "2",
    name: "Sales Team Onboarding",
    steps: 6,
    completionRate: 92,
    status: "Active",
    newHires: 8,
  },
  {
    id: "3",
    name: "Remote Employee Onboarding",
    steps: 10,
    completionRate: 78,
    status: "Paused",
    newHires: 5,
  },
  {
    id: "4",
    name: "Intern Onboarding",
    steps: 5,
    completionRate: 0,
    status: "Draft",
    newHires: 0,
  },
]

interface AutomatedOnboardingPageProps {
  onBack: () => void
}

export default function AutomatedOnboardingPage({ onBack }: AutomatedOnboardingPageProps) {
  const [workflows, setWorkflows] = useState<OnboardingWorkflow[]>(initialWorkflows)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWorkflows = workflows.filter(
    (workflow) =>
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateWorkflow = () => {
    alert("Create New Workflow functionality not implemented yet.")
  }

  const handleViewWorkflow = (id: string) => {
    alert(`View Workflow Details for ID: ${id} functionality not implemented yet.`)
  }

  const handleToggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === id ? { ...workflow, status: workflow.status === "Active" ? "Paused" : "Active" } : workflow,
      ),
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Automated Onboarding</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Onboarding Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search workflows..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateWorkflow}>
              <PlusIcon className="h-4 w-4 mr-2" /> Create New Workflow
            </Button>
          </div>
          <div className="grid gap-4">
            {filteredWorkflows.length > 0 ? (
              filteredWorkflows.map((workflow) => (
                <Card key={workflow.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{workflow.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        workflow.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : workflow.status === "Paused"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {workflow.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Steps</p>
                      <p className="font-semibold">{workflow.steps}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <p className="font-semibold">{workflow.completionRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">New Hires</p>
                      <p className="font-semibold">{workflow.newHires}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleViewWorkflow(workflow.id)}>
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleWorkflow(workflow.id)}
                      title={workflow.status === "Active" ? "Pause Workflow" : "Activate Workflow"}
                    >
                      {workflow.status === "Active" ? (
                        <PauseIcon className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <PlayIcon className="h-4 w-4 text-green-600" />
                      )}
                      <span className="sr-only">{workflow.status === "Active" ? "Pause" : "Activate"} Workflow</span>
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground mt-4">No workflows found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
