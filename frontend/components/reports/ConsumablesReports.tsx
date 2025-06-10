"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Package, DollarSign, AlertTriangle, TrendingUp, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ConsumablesReports() {
  const [dateRange, setDateRange] = useState("last-30-days")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const { toast } = useToast()

  // Mock data for consumables reports
  const overviewStats = {
    totalItems: 1247,
    totalValue: 89650,
    lowStockAlerts: 23,
    monthlyConsumption: 15420,
  }

  const topConsumedItems = [
    { name: "A4 Paper", consumed: 450, unit: "reams", cost: 2250, department: "All Departments" },
    { name: "Printer Ink Cartridges", consumed: 89, unit: "units", cost: 4450, department: "IT Department" },
    { name: "Cleaning Supplies", consumed: 234, unit: "bottles", cost: 1170, department: "Facilities" },
    { name: "Office Pens", consumed: 567, unit: "boxes", cost: 850, department: "All Departments" },
    { name: "Sticky Notes", consumed: 123, unit: "packs", cost: 615, department: "Administration" },
  ]

  const departmentConsumption = [
    { department: "IT Department", items: 45, cost: 12450, percentage: 35 },
    { department: "Administration", items: 32, cost: 8900, percentage: 25 },
    { department: "Facilities", items: 28, cost: 7200, percentage: 20 },
    { department: "HR Department", items: 18, cost: 4500, percentage: 13 },
    { department: "Finance", items: 12, cost: 2400, percentage: 7 },
  ]

  const stockLevels = [
    { item: "A4 Paper", current: 45, minimum: 50, maximum: 200, status: "low", category: "Office Supplies" },
    { item: "Printer Toner", current: 8, minimum: 10, maximum: 50, status: "critical", category: "IT Supplies" },
    { item: "Hand Sanitizer", current: 25, minimum: 15, maximum: 100, status: "good", category: "Health & Safety" },
    { item: "Batteries (AA)", current: 120, minimum: 30, maximum: 150, status: "overstock", category: "Electronics" },
    { item: "Cleaning Wipes", current: 18, minimum: 20, maximum: 80, status: "low", category: "Cleaning" },
  ]

  const costAnalysis = [
    { category: "Office Supplies", cost: 25400, percentage: 40, items: 45 },
    { category: "IT Supplies", cost: 19050, percentage: 30, items: 23 },
    { category: "Cleaning Supplies", cost: 12700, percentage: 20, items: 18 },
    { category: "Health & Safety", cost: 6350, percentage: 10, items: 12 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500"
      case "low":
        return "bg-yellow-500"
      case "good":
        return "bg-green-500"
      case "overstock":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      critical: "bg-red-100 text-red-800",
      low: "bg-yellow-100 text-yellow-800",
      good: "bg-green-100 text-green-800",
      overstock: "bg-blue-100 text-blue-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Preparing consumables report for download...",
      variant: "default",
    })

    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your consumables report has been downloaded.",
        variant: "default",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Consumables Reports</h1>
          <p className="text-muted-foreground">Comprehensive analysis of consumable inventory and usage</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.totalItems.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${overviewStats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.lowStockAlerts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+3</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Consumption</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${overviewStats.monthlyConsumption.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage Analysis</TabsTrigger>
          <TabsTrigger value="stock">Stock Levels</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Consumed Items */}
            <Card>
              <CardHeader>
                <CardTitle>Top Consumed Items</CardTitle>
                <CardDescription>Most frequently used consumables this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topConsumedItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.consumed} {item.unit} • ${item.cost}
                      </p>
                    </div>
                    <Badge variant="secondary">{item.department}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Department Consumption */}
            <Card>
              <CardHeader>
                <CardTitle>Department Consumption</CardTitle>
                <CardDescription>Consumption breakdown by department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {departmentConsumption.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{dept.department}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">${dept.cost.toLocaleString()}</span>
                    </div>
                    <Progress value={dept.percentage} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {dept.items} items • {dept.percentage}%
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Stock Levels</CardTitle>
              <CardDescription>Overview of current inventory levels and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockLevels.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{item.item}</p>
                        <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">
                        {item.current} / {item.maximum} units
                      </p>
                      <div className="w-32">
                        <Progress value={(item.current / item.maximum) * 100} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground">Min: {item.minimum}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis by Category</CardTitle>
              <CardDescription>Breakdown of consumable costs by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costAnalysis.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{category.category}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">${category.cost.toLocaleString()}</span>
                    </div>
                    <Progress value={category.percentage} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{category.items} items</span>
                      <span>{category.percentage}% of total cost</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
