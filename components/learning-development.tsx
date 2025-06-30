"use client"

import { useState } from "react"
import LearningDevelopmentOverview from "./learning-development/learning-development-overview"
import SkillMatrixTrackingPage from "./learning-development/skill-matrix-tracking-page"
import TrainingPortalPage from "./learning-development/training-portal-page"
import CertificationsPage from "./learning-development/certifications-page"
import MentorshipMatchingPage from "./learning-development/mentorship-matching-page"

interface LearningDevelopmentProps {
  initialView?: string
}

export default function LearningDevelopment({
  initialView = "learning-development-overview",
}: LearningDevelopmentProps) {
  const [activeView, setActiveView] = useState(initialView)

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  const renderView = () => {
    switch (activeView) {
      case "skill-matrix-tracking":
        return <SkillMatrixTrackingPage onBack={() => handleNavigate("learning-development-overview")} />
      case "training-portal":
        return <TrainingPortalPage onBack={() => handleNavigate("learning-development-overview")} />
      case "certifications":
        return <CertificationsPage onBack={() => handleNavigate("learning-development-overview")} />
      case "mentorship-matching":
        return <MentorshipMatchingPage onBack={() => handleNavigate("learning-development-overview")} />
      case "learning-development-overview":
      default:
        return <LearningDevelopmentOverview onNavigate={handleNavigate} />
    }
  }

  return <div className="flex flex-col flex-1">{renderView()}</div>
}
