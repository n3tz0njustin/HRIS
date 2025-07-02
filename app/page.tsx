"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Users,
  UserPlus,
  Target,
  Clock,
  DollarSign,
  BarChart3,
  BookOpen,
  Heart,
  Settings,
  Menu,
  Bell,
  Search,
  TrendingUp,
  FileText,
  Award,
  ChevronRight,
} from "lucide-react"
import { UserProvider, useUser } from "@/context/UserContext"
import CoreHR from "@/components/core-hr"
import RecruitmentOnboarding from "@/components/recruitment-onboarding"
import PerformanceManagement from "@/components/performance-management"
import TimeAttendance from "@/components/time-attendance"
import PayrollCompensation from "@/components/payroll-compensation"
import AnalyticsReporting from "@/components/analytics-reporting"
import LearningDevelopment from "@/components/learning-development"
import EmployeeEngagements from "@/components/employee-engagements"
import SettingsComponent from "@/components/settings"

// Navigation items with modern styling
const navItems = [
  {
    id: "core-hr",
    title: "Core HR",
    description: "Employee data & documents",
    icon: Users,
    color: "bg-blue-500",
    roles: ["admin", "hr", "manager", "employee"],
  },
  {
    id: "recruitment-onboarding",
    title: "Recruitment",
    description: "Hiring & onboarding",
    icon: UserPlus,
    color: "bg-green-500",
    roles: ["admin", "hr", "manager"],
  },
  {
    id: "performance-management",
    title: "Performance",
    description: "Goals & reviews",
    icon: Target,
    color: "bg-purple-500",
    roles: ["admin", "hr", "manager", "employee"],
  },
  {
    id: "time-attendance",
    title: "Time & Attendance",
    description: "Tracking & scheduling",
    icon: Clock,
    color: "bg-orange-500",
    roles: ["admin", "hr", "manager", "employee"],
  },
  {
    id: "payroll-compensation",
    title: "Payroll",
    description: "Compensation & benefits",
    icon: DollarSign,
    color: "bg-emerald-500",
    roles: ["admin", "hr"],
  },
  {
    id: "analytics-reporting",
    title: "Analytics",
    description: "Reports & insights",
    icon: BarChart3,
    color: "bg-indigo-500",
    roles: ["admin", "hr", "manager"],
  },
  {
    id: "learning-development",
    title: "Learning",
    description: "Training & development",
    icon: BookOpen,
    color: "bg-cyan-500",
    roles: ["admin", "hr", "manager", "employee"],
  },
  {
    id: "employee-engagements",
    title: "Engagement",
    description: "Culture & feedback",
    icon: Heart,
    color: "bg-pink-500",
    roles: ["admin", "hr", "manager", "employee"],
  },
  {
    id: "settings",
    title: "Settings",
    description: "System configuration",
    icon: Settings,
    color: "bg-gray-500",
    roles: ["admin"],
  },
]

function DashboardContent() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const { user, setUser } = useUser()

  const filteredNavItems = navItems.filter((item) => item.roles.includes(user.role))

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId)
  }

  const handleBackToDashboard = () => {
    setActiveModule(null)
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case "core-hr":
        return <CoreHR onBack={handleBackToDashboard} />
      case "recruitment-onboarding":
        return <RecruitmentOnboarding onBack={handleBackToDashboard} />
      case "performance-management":
        return <PerformanceManagement onBack={handleBackToDashboard} />
      case "time-attendance":
        return <TimeAttendance onBack={handleBackToDashboard} />
      case "payroll-compensation":
        return <PayrollCompensation onBack={handleBackToDashboard} />
      case "analytics-reporting":
        return <AnalyticsReporting onBack={handleBackToDashboard} />
      case "learning-development":
        return <LearningDevelopment onBack={handleBackToDashboard} />
      case "employee-engagements":
        return <EmployeeEngagements onBack={handleBackToDashboard} />
      case "settings":
        return <SettingsComponent onBack={handleBackToDashboard} />
      default:
        return null
    }
  }

  if (activeModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto p-6">{renderActiveModule()}</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <div className="hidden w-72 flex-col border-r bg-white/80 backdrop-blur-sm lg:flex">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Netzon HRIS
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-6">
          <nav className="grid gap-2 px-4">
            {filteredNavItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="justify-start h-auto p-4 text-left hover:bg-accent/50 group"
                  onClick={() => handleModuleClick(item.id)}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div
                      className={`p-2 rounded-lg ${item.color} text-white group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </Button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-sm px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden bg-transparent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <div className="h-6 w-6 rounded bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  Netzon HRIS
                </div>
                {filteredNavItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className="justify-start gap-3"
                      onClick={() => handleModuleClick(item.id)}
                    >
                      <IconComponent className="h-5 w-5" />
                      {item.title}
                    </Button>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full max-w-md rounded-lg bg-background pl-8 pr-4 py-2 text-sm border border-input focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <Button variant="outline" size="icon" className="relative bg-transparent">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">3</Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  <Badge variant="secondary" className="w-fit mt-1">
                    {user.role}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setUser({ ...user, role: "admin" })}>Admin</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUser({ ...user, role: "hr" })}>HR</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUser({ ...user, role: "manager" })}>Manager</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUser({ ...user, role: "employee" })}>Employee</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-8">
          {/* Welcome Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-blue-100 text-lg">Here's what's happening with your team today.</p>
            </div>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-24 w-24 rounded-full bg-white/5"></div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="stat-card border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">1,234</div>
                <div className="flex items-center text-xs text-blue-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">New Hires</CardTitle>
                <UserPlus className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">23</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Pending Reviews</CardTitle>
                <FileText className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">8</div>
                <div className="text-xs text-purple-600">Due this week</div>
              </CardContent>
            </Card>

            <Card className="stat-card border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-700">Attendance Rate</CardTitle>
                <Award className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">96.5%</div>
                <div className="text-xs text-orange-600">Above target</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                Quick Actions
              </CardTitle>
              <CardDescription>Frequently used actions for faster workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:bg-blue-50 hover:border-blue-200 bg-transparent"
                  onClick={() => handleModuleClick("core-hr")}
                >
                  <Users className="h-6 w-6 text-blue-600" />
                  <span className="text-sm">Add Employee</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:bg-green-50 hover:border-green-200 bg-transparent"
                  onClick={() => handleModuleClick("recruitment-onboarding")}
                >
                  <UserPlus className="h-6 w-6 text-green-600" />
                  <span className="text-sm">Post Job</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:bg-purple-50 hover:border-purple-200 bg-transparent"
                  onClick={() => handleModuleClick("performance-management")}
                >
                  <Target className="h-6 w-6 text-purple-600" />
                  <span className="text-sm">Set Goals</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:bg-orange-50 hover:border-orange-200 bg-transparent"
                  onClick={() => handleModuleClick("analytics-reporting")}
                >
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                  <span className="text-sm">View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                Recent Activity
              </CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", action: "completed onboarding", time: "2 hours ago", avatar: "SJ" },
                  { name: "Mike Chen", action: "submitted timesheet", time: "4 hours ago", avatar: "MC" },
                  { name: "Emily Davis", action: "requested leave", time: "1 day ago", avatar: "ED" },
                  { name: "Alex Rodriguez", action: "updated profile", time: "2 days ago", avatar: "AR" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                        {activity.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        <span className="font-semibold">{activity.name}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
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
