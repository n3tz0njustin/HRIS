"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { CalendarIcon, FileTextIcon, BriefcaseIcon, DownloadIcon } from "lucide-react"

interface SelfServicePortalPageProps {
  onBack: () => void
}

export default function SelfServicePortalPage({ onBack }: SelfServicePortalPageProps) {
  const [activeTab, setActiveTab] = useState("profile")

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Profile updated successfully!")
  }

  const handleLeaveRequest = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Leave request submitted!")
  }

  const handleDocumentDownload = (docName: string) => {
    alert(`Downloading ${docName}... (Placeholder)`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Self-Service Portal</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <div className="flex border-b">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("profile")}
          className={activeTab === "profile" ? "border-b-2 border-primary rounded-none" : "rounded-none"}
        >
          My Profile
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("leave")}
          className={activeTab === "leave" ? "border-b-2 border-primary rounded-none" : "rounded-none"}
        >
          Leave Requests
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("documents")}
          className={activeTab === "documents" ? "border-b-2 border-primary rounded-none" : "rounded-none"}
        >
          Documents & Resources
        </Button>
      </div>

      {activeTab === "profile" && (
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="123-456-7890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main St, Anytown, USA" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue="Software Engineer with 5 years of experience." />
              </div>
              <div className="md:col-span-2">
                <Button type="submit">Update Profile</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === "leave" && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Leave Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLeaveRequest} className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="leave-type">Leave Type</Label>
                <Select>
                  <SelectTrigger id="leave-type">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="vacation">Vacation Leave</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" placeholder="Reason for leave" />
              </div>
              <Button type="submit">Submit Request</Button>
            </form>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">My Leave Balance</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <span className="font-medium">Vacation Days:</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">15</p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <span className="font-medium">Sick Days:</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">7</p>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card>
          <CardHeader>
            <CardTitle>Company Documents & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center gap-3">
                  <FileTextIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Employee Handbook 2024</p>
                    <p className="text-sm text-muted-foreground">Version 1.2 - PDF</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => handleDocumentDownload("Employee Handbook 2024")}>
                  <DownloadIcon className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center gap-3">
                  <BriefcaseIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Benefits Guide</p>
                    <p className="text-sm text-muted-foreground">Updated: 2024-01-01 - PDF</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => handleDocumentDownload("Benefits Guide")}>
                  <DownloadIcon className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center gap-3">
                  <FileTextIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Company Policy on Remote Work</p>
                    <p className="text-sm text-muted-foreground">Version 2.0 - DOCX</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => handleDocumentDownload("Company Policy on Remote Work")}>
                  <DownloadIcon className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
