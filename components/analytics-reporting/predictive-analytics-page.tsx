"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUpIcon, AlertTriangleIcon, UsersIcon, DollarSignIcon } from "lucide-react"

interface PredictiveAnalyticsPageProps {
  onBack: () => void
}

export default function PredictiveAnalyticsPage({ onBack }: PredictiveAnalyticsPageProps) {
  const [predictionType, setPredictionType] = useState("attrition")

  // Sample data for demonstration
  const attritionPrediction = {
    highRiskEmployees: [
      {
        id: "E001",
        name: "Alice Johnson",
        department: "Engineering",
        riskScore: 85,
        reason: "Low engagement, recent performance dip",
      },
      {
        id: "E002",
        name: "Bob Williams",
        department: "Sales",
        riskScore: 78,
        reason: "Below average performance, high market demand for skills",
      },
    ],
    overallAttritionRate: 12.5, // Predicted percentage for next 12 months
  }

  const performancePrediction = {
    topPerformers: [
      {
        id: "E003",
        name: "Charlie Davis",
        department: "Marketing",
        predictedScore: 92,
        reason: "Consistent high performance, positive feedback",
      },
      {
        id: "E004",
        name: "Diana Miller",
        department: "HR",
        predictedScore: 88,
        reason: "Strong project completion, leadership potential",
      },
    ],
    underPerformers: [
      {
        id: "E005",
        name: "Eve Brown",
        department: "Engineering",
        predictedScore: 60,
        reason: "Missed deadlines, low project contribution",
      },
    ],
  }

  const talentGapPrediction = {
    criticalSkillsNeeded: [
      { skill: "AI/ML Engineering", urgency: "High", currentGap: 5 },
      { skill: "Cloud Security", urgency: "Medium", currentGap: 3 },
    ],
    projectedHiringNeeds: 15, // Number of hires needed in next 6 months
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Predictive Analytics</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Select value={predictionType} onValueChange={setPredictionType}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select Prediction Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="attrition">Attrition Prediction</SelectItem>
            <SelectItem value="performance">Performance Prediction</SelectItem>
            <SelectItem value="talent-gap">Talent Gap Analysis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {predictionType === "attrition" && (
        <Card>
          <CardHeader>
            <CardTitle>Attrition Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <TrendingUpIcon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Predicted Overall Attrition Rate (Next 12 Months)</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">{attritionPrediction.overallAttritionRate}%</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">High-Risk Employees</h3>
                {attritionPrediction.highRiskEmployees.length > 0 ? (
                  <div className="grid gap-3">
                    {attritionPrediction.highRiskEmployees.map((employee) => (
                      <div key={employee.id} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangleIcon className="h-5 w-5 text-red-500" />
                          <div>
                            <p className="font-medium">
                              {employee.name} ({employee.department})
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Risk Score: {employee.riskScore} - {employee.reason}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No high-risk employees identified.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {predictionType === "performance" && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Predicted Top Performers</h3>
                {performancePrediction.topPerformers.length > 0 ? (
                  <div className="grid gap-3">
                    {performancePrediction.topPerformers.map((employee) => (
                      <div key={employee.id} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-2">
                          <UsersIcon className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">
                              {employee.name} ({employee.department})
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Predicted Score: {employee.predictedScore} - {employee.reason}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No top performers predicted.</p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Predicted Underperformers</h3>
                {performancePrediction.underPerformers.length > 0 ? (
                  <div className="grid gap-3">
                    {performancePrediction.underPerformers.map((employee) => (
                      <div key={employee.id} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangleIcon className="h-5 w-5 text-red-500" />
                          <div>
                            <p className="font-medium">
                              {employee.name} ({employee.department})
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Predicted Score: {employee.predictedScore} - {employee.reason}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No underperformers predicted.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {predictionType === "talent-gap" && (
        <Card>
          <CardHeader>
            <CardTitle>Talent Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <DollarSignIcon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Projected Hiring Needs (Next 6 Months)</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">{talentGapPrediction.projectedHiringNeeds}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Critical Skills Needed</h3>
                {talentGapPrediction.criticalSkillsNeeded.length > 0 ? (
                  <div className="grid gap-3">
                    {talentGapPrediction.criticalSkillsNeeded.map((skill) => (
                      <div key={skill.skill} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-2">
                          <TrendingUpIcon className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">{skill.skill}</p>
                            <p className="text-sm text-muted-foreground">
                              Urgency: {skill.urgency} - Current Gap: {skill.currentGap} positions
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No critical skill gaps identified.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
