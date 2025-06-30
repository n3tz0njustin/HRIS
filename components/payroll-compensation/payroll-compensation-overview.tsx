"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSignIcon, PiggyBankIcon, ReceiptTextIcon, WalletIcon } from "lucide-react"

interface PayrollCompensationOverviewProps {
  onNavigate: (page: string) => void
}

export default function PayrollCompensationOverview({ onNavigate }: PayrollCompensationOverviewProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Payroll & Compensation Overview</h2>
      <p className="text-muted-foreground">Manage all aspects of employee compensation and benefits.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("automated-payroll-processing")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automated Payroll Processing</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">On Track</div>
            <p className="text-xs text-muted-foreground">Next payroll: April 15th</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("bonuses-variable-pay")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bonuses & Variable Pay</CardTitle>
            <PiggyBankIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
            <p className="text-xs text-muted-foreground">Bonuses distributed this quarter</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("expense-reimbursement")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense Reimbursement</CardTitle>
            <ReceiptTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">Pending expense claims</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("benefits-administration")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Benefits Administration</CardTitle>
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Employees enrolled in benefits</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
