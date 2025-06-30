"use client"

import { useState } from "react"
import RecruitmentOnboardingOverview from "./recruitment-onboarding/recruitment-onboarding-overview"
import ApplicantTrackingSystemPage from "./recruitment-onboarding/applicant-tracking-system-page"
import TechSkillAssessmentsPage from "./recruitment-onboarding/tech-skill-assessments-page"
import CustomHiringPipelinesPage from "./recruitment-onboarding/custom-hiring-pipelines-page"
import AutomatedOnboardingPage from "./recruitment-onboarding/automated-onboarding-page"

interface RecruitmentOnboardingProps {
  initialView?: string
}

export default function RecruitmentOnboarding({
  initialView = "recruitment-onboarding-overview",
}: RecruitmentOnboardingProps) {
  const [activeView, setActiveView] = useState(initialView)

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  const renderView = () => {
    switch (activeView) {
      case "applicant-tracking-system":
        return <ApplicantTrackingSystemPage onBack={() => handleNavigate("recruitment-onboarding-overview")} />
      case "tech-skill-assessments":
        return <TechSkillAssessmentsPage onBack={() => handleNavigate("recruitment-onboarding-overview")} />
      case "custom-hiring-pipelines":
        return <CustomHiringPipelinesPage onBack={() => handleNavigate("recruitment-onboarding-overview")} />
      case "automated-onboarding":
        return <AutomatedOnboardingPage onBack={() => handleNavigate("recruitment-onboarding-overview")} />
      case "recruitment-onboarding-overview":
      default:
        return <RecruitmentOnboardingOverview onNavigate={handleNavigate} />
    }
  }

  return <div className="flex flex-col flex-1">{renderView()}</div>
}
