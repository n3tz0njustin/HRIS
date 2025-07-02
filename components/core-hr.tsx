"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import CoreHROverview from "./core-hr/core-hr-overview"
import EmployeeDatabasePage from "./core-hr/employee-database-page"
import DocumentManagementPage from "./core-hr/document-management-page"
import OrgChartPage from "./core-hr/org-chart-page"
import SelfServicePortalPage from "./core-hr/self-service-portal-page"

interface CoreHRProps {
  onBack: () => void
}

export default function CoreHR({ onBack }: CoreHRProps) {
  const [currentView, setCurrentView] = useState("overview")

  const renderCurrentView = () => {
    switch (currentView) {
      case "employee-database":
        return <EmployeeDatabasePage onBack={() => setCurrentView("overview")} />
      case "document-management":
        return <DocumentManagementPage onBack={() => setCurrentView("overview")} />
      case "org-chart":
        return <OrgChartPage onBack={() => setCurrentView("overview")} />
      case "self-service-portal":
        return <SelfServicePortalPage onBack={() => setCurrentView("overview")} />
      default:
        return <CoreHROverview onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="space-y-6">
      {currentView === "overview" && (
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      )}
      {renderCurrentView()}
    </div>
  )
}
