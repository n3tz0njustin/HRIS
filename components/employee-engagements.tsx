"use client"

import { useState } from "react"
import EmployeeEngagementsOverview from "./employee-engagements/employee-engagements-overview"
import PulseSurveysPage from "./employee-engagements/pulse-surveys-page"
import RecognitionRewardsPage from "./employee-engagements/recognition-rewards-page"
import InternalSocialFeedPage from "./employee-engagements/internal-social-feed-page"
import AnonymousFeedbackChannelsPage from "./employee-engagements/anonymous-feedback-channels-page"

interface EmployeeEngagementsProps {
  initialView?: string
}

export default function EmployeeEngagements({
  initialView = "employee-engagements-overview",
}: EmployeeEngagementsProps) {
  const [activeView, setActiveView] = useState(initialView)

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  const renderView = () => {
    switch (activeView) {
      case "pulse-surveys":
        return <PulseSurveysPage onBack={() => handleNavigate("employee-engagements-overview")} />
      case "recognition-rewards":
        return <RecognitionRewardsPage onBack={() => handleNavigate("employee-engagements-overview")} />
      case "internal-social-feed":
        return <InternalSocialFeedPage onBack={() => handleNavigate("employee-engagements-overview")} />
      case "anonymous-feedback-channels":
        return <AnonymousFeedbackChannelsPage onBack={() => handleNavigate("employee-engagements-overview")} />
      case "employee-engagements-overview":
      default:
        return <EmployeeEngagementsOverview onNavigate={handleNavigate} />
    }
  }

  return <div className="flex flex-col flex-1">{renderView()}</div>
}
