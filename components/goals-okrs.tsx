"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Plus, Eye, Edit, Trash2, CheckCircle2 } from "lucide-react"

interface Goal {
  id: string
  title: string
  type: "Goal" | "OKR"
  description: string
  target: string
  progress: number
  status: "Not Started" | "In Progress" | "Completed" | "On Track" | "At Risk" | "Off Track"
}

interface GoalsOKRsPageProps {
  onBack: () => void
}

export default function GoalsOKRsPage({ onBack }: GoalsOKRsPageProps) {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Increase Customer Satisfaction",
      type: "OKR",
      description: "Improve overall customer satisfaction scores by 10% by end of Q3.",
      target: "CSAT Score of 90%",
      progress: 70,
      status: "In Progress",
    },
    {
      id: "2",
      title: "Complete Project Alpha",
      type: "Goal",
      description: "Successfully launch Project Alpha by July 15th.",
      target: "Project Launch",
      progress: 90,
      status: "On Track",
    },
    {
      id: "3",
      title: "Develop New Skill: React Native",
      type: "Goal",
      description: "Complete an advanced React Native course and build a demo app.",
      target: "Demo App Completion",
      progress: 40,
      status: "In Progress",
    },
  ])
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [isViewingGoal, setIsViewingGoal] = useState<Goal | null>(null)
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id" | "progress" | "status">>({
    title: "",
    type: "Goal",
    description: "",
    target: "",
  })

  const handleAddGoal = () => {
    const goalToAdd: Goal = {
      ...newGoal,
      id: String(goals.length + 1),
      progress: 0,
      status: "Not Started",
    }
    setGoals([...goals, goalToAdd])
    setNewGoal({ title: "", type: "Goal", description: "", target: "" })
    setIsAddingGoal(false)
  }

  const handleViewGoal = (goal: Goal) => {
    setIsViewingGoal(goal)
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const handleMarkAsComplete = (id: string) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, progress: 100, status: "Completed" } : goal)))
  }

  if (isAddingGoal) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsAddingGoal(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle>Add New Goal/OKR</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={newGoal.type}
              onValueChange={(value: "Goal" | "OKR") => setNewGoal({ ...newGoal, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Goal">Goal</SelectItem>
                <SelectItem value="OKR">OKR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="target">Target/Key Result</Label>
            <Input
              id="target"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            />
          </div>
          <Button onClick={handleAddGoal}>
            <Plus className="h-4 w-4 mr-2" /> Create Goal
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isViewingGoal) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsViewingGoal(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle>{isViewingGoal.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4 grid gap-4">
          <div>
            <h3 className="font-semibold">Type:</h3>
            <p>{isViewingGoal.type}</p>
          </div>
          <div>
            <h3 className="font-semibold">Description:</h3>
            <p>{isViewingGoal.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Target/Key Result:</h3>
            <p>{isViewingGoal.target}</p>
          </div>
          <div>
            <h3 className="font-semibold">Progress:</h3>
            <Progress value={isViewingGoal.progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-1">{isViewingGoal.progress}% Complete</p>
          </div>
          <div>
            <h3 className="font-semibold">Status:</h3>
            <p>{isViewingGoal.status}</p>
          </div>
          <div className="flex gap-2">
            {isViewingGoal.status !== "Completed" && (
              <Button onClick={() => handleMarkAsComplete(isViewingGoal.id)}>
                <CheckCircle2 className="h-4 w-4 mr-2" /> Mark as Complete
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsViewingGoal(null)}>
              Close View
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle>Goal Setting & OKRs</CardTitle>
        </div>
        <Button size="sm" onClick={() => setIsAddingGoal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add New
        </Button>
      </CardHeader>
      <CardDescription className="px-6">Set, track, and manage individual and team goals and OKRs.</CardDescription>
      <CardContent className="pt-4 grid gap-4">
        {goals.length === 0 ? (
          <p className="text-muted-foreground text-center">No goals or OKRs set yet.</p>
        ) : (
          <div className="grid gap-4">
            {goals.map((goal) => (
              <Card key={goal.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{goal.title}</h3>
                  <div className="text-sm text-muted-foreground">{goal.type}</div>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{goal.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Progress value={goal.progress} className="w-full" />
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Status: {goal.status}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleViewGoal(goal)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
