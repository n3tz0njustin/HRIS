"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, PlayIcon, CheckIcon, BookOpenIcon } from "lucide-react"

interface Course {
  id: string
  title: string
  category: string
  duration: string
  status: "Not Started" | "In Progress" | "Completed"
}

const initialCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Project Management",
    category: "Soft Skills",
    duration: "2h 30m",
    status: "In Progress",
  },
  {
    id: "2",
    title: "Advanced React Hooks",
    category: "Frontend Development",
    duration: "4h 0m",
    status: "Not Started",
  },
  { id: "3", title: "Cybersecurity Fundamentals", category: "IT Security", duration: "3h 15m", status: "Completed" },
]

interface TrainingPortalPageProps {
  onBack: () => void
}

export default function TrainingPortalPage({ onBack }: TrainingPortalPageProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("All")

  const filteredCourses = courses.filter(
    (course) =>
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "All" || course.category === categoryFilter),
  )

  const handleEnrollCourse = (id: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id && course.status === "Not Started" ? { ...course, status: "In Progress" } : course,
      ),
    )
    alert(`Enrolled in course ${id}.`)
  }

  const handleMarkAsComplete = (id: string) => {
    setCourses((prev) => prev.map((course) => (course.id === id ? { ...course, status: "Completed" } : course)))
    alert(`Course ${id} marked as completed.`)
  }

  const handleViewCourse = (id: string) => {
    alert(`Viewing course content for ID: ${id} functionality not implemented yet.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Training Portal</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full md:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                <SelectItem value="IT Security">IT Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        course.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : course.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {course.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewCourse(course.id)} title="View Course">
                      <BookOpenIcon className="h-4 w-4" />
                      <span className="sr-only">View Course</span>
                    </Button>
                    {course.status === "Not Started" && (
                      <Button variant="ghost" size="icon" onClick={() => handleEnrollCourse(course.id)} title="Enroll">
                        <PlayIcon className="h-4 w-4 text-primary" />
                        <span className="sr-only">Enroll</span>
                      </Button>
                    )}
                    {course.status === "In Progress" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsComplete(course.id)}
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
          {filteredCourses.length === 0 && <p className="text-center text-muted-foreground mt-4">No courses found.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
