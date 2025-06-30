"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, PlusIcon, EditIcon, AwardIcon } from "lucide-react"

interface Skill {
  id: string
  name: string
  category: string
  proficiencyLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  employeesCount: number
}

const initialSkills: Skill[] = [
  { id: "1", name: "React.js", category: "Frontend Development", proficiencyLevel: "Advanced", employeesCount: 15 },
  { id: "2", name: "Python", category: "Backend Development", proficiencyLevel: "Expert", employeesCount: 20 },
  { id: "3", name: "Cloud Security (AWS)", category: "DevOps", proficiencyLevel: "Intermediate", employeesCount: 8 },
  { id: "4", name: "Project Management", category: "Soft Skills", proficiencyLevel: "Advanced", employeesCount: 10 },
]

interface SkillMatrixTrackingPageProps {
  onBack: () => void
}

export default function SkillMatrixTrackingPage({ onBack }: SkillMatrixTrackingPageProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("All")

  const filteredSkills = skills.filter(
    (skill) =>
      (skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "All" || skill.category === categoryFilter),
  )

  const handleAddSkill = () => {
    alert("Add New Skill functionality not implemented yet.")
  }

  const handleEditSkill = (id: string) => {
    alert(`Edit Skill with ID: ${id} functionality not implemented yet.`)
  }

  const handleViewEmployeesWithSkill = (id: string) => {
    alert(`View Employees with Skill ID: ${id} functionality not implemented yet.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Skill Matrix & Tracking</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organizational Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full md:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search skills..."
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
                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                <SelectItem value="Backend Development">Backend Development</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="Soft Skills">Soft Skills</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddSkill} className="w-full md:w-auto">
              <PlusIcon className="h-4 w-4 mr-2" /> Add New Skill
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Skill Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Proficiency Level</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSkills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell>{skill.category}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        skill.proficiencyLevel === "Expert"
                          ? "bg-purple-100 text-purple-800"
                          : skill.proficiencyLevel === "Advanced"
                            ? "bg-blue-100 text-blue-800"
                            : skill.proficiencyLevel === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {skill.proficiencyLevel}
                    </span>
                  </TableCell>
                  <TableCell>{skill.employeesCount}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditSkill(skill.id)}>
                      <EditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewEmployeesWithSkill(skill.id)}
                      title="View Employees"
                    >
                      <AwardIcon className="h-4 w-4" />
                      <span className="sr-only">View Employees</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredSkills.length === 0 && <p className="text-center text-muted-foreground mt-4">No skills found.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
