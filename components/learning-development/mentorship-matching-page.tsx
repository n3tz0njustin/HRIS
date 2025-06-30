"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, PlusIcon, UsersIcon, MessageSquareIcon } from "lucide-react"

interface MentorshipPair {
  id: string
  mentor: string
  mentee: string
  focusArea: string
  status: "Active" | "Completed" | "Seeking"
}

const initialPairs: MentorshipPair[] = [
  { id: "1", mentor: "Alice Smith", mentee: "John Doe", focusArea: "Leadership", status: "Active" },
  { id: "2", mentor: "Bob Johnson", mentee: "Jane Smith", focusArea: "Technical Skills", status: "Active" },
  { id: "3", mentor: "Charlie Brown", mentee: "Peter Jones", focusArea: "Career Development", status: "Completed" },
]

interface MentorshipMatchingPageProps {
  onBack: () => void
}

export default function MentorshipMatchingPage({ onBack }: MentorshipMatchingPageProps) {
  const [mentorshipPairs, setMentorshipPairs] = useState<MentorshipPair[]>(initialPairs)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")

  const filteredPairs = mentorshipPairs.filter(
    (pair) =>
      (pair.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pair.mentee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pair.focusArea.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || pair.status === statusFilter),
  )

  const handleCreateMatch = () => {
    alert("Create New Mentorship Match functionality not implemented yet.")
  }

  const handleSendMessage = (name: string) => {
    alert(`Sending message to ${name}... (Placeholder for chat integration)`)
  }

  const handleMarkAsComplete = (id: string) => {
    setMentorshipPairs((prev) => prev.map((pair) => (pair.id === id ? { ...pair, status: "Completed" } : pair)))
    alert(`Mentorship pair ${id} marked as completed.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mentorship Matching</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mentorship Pairs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full md:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search pairs..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Seeking">Seeking</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCreateMatch} className="w-full md:w-auto">
              <PlusIcon className="h-4 w-4 mr-2" /> Create New Match
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mentor</TableHead>
                <TableHead>Mentee</TableHead>
                <TableHead>Focus Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPairs.map((pair) => (
                <TableRow key={pair.id}>
                  <TableCell className="font-medium">{pair.mentor}</TableCell>
                  <TableCell>{pair.mentee}</TableCell>
                  <TableCell>{pair.focusArea}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        pair.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : pair.status === "Completed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {pair.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSendMessage(pair.mentor)}
                      title="Message Mentor"
                    >
                      <MessageSquareIcon className="h-4 w-4" />
                      <span className="sr-only">Message Mentor</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSendMessage(pair.mentee)}
                      title="Message Mentee"
                    >
                      <MessageSquareIcon className="h-4 w-4" />
                      <span className="sr-only">Message Mentee</span>
                    </Button>
                    {pair.status === "Active" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsComplete(pair.id)}
                        title="Mark as Complete"
                      >
                        <UsersIcon className="h-4 w-4 text-green-600" />
                        <span className="sr-only">Mark as Complete</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPairs.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No mentorship pairs found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
