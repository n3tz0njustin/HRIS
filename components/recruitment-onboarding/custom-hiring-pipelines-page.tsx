"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusIcon, EyeIcon, EditIcon, TrashIcon } from "lucide-react"

interface Pipeline {
  id: string
  name: string
  stages: string[]
  activeJobs: number
  status: "Active" | "Draft" | "Archived"
}

const initialPipelines: Pipeline[] = [
  {
    id: "1",
    name: "Software Engineer Pipeline",
    stages: ["Application", "Phone Screen", "Technical Interview", "Final Interview", "Offer"],
    activeJobs: 5,
    status: "Active",
  },
  {
    id: "2",
    name: "Sales Representative Pipeline",
    stages: ["Application", "Phone Screen", "Role Play", "Manager Interview", "Offer"],
    activeJobs: 3,
    status: "Active",
  },
  {
    id: "3",
    name: "Intern Pipeline",
    stages: ["Application", "Phone Screen", "Assignment", "Interview", "Offer"],
    activeJobs: 0,
    status: "Draft",
  },
]

interface CustomHiringPipelinesPageProps {
  onBack: () => void
}

export default function CustomHiringPipelinesPage({ onBack }: CustomHiringPipelinesPageProps) {
  const [pipelines, setPipelines] = useState<Pipeline[]>(initialPipelines)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPipelines = pipelines.filter(
    (pipeline) =>
      pipeline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pipeline.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreatePipeline = () => {
    alert("Create New Pipeline functionality not implemented yet.")
  }

  const handleViewPipeline = (id: string) => {
    alert(`View Pipeline Details for ID: ${id} functionality not implemented yet.`)
  }

  const handleEditPipeline = (id: string) => {
    alert(`Edit Pipeline for ID: ${id} functionality not implemented yet.`)
  }

  const handleDeletePipeline = (id: string) => {
    if (confirm(`Are you sure you want to delete pipeline with ID: ${id}?`)) {
      setPipelines(pipelines.filter((pipeline) => pipeline.id !== id))
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Custom Hiring Pipelines</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search pipelines..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreatePipeline}>
              <PlusIcon className="h-4 w-4 mr-2" /> Create New Pipeline
            </Button>
          </div>
          <div className="grid gap-4">
            {filteredPipelines.length > 0 ? (
              filteredPipelines.map((pipeline) => (
                <Card key={pipeline.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{pipeline.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        pipeline.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : pipeline.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {pipeline.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground">Stages: {pipeline.stages.join(" → ")}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Jobs: {pipeline.activeJobs}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewPipeline(pipeline.id)}>
                        <EyeIcon className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditPipeline(pipeline.id)}>
                        <EditIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePipeline(pipeline.id)}>
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground mt-4">No pipelines found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
