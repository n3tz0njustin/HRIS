"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquareIcon, LightbulbIcon } from "lucide-react"

interface FeedbackTrend {
  theme: string
  count: number
  sentiment: "Positive" | "Neutral" | "Negative"
}

const initialFeedbackTrends: FeedbackTrend[] = [
  { theme: "Work-Life Balance", count: 12, sentiment: "Negative" },
  { theme: "Communication", count: 8, sentiment: "Neutral" },
  { theme: "Recognition", count: 5, sentiment: "Positive" },
  { theme: "Career Development", count: 7, sentiment: "Neutral" },
]

interface AnonymousFeedbackChannelsPageProps {
  onBack: () => void
}

export default function AnonymousFeedbackChannelsPage({ onBack }: AnonymousFeedbackChannelsPageProps) {
  const [feedbackContent, setFeedbackContent] = useState("")
  const [feedbackTrends, setFeedbackTrends] = useState<FeedbackTrend[]>(initialFeedbackTrends)

  const handleSubmitFeedback = () => {
    if (feedbackContent.trim()) {
      alert("Your anonymous feedback has been submitted. Thank you!")
      setFeedbackContent("")
      // In a real application, this would send feedback to a backend
      // and potentially update trends based on new input.
    } else {
      alert("Please write your feedback before submitting.")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Anonymous Feedback Channels</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Anonymous Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Your feedback is valuable and helps us improve our workplace. All submissions are completely anonymous.
            </p>
            <Textarea
              placeholder="Share your thoughts, suggestions, or concerns here..."
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
              rows={6}
            />
            <Button onClick={handleSubmitFeedback} className="w-full">
              <MessageSquareIcon className="h-4 w-4 mr-2" /> Submit Feedback Anonymously
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Anonymous Feedback Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Common themes and trends from anonymous feedback submissions.</p>
          <div className="grid gap-4">
            {feedbackTrends.length > 0 ? (
              feedbackTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center gap-3">
                    <LightbulbIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{trend.theme}</p>
                      <p className="text-sm text-muted-foreground">Mentions: {trend.count}</p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      trend.sentiment === "Positive"
                        ? "bg-green-100 text-green-800"
                        : trend.sentiment === "Negative"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {trend.sentiment}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground mt-4">No feedback trends available yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
