"use client"

import { useState } from "react"
import PerformanceManagementOverview from "./performance-management/performance-management-overview"
import GoalsOKRsPage from "./goals-okrs"
import FeedbackPage from "./feedback"
import PerformanceReviewsPage from "./performance-reviews"
import ProjectEvaluationPage from "./project-evaluation"

interface PerformanceManagementProps {
  initialView?: string
}

export default function PerformanceManagement({
  initialView = "performance-management-overview",
}: PerformanceManagementProps) {
  const [activeView, setActiveView] = useState(initialView)

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  const renderView = () => {
    switch (activeView) {
      case "goals-okrs":
        return <GoalsOKRsPage onBack={() => handleNavigate("performance-management-overview")} />
      case "feedback":
        return <FeedbackPage onBack={() => handleNavigate("performance-management-overview")} />
      case "performance-reviews":
        return <PerformanceReviewsPage onBack={() => handleNavigate("performance-management-overview")} />
      case "project-evaluation":
        return <ProjectEvaluationPage onBack={() => handleNavigate("performance-management-overview")} />
      case "performance-management-overview":
      default:
        return <PerformanceManagementOverview onNavigate={handleNavigate} />
    }
  }

  return <div className="flex flex-col flex-1">{renderView()}</div>
}
