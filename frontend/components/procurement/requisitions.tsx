"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ClipboardList,
  Plus,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  User,
  X,
  DollarSign,
} from "lucide-react"
import { toast } from "sonner"

interface Requisition {
  id: string
  title: string
  description: string
  requestor: string
  department: string
  branch: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "draft" | "pending" | "approved" | "rejected" | "cancelled"
  totalAmount: number
  requestDate: string
  requiredDate: string
  approver?: string
  approvalDate?: string
  riskAssessment: {
    level: "low" | "medium" | "high"
    factors: string[]
    mitigation: string
  }
  items: {
    id: string
    name: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    specifications: string
  }[]
  attachments: string[]
  auditTrail: {
    action: string
    user: string
    timestamp: string
    notes?: string
  }[]
}

interface NewRequisitionForm {
  title: string
  description: string
  department: string
  branch: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  requiredDate: string
  riskFactors: string[]
  mitigation: string
  items: {
    name: string
    description: string
    quantity: number
    unitPrice: number
    specifications: string
  }[]
}

const mockRequisitions: Requisition[] = [
  {
    id: "REQ-2024-001",
    title: "IT Equipment for Development Team",
    description: "Laptops, monitors, and accessories for new developers",
    requestor: "John Smith",
    department: "Information Technology",
    branch: "HO-NY",
    category: "IT Equipment",
    priority: "high",
    status: "pending",
    totalAmount: 12500,
    requestDate: "2024-01-15",
    requiredDate: "2024-02-01",
    riskAssessment: {
      level: "medium",
      factors: ["Budget impact", "Delivery timeline", "Vendor reliability"],
      mitigation: "Multiple vendor quotes obtained, budget pre-approved",
    },
    items: [
      {
        id: "1",
        name: 'MacBook Pro 16"',
        description: "M3 Pro chip, 18GB RAM, 512GB SSD",
        quantity: 3,
        unitPrice: 2500,
        totalPrice: 7500,
        specifications: "Apple M3 Pro, 18GB unified memory, 512GB SSD",
      },
      {
        id: "2",
        name: "External Monitor",
        description: '27" 4K USB-C Display',
        quantity: 3,
        unitPrice: 800,
        totalPrice: 2400,
        specifications: "27-inch, 4K resolution, USB-C connectivity",
      },
    ],
    attachments: ["specifications.pdf", "budget_approval.pdf"],
    auditTrail: [
      {
        action: "Created",
        user: "John Smith",
        timestamp: "2024-01-15T09:00:00Z",
        notes: "Initial requisition created",
      },
      {
        action: "Risk Assessment Completed",
        user: "John Smith",
        timestamp: "2024-01-15T10:30:00Z",
        notes: "Risk level assessed as medium",
      },
      {
        action: "Submitted for Approval",
        user: "John Smith",
        timestamp: "2024-01-15T11:00:00Z",
      },
    ],
  },
  {
    id: "REQ-2024-002",
    title: "Office Furniture for New Branch",
    description: "Desks, chairs, and storage for California branch",
    requestor: "Sarah Johnson",
    department: "Operations",
    branch: "BO-CA",
    category: "Furniture",
    priority: "medium",
    status: "approved",
    totalAmount: 8750,
    requestDate: "2024-01-10",
    requiredDate: "2024-01-25",
    approver: "Mike Wilson",
    approvalDate: "2024-01-12",
    riskAssessment: {
      level: "low",
      factors: ["Standard procurement", "Established vendor"],
      mitigation: "Using approved vendor with good track record",
    },
    items: [
      {
        id: "1",
        name: "Office Desk",
        description: "Adjustable height desk",
        quantity: 10,
        unitPrice: 450,
        totalPrice: 4500,
        specifications: 'Height adjustable, 60"x30", oak finish',
      },
    ],
    attachments: ["floor_plan.pdf"],
    auditTrail: [
      {
        action: "Created",
        user: "Sarah Johnson",
        timestamp: "2024-01-10T14:00:00Z",
      },
      {
        action: "Approved",
        user: "Mike Wilson",
        timestamp: "2024-01-12T16:30:00Z",
        notes: "Approved for immediate procurement",
      },
    ],
  },
]

const departments = ["Information Technology", "Operations", "Finance", "Human Resources", "Marketing", "Sales"]
const branches = ["HO-NY", "BO-CA", "BO-TX", "BO-FL", "BO-WA"]
const categories = ["IT Equipment", "Furniture", "Office Supplies", "Software", "Services", "Travel"]

export default function RequisitionsManagement() {
  const [requisitions, setRequisitions] = useState<Requisition[]>(mockRequisitions)
  const [selectedRequisition, setSelectedRequisition] = useState<Requisition | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showNewRequisition, setShowNewRequisition] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const [newRequisition, setNewRequisition] = useState<NewRequisitionForm>({
    title: "",
    description: "",
    department: "",
    branch: "",
    category: "",
    priority: "medium",
    requiredDate: "",
    riskFactors: [],
    mitigation: "",
    items: [
      {
        name: "",
        description: "",
        quantity: 1,
        unitPrice: 0,
        specifications: "",
      },
    ],
  })

  const [newRiskFactor, setNewRiskFactor] = useState("")

  const filteredRequisitions = requisitions.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requestor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || req.status === statusFilter
    const matchesPriority = priorityFilter === "all" || req.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
      case "pending":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
      case "approved":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "rejected":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "cancelled":
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "high":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const calculateRiskLevel = (factors: string[], totalAmount: number): "low" | "medium" | "high" => {
    let riskScore = 0

    // Risk factors contribute to score
    riskScore += factors.length * 10

    // Amount-based risk
    if (totalAmount > 50000) riskScore += 30
    else if (totalAmount > 20000) riskScore += 20
    else if (totalAmount > 10000) riskScore += 10

    if (riskScore >= 50) return "high"
    if (riskScore >= 25) return "medium"
    return "low"
  }

  const calculateTotalAmount = (items: NewRequisitionForm["items"]) => {
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
  }

  const handleApprove = (id: string) => {
    setRequisitions((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "approved" as const,
              approver: "Current User",
              approvalDate: new Date().toISOString().split("T")[0],
              auditTrail: [
                ...req.auditTrail,
                {
                  action: "Approved",
                  user: "Current User",
                  timestamp: new Date().toISOString(),
                  notes: "Approved via dashboard",
                },
              ],
            }
          : req,
      ),
    )
    toast.success("Requisition approved successfully")
  }

  const handleReject = (id: string) => {
    setRequisitions((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "rejected" as const,
              auditTrail: [
                ...req.auditTrail,
                {
                  action: "Rejected",
                  user: "Current User",
                  timestamp: new Date().toISOString(),
                  notes: "Rejected via dashboard",
                },
              ],
            }
          : req,
      ),
    )
    toast.success("Requisition rejected")
  }

  const handleViewDetails = (requisition: Requisition) => {
    setSelectedRequisition(requisition)
    setShowDetails(true)
  }

  const handleAddItem = () => {
    setNewRequisition((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          name: "",
          description: "",
          quantity: 1,
          unitPrice: 0,
          specifications: "",
        },
      ],
    }))
  }

  const handleRemoveItem = (index: number) => {
    setNewRequisition((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const handleItemChange = (index: number, field: string, value: string | number) => {
    setNewRequisition((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const handleAddRiskFactor = () => {
    if (newRiskFactor.trim()) {
      setNewRequisition((prev) => ({
        ...prev,
        riskFactors: [...prev.riskFactors, newRiskFactor.trim()],
      }))
      setNewRiskFactor("")
    }
  }

  const handleRemoveRiskFactor = (index: number) => {
    setNewRequisition((prev) => ({
      ...prev,
      riskFactors: prev.riskFactors.filter((_, i) => i !== index),
    }))
  }

  const handleSubmitRequisition = () => {
    // Validation
    if (!newRequisition.title.trim()) {
      toast.error("Please enter a title")
      return
    }
    if (!newRequisition.department) {
      toast.error("Please select a department")
      return
    }
    if (!newRequisition.branch) {
      toast.error("Please select a branch")
      return
    }
    if (!newRequisition.category) {
      toast.error("Please select a category")
      return
    }
    if (!newRequisition.requiredDate) {
      toast.error("Please select a required date")
      return
    }
    if (newRequisition.items.some((item) => !item.name.trim() || item.quantity <= 0 || item.unitPrice <= 0)) {
      toast.error("Please complete all item details")
      return
    }

    const totalAmount = calculateTotalAmount(newRequisition.items)
    const riskLevel = calculateRiskLevel(newRequisition.riskFactors, totalAmount)

    const newReq: Requisition = {
      id: `REQ-2024-${String(requisitions.length + 1).padStart(3, "0")}`,
      title: newRequisition.title,
      description: newRequisition.description,
      requestor: "Current User",
      department: newRequisition.department,
      branch: newRequisition.branch,
      category: newRequisition.category,
      priority: newRequisition.priority,
      status: "draft",
      totalAmount,
      requestDate: new Date().toISOString().split("T")[0],
      requiredDate: newRequisition.requiredDate,
      riskAssessment: {
        level: riskLevel,
        factors: newRequisition.riskFactors,
        mitigation: newRequisition.mitigation,
      },
      items: newRequisition.items.map((item, index) => ({
        id: String(index + 1),
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.quantity * item.unitPrice,
        specifications: item.specifications,
      })),
      attachments: [],
      auditTrail: [
        {
          action: "Created",
          user: "Current User",
          timestamp: new Date().toISOString(),
          notes: "Requisition created via dashboard",
        },
      ],
    }

    setRequisitions((prev) => [newReq, ...prev])
    setShowNewRequisition(false)

    // Reset form
    setNewRequisition({
      title: "",
      description: "",
      department: "",
      branch: "",
      category: "",
      priority: "medium",
      requiredDate: "",
      riskFactors: [],
      mitigation: "",
      items: [
        {
          name: "",
          description: "",
          quantity: 1,
          unitPrice: 0,
          specifications: "",
        },
      ],
    })

    toast.success("Requisition created successfully")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <ClipboardList className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Requisitions Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage procurement requisitions with risk assessment
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowNewRequisition(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>New Requisition</span>
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search requisitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Filter size={16} />
            <span>More Filters</span>
          </button>
        </div>
      </motion.div>

      {/* Requisitions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Requisition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Requestor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#1e293b] divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRequisitions.map((requisition) => (
                <tr key={requisition.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{requisition.id}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{requisition.title}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {requisition.department} • {requisition.branch}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-900 dark:text-gray-100">{requisition.requestor}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{requisition.requestDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(requisition.priority)}`}>
                      {requisition.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(requisition.status)}`}>
                      {requisition.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getRiskColor(requisition.riskAssessment.level)}`}
                    >
                      {requisition.riskAssessment.level} risk
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${requisition.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(requisition)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {requisition.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(requisition.id)}
                            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleReject(requisition.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            title="Reject"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* New Requisition Modal */}
      <AnimatePresence>
        {showNewRequisition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">New Requisition</h3>
                    <p className="text-gray-600 dark:text-gray-400">Create a new procurement requisition</p>
                  </div>
                  <button
                    onClick={() => setShowNewRequisition(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                      <input
                        type="text"
                        value={newRequisition.title}
                        onChange={(e) => setNewRequisition((prev) => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Enter requisition title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Priority
                      </label>
                      <select
                        value={newRequisition.priority}
                        onChange={(e) => setNewRequisition((prev) => ({ ...prev, priority: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={newRequisition.description}
                        onChange={(e) => setNewRequisition((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Enter description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Department *
                      </label>
                      <select
                        value={newRequisition.department}
                        onChange={(e) => setNewRequisition((prev) => ({ ...prev, department: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Branch *
                      </label>
                      <select
                        value={newRequisition.branch}
                        onChange={(e) => setNewRequisition((prev) => ({ ...prev, branch: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="">Select Branch</option>
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category *
                      </label>
                      <select
                        value={newRequisition.category}
                        onChange={(e) => setNewRequisition((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Required Date *
                      </label>
                      <input
                        type="date"
                        value={newRequisition.requiredDate}
                        onChange={(e) => setNewRequisition((prev) => ({ ...prev, requiredDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Items</h4>
                      <button
                        onClick={handleAddItem}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1"
                      >
                        <Plus size={14} />
                        <span>Add Item</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      {newRequisition.items.map((item, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-gray-900 dark:text-gray-100">Item {index + 1}</h5>
                            {newRequisition.items.length > 1 && (
                              <button
                                onClick={() => handleRemoveItem(index)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name *
                              </label>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, "name", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder="Item name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Quantity *
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleItemChange(index, "quantity", Number.parseInt(e.target.value) || 1)
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Unit Price *
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={item.unitPrice}
                                onChange={(e) =>
                                  handleItemChange(index, "unitPrice", Number.parseFloat(e.target.value) || 0)
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Total
                              </label>
                              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 flex items-center">
                                <DollarSign size={16} className="mr-1" />
                                {(item.quantity * item.unitPrice).toLocaleString()}
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description
                              </label>
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, "description", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder="Item description"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Specifications
                              </label>
                              <input
                                type="text"
                                value={item.specifications}
                                onChange={(e) => handleItemChange(index, "specifications", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder="Technical specifications"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Amount:</span>
                        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          ${calculateTotalAmount(newRequisition.items).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Risk Assessment</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Risk Factors
                        </label>
                        <div className="flex space-x-2 mb-2">
                          <input
                            type="text"
                            value={newRiskFactor}
                            onChange={(e) => setNewRiskFactor(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            placeholder="Enter risk factor"
                            onKeyPress={(e) => e.key === "Enter" && handleAddRiskFactor()}
                          />
                          <button
                            onClick={handleAddRiskFactor}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newRequisition.riskFactors.map((factor, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm flex items-center space-x-1"
                            >
                              <span>{factor}</span>
                              <button
                                onClick={() => handleRemoveRiskFactor(index)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                              >
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Mitigation Strategy
                        </label>
                        <textarea
                          value={newRequisition.mitigation}
                          onChange={(e) => setNewRequisition((prev) => ({ ...prev, mitigation: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          placeholder="Describe risk mitigation strategies"
                        />
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Calculated Risk Level:</span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getRiskColor(
                              calculateRiskLevel(
                                newRequisition.riskFactors,
                                calculateTotalAmount(newRequisition.items),
                              ),
                            )}`}
                          >
                            {calculateRiskLevel(newRequisition.riskFactors, calculateTotalAmount(newRequisition.items))}{" "}
                            risk
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setShowNewRequisition(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitRequisition}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Requisition
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && selectedRequisition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedRequisition.id}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedRequisition.title}</p>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Basic Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Requestor:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedRequisition.requestor}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Department:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedRequisition.department}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Branch:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedRequisition.branch}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Category:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedRequisition.category}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Request Date:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedRequisition.requestDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Required Date:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedRequisition.requiredDate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Risk Assessment</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500 dark:text-gray-400">Risk Level:</span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getRiskColor(selectedRequisition.riskAssessment.level)}`}
                          >
                            {selectedRequisition.riskAssessment.level} risk
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Risk Factors:</span>
                          <ul className="list-disc list-inside text-sm text-gray-900 dark:text-gray-100 mt-1">
                            {selectedRequisition.riskAssessment.factors.map((factor, index) => (
                              <li key={index}>{factor}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Mitigation:</span>
                          <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">
                            {selectedRequisition.riskAssessment.mitigation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Items</h4>
                      <div className="space-y-3">
                        {selectedRequisition.items.map((item) => (
                          <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.specifications}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  ${item.totalPrice.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.quantity} × ${item.unitPrice}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Status & Actions */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Status & Actions</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Status:</span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedRequisition.status)}`}
                          >
                            {selectedRequisition.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Priority:</span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedRequisition.priority)}`}
                          >
                            {selectedRequisition.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Total Amount:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            ${selectedRequisition.totalAmount.toLocaleString()}
                          </span>
                        </div>
                        {selectedRequisition.status === "pending" && (
                          <div className="flex space-x-2 mt-4">
                            <button
                              onClick={() => {
                                handleApprove(selectedRequisition.id)
                                setShowDetails(false)
                              }}
                              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                handleReject(selectedRequisition.id)
                                setShowDetails(false)
                              }}
                              className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Audit Trail */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Audit Trail</h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {selectedRequisition.auditTrail.map((entry, index) => (
                          <div key={index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {entry.action}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(entry.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{entry.user}</p>
                            {entry.notes && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{entry.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Attachments */}
                    {selectedRequisition.attachments.length > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Attachments</h4>
                        <div className="space-y-2">
                          {selectedRequisition.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                                {attachment}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
