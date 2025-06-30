"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"

interface OrgNode {
  id: string
  name: string
  title: string
  children?: OrgNode[]
}

const orgData: OrgNode = {
  id: "1",
  name: "CEO: Jane Doe",
  title: "CEO",
  children: [
    {
      id: "2",
      name: "VP HR: Alice Smith",
      title: "VP HR",
      children: [
        { id: "3", name: "HR Manager: Bob Johnson", title: "HR Manager" },
        { id: "4", name: "HR Specialist: Carol White", title: "HR Specialist" },
      ],
    },
    {
      id: "5",
      name: "VP Engineering: David Lee",
      title: "VP Engineering",
      children: [
        { id: "6", name: "Eng Manager: Eve Davis", title: "Engineering Manager" },
        { id: "7", name: "Software Eng: Frank Green", title: "Software Engineer" },
      ],
    },
    {
      id: "8",
      name: "VP Sales: Grace Hall",
      title: "VP Sales",
      children: [{ id: "9", name: "Sales Manager: Henry King", title: "Sales Manager" }],
    },
  ],
}

interface OrgChartPageProps {
  onBack: () => void
}

export default function OrgChartPage({ onBack }: OrgChartPageProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const renderTree = (nodes: OrgNode) => (
    <TreeItem key={nodes.id} itemId={nodes.id} label={`${nodes.name} (${nodes.title})`}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  )

  // Simple search filter (can be enhanced for more complex matching)
  const filterOrgData = (node: OrgNode, term: string): OrgNode | null => {
    const lowerCaseTerm = term.toLowerCase()
    const matches = node.name.toLowerCase().includes(lowerCaseTerm) || node.title.toLowerCase().includes(lowerCaseTerm)

    const filteredChildren = node.children?.map((child) => filterOrgData(child, term)).filter(Boolean) as OrgNode[]

    if (matches || (filteredChildren && filteredChildren.length > 0)) {
      return { ...node, children: filteredChildren }
    }
    return null
  }

  const filteredOrgData = searchTerm ? filterOrgData(orgData, searchTerm) : orgData

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Organizational Chart</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex-1 mb-4">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or title..."
              className="w-full rounded-lg bg-background pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredOrgData ? (
            <SimpleTreeView>{renderTree(filteredOrgData)}</SimpleTreeView>
          ) : (
            <p className="text-center text-muted-foreground mt-4">No matching results found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
