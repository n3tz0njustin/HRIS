"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusIcon, BarChartIcon, SendIcon } from "lucide-react"

interface Survey {
  id: string
  title: string
  status: "Draft" | "Active" | "Closed"
  responses: number
  launchDate: string
}

const initialSurveys: Survey[] = [
  { id: "1", title: "Q1 Employee Satisfaction", status: "Active", responses: 85, launchDate: "2024-03-01" },
  { id: "2", title: "Work-Life Balance Check-in", status: "Closed", responses: 120, launchDate: "2024-02-10" },
  { id: "3", title: "New Hire Experience Survey", status: "Draft", responses: 0, launchDate: "N/A" },
]

interface PulseSurveysPageProps {
  onBack: () => void
}

export default function PulseSurveysPage({ onBack }: PulseSurveysPageProps) {
  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSurveys = surveys.filter(
    (survey) =>
      survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateSurvey = () => {
    alert("Create New Survey functionality not implemented yet.")
  }

  const handleViewAnalytics = (id: string) => {
    alert(`View Analytics for Survey ID: ${id} functionality not implemented yet.`)
  }

  const handleToggleStatus = (id: string) => {
    setSurveys((prev) =>
      prev.map((survey) =>
        survey.id === id ? { ...survey, status: survey.status === "Active" ? "Closed" : "Active" } : survey,
      ),
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pulse Surveys</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Survey Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search surveys..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateSurvey}>
              <PlusIcon className="h-4 w-4 mr-2" /> Create New Survey
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Survey Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Launch Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSurveys.map((survey) => (
                <TableRow key={survey.id}>
                  <TableCell className="font-medium">{survey.title}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        survey.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : survey.status === "Closed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {survey.status}
                    </span>
                  </TableCell>
                  <TableCell>{survey.responses}</TableCell>
                  <TableCell>{survey.launchDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewAnalytics(survey.id)}
                      title="View Analytics"
                    >
                      <BarChartIcon className="h-4 w-4" />
                      <span className="sr-only">View Analytics</span>
                    </Button>
                    {survey.status !== "Closed" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleStatus(survey.id)}
                        title={survey.status === "Active" ? "Close Survey" : "Activate Survey"}
                      >
                        <SendIcon className="h-4 w-4" />
                        <span className="sr-only">Toggle Status</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredSurveys.length === 0 && <p className="text-center text-muted-foreground mt-4">No surveys found.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
