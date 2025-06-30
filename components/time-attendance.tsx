"use client"

import { useState } from "react"
import TimeAttendanceOverview from "./time-attendance/time-attendance-overview"
import TimeTrackingPage from "./time-attendance/time-tracking-page"
import LeaveManagementPage from "./time-attendance/leave-management-page"
import FlexibleWorkSchedulingPage from "./time-attendance/flexible-work-scheduling-page"
import TimeAttendanceReportingPage from "./time-attendance/time-attendance-reporting-page"

interface TimeAttendanceProps {
  initialView?: string
}

export default function TimeAttendance({ initialView = "time-attendance-overview" }: TimeAttendanceProps) {
  const [activeView, setActiveView] = useState(initialView)

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  const renderView = () => {
    switch (activeView) {
      case "time-tracking":
        return <TimeTrackingPage onBack={() => handleNavigate("time-attendance-overview")} />
      case "leave-management":
        return <LeaveManagementPage onBack={() => handleNavigate("time-attendance-overview")} />
      case "flexible-work-scheduling":
        return <FlexibleWorkSchedulingPage onBack={() => handleNavigate("time-attendance-overview")} />
      case "time-attendance-reporting":
        return <TimeAttendanceReportingPage onBack={() => handleNavigate("time-attendance-overview")} />
      case "time-attendance-overview":
      default:
        return <TimeAttendanceOverview onNavigate={handleNavigate} />
    }
  }

  return <div className="flex flex-col flex-1">{renderView()}</div>
}
