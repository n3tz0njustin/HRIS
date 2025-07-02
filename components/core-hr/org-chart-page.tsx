"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import { Users, Building, Search, Download, Expand } from "lucide-react"
import { Input } from "@/components/ui/input"

interface OrgChartPageProps {
  onBack: () => void
}

export default function OrgChartPage({ onBack }: OrgChartPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Organization Chart</h2>
          <p className="text-muted-foreground">Visualize company structure and reporting relationships</p>
        </div>
        <Button onClick={onBack} variant="outline" className="bg-white/80 backdrop-blur-sm">
          Back to Overview
        </Button>
      </div>

      <Card className="modern-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              Company Structure
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search employees..." className="pl-10 w-64 bg-white/50" />
              </div>
              <Button variant="outline" size="icon" className="bg-white/50">
                <Expand className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-white/50">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* CEO Level */}
            <div className="flex justify-center">
              <Card className="w-80 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">Chief Executive Officer</p>
                      <Badge variant="outline" className="mt-1 bg-blue-100 text-blue-800 border-blue-200">
                        Executive
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department Heads */}
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  role: "VP Engineering",
                  dept: "Engineering",
                  team: "45 members",
                  color: "from-green-50 to-emerald-50 border-green-200",
                },
                {
                  name: "Mike Chen",
                  role: "VP Marketing",
                  dept: "Marketing",
                  team: "23 members",
                  color: "from-orange-50 to-red-50 border-orange-200",
                },
                {
                  name: "Emily Davis",
                  role: "VP Sales",
                  dept: "Sales",
                  team: "32 members",
                  color: "from-purple-50 to-pink-50 border-purple-200",
                },
              ].map((exec, index) => (
                <Card key={index} className={`bg-gradient-to-r ${exec.color} border-2`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-gray-600 to-gray-800 text-white">
                          {exec.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{exec.name}</h4>
                        <p className="text-sm text-muted-foreground">{exec.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {exec.dept}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{exec.team}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tree View for detailed structure */}
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Detailed Organization Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleTreeView>
                  <TreeItem itemId="ceo" label="John Doe - CEO">
                    <TreeItem itemId="engineering" label="Engineering Department (45)">
                      <TreeItem itemId="frontend" label="Frontend Team (15)" />
                      <TreeItem itemId="backend" label="Backend Team (20)" />
                      <TreeItem itemId="devops" label="DevOps Team (10)" />
                    </TreeItem>
                    <TreeItem itemId="marketing" label="Marketing Department (23)">
                      <TreeItem itemId="digital" label="Digital Marketing (12)" />
                      <TreeItem itemId="content" label="Content Team (8)" />
                      <TreeItem itemId="design" label="Design Team (3)" />
                    </TreeItem>
                    <TreeItem itemId="sales" label="Sales Department (32)">
                      <TreeItem itemId="inside-sales" label="Inside Sales (18)" />
                      <TreeItem itemId="field-sales" label="Field Sales (14)" />
                    </TreeItem>
                    <TreeItem itemId="hr" label="Human Resources (8)">
                      <TreeItem itemId="recruiting" label="Recruiting (3)" />
                      <TreeItem itemId="operations" label="HR Operations (5)" />
                    </TreeItem>
                  </TreeItem>
                </SimpleTreeView>
              </CardContent>
            </Card>

            {/* Department Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="modern-card border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-4 text-center">
                  <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-900">12</p>
                  <p className="text-sm text-blue-700">Departments</p>
                </CardContent>
              </Card>

              <Card className="modern-card border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-900">1,234</p>
                  <p className="text-sm text-green-700">Total Employees</p>
                </CardContent>
              </Card>

              <Card className="modern-card border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-900">45</p>
                  <p className="text-sm text-purple-700">Managers</p>
                </CardContent>
              </Card>

              <Card className="modern-card border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-4 text-center">
                  <Building className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-900">8</p>
                  <p className="text-sm text-orange-700">Locations</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
