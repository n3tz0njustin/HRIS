"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlayIcon, HistoryIcon, DownloadIcon, EyeIcon } from "lucide-react"

interface PayrollRun {
  id: string
  period: string
  runDate: string
  totalAmount: number
  status: "Completed" | "Pending" | "Processing"
}

const initialPayrollRuns: PayrollRun[] = [
  { id: "1", period: "March 2024", runDate: "2024-03-31", totalAmount: 150000, status: "Completed" },
  { id: "2", period: "April 2024", runDate: "2024-04-30", totalAmount: 0, status: "Pending" },
  { id: "3", period: "February 2024", runDate: "2024-02-29", totalAmount: 145000, status: "Completed" },
]

interface AutomatedPayrollProcessingPageProps {
  onBack: () => void
}

export default function AutomatedPayrollProcessingPage({ onBack }: AutomatedPayrollProcessingPageProps) {
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>(initialPayrollRuns)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRuns = payrollRuns.filter(
    (run) =>
      run.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
      run.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRunPayroll = () => {
    alert("Initiating payroll run for current period... (Placeholder)")
    // Simulate processing
    const newRun: PayrollRun = {
      id: (payrollRuns.length + 1).toString(),
      period: "Current Period", // Dynamically determine
      runDate: new Date().toISOString().split("T")[0],
      totalAmount: 0,
      status: "Processing",
    }
    setPayrollRuns((prev) => [newRun, ...prev])
  }

  const handleViewDetails = (id: string) => {
    alert(`View Payroll Run Details for ID: ${id} functionality not implemented yet.`)
  }

  const handleDownloadReport = (id: string) => {
    alert(`Downloading payroll report for ID: ${id} functionality not implemented yet.`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Automated Payroll Processing</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Button onClick={handleRunPayroll} className="flex-1">
            <PlayIcon className="h-4 w-4 mr-2" /> Run Payroll for Current Period
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <HistoryIcon className="h-4 w-4 mr-2" /> View Payroll History
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payroll Runs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex-1 mb-4">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search payroll runs..."
              className="w-full rounded-lg bg-background pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payroll Period</TableHead>
                <TableHead>Run Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRuns.map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-medium">{run.period}</TableCell>
                  <TableCell>{run.runDate}</TableCell>
                  <TableCell>${run.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        run.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : run.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {run.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(run.id)}>
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                    {run.status === "Completed" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadReport(run.id)}
                        title="Download Report"
                      >
                        <DownloadIcon className="h-4 w-4" />
                        <span className="sr-only">Download Report</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRuns.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No payroll runs found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
