"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, ShieldIcon } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "HR" | "Manager" | "Employee"
  status: "Active" | "Inactive"
  lastLogin: string
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "John Admin",
    email: "john.admin@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-03-15 10:30 AM",
  },
  {
    id: "2",
    name: "Sarah HR",
    email: "sarah.hr@example.com",
    role: "HR",
    status: "Active",
    lastLogin: "2024-03-15 09:15 AM",
  },
  {
    id: "3",
    name: "Mike Manager",
    email: "mike.manager@example.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-03-14 04:45 PM",
  },
  {
    id: "4",
    name: "Lisa Employee",
    email: "lisa.employee@example.com",
    role: "Employee",
    status: "Inactive",
    lastLogin: "2024-03-10 02:20 PM",
  },
]

interface UserManagementPageProps {
  onBack: () => void
}

export default function UserManagementPage({ onBack }: UserManagementPageProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUser = () => {
    alert("Add User functionality not implemented yet.")
  }

  const handleEditUser = (id: string) => {
    alert(`Edit User with ID: ${id} functionality not implemented yet.`)
  }

  const handleDeleteUser = (id: string) => {
    if (confirm(`Are you sure you want to delete user with ID: ${id}?`)) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user,
      ),
    )
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800"
      case "HR":
        return "bg-blue-100 text-blue-800"
      case "Manager":
        return "bg-purple-100 text-purple-800"
      case "Employee":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddUser}>
              <PlusIcon className="h-4 w-4 mr-2" /> Add User
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditUser(user.id)}>
                      <EditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleToggleStatus(user.id)}>
                      <ShieldIcon className="h-4 w-4" />
                      <span className="sr-only">Toggle Status</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredUsers.length === 0 && <p className="text-center text-muted-foreground mt-4">No users found.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
