"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Package, ShoppingCart, TrendingUp, Download, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AlertItem {
  id: string
  name: string
  category: string
  currentStock: number
  minimumStock: number
  maximumStock: number
  unit: string
  supplier: string
  lastOrderDate: string
  status: "critical" | "low" | "overstock"
  cost: number
}

const mockAlerts: AlertItem[] = [
  {
    id: "1",
    name: "A4 Paper Reams",
    category: "Office Supplies",
    currentStock: 0,
    minimumStock: 50,
    maximumStock: 200,
    unit: "reams",
    supplier: "Office Depot",
    lastOrderDate: "2024-01-15",
    status: "critical",
    cost: 8.99,
  },
  {
    id: "2",
    name: "Printer Toner - HP LaserJet",
    category: "IT Supplies",
    currentStock: 2,
    minimumStock: 10,
    maximumStock: 30,
    unit: "cartridges",
    supplier: "HP Direct",
    lastOrderDate: "2024-01-20",
    status: "critical",
    cost: 89.99,
  },
  {
    id: "3",
    name: "Cleaning Supplies Kit",
    category: "Maintenance",
    currentStock: 8,
    minimumStock: 15,
    maximumStock: 50,
    unit: "kits",
    supplier: "CleanCorp",
    lastOrderDate: "2024-01-10",
    status: "low",
    cost: 24.99,
  },
  {
    id: "4",
    name: "Safety Gloves",
    category: "Safety Equipment",
    currentStock: 12,
    minimumStock: 25,
    maximumStock: 100,
    unit: "pairs",
    supplier: "SafetyFirst",
    lastOrderDate: "2024-01-18",
    status: "low",
    cost: 3.5,
  },
  {
    id: "5",
    name: "Ethernet Cables",
    category: "IT Supplies",
    currentStock: 180,
    minimumStock: 50,
    maximumStock: 150,
    unit: "cables",
    supplier: "TechSupply",
    lastOrderDate: "2024-01-05",
    status: "overstock",
    cost: 12.99,
  },
]

export default function ReorderAlerts() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [filter, setFilter] = useState<string>("all")
  const { toast } = useToast()

  const filteredAlerts = mockAlerts.filter((item) => {
    if (filter === "all") return true
    if (filter === "critical") return item.status === "critical"
    if (filter === "low") return item.status === "low"
    if (filter === "overstock") return item.status === "overstock"
    return true
  })

  const criticalCount = mockAlerts.filter((item) => item.status === "critical").length
  const lowStockCount = mockAlerts.filter((item) => item.status === "low").length
  const outOfStockCount = mockAlerts.filter((item) => item.currentStock === 0).length
  const overstockCount = mockAlerts.filter((item) => item.status === "overstock").length

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredAlerts.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredAlerts.map((item) => item.id))
    }
  }

  const handleReorder = (itemId?: string) => {
    if (itemId) {
      const item = mockAlerts.find((item) => item.id === itemId)
      toast({
        title: "Reorder Initiated",
        description: `Purchase order has been created for ${item?.name}.`,
        variant: "default",
      })
    } else {
      toast({
        title: "Bulk Reorder Initiated",
        description: `Purchase orders created for ${selectedItems.length} items.`,
        variant: "default",
      })
      setSelectedItems([])
    }
  }

  const handleAcknowledge = () => {
    toast({
      title: "Alerts Acknowledged",
      description: `${selectedItems.length} alerts have been acknowledged.`,
      variant: "default",
    })
    setSelectedItems([])
  }

  const getStockPercentage = (current: number, minimum: number) => {
    return Math.min((current / minimum) * 100, 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "destructive"
      case "low":
        return "secondary"
      case "overstock":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reorder Alerts</h1>
        <p className="text-muted-foreground">Monitor inventory levels and manage reorder alerts</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">Immediate attention required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">Below minimum threshold</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockCount}</div>
            <p className="text-xs text-muted-foreground">Zero inventory items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overstock</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{overstockCount}</div>
            <p className="text-xs text-muted-foreground">Above maximum threshold</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Inventory Alerts</CardTitle>
              <CardDescription>Manage reorder alerts and stock levels</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter alerts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alerts</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="overstock">Overstock</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="mb-4 p-4 bg-muted rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm font-medium">{selectedItems.length} item(s) selected</span>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleReorder()}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Bulk Reorder
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleAcknowledge}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Acknowledge
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Select All */}
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedItems.length === filteredAlerts.length && filteredAlerts.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                Select All
              </label>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleSelectItem(item.id)}
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.category} • Supplier: {item.supplier}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(item.status)}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                        <Button size="sm" onClick={() => handleReorder(item.id)}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Reorder
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Current Stock</p>
                        <p className="text-lg font-semibold">
                          {item.currentStock} {item.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Minimum Required</p>
                        <p className="text-lg font-semibold">
                          {item.minimumStock} {item.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Unit Cost</p>
                        <p className="text-lg font-semibold">${item.cost.toFixed(2)}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Stock Level</span>
                        <span>{Math.round(getStockPercentage(item.currentStock, item.minimumStock))}%</span>
                      </div>
                      <Progress value={getStockPercentage(item.currentStock, item.minimumStock)} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
              <p className="text-muted-foreground">No items match the selected filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
