"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, TrendingUp, Wrench, Clock, DollarSign, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MaintenanceReports() {
  const [dateRange, setDateRange] = useState("last-30-days")
  const { toast } = useToast()

  const maintenanceStats = {
    totalWorkOrders: 156,
    completed: 142,
    pending: 8,
    overdue: 6,
    totalCost: 45680,
    avgCompletionTime: 2.3,
    preventiveMaintenance: 78,
    correctiveMaintenance: 64,
  }

  const workOrdersByStatus = [
    { status: "Completed", count: 142, color: "bg-green-500" },
    { status: "In Progress", count: 8, color: "bg-blue-500" },
    { status: "Pending", count: 6, color: "bg-yellow-500" },
    { status: "Overdue", count: 6, color: "bg-red-500" },
  ]

  const costByCategory = [
    { category: "HVAC Systems", cost: 15420, percentage: 34 },
    { category: "Electrical", cost: 12350, percentage: 27 },
    { category: "Plumbing", cost: 8900, percentage: 19 },
    { category: "Machinery", cost: 6780, percentage: 15 },
    { category: "Other", cost: 2230, percentage: 5 },
  ]

  const technicianPerformance = [
    { name: "John Smith", completed: 28, avgTime: 2.1, efficiency: 95 },
    { name: "Sarah Johnson", completed: 24, avgTime: 2.3, efficiency: 92 },
    { name: "Mike Wilson", completed: 22, avgTime: 2.5, efficiency: 88 },
    { name: "Lisa Brown", completed: 20, avgTime: 2.8, efficiency: 85 },
  ]

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Exporting maintenance report as ${format.toUpperCase()}...`,
      variant: "default",
    })

    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your ${format.toUpperCase()} report has been downloaded.`,
        variant: "default",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Reports</h1>
          <p className="text-muted-foreground">Comprehensive maintenance analytics and performance metrics</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-90-days">Last 90 Days</option>
            <option value="last-year">Last Year</option>
          </select>
          <Button onClick={() => handleExport("pdf")} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={() => handleExport("excel")} variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Work Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceStats.totalWorkOrders}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((maintenanceStats.completed / maintenanceStats.totalWorkOrders) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {maintenanceStats.completed} of {maintenanceStats.totalWorkOrders} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${maintenanceStats.totalCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">-8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceStats.avgCompletionTime} days</div>
            <p className="text-xs text-muted-foreground">-0.3 days from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Work Order Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Work Order Status Distribution</CardTitle>
          <CardDescription>Current status of all maintenance work orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workOrdersByStatus.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="font-medium">{item.status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{item.count} orders</span>
                  <Badge variant="secondary">
                    {Math.round((item.count / maintenanceStats.totalWorkOrders) * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Cost by Category</CardTitle>
          <CardDescription>Breakdown of maintenance expenses by asset category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costByCategory.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-sm font-medium">
                    ${item.cost.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preventive vs Corrective Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Type Distribution</CardTitle>
            <CardDescription>Preventive vs. Corrective maintenance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="font-medium">Preventive</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{maintenanceStats.preventiveMaintenance} orders</span>
                  <Badge variant="secondary">
                    {Math.round(
                      (maintenanceStats.preventiveMaintenance /
                        (maintenanceStats.preventiveMaintenance + maintenanceStats.correctiveMaintenance)) *
                        100,
                    )}
                    %
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="font-medium">Corrective</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{maintenanceStats.correctiveMaintenance} orders</span>
                  <Badge variant="secondary">
                    {Math.round(
                      (maintenanceStats.correctiveMaintenance /
                        (maintenanceStats.preventiveMaintenance + maintenanceStats.correctiveMaintenance)) *
                        100,
                    )}
                    %
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technician Performance</CardTitle>
            <CardDescription>Performance metrics for maintenance technicians</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {technicianPerformance.map((tech) => (
                <div key={tech.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{tech.name}</span>
                    <Badge variant={tech.efficiency >= 90 ? "default" : "secondary"}>
                      {tech.efficiency}% efficiency
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tech.completed} completed • {tech.avgTime} days avg
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Work Orders Alert */}
      {maintenanceStats.overdue > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700 dark:text-red-400">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Overdue Work Orders
            </CardTitle>
            <CardDescription>
              {maintenanceStats.overdue} work orders are past their due date and require immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" size="sm">
              View Overdue Orders
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
