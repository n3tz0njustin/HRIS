"use client"

import { useState, useMemo } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MenuIcon,
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  BarChartIcon,
  SettingsIcon,
  ClockIcon,
  DollarSignIcon,
  HeartHandshakeIcon,
  GraduationCapIcon,
  PackageIcon,
} from "lucide-react"
import Link from "next/link"
import { UserProvider, useUser, type UserRole } from "@/context/UserContext"
import CoreHR from "@/components/core-hr"
import RecruitmentOnboarding from "@/components/recruitment-onboarding"
import PerformanceManagement from "@/components/performance-management"
import TimeAttendance from "@/components/time-attendance"
import PayrollCompensation from "@/components/payroll-compensation"
import AnalyticsReporting from "@/components/analytics-reporting"
import LearningDevelopment from "@/components/learning-development"
import EmployeeEngagements from "@/components/employee-engagements"
import SettingsModule from "@/components/settings"

// Move navItems outside the component to avoid initialization issues
const navItems = [
  { name: "Dashboard", icon: HomeIcon, path: "dashboard-overview", roles: ["admin", "hr", "employee", "manager"] },
  { name: "HR Management", icon: UsersIcon, path: "hr-management-overview", roles: ["admin", "hr", "manager"] },
  {
    name: "Recruitment & Onboarding",
    icon: BriefcaseIcon,
    path: "recruitment-onboarding-overview",
    roles: ["admin", "hr"],
  },
  {
    name: "Performance Management",
    icon: BarChartIcon,
    path: "performance-management-overview",
    roles: ["admin", "hr", "employee", "manager"],
  },
  {
    name: "Time & Attendance",
    icon: ClockIcon,
    path: "time-attendance-overview",
    roles: ["admin", "hr", "employee", "manager"],
  },
  {
    name: "Payroll & Compensation",
    icon: DollarSignIcon,
    path: "payroll-compensation-overview",
    roles: ["admin", "hr"],
  },
  {
    name: "Analytics & Reporting",
    icon: BarChartIcon,
    path: "analytics-reporting-overview",
    roles: ["admin", "hr", "manager"],
  },
  {
    name: "Learning & Development",
    icon: GraduationCapIcon,
    path: "learning-development-overview",
    roles: ["admin", "hr", "employee", "manager"],
  },
  {
    name: "Employee Engagements",
    icon: HeartHandshakeIcon,
    path: "employee-engagements-overview",
    roles: ["admin", "hr", "employee", "manager"],
  },
  { name: "Settings", icon: SettingsIcon, path: "settings-overview", roles: ["admin"] },
]

// Dashboard component to display content based on active module
function DashboardContent() {
  const { userRole, setUserRole } = useUser()
  const [activeModule, setActiveModule] = useState("dashboard-overview")

  const handleModuleNavigation = (module: string) => {
    setActiveModule(module)
  }

  const renderModule = useMemo(() => {
    switch (activeModule) {
      case "hr-management-overview":
      case "employee-database":
      case "document-management":
      case "org-chart":
      case "self-service-portal":
        return <CoreHR initialView={activeModule} />
      case "recruitment-onboarding-overview":
      case "applicant-tracking-system":
      case "tech-skill-assessments":
      case "custom-hiring-pipelines":
      case "automated-onboarding":
        return <RecruitmentOnboarding initialView={activeModule} />
      case "performance-management-overview":
      case "goals-okrs":
      case "feedback":
      case "performance-reviews":
      case "project-evaluation":
        return <PerformanceManagement initialView={activeModule} />
      case "time-attendance-overview":
      case "time-tracking":
      case "leave-management":
      case "flexible-work-scheduling":
      case "time-attendance-reporting":
        return <TimeAttendance initialView={activeModule} />
      case "payroll-compensation-overview":
      case "automated-payroll-processing":
      case "bonuses-variable-pay":
      case "expense-reimbursement":
      case "benefits-administration":
        return <PayrollCompensation initialView={activeModule} />
      case "analytics-reporting-overview":
      case "workforce-analytics":
      case "custom-dashboards":
      case "real-time-reports":
      case "predictive-analytics":
        return <AnalyticsReporting initialView={activeModule} />
      case "learning-development-overview":
      case "skill-matrix-tracking":
      case "training-portal":
      case "certifications":
      case "mentorship-matching":
        return <LearningDevelopment initialView={activeModule} />
      case "employee-engagements-overview":
      case "pulse-surveys":
      case "recognition-rewards":
      case "internal-social-feed":
      case "anonymous-feedback-channels":
        return <EmployeeEngagements initialView={activeModule} />
      case "settings-overview":
      case "user-management":
      case "system-compliance-security":
      case "general-settings":
        return <SettingsModule initialView={activeModule} />
      case "dashboard-overview":
      default:
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Welcome to your Dashboard, {userRole}!</h2>
            <p className="text-muted-foreground">Select a module from the sidebar to get started.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {navItems
                .filter((item) => item.path !== "dashboard-overview" && item.roles.includes(userRole))
                .map((item) => (
                  <Button
                    key={item.path}
                    variant="outline"
                    className="flex flex-col h-auto p-6 items-center justify-center text-center bg-transparent"
                    onClick={() => handleModuleNavigation(item.path)}
                  >
                    <item.icon className="h-8 w-8 mb-2 text-primary" />
                    <span className="text-lg font-semibold">{item.name}</span>
                  </Button>
                ))}
            </div>
          </div>
        )
    }
  }, [activeModule, userRole])

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole))

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold">
              <PackageIcon className="h-6 w-6" />
              <span className="">Netzon HRIS</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {filteredNavItems.map((item) => {
                return (
                  <Button
                    key={item.path}
                    variant={activeModule.startsWith(item.path.split("-")[0]) ? "secondary" : "ghost"}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary justify-start"
                    onClick={() => handleModuleNavigation(item.path)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <PackageIcon className="h-6 w-6" />
                  <span className="sr-only">Netzon HRIS</span>
                </a>
                {filteredNavItems.map((item) => {
                  return (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-primary justify-start"
                      onClick={() => handleModuleNavigation(item.path)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <h1 className="font-semibold text-lg capitalize">
              {activeModule.replace(/-/g, " ").replace("overview", "Overview")}
            </h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback>{userRole.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-2">
                <label
                  htmlFor="role-switcher-dropdown"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Simulate Role:
                </label>
                <Select value={userRole} onValueChange={(value: UserRole) => setUserRole(value)}>
                  <SelectTrigger id="role-switcher-dropdown" className="w-full h-8 text-xs">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{renderModule}</main>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <UserProvider>
      <DashboardContent />
    </UserProvider>
  )
}
