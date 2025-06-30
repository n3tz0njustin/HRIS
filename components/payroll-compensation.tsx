"use client"

import { useState } from "react"
import PayrollCompensationOverview from "./payroll-compensation/payroll-compensation-overview"
import AutomatedPayrollProcessingPage from "./payroll-compensation/automated-payroll-processing-page"
import BonusesVariablePayPage from "./payroll-compensation/bonuses-variable-pay-page"
import ExpenseReimbursementPage from "./payroll-compensation/expense-reimbursement-page"
import BenefitsAdministrationPage from "./payroll-compensation/benefits-administration-page"

interface PayrollCompensationProps {
  initialView?: string
}

export default function PayrollCompensation({
  initialView = "payroll-compensation-overview",
}: PayrollCompensationProps) {
  const [activeView, setActiveView] = useState(initialView)

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  const renderView = () => {
    switch (activeView) {
      case "automated-payroll-processing":
        return <AutomatedPayrollProcessingPage onBack={() => handleNavigate("payroll-compensation-overview")} />
      case "bonuses-variable-pay":
        return <BonusesVariablePayPage onBack={() => handleNavigate("payroll-compensation-overview")} />
      case "expense-reimbursement":
        return <ExpenseReimbursementPage onBack={() => handleNavigate("payroll-compensation-overview")} />
      case "benefits-administration":
        return <BenefitsAdministrationPage onBack={() => handleNavigate("payroll-compensation-overview")} />
      case "payroll-compensation-overview":
      default:
        return <PayrollCompensationOverview onNavigate={handleNavigate} />
    }
  }

  return <div className="flex flex-col flex-1">{renderView()}</div>
}
