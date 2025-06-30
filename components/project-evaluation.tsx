"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusIcon, EyeIcon, StarIcon } from "lucide-react"

interface Project {
  id: string
  name: string
  team: string
  status: "Ongoing" | "Completed" | "On Hold"
  evaluationScore: number | string
}

const initialProjects: Project[] = [
  { id: "1", name: "Website Redesign", team: "Marketing", status: "Completed", evaluationScore: 4.5 },
  { id: "2", name: "Mobile App Development", team: "Engineering", status: "Ongoing", evaluationScore: "N/A" },
  { id: "3", name: "Q1 Sales Campaign", team: "Sales", status: "Completed", evaluationScore: 4.0 },
  { id: "4", name: "HR System Integration", team: "HR", status: "On Hold", evaluationScore: "N/A" },
]

interface ProjectEvaluationPageProps {
  onBack: () => void
}

export default function ProjectEvaluationPage({ onBack }: ProjectEvaluationPageProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProject = () => {
    alert("Add New Project functionality not implemented yet.")
  }

  const handleViewDetails = (id: string) => {
    alert(`View Project Details for ID: ${id} functionality not implemented yet.`)
  }

  const handleEvaluateProject = (id: string) => {
    const score = prompt("Enter evaluation score (1-5):")
    if (score && !isNaN(Number.parseFloat(score)) && Number.parseFloat(score) >= 1 && Number.parseFloat(score) <= 5) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === id ? { ...project, evaluationScore: Number.parseFloat(score), status: "Completed" } : project,
        ),
      )
      alert(`Project ${id} evaluated with score ${score}.`)
    } else if (score !== null) {
      alert("Invalid score. Please enter a number between 1 and 5.")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Evaluation</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddProject}>
              <PlusIcon className="h-4 w-4 mr-2" /> Add New Project
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Evaluation Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.team}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        project.status === "Ongoing"
                          ? "bg-blue-100 text-blue-800"
                          : project.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {typeof project.evaluationScore === "number" ? (
                      <div className="flex items-center gap-1">
                        {project.evaluationScore} <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    ) : (
                      project.evaluationScore
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(project.id)}>
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                    {project.status !== "Completed" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEvaluateProject(project.id)}
                        title="Evaluate Project"
                      >
                        <StarIcon className="h-4 w-4 text-primary" />
                        <span className="sr-only">Evaluate Project</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredProjects.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No projects found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
