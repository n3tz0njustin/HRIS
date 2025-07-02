"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, FileText, Calendar, Settings, Download, Edit, Save, X } from "lucide-react"

interface SelfServicePortalPageProps {
  onBack: () => void
}

export default function SelfServicePortalPage({ onBack }: SelfServicePortalPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Developer",
    manager: "Sarah Johnson",
    startDate: "2023-01-15",
    address: "123 Main St, City, State 12345",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    alert("Profile updated successfully!")
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Self-Service Portal</h2>
          <p className="text-muted-foreground">Manage your profile and access HR services</p>
        </div>
        <Button onClick={onBack} variant="outline" className="bg-white/80 backdrop-blur-sm">
          Back to Overview
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Requests
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  Personal Information
                </CardTitle>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm" className="gap-2">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm" className="gap-2 bg-transparent">
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{profileData.name}</h3>
                  <p className="text-muted-foreground">{profileData.position}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {profileData.department}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" value={profileData.department} disabled className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" value={profileData.position} disabled className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Manager</Label>
                  <Input id="manager" value={profileData.manager} disabled className="bg-gray-50" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/50"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                My Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Employment Contract", date: "2023-01-15", type: "PDF" },
                  { name: "Tax Forms (W-2)", date: "2024-01-31", type: "PDF" },
                  { name: "Benefits Enrollment", date: "2023-01-20", type: "PDF" },
                  { name: "Performance Review 2023", date: "2023-12-15", type: "PDF" },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-white/50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">Updated: {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{doc.type}</Badge>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                Leave Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Request Time Off
                </Button>

                <div className="space-y-3">
                  {[
                    { type: "Vacation", dates: "Dec 25-29, 2024", status: "Approved", color: "green" },
                    { type: "Sick Leave", dates: "Nov 15, 2024", status: "Approved", color: "green" },
                    { type: "Personal", dates: "Jan 15, 2025", status: "Pending", color: "yellow" },
                  ].map((request, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-white/50">
                      <div>
                        <p className="font-medium">{request.type}</p>
                        <p className="text-sm text-muted-foreground">{request.dates}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          request.color === "green"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Preferences</h4>
                  <div className="space-y-3">
                    {[
                      "Email notifications for leave approvals",
                      "SMS alerts for urgent HR updates",
                      "Weekly performance summaries",
                      "Birthday and anniversary reminders",
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-white/50">
                        <span className="text-sm">{setting}</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Privacy Settings</h4>
                  <div className="space-y-3">
                    {[
                      "Show profile in company directory",
                      "Allow colleagues to view contact info",
                      "Include in team birthday notifications",
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-white/50">
                        <span className="text-sm">{setting}</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
