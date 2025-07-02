"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchIcon, PlusIcon, FilterIcon, MoreHorizontalIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Employee {
  id: string
  name: string
  email: string
  department: string
  position: string
  status: "Active" | "Inactive" | "On Leave"
  joinDate: string
  avatar?: string
}

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Alice Smith",
    email: "alice.smith@company.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Bob Johnson",
    email: "bob.johnson@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "Active",
    joinDate: "2022-08-20",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie.brown@company.com",
    department: "HR",
    position: "HR Specialist",
    status: "On Leave",
    joinDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana.prince@company.com",
    department: "Sales",
    position: "Sales Representative",
    status: "Active",
    joinDate: "2023-06-01",
  },
  {
    id: "5",
    name: "Edward Wilson",
    email: "edward.wilson@company.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "Inactive",
    joinDate: "2022-12-05",
  },
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

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Inactive":
        return "bg-red-100 text-red-800 border-red-200"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Employee Database</h2>
          <p className="text-muted-foreground">Manage employee profiles and information</p>
        </div>
        <Button onClick={onBack} variant="outline" className="bg-white/80 backdrop-blur-sm">
          Back to Overview
        </Button>
      </div>

      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            Employee Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
                className="pl-10 bg-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <FilterIcon className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <PlusIcon className="h-4 w-4" />
              Add Employee
            </Button>
          </div>

          <div className="rounded-lg border bg-white/50 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50">
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-accent/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {employee.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{employee.position}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(employee.status)}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{employee.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                          <DropdownMenuItem>View Documents</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No employees found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
