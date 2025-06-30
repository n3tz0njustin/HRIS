"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, PlusIcon, EditIcon, DollarSignIcon } from "lucide-react"

interface Bonus {
  id: string
  employeeName: string
  type: "Performance" | "Spot" | "Referral" | "Retention"
  amount: number
  date: string
  status: "Paid" | "Pending"
}

const initialBonuses: Bonus[] = [
  { id: "1", employeeName: "Alice Smith", type: "Performance", amount: 1500, date: "2024-03-10", status: "Paid" },
  { id: "2", employeeName: "Bob Johnson", type: "Spot", amount: 250, date: "2024-03-15", status: "Pending" },
  { id: "3", employeeName: "Charlie Brown", type: "Referral", amount: 1000, date: "2024-02-28", status: "Paid" },
]

interface BonusesVariablePayPageProps {
  onBack: () => void
}

export default function BonusesVariablePayPage({ onBack }: BonusesVariablePayPageProps) {
  const [bonuses, setBonuses] = useState<Bonus[]>(initialBonuses)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("All")

  const filteredBonuses = bonuses.filter(
    (bonus) =>
      (bonus.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bonus.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (typeFilter === "All" || bonus.type === typeFilter),
  )

  const handleAddBonus = () => {
    alert("Add New Bonus functionality not implemented yet.")
  }

  const handleEditBonus = (id: string) => {
    alert(`Edit Bonus with ID: ${id} functionality not implemented yet.`)
  }

  const handleMarkAsPaid = (id: string) => {
    setBonuses((prev) => prev.map((bonus) => (bonus.id === id ? { ...bonus, status: "Paid" } : bonus)))
    alert(`Bonus ${id} marked as Paid.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bonuses & Variable Pay</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bonus & Variable Pay Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full md:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bonuses..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Performance">Performance</SelectItem>
                <SelectItem value="Spot">Spot</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Retention">Retention</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddBonus} className="w-full md:w-auto">
              <PlusIcon className="h-4 w-4 mr-2" /> Add New Bonus
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBonuses.map((bonus) => (
                <TableRow key={bonus.id}>
                  <TableCell className="font-medium">{bonus.employeeName}</TableCell>
                  <TableCell>{bonus.type}</TableCell>
                  <TableCell>${bonus.amount.toLocaleString()}</TableCell>
                  <TableCell>{bonus.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        bonus.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {bonus.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditBonus(bonus.id)}>
                      <EditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    {bonus.status === "Pending" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsPaid(bonus.id)}
                        title="Mark as Paid"
                      >
                        <DollarSignIcon className="h-4 w-4 text-green-600" />
                        <span className="sr-only">Mark as Paid</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredBonuses.length === 0 && <p className="text-center text-muted-foreground mt-4">No bonuses found.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
