"use client"

import { useState } from "react"
import CoreHROverview from "./core-hr/core-hr-overview"
import EmployeeDatabasePage from "./core-hr/employee-database-page"
import DocumentManagementPage from "./core-hr/document-management-page"
import OrgChartPage from "./core-hr/org-chart-page"
import SelfServicePortalPage from "./core-hr/self-service-portal-page"

interface CoreHRProps {
  initialView?: string
}

export default function CoreHR({ initialView = "core-hr-overview" }: CoreHRProps) {
  const [activeView, setActiveView] = useState(initialView)

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  const renderView = () => {
    switch (activeView) {
      case "employee-database":
        return <EmployeeDatabasePage onBack={() => handleNavigate("core-hr-overview")} />
      case "document-management":
        return <DocumentManagementPage onBack={() => handleNavigate("core-hr-overview")} />
      case "org-chart":
        return <OrgChartPage onBack={() => handleNavigate("core-hr-overview")} />
      case "self-service-portal":
        return <SelfServicePortalPage onBack={() => handleNavigate("core-hr-overview")} />
      case "core-hr-overview":
      default:
        return <CoreHROverview onNavigate={handleNavigate} />
    }
  }

  return <div className="flex flex-col flex-1">{renderView()}</div>
}
