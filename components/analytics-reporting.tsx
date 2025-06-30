"use client"

import { useState } from "react"
import AnalyticsReportingOverview from "./analytics-reporting/analytics-reporting-overview"
import WorkforceAnalyticsPage from "./analytics-reporting/workforce-analytics-page"
import CustomDashboardsPage from "./analytics-reporting/custom-dashboards-page"
import RealTimeReportsPage from "./analytics-reporting/real-time-reports-page"
import PredictiveAnalyticsPage from "./analytics-reporting/predictive-analytics-page"

interface AnalyticsReportingProps {
  initialView?: string
}

export default function AnalyticsReporting({ initialView = "analytics-reporting-overview" }: AnalyticsReportingProps) {
  const [activeView, setActiveView] = useState(initialView)

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  const renderView = () => {
    switch (activeView) {
      case "workforce-analytics":
        return <WorkforceAnalyticsPage onBack={() => handleNavigate("analytics-reporting-overview")} />
      case "custom-dashboards":
        return <CustomDashboardsPage onBack={() => handleNavigate("analytics-reporting-overview")} />
      case "real-time-reports":
        return <RealTimeReportsPage onBack={() => handleNavigate("analytics-reporting-overview")} />
      case "predictive-analytics":
        return <PredictiveAnalyticsPage onBack={() => handleNavigate("analytics-reporting-overview")} />
      case "analytics-reporting-overview":
      default:
        return <AnalyticsReportingOverview onNavigate={handleNavigate} />
    }
  }

  return <div className="flex flex-col flex-1">{renderView()}</div>
}
