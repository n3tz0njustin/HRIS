"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SearchIcon, GiftIcon } from "lucide-react"

interface Recognition {
  id: string
  from: string
  to: string
  type: "Shout-out" | "Award" | "Bonus"
  message: string
  date: string
}

const initialRecognitions: Recognition[] = [
  {
    id: "1",
    from: "Manager",
    to: "Alice Smith",
    type: "Shout-out",
    message: "For outstanding Q1 performance!",
    date: "2024-03-15",
  },
  {
    id: "2",
    from: "Peer",
    to: "Bob Johnson",
    type: "Shout-out",
    message: "Great help on the recent project!",
    date: "2024-03-10",
  },
  { id: "3", from: "HR", to: "Charlie Brown", type: "Award", message: "Employee of the Month!", date: "2024-03-01" },
]

interface RecognitionRewardsPageProps {
  onBack: () => void
}

export default function RecognitionRewardsPage({ onBack }: RecognitionRewardsPageProps) {
  const [recognitions, setRecognitions] = useState<Recognition[]>(initialRecognitions)
  const [searchTerm, setSearchTerm] = useState("")
  const [newRecognition, setNewRecognition] = useState({
    to: "",
    type: "Shout-out" as Recognition["type"],
    message: "",
  })

  const filteredRecognitions = recognitions.filter(
    (rec) =>
      rec.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewRecognition((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: Recognition["type"]) => {
    setNewRecognition((prev) => ({ ...prev, type: value }))
  }

  const handleSubmitRecognition = (e: React.FormEvent) => {
    e.preventDefault()
    if (newRecognition.to && newRecognition.message) {
      const newId = (recognitions.length + 1).toString()
      const recognitionToAdd: Recognition = {
        id: newId,
        from: "You", // Assuming current user is giving recognition
        date: new Date().toISOString().split("T")[0],
        ...newRecognition,
      }
      setRecognitions((prev) => [...prev, recognitionToAdd])
      setNewRecognition({ to: "", type: "Shout-out", message: "" })
      alert("Recognition submitted successfully!")
    } else {
      alert("Please select a recipient and write your message.")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recognition & Rewards</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Give Recognition</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitRecognition} className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="to" className="block text-sm font-medium">
                To:
              </label>
              <Input id="to" value={newRecognition.to} onChange={handleInputChange} placeholder="Employee Name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium">
                Type of Recognition
              </label>
              <Select value={newRecognition.type} onValueChange={handleSelectChange}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shout-out">Shout-out</SelectItem>
                  <SelectItem value="Award">Award</SelectItem>
                  <SelectItem value="Bonus">Bonus (Requires HR approval)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                value={newRecognition.message}
                onChange={handleInputChange}
                placeholder="Write your recognition message here..."
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full">
              <GiftIcon className="h-4 w-4 mr-2" /> Give Recognition
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recognition Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex-1 mb-4">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recognitions..."
              className="w-full rounded-lg bg-background pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecognitions.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell className="font-medium">{rec.from}</TableCell>
                  <TableCell>{rec.to}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        rec.type === "Shout-out"
                          ? "bg-blue-100 text-blue-800"
                          : rec.type === "Award"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {rec.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{rec.message}</TableCell>
                  <TableCell>{rec.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRecognitions.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No recognitions found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
