"use client"

import { useState } from "react"
import SettingsOverview from "./settings/settings-overview"
import GeneralSettingsPage from "./settings/general-settings-page"
import UserManagementPage from "./settings/user-management-page"
import SystemComplianceSecurityPage from "./settings/system-compliance-security-page"

interface SettingsProps {
  initialView?: string
}

export default function Settings({ initialView = "settings-overview" }: SettingsProps) {
  const [activeView, setActiveView] = useState(initialView)

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  const renderView = () => {
    switch (activeView) {
      case "general-settings":
        return <GeneralSettingsPage onBack={() => handleNavigate("settings-overview")} />
      case "user-management":
        return <UserManagementPage onBack={() => handleNavigate("settings-overview")} />
      case "system-compliance-security":
        return <SystemComplianceSecurityPage onBack={() => handleNavigate("settings-overview")} />
      case "settings-overview":
      default:
        return <SettingsOverview onNavigate={handleNavigate} />
    }
  }

  return <div className="flex flex-col flex-1">{renderView()}</div>
}
