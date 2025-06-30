"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusIcon, EyeIcon, CheckIcon } from "lucide-react"

interface Review {
  id: string
  employeeName: string
  reviewer: string
  dueDate: string
  status: "Pending" | "Completed" | "Overdue"
}

const initialReviews: Review[] = [
  { id: "1", employeeName: "Alice Smith", reviewer: "Manager", dueDate: "2024-04-01", status: "Pending" },
  { id: "2", employeeName: "Bob Johnson", reviewer: "Manager", dueDate: "2024-03-10", status: "Completed" },
  { id: "3", employeeName: "Charlie Brown", reviewer: "Manager", dueDate: "2024-03-25", status: "Overdue" },
  { id: "4", employeeName: "Diana Prince", reviewer: "Manager", dueDate: "2024-04-15", status: "Pending" },
]

interface PerformanceReviewsPageProps {
  onBack: () => void
}

export default function PerformanceReviewsPage({ onBack }: PerformanceReviewsPageProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReviews = reviews.filter(
    (review) =>
      review.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateReview = () => {
    alert("Create New Review functionality not implemented yet.")
  }

  const handleViewReview = (id: string) => {
    alert(`View Review for ID: ${id} functionality not implemented yet.`)
  }

  const handleMarkAsComplete = (id: string) => {
    setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, status: "Completed" } : review)))
    alert(`Review ${id} marked as completed.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Performance Reviews</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reviews..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateReview}>
              <PlusIcon className="h-4 w-4 mr-2" /> Create New Review
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.employeeName}</TableCell>
                  <TableCell>{review.reviewer}</TableCell>
                  <TableCell>{review.dueDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        review.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : review.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {review.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewReview(review.id)}>
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View Review</span>
                    </Button>
                    {review.status !== "Completed" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsComplete(review.id)}
                        title="Mark as Complete"
                      >
                        <CheckIcon className="h-4 w-4 text-green-600" />
                        <span className="sr-only">Mark as Complete</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredReviews.length === 0 && <p className="text-center text-muted-foreground mt-4">No reviews found.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
