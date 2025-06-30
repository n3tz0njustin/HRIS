"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UsersIcon, TrendingDownIcon, DollarSignIcon } from "lucide-react"

interface WorkforceAnalyticsPageProps {
  onBack: () => void
}

export default function WorkforceAnalyticsPage({ onBack }: WorkforceAnalyticsPageProps) {
  const [timeframe, setTimeframe] = useState("quarterly")
  const [departmentFilter, setDepartmentFilter] = useState("All")

  // Sample data for demonstration
  const headcountData = {
    monthly: [140, 142, 145, 150, 148, 152],
    quarterly: [130, 145, 152],
    yearly: [120, 152],
  }

  const turnoverData = {
    monthly: [2, 1, 3, 2, 1, 0],
    quarterly: [5, 6, 3],
    yearly: [15, 14],
  }

  const diversityData = {
    gender: { Male: 70, Female: 80 },
    ethnicity: { Asian: 30, Caucasian: 90, Hispanic: 20, Other: 10 },
  }

  const avgSalaryData = {
    Engineering: 95000,
    Marketing: 70000,
    Sales: 80000,
    HR: 65000,
  }

  const currentHeadcount =
    headcountData[timeframe as keyof typeof headcountData]?.[
      headcountData[timeframe as keyof typeof headcountData].length - 1
    ] || 0
  const currentTurnover =
    turnoverData[timeframe as keyof typeof turnoverData]?.[
      turnoverData[timeframe as keyof typeof turnoverData].length - 1
    ] || 0

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Workforce Analytics</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Departments</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Headcount</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentHeadcount}</div>
            <p className="text-xs text-muted-foreground">As of {new Date().toLocaleDateString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turnover Rate ({timeframe})</CardTitle>
            <TrendingDownIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentTurnover}%</div>
            <p className="text-xs text-muted-foreground">Employees left in {timeframe}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Salary ({departmentFilter})</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {departmentFilter === "All"
                ? "N/A"
                : avgSalaryData[departmentFilter as keyof typeof avgSalaryData]?.toLocaleString() || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Based on selected department</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Diversity Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Gender Distribution</h3>
              <div className="flex flex-col gap-2">
                {Object.entries(diversityData.gender).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span>{key}:</span>
                    <span>{value} employees</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Ethnicity Distribution</h3>
              <div className="flex flex-col gap-2">
                {Object.entries(diversityData.ethnicity).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span>{key}:</span>
                    <span>{value} employees</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
