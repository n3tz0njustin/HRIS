"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, PlusIcon, EditIcon, EyeIcon } from "lucide-react"

interface BenefitPlan {
  id: string
  name: string
  type: "Health" | "Dental" | "Vision" | "Retirement" | "Life Insurance"
  provider: string
  enrollmentCount: number
}

const initialBenefitPlans: BenefitPlan[] = [
  { id: "1", name: "Standard Health Plan", type: "Health", provider: "HealthCo", enrollmentCount: 120 },
  { id: "2", name: "Premium Dental Plan", type: "Dental", provider: "SmileCare", enrollmentCount: 80 },
  { id: "3", name: "401k Retirement Plan", type: "Retirement", provider: "InvestCorp", enrollmentCount: 100 },
]

interface BenefitsAdministrationPageProps {
  onBack: () => void
}

export default function BenefitsAdministrationPage({ onBack }: BenefitsAdministrationPageProps) {
  const [benefitPlans, setBenefitPlans] = useState<BenefitPlan[]>(initialBenefitPlans)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("All")

  const filteredPlans = benefitPlans.filter(
    (plan) =>
      (plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.provider.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (typeFilter === "All" || plan.type === typeFilter),
  )

  const handleAddPlan = () => {
    alert("Add New Benefit Plan functionality not implemented yet.")
  }

  const handleEditPlan = (id: string) => {
    alert(`Edit Benefit Plan with ID: ${id} functionality not implemented yet.`)
  }

  const handleViewEnrollments = (id: string) => {
    alert(`View Enrollments for Plan ID: ${id} functionality not implemented yet.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Benefits Administration</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Benefit Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full md:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search plans..."
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
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Dental">Dental</SelectItem>
                <SelectItem value="Vision">Vision</SelectItem>
                <SelectItem value="Retirement">Retirement</SelectItem>
                <SelectItem value="Life Insurance">Life Insurance</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddPlan} className="w-full md:w-auto">
              <PlusIcon className="h-4 w-4 mr-2" /> Add New Plan
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Enrollment Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.type}</TableCell>
                  <TableCell>{plan.provider}</TableCell>
                  <TableCell>{plan.enrollmentCount}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditPlan(plan.id)}>
                      <EditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewEnrollments(plan.id)}
                      title="View Enrollments"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View Enrollments</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPlans.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No benefit plans found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
