"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Plus, Minus, Check, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

// Mock data for consumable items
const consumableItems = [
  { id: 1, name: "Printer Paper A4", sku: "PP-A4-500", category: "Office Supplies", available: 120, unit: "Ream" },
  {
    id: 2,
    name: "Toner Cartridge HP 85A",
    sku: "TC-HP85A",
    category: "Printer Supplies",
    available: 15,
    unit: "Piece",
  },
  { id: 3, name: "Ballpoint Pens (Blue)", sku: "BP-BLUE-50", category: "Office Supplies", available: 200, unit: "Box" },
  { id: 4, name: "Sticky Notes 3x3", sku: "SN-3X3-YLW", category: "Office Supplies", available: 45, unit: "Pack" },
  { id: 5, name: "Hand Sanitizer 500ml", sku: "HS-500ML", category: "Health Supplies", available: 30, unit: "Bottle" },
  { id: 6, name: "Disposable Face Masks", sku: "FM-DISP-50", category: "Health Supplies", available: 10, unit: "Box" },
  { id: 7, name: "USB Flash Drive 32GB", sku: "USB-32GB", category: "IT Supplies", available: 25, unit: "Piece" },
  { id: 8, name: "Whiteboard Markers", sku: "WM-4COLOR", category: "Office Supplies", available: 18, unit: "Pack" },
]

// Mock data for departments
const departments = [
  { id: 1, name: "Finance" },
  { id: 2, name: "Human Resources" },
  { id: 3, name: "Information Technology" },
  { id: 4, name: "Marketing" },
  { id: 5, name: "Operations" },
  { id: 6, name: "Research & Development" },
  { id: 7, name: "Customer Support" },
]

export default function IssueConsumables() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItems, setSelectedItems] = useState<
    {
      id: number
      name: string
      quantity: number
      available: number
      unit: string
    }[]
  >([])
  const [department, setDepartment] = useState("")
  const [requestedBy, setRequestedBy] = useState("")
  const [purpose, setPurpose] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Filter consumables based on search term
  const filteredItems = consumableItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Add item to selected items
  const addItem = (item: (typeof consumableItems)[0]) => {
    const existingItem = selectedItems.find((i) => i.id === item.id)

    if (existingItem) {
      setSelectedItems(
        selectedItems.map((i) => (i.id === item.id ? { ...i, quantity: Math.min(i.quantity + 1, i.available) } : i)),
      )
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          id: item.id,
          name: item.name,
          quantity: 1,
          available: item.available,
          unit: item.unit,
        },
      ])
    }
  }

  // Remove item from selected items
  const removeItem = (id: number) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id))
  }

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    const item = selectedItems.find((i) => i.id === id)
    if (item) {
      const newQuantity = Math.max(1, Math.min(quantity, item.available))
      setSelectedItems(selectedItems.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i)))
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setSelectedItems([])
        setDepartment("")
        setRequestedBy("")
        setPurpose("")
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Issue Consumables</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Search and select items */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Consumable Items</CardTitle>
              <CardDescription>Search and select items to issue to a department or individual</CardDescription>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, SKU, or category..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Available</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.sku}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.category}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.available} {item.unit}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => addItem(item)}
                              disabled={
                                item.available === 0 ||
                                (selectedItems.find((i) => i.id === item.id)?.quantity || 0) >= item.available
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No items found. Try a different search term.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Issue form */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
              <CardDescription>Complete the form to issue selected items</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment} required>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.name}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requestedBy">Requested By</Label>
                  <Input
                    id="requestedBy"
                    placeholder="Enter name"
                    value={requestedBy}
                    onChange={(e) => setRequestedBy(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Textarea
                    id="purpose"
                    placeholder="Enter purpose of request"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                  />
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label>Selected Items</Label>
                  {selectedItems.length > 0 ? (
                    <div className="border rounded-md divide-y">
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Available: {item.available} {item.unit}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.available}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border rounded-md p-4 text-center text-muted-foreground">No items selected</div>
                  )}
                </div>

                {showSuccess && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <Check className="h-4 w-4" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>Consumables have been issued successfully.</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={selectedItems.length === 0 || !department || !requestedBy || !purpose || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Issue Consumables"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
