"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SearchIcon, PlusIcon, CheckIcon, XIcon, EyeIcon } from "lucide-react"

interface ExpenseClaim {
  id: string
  employeeName: string
  category: "Travel" | "Meals" | "Office Supplies" | "Software" | "Other"
  amount: number
  date: string
  status: "Pending" | "Approved" | "Rejected"
  description?: string
}

const initialClaims: ExpenseClaim[] = [
  { id: "1", employeeName: "John Doe", category: "Travel", amount: 150.75, date: "2024-03-10", status: "Pending" },
  {
    id: "2",
    employeeName: "Jane Smith",
    category: "Meals",
    amount: 25.0,
    date: "2024-03-12",
    status: "Approved",
    description: "Team lunch",
  },
  {
    id: "3",
    employeeName: "Peter Jones",
    category: "Office Supplies",
    amount: 45.5,
    date: "2024-03-08",
    status: "Rejected",
    description: "Duplicate claim",
  },
]

interface ExpenseReimbursementPageProps {
  onBack: () => void
}

export default function ExpenseReimbursementPage({ onBack }: ExpenseReimbursementPageProps) {
  const [claims, setClaims] = useState<ExpenseClaim[]>(initialClaims)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [newClaim, setNewClaim] = useState({
    employeeName: "",
    category: "Travel" as ExpenseClaim["category"],
    amount: "",
    date: "",
    description: "",
  })

  const filteredClaims = claims.filter(
    (claim) =>
      (claim.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || claim.status === statusFilter),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewClaim((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: ExpenseClaim["category"]) => {
    setNewClaim((prev) => ({ ...prev, category: value }))
  }

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault()
    const amountNum = Number.parseFloat(newClaim.amount)
    if (newClaim.employeeName && newClaim.date && !isNaN(amountNum) && amountNum > 0) {
      const newId = (claims.length + 1).toString()
      const claimToAdd: ExpenseClaim = {
        id: newId,
        status: "Pending",
        ...newClaim,
        amount: amountNum,
      }
      setClaims((prev) => [...prev, claimToAdd])
      setNewClaim({ employeeName: "", category: "Travel", amount: "", date: "", description: "" })
      alert("Expense claim submitted successfully!")
    } else {
      alert("Please fill in all required fields and ensure amount is a valid number.")
    }
  }

  const handleApproveReject = (id: string, status: "Approved" | "Rejected") => {
    setClaims((prev) => prev.map((claim) => (claim.id === id ? { ...claim, status: status } : claim)))
    alert(`Claim ${id} ${status.toLowerCase()}.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Expense Reimbursement</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit New Expense Claim</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitClaim} className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="employeeName" className="block text-sm font-medium">
                Employee Name
              </label>
              <Input
                id="employeeName"
                value={newClaim.employeeName}
                onChange={handleInputChange}
                placeholder="e.g., Jane Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium">
                Category
              </label>
              <Select value={newClaim.category} onValueChange={handleSelectChange}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Meals">Meals</SelectItem>
                  <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-medium">
                  Amount ($)
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={newClaim.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium">
                  Date of Expense
                </label>
                <Input id="date" type="date" value={newClaim.date} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Description (Optional)
              </label>
              <Textarea
                id="description"
                value={newClaim.description}
                onChange={handleInputChange}
                placeholder="Brief description of expense"
              />
            </div>
            <Button type="submit" className="w-full">
              <PlusIcon className="h-4 w-4 mr-2" /> Submit Claim
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Expense Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full md:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search claims..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.employeeName}</TableCell>
                  <TableCell>{claim.category}</TableCell>
                  <TableCell>${claim.amount.toFixed(2)}</TableCell>
                  <TableCell>{claim.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        claim.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : claim.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {claim.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {claim.status === "Pending" ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleApproveReject(claim.id, "Approved")}
                          title="Approve"
                        >
                          <CheckIcon className="h-4 w-4 text-green-600" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleApproveReject(claim.id, "Rejected")}
                          title="Reject"
                        >
                          <XIcon className="h-4 w-4 text-red-600" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => alert(`Description: ${claim.description || "N/A"}`)}
                        title="View Description"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span className="sr-only">View Description</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredClaims.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No expense claims found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
