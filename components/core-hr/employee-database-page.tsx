"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from "lucide-react"

interface Employee {
  id: string
  name: string
  email: string
  department: string
  position: string
}

const initialEmployees: Employee[] = [
  { id: "1", name: "Alice Smith", email: "alice@example.com", department: "HR", position: "HR Manager" },
  { id: "2", name: "Bob Johnson", email: "bob@example.com", department: "Engineering", position: "Software Engineer" },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    department: "Marketing",
    position: "Marketing Specialist",
  },
  { id: "4", name: "Diana Prince", email: "diana@example.com", department: "Sales", position: "Sales Representative" },
]

interface EmployeeDatabasePageProps {
  onBack: () => void
}

export default function EmployeeDatabasePage({ onBack }: EmployeeDatabasePageProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddEmployee = () => {
    // Placeholder for adding employee logic
    alert("Add Employee functionality not implemented yet.")
  }

  const handleEditEmployee = (id: string) => {
    // Placeholder for editing employee logic
    alert(`Edit Employee with ID: ${id} functionality not implemented yet.`)
  }

  const handleDeleteEmployee = (id: string) => {
    // Placeholder for deleting employee logic
    if (confirm(`Are you sure you want to delete employee with ID: ${id}?`)) {
      setEmployees(employees.filter((emp) => emp.id !== id))
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Employee Database</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddEmployee}>
              <PlusIcon className="h-4 w-4 mr-2" /> Add Employee
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditEmployee(employee.id)}>
                      <EditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEmployee(employee.id)}>
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredEmployees.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No employees found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
