"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShieldIcon, LockIcon, KeyIcon, AlertTriangleIcon } from "lucide-react"

interface SystemComplianceSecurityPageProps {
  onBack: () => void
}

export default function SystemComplianceSecurityPage({ onBack }: SystemComplianceSecurityPageProps) {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordComplexity: "high",
    sessionTimeout: "30",
    auditLogging: true,
    dataEncryption: true,
    gdprCompliance: true,
    hipaaCompliance: false,
    soxCompliance: false,
  })

  const handleSaveSettings = () => {
    alert("Security settings saved successfully!")
  }

  const handleSettingChange = (key: string, value: any) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Compliance & Security</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <ShieldIcon className="h-5 w-5 mr-2" />
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
              <Switch
                id="two-factor-auth"
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-complexity">Password Complexity</Label>
              <Select
                value={securitySettings.passwordComplexity}
                onValueChange={(value) => handleSettingChange("passwordComplexity", value)}
              >
                <SelectTrigger id="password-complexity">
                  <SelectValue placeholder="Select complexity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Select
                value={securitySettings.sessionTimeout}
                onValueChange={(value) => handleSettingChange("sessionTimeout", value)}
              >
                <SelectTrigger id="session-timeout">
                  <SelectValue placeholder="Select timeout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <LockIcon className="h-5 w-5 mr-2" />
            <CardTitle>Data Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="audit-logging">Audit Logging</Label>
              <Switch
                id="audit-logging"
                checked={securitySettings.auditLogging}
                onCheckedChange={(checked) => handleSettingChange("auditLogging", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-encryption">Data Encryption</Label>
              <Switch
                id="data-encryption"
                checked={securitySettings.dataEncryption}
                onCheckedChange={(checked) => handleSettingChange("dataEncryption", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <KeyIcon className="h-5 w-5 mr-2" />
            <CardTitle>Compliance Standards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="gdpr-compliance">GDPR Compliance</Label>
              <Switch
                id="gdpr-compliance"
                checked={securitySettings.gdprCompliance}
                onCheckedChange={(checked) => handleSettingChange("gdprCompliance", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="hipaa-compliance">HIPAA Compliance</Label>
              <Switch
                id="hipaa-compliance"
                checked={securitySettings.hipaaCompliance}
                onCheckedChange={(checked) => handleSettingChange("hipaaCompliance", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sox-compliance">SOX Compliance</Label>
              <Switch
                id="sox-compliance"
                checked={securitySettings.soxCompliance}
                onCheckedChange={(checked) => handleSettingChange("soxCompliance", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <AlertTriangleIcon className="h-5 w-5 mr-2" />
            <CardTitle>Security Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Security Score</span>
              <span className="text-lg font-bold text-green-600">A+</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Security Scan</span>
              <span className="text-sm text-muted-foreground">2024-03-15</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Vulnerabilities</span>
              <span className="text-sm text-green-600">0 Critical</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Security Settings</Button>
      </div>
    </div>
  )
}
