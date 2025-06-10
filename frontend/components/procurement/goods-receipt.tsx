"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, Plus, Search, Filter, Eye, CheckCircle, XCircle, AlertTriangle, Truck, X, Camera } from 'lucide-react'
import { toast } from "sonner"

interface GoodsReceipt {
  id: string
  purchaseOrderId: string
  title: string
  vendor: string
  receivedBy: string
  receivedDate: string
  deliveryNote: string
  status: "pending" | "partial" | "complete" | "damaged" | "rejected"
  items: {
    id: string
    name: string
    orderedQty: number
    receivedQty: number
    condition: "good" | "damaged" | "missing"
    notes: string
    serialNumbers?: string[]
  }[]
  qualityCheck: {
    inspector: string
    inspectionDate: string
    status: "passed" | "failed" | "conditional"
    notes: string
  }
  photos: string[]
  discrepancies: string[]
}

const mockGoodsReceipts: GoodsReceipt[] = [
  {
    id: "GR-2024-001",
    purchaseOrderId: "PO-2024-001",
    title: "IT Equipment for Development Team",
    vendor: "TechSupply Corp",
    receivedBy: "John Smith",
    receivedDate: "2024-02-01",
    deliveryNote: "DN-2024-001",
    status: "complete",
    items: [
      {
        id: "1",
        name: 'MacBook Pro 16"',
        orderedQty: 3,
        receivedQty: 3,
        condition: "good",
        notes: "All units in perfect condition",
        serialNumbers: ["MBP001", "MBP002", "MBP003"],
      },
      {
        id: "2",
        name: "External Monitor",
        orderedQty: 3,
        receivedQty: 3,
        condition: "good",
        notes: "All monitors working properly",
        serialNumbers: ["MON001", "MON002", "MON003"],
      },
    ],
    qualityCheck: {
      inspector: "Mike Wilson",
      inspectionDate: "2024-02-01",
      status: "passed",
      notes: "All items meet quality standards",
    },
    photos: ["delivery_photo_1.jpg", "delivery_photo_2.jpg"],
    discrepancies: [],
  },
  {
    id: "GR-2024-002",
    purchaseOrderId: "PO-2024-002",
    title: "Office Furniture for New Branch",
    vendor: "Office Solutions Inc",
    receivedBy: "Sarah Johnson",
    receivedDate: "2024-01-28",
    deliveryNote: "DN-2024-002",
    status: "partial",
    items: [
      {
        id: "1",
        name: "Office Desk",
        orderedQty: 10,
        receivedQty: 8,
        condition: "good",
        notes: "2 desks missing from delivery",
      },
    ],
    qualityCheck: {
      inspector: "Tom Brown",
      inspectionDate: "2024-01-28",
      status: "conditional",
      notes: "Good quality but incomplete delivery",
    },
    photos: ["furniture_delivery.jpg"],
    discrepancies: ["2 desks missing from original order"],
  },
]

export default function GoodsReceiptManagement() {
  const [goodsReceipts, setGoodsReceipts] = useState<GoodsReceipt[]>(mockGoodsReceipts)
  const [selectedGR, setSelectedGR] = useState<GoodsReceipt | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredGoodsReceipts = goodsReceipts.filter((gr) => {
    const matchesSearch =
      gr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gr.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gr.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || gr.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
      case "partial":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "complete":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "damaged":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "rejected":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "good":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "damaged":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "missing":
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getQualityStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "failed":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "conditional":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const handleViewDetails = (gr: GoodsReceipt) => {
    setSelectedGR(gr)
    setShowDetails(true)
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
          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Goods Receipt</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage incoming deliveries and quality checks</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>New Receipt</span>
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search goods receipts..."
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
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="complete">Complete</option>
            <option value="damaged">Damaged</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Filter size={16} />
            <span>More Filters</span>
          </button>
        </div>
      </motion.div>

      {/* Goods Receipts List */}
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
                  Receipt ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Purchase Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quality Check
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Received Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#1e293b] divide-y divide-gray-200 dark:divide-gray-700">
              {filteredGoodsReceipts.map((gr) => (
                <tr key={gr.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{gr.id}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{gr.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{gr.purchaseOrderId}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">DN: {gr.deliveryNote}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{gr.vendor}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">By: {gr.receivedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(gr.status)}`}>
                      {gr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getQualityStatusColor(gr.qualityCheck.status)}`}>
                      {gr.qualityCheck.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {gr.receivedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(gr)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && selectedGR && (
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedGR.id}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedGR.title}</p>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Items Received */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Items Received</h4>
                      <div className="space-y-3">
                        {selectedGR.items.map((item) => (
                          <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h5>
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Ordered:</span>
                                    <span className="ml-1 text-gray-900 dark:text-gray-100">{item.orderedQty}</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Received:</span>
                                    <span className="ml-1 text-gray-900 dark:text-gray-100">{item.receivedQty}</span>
                                  </div>
                                  <span className={`px-2 py-1 text-xs rounded-full ${getConditionColor(item.condition)}`}>
                                    {item.condition}
                                  </span>
                                </div>
                                {item.serialNumbers && (
                                  <div className="mt-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Serial Numbers:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {item.serialNumbers.map((serial, index) => (
                                        <span
                                          key={index}
                                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs rounded"
                                        >
                                          {serial}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {item.notes && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.notes}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quality Check */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Quality Check</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Inspector:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedGR.qualityCheck.inspector}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Inspection Date:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedGR.qualityCheck.inspectionDate}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500 dark:text-gray-400">Status:</span>
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getQualityStatusColor(selectedGR.qualityCheck.status)}`}>
                            {selectedGR.qualityCheck.status}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500 dark:text-gray-400">Notes:</span>
                          <p className="text-gray-900 dark:text-gray-100 mt-1">{selectedGR.qualityCheck.notes}</p>
                        </div>
                      </div>
                    </div>

                    {/* Discrepancies */}
                    {selectedGR.discrepancies.length > 0 && (
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                        <h4 className="font-medium text-red-900 dark:text-red-100 mb-3 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Discrepancies
                        </h4>
                        <ul className="list-disc list-inside text-sm text-red-800 dark:text-red-200">
                          {selectedGR.discrepancies.map((discrepancy, index) => (
                            <li key={index}>{discrepancy}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Receipt Details */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Receipt Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Status:</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedGR.status)}`}>
                            {selectedGR.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">PO Number:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedGR.purchaseOrderId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Vendor:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedGR.vendor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Received By:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedGR.receivedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Received Date:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedGR.receivedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Delivery Note:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedGR.deliveryNote}</span>
                        </div>
                      </div>
                    </div>

                    {/* Photos */}
                    {selectedGR.photos.length > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                          <Camera className="w-4 h-4 mr-2" />
                          Delivery Photos
                        </h4>
                        <div className="space-y-2">
                          {selectedGR.photos.map((photo, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Camera className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                                {photo}
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
