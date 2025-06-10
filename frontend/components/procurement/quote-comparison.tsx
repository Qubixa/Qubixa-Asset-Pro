"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Receipt, Plus, Search, Filter, Eye, CheckCircle, XCircle, DollarSign, Calendar, X, AlertTriangle } from 'lucide-react'
import { toast } from "sonner"

interface Invoice {
  id: string
  purchaseOrderId: string
  goodsReceiptId: string
  vendor: {
    name: string
    email: string
    taxId: string
  }
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  status: "pending" | "approved" | "paid" | "overdue" | "disputed" | "cancelled"
  totalAmount: number
  taxAmount: number
  netAmount: number
  paymentTerms: string
  items: {
    id: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    taxRate: number
  }[]
  approvedBy?: string
  approvalDate?: string
  paidDate?: string
  paymentMethod?: string
  notes: string
  attachments: string[]
}

const mockInvoices: Invoice[] = [
  {
    id: "INV-2024-001",
    purchaseOrderId: "PO-2024-001",
    goodsReceiptId: "GR-2024-001",
    vendor: {
      name: "TechSupply Corp",
      email: "billing@techsupply.com",
      taxId: "TAX123456789",
    },
    invoiceNumber: "TS-INV-2024-001",
    invoiceDate: "2024-02-02",
    dueDate: "2024-03-04",
    status: "approved",
    totalAmount: 13750,
    taxAmount: 1250,
    netAmount: 12500,
    paymentTerms: "Net 30 days",
    items: [
      {
        id: "1",
        description: 'MacBook Pro 16" - M3 Pro chip, 18GB RAM, 512GB SSD',
        quantity: 3,
        unitPrice: 2500,
        totalPrice: 7500,
        taxRate: 0.1,
      },
      {
        id: "2",
        description: 'External Monitor - 27" 4K USB-C Display',
        quantity: 3,
        unitPrice: 800,
        totalPrice: 2400,
        taxRate: 0.1,
      },
    ],
    approvedBy: "Mike Wilson",
    approvalDate: "2024-02-03",
    notes: "Invoice matches PO and goods receipt",
    attachments: ["invoice_TS-INV-2024-001.pdf"],
  },
  {
    id: "INV-2024-002",
    purchaseOrderId: "PO-2024-002",
    goodsReceiptId: "GR-2024-002",
    vendor: {
      name: "Office Solutions Inc",
      email: "accounts@officesolutions.com",
      taxId: "TAX987654321",
    },
    invoiceNumber: "OS-INV-2024-002",
    invoiceDate: "2024-01-29",
    dueDate: "2024-02-13",
    status: "pending",
    totalAmount: 9625,
    taxAmount: 875,
    netAmount: 8750,
    paymentTerms: "Net 15 days",
    items: [
      {
        id: "1",
        description: 'Office Desk - Height adjustable, 60"x30", oak finish',
        quantity: 8,
        unitPrice: 450,
        totalPrice: 3600,
        taxRate: 0.1,
      },
    ],
    notes: "Partial delivery - 2 desks still pending",
    attachments: ["invoice_OS-INV-2024-002.pdf"],
  },
]

export default function InvoiceManagement() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
      case "approved":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      case "paid":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "overdue":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "disputed":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "cancelled":
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const handleApproveInvoice = (id: string) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id
          ? {
              ...invoice,
              status: "approved" as const,
              approvedBy: "Current User",
              approvalDate: new Date().toISOString().split("T")[0],
            }
          : invoice
      )
    )
    toast.success("Invoice approved successfully")
  }

  const handleRejectInvoice = (id: string) => {
    setInvoices((prev) =>
      prev.map((invoice) => (invoice.id === id ? { ...invoice, status: "disputed" as const } : invoice))
    )
    toast.success("Invoice marked as disputed")
  }

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setShowDetails(true)
  }

  const isOverdue = (dueDate: string, status: string) => {
    return status !== "paid" && new Date(dueDate) < new Date()
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
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
            <Receipt className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Invoice Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Process and approve vendor invoices</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>New Invoice</span>
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
              placeholder="Search invoices..."
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
            <option value="approved">Approved</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="disputed">Disputed</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Filter size={16} />
            <span>More Filters</span>
          </button>
        </div>
      </motion.div>

      {/* Invoices List */}
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
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#1e293b] divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{invoice.id}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{invoice.invoiceNumber}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        PO: {invoice.purchaseOrderId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-gray-100">{invoice.vendor.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{invoice.vendor.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                      {isOverdue(invoice.dueDate, invoice.status) && (
                        <AlertTriangle className="w-4 h-4 text-red-500" title="Overdue" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        ${invoice.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Net: ${invoice.netAmount.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{invoice.dueDate}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{invoice.paymentTerms}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(invoice)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {invoice.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApproveInvoice(invoice.id)}
                            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleRejectInvoice(invoice.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            title="Dispute"
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

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && selectedInvoice && (
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedInvoice.id}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedInvoice.invoiceNumber}</p>
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
                    {/* Invoice Items */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Invoice Items</h4>
                      <div className="space-y-3">
                        {selectedInvoice.items.map((item) => (
                          <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 dark:text-gray-100">{item.description}</h5>
                                <div className="flex items-center space-x-4 mt-2 text-sm">
                                  <span className="text-gray-500 dark:text-gray-400">
                                    Qty: <span className="text-gray-900 dark:text-gray-100">{item.quantity}</span>
                                  </span>
                                  <span className="text-gray-500 dark:text-gray-400">
                                    Unit Price: <span className="text-gray-900 dark:text-gray-100">${item.unitPrice}</span>
                                  </span>
                                  <span className="text-gray-500 dark:text-gray-400">
                                    Tax: <span className="text-gray-900 dark:text-gray-100">{(item.taxRate * 100).toFixed(1)}%</span>
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  ${item.totalPrice.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Invoice Totals */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Net Amount:</span>
                            <span className="text-gray-900 dark:text-gray-100">${selectedInvoice.netAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Tax Amount:</span>
                            <span className="text-gray-900 dark:text-gray-100">${selectedInvoice.taxAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-gray-900 dark:text-gray-100">Total Amount:</span>
                            <span className="text-gray-900 dark:text-gray-100">${selectedInvoice.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vendor Information */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Vendor Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Name:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedInvoice.vendor.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Email:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedInvoice.vendor.email}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Tax ID:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedInvoice.vendor.taxId}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Payment Terms:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedInvoice.paymentTerms}</p>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {selectedInvoice.notes && (
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Notes</h4>
                        <p className="text-sm text-gray-900 dark:text-gray-100">{selectedInvoice.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Invoice Status */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Invoice Status</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Status:</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedInvoice.status)}`}>
                            {selectedInvoice.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Invoice Date:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedInvoice.invoiceDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Due Date:</span>
                          <span className={`text-gray-900 dark:text-gray-100 ${isOverdue(selectedInvoice.dueDate, selectedInvoice.status) ? 'text-red-600 dark:text-red-400' : ''}`}>
                            {selectedInvoice.dueDate}
                          </span>
                        </div>
                        {selectedInvoice.approvedBy && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Approved By:</span>
                              <span className="text-gray-900 dark:text-gray-100">{selectedInvoice.approvedBy}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Approval Date:</span>
                              <span className="text-gray-900 dark:text-gray-100">{selectedInvoice.approvalDate}</span>
                            </div>
                          </>
                        )}
                        {selectedInvoice.paidDate && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Paid Date:</span>
                            <span className="text-gray-900 dark:text-gray-100">{selectedInvoice.paidDate}</span>
                          </div>
                        )}
                      </div>
                      
                      {selectedInvoice.status === "pending" && (
                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={() => {
                              handleApproveInvoice(selectedInvoice.id)
                              setShowDetails(false)
                            }}
                            className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              handleRejectInvoice(selectedInvoice.id)
                              setShowDetails(false)
                            }}
                            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            Dispute
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Related Documents */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Related Documents</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Purchase Order:</span>
                          <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                            {selectedInvoice.purchaseOrderId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Goods Receipt:</span>
                          <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                            {selectedInvoice.goodsReceiptId}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Attachments */}
                    {selectedInvoice.attachments.length > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Attachments</h4>
                        <div className="space-y-2">
                          {selectedInvoice.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Receipt className="w-4 h-4 text-gray-400" />
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
