"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, SendIcon, EyeIcon } from "lucide-react"

interface FeedbackItem {
  id: string
  from: string
  to: string
  type: "Peer" | "Manager" | "Self"
  status: "Pending" | "Completed"
  date: string
  content?: string
}

const initialFeedback: FeedbackItem[] = [
  { id: "1", from: "You", to: "Alice Smith", type: "Self", status: "Pending", date: "2024-03-15" },
  {
    id: "2",
    from: "Bob Johnson",
    to: "You",
    type: "Peer",
    status: "Completed",
    date: "2024-03-10",
    content: "Great collaboration on the recent project!",
  },
  { id: "3", from: "Manager", to: "You", type: "Manager", status: "Pending", date: "2024-03-20" },
  {
    id: "4",
    from: "You",
    to: "Charlie Brown",
    type: "Peer",
    status: "Completed",
    date: "2024-03-05",
    content: "Provided excellent support during the client presentation.",
  },
]

interface FeedbackPageProps {
  onBack: () => void
}

export default function FeedbackPage({ onBack }: FeedbackPageProps) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(initialFeedback)
  const [searchTerm, setSearchTerm] = useState("")
  const [newFeedbackTo, setNewFeedbackTo] = useState("")
  const [newFeedbackContent, setNewFeedbackContent] = useState("")

  const filteredFeedback = feedbackItems.filter(
    (item) =>
      item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    if (newFeedbackTo && newFeedbackContent) {
      const newId = (feedbackItems.length + 1).toString()
      const newItem: FeedbackItem = {
        id: newId,
        from: "You",
        to: newFeedbackTo,
        type: "Peer", // Assuming peer feedback for new submissions
        status: "Completed",
        date: new Date().toISOString().split("T")[0],
        content: newFeedbackContent,
      }
      setFeedbackItems([...feedbackItems, newItem])
      setNewFeedbackTo("")
      setNewFeedbackContent("")
      alert("Feedback submitted successfully!")
    } else {
      alert("Please select a recipient and write your feedback.")
    }
  }

  const handleViewFeedback = (item: FeedbackItem) => {
    alert(
      `Feedback from ${item.from} to ${item.to} (${item.type}):\n\n${item.content || "No content provided for pending feedback."}`,
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">360-Degree Feedback</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Give Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitFeedback} className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="feedback-to" className="block text-sm font-medium">
                To:
              </label>
              <Select value={newFeedbackTo} onValueChange={setNewFeedbackTo}>
                <SelectTrigger id="feedback-to">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {/* Sample employees, ideally fetched from employee database */}
                  <SelectItem value="Alice Smith">Alice Smith</SelectItem>
                  <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                  <SelectItem value="Diana Prince">Diana Prince</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="feedback-content" className="block text-sm font-medium">
                Your Feedback:
              </label>
              <Textarea
                id="feedback-content"
                placeholder="Write your feedback here..."
                value={newFeedbackContent}
                onChange={(e) => setNewFeedbackContent(e.target.value)}
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              <SendIcon className="h-4 w-4 mr-2" /> Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Feedback History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex-1 mb-4">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search feedback..."
              className="w-full rounded-lg bg-background pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid gap-4">
            {filteredFeedback.length > 0 ? (
              filteredFeedback.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-md border p-4">
                  <div>
                    <p className="font-medium">
                      {item.from === "You" ? `To: ${item.to}` : `From: ${item.from}`} ({item.type})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: {item.status} - {item.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleViewFeedback(item)}>
                    <EyeIcon className="h-4 w-4" />
                    <span className="sr-only">View Feedback</span>
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground mt-4">No feedback found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
