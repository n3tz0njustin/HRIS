"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusIcon, EyeIcon, SendIcon } from "lucide-react"

interface Assessment {
  id: string
  candidateName: string
  skill: string
  score: number | string
  status: "Pending" | "Completed" | "Sent"
}

const initialAssessments: Assessment[] = [
  { id: "1", candidateName: "Emily White", skill: "React.js", score: "N/A", status: "Pending" },
  { id: "2", candidateName: "Daniel Green", skill: "Python", score: 85, status: "Completed" },
  { id: "3", candidateName: "Olivia Black", skill: "SQL", score: "N/A", status: "Sent" },
  { id: "4", candidateName: "James Blue", skill: "AWS", score: 72, status: "Completed" },
]

interface TechSkillAssessmentsPageProps {
  onBack: () => void
}

export default function TechSkillAssessmentsPage({ onBack }: TechSkillAssessmentsPageProps) {
  const [assessments, setAssessments] = useState<Assessment[]>(initialAssessments)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAssessments = assessments.filter(
    (assessment) =>
      assessment.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateAssessment = () => {
    alert("Create New Assessment functionality not implemented yet.")
  }

  const handleViewDetails = (id: string) => {
    alert(`View Assessment Details for ID: ${id} functionality not implemented yet.`)
  }

  const handleSendAssessment = (id: string) => {
    setAssessments((prev) =>
      prev.map((assessment) => (assessment.id === id ? { ...assessment, status: "Sent" } : assessment)),
    )
    alert(`Assessment ${id} sent to candidate.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tech Skill Assessments</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search assessments..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateAssessment}>
              <PlusIcon className="h-4 w-4 mr-2" /> Create New Assessment
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate Name</TableHead>
                <TableHead>Skill</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium">{assessment.candidateName}</TableCell>
                  <TableCell>{assessment.skill}</TableCell>
                  <TableCell>{assessment.score}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        assessment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : assessment.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {assessment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(assessment.id)}>
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                    {assessment.status === "Pending" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSendAssessment(assessment.id)}
                        title="Send Assessment"
                      >
                        <SendIcon className="h-4 w-4 text-primary" />
                        <span className="sr-only">Send Assessment</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAssessments.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No assessments found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
