"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChartIcon, LayoutDashboardIcon, ClockIcon, TrendingUpIcon } from "lucide-react"

interface AnalyticsReportingOverviewProps {
  onNavigate: (page: string) => void
}

export default function AnalyticsReportingOverview({ onNavigate }: AnalyticsReportingOverviewProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Analytics & Reporting Overview</h2>
      <p className="text-muted-foreground">Gain insights into your workforce data with comprehensive reports.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("workforce-analytics")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workforce Analytics</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Key Metrics</div>
            <p className="text-xs text-muted-foreground">Headcount, Turnover, Diversity</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("custom-dashboards")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Dashboards</CardTitle>
            <LayoutDashboardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Personalized dashboards</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("real-time-reports")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Real-time Reports</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Live Data</div>
            <p className="text-xs text-muted-foreground">Up-to-the-minute insights</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("predictive-analytics")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predictive Analytics</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Future Trends</div>
            <p className="text-xs text-muted-foreground">Attrition, Performance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
