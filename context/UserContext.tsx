"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "admin" | "hr" | "manager" | "employee"

interface UserContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>("admin")

  return <UserContext.Provider value={{ userRole, setUserRole }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
