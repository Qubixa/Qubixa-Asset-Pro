// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { FileText, Plus, Search, Filter, Eye, XCircle, Building, Calendar, Download, Send } from "lucide-react"
// import { toast } from "sonner"

// interface PurchaseOrder {
//   id: string
//   requisitionId: string
//   vendorId: string
//   vendorName: string
//   vendorContact: {
//     name: string
//     email: string
//     phone: string
//   }
//   status: "draft" | "sent" | "acknowledged" | "confirmed" | "delivered" | "cancelled"
//   priority: "low" | "medium" | "high" | "urgent"
//   orderDate: string
//   expectedDelivery: string
//   deliveryAddress: {
//     name: string
//     address: string
//     city: string
//     state: string
//     zipCode: string
//   }
//   billToAddress: {
//     name: string
//     address: string
//     city: string
//     state: string
//     zipCode: string
//   }
//   totalAmount: number
//   taxAmount: number
//   shippingAmount: number
//   grandTotal: number
//   paymentTerms: string
//   currency: string
//   items: {
//     id: string
//     name: string
//     description: string
//     quantity: number
//     unitPrice: number
//     totalPrice: number
//     specifications: string
//     assetCategory?: string
//     costCenter?: string
//   }[]
//   terms: string
//   notes: string
//   attachments: string[]
//   approvals: {
//     level: string
//     approver: string
//     status: "pending" | "approved" | "rejected"
//     date?: string
//     notes?: string
//   }[]
//   auditTrail: {
//     action: string
//     user: string
//     timestamp: string
//     notes?: string
//   }[]
// }

// const mockPurchaseOrders: PurchaseOrder[] = [
//   {
//     id: "PO-2024-001",
//     requisitionId: "REQ-2024-001",
//     vendorId: "V1",
//     vendorName: "TechSupply Pro",
//     vendorContact: {
//       name: "John Vendor",
//       email: "john@techsupply.com",
//       phone: "+1-555-0123",
//     },
//     status: "confirmed",
//     priority: "high",
//     orderDate: "2024-01-18",
//     expectedDelivery: "2024-01-30",
//     deliveryAddress: {
//       name: "AssetManager Inc",
//       address: "123 Main Street",
//       city: "New York",
//       state: "NY",
//       zipCode: "10001",
//     },
//     billToAddress: {
//       name: "AssetManager Inc",
//       address: "123 Main Street",
//       city: "New York",
//       state: "NY",
//       zipCode: "10001",
//     },
//     totalAmount: 12200,
//     taxAmount: 976,
//     shippingAmount: 150,
//     grandTotal: 13326,
//     paymentTerms: "Net 30",
//     currency: "USD",
//     items: [
//       {
//         id: "1",
//         name: 'MacBook Pro 16"',
//         description: "M3 Pro chip, 18GB RAM, 512GB SSD",
//         quantity: 3,
//         unitPrice: 2400,
//         totalPrice: 7200,
//         specifications: "Apple M3 Pro, 18GB unified memory, 512GB SSD",
//         assetCategory: "IT Equipment",
//         costCenter: "IT Department",
//       },
//       {
//         id: "2",
//         name: "External Monitor",
//         description: '27" 4K USB-C Display',
//         quantity: 3,
//         unitPrice: 800,
//         totalPrice: 2400,
//         specifications: "27-inch, 4K resolution, USB-C connectivity",
//         assetCategory: "IT Equipment",
//         costCenter: "IT Department",
//       },
//     ],
//     terms: "Standard terms and conditions apply. Delivery to be made during business hours.",
//     notes: "Urgent requirement for development team. Please expedite delivery.",
//     attachments: ["po_techsupply.pdf", "delivery_instructions.pdf"],
//     approvals: [
//       {
//         level: "Department Head",
//         approver: "Sarah Johnson",
//         status: "approved",
//         date: "2024-01-17",
//         notes: "Approved for immediate procurement",
//       },
//       {
//         level: "Finance",
//         approver: "Mike Wilson",
//         status: "approved",
//         date: "2024-01-18",
//         notes: "Budget approved",
//       },
//     ],
//     auditTrail: [
//       {
//         action: "Created",
//         user: "John Smith",
//         timestamp: "2024-01-16T14:00:00Z",
//         notes: "PO created from approved requisition",
//       },
//       {
//         action: "Sent to Vendor",
//         user: "John Smith",
//         timestamp: "2024-01-18T09:00:00Z",
//         notes: "PO sent via email",
//       },
//       {
//         action: "Vendor Confirmation",
//         user: "System",
//         timestamp: "2024-01-18T15:30:00Z",
//         notes: "Vendor confirmed order via portal",
//       },
//     ],
//   },
//   {
//     id: "PO-2024-002",
//     requisitionId: "REQ-2024-002",
//     vendorId: "V2",
//     vendorName: "Office Furniture Plus",
//     vendorContact: {
//       name: "Lisa Vendor",
//       email: "lisa@officefurniture.com",
//       phone: "+1-555-0456",
//     },
//     status: "sent",
//     priority: "medium",
//     orderDate: "2024-01-15",
//     expectedDelivery: "2024-01-25",
//     deliveryAddress: {
//       name: "AssetManager Inc - CA Branch",
//       address: "456 Oak Avenue",
//       city: "Los Angeles",
//       state: "CA",
//       zipCode: "90210",
//     },
//     billToAddress: {
//       name: "AssetManager Inc",
//       address: "123 Main Street",
//       city: "New York",
//       state: "NY",
//       zipCode: "10001",
//     },
//     totalAmount: 8750,
//     taxAmount: 700,
//     shippingAmount: 200,
//     grandTotal: 9650,
//     paymentTerms: "Net 45",
//     currency: "USD",
//     items: [
//       {
//         id: "1",
//         name: "Office Desk",
//         description: "Adjustable height desk",
//         quantity: 10,
//         unitPrice: 450,
//         totalPrice: 4500,
//         specifications: 'Height adjustable, 60"x30", oak finish',
//         assetCategory: "Furniture",
//         costCenter: "Operations",
//       },
//       {
//         id: "2",
//         name: "Office Chair",
//         description: "Ergonomic office chair",
//         quantity: 10,
//         unitPrice: 425,
//         totalPrice: 4250,
//         specifications: "Ergonomic design, lumbar support, mesh back",
//         assetCategory: "Furniture",
//         costCenter: "Operations",
//       },
//     ],
//     terms: "Standard delivery terms. Assembly service included.",
//     notes: "For new California branch setup.",
//     attachments: ["po_furniture.pdf"],
//     approvals: [
//       {
//         level: "Branch Manager",
//         approver: "Tom Brown",
//         status: "approved",
//         date: "2024-01-14",
//         notes: "Approved for branch setup",
//       },
//     ],
//     auditTrail: [
//       {
//         action: "Created",
//         user: "Sarah Johnson",
//         timestamp: "2024-01-13T10:00:00Z",
//       },
//       {
//         action: "Sent to Vendor",
//         user: "Sarah Johnson",
//         timestamp: "2024-01-15T11:00:00Z",
//       },
//     ],
//   },
// ]

// export default function PurchaseOrdersManagement() {
//   const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders)
//   const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null)
//   const [showDetails, setShowDetails] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [priorityFilter, setPriorityFilter] = useState("all")

//   const filteredPOs = purchaseOrders.filter((po) => {
//     const matchesSearch =
//       po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       po.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       po.requisitionId.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || po.status === statusFilter
//     const matchesPriority = priorityFilter === "all" || po.priority === priorityFilter

//     return matchesSearch && matchesStatus && matchesPriority
//   })

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "draft":
//         return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
//       case "sent":
//         return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
//       case "acknowledged":
//         return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
//       case "confirmed":
//         return "text-green-600 bg-green-100 dark:bg-green-900/20"
//       case "delivered":
//         return "text-purple-600 bg-purple-100 dark:bg-purple-900/20"
//       case "cancelled":
//         return "text-red-600 bg-red-100 dark:bg-red-900/20"
//       default:
//         return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
//     }
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "urgent":
//         return "text-red-600 bg-red-100 dark:bg-red-900/20"
//       case "high":
//         return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
//       case "medium":
//         return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
//       case "low":
//         return "text-green-600 bg-green-100 dark:bg-green-900/20"
//       default:
//         return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
//     }
//   }

//   const handleSendPO = (id: string) => {
//     setPurchaseOrders((prev) =>
//       prev.map((po) =>
//         po.id === id
//           ? {
//               ...po,
//               status: "sent" as const,
//               auditTrail: [
//                 ...po.auditTrail,
//                 {
//                   action: "Sent to Vendor",
//                   user: "Current User",
//                   timestamp: new Date().toISOString(),
//                   notes: "PO sent via email",
//                 },
//               ],
//             }
//           : po,
//       ),
//     )
//     toast.success("Purchase order sent to vendor")
//   }

//   const handleCancelPO = (id: string) => {
//     setPurchaseOrders((prev) =>
//       prev.map((po) =>
//         po.id === id
//           ? {
//               ...po,
//               status: "cancelled" as const,
//               auditTrail: [
//                 ...po.auditTrail,
//                 {
//                   action: "Cancelled",
//                   user: "Current User",
//                   timestamp: new Date().toISOString(),
//                   notes: "PO cancelled by user",
//                 },
//               ],
//             }
//           : po,
//       ),
//     )
//     toast.success("Purchase order cancelled")
//   }

//   const handleViewDetails = (po: PurchaseOrder) => {
//     setSelectedPO(po)
//     setShowDetails(true)
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center justify-between"
//       >
//         <div className="flex items-center space-x-4">
//           <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
//             <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Purchase Orders</h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1">Manage purchase orders with vendor linkage</p>
//           </div>
//         </div>
//         <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
//           <Plus size={16} />
//           <span>New Purchase Order</span>
//         </button>
//       </motion.div>

//       {/* Filters */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search purchase orders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//             />
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//           >
//             <option value="all">All Status</option>
//             <option value="draft">Draft</option>
//             <option value="sent">Sent</option>
//             <option value="acknowledged">Acknowledged</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="delivered">Delivered</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//           <select
//             value={priorityFilter}
//             onChange={(e) => setPriorityFilter(e.target.value)}
//             className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//           >
//             <option value="all">All Priority</option>
//             <option value="urgent">Urgent</option>
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//           <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
//             <Filter size={16} />
//             <span>More Filters</span>
//           </button>
//         </div>
//       </motion.div>

//       {/* Purchase Orders List */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
//       >
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-800">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Purchase Order
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Vendor
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Priority
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Delivery
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-[#1e293b] divide-y divide-gray-200 dark:divide-gray-700">
//               {filteredPOs.map((po) => (
//                 <tr key={po.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
//                       <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{po.id}</div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">Req: {po.requisitionId}</div>
//                       <div className="text-xs text-gray-400 dark:text-gray-500">{po.orderDate}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <Building className="w-4 h-4 text-gray-400 mr-2" />
//                       <div>
//                         <div className="text-sm text-gray-900 dark:text-gray-100">{po.vendorName}</div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">{po.vendorContact.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(po.priority)}`}>
//                       {po.priority}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(po.status)}`}>{po.status}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900 dark:text-gray-100">${po.grandTotal.toLocaleString()}</div>
//                     <div className="text-xs text-gray-500 dark:text-gray-400">{po.items.length} items</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 text-gray-400 mr-2" />
//                       <div className="text-sm text-gray-900 dark:text-gray-100">{po.expectedDelivery}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => handleViewDetails(po)}
//                         className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
//                         title="View Details"
//                       >
//                         <Eye size={16} />
//                       </button>
//                       {po.status === "draft" && (
//                         <button
//                           onClick={() => handleSendPO(po.id)}
//                           className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
//                           title="Send to Vendor"
//                         >
//                           <Send size={16} />
//                         </button>
//                       )}
//                       {(po.status === "draft" || po.status === "sent") && (
//                         <button
//                           onClick={() => handleCancelPO(po.id)}
//                           className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
//                           title="Cancel"
//                         >
//                           <XCircle size={16} />
//                         </button>
//                       )}
//                       <button
//                         className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
//                         title="Download PDF"
//                       >
//                         <Download size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </motion.div>

//       {/* Details Modal */}
//       <AnimatePresence>
//         {showDetails && selectedPO && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                       Purchase Order {selectedPO.id}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400">Vendor: {selectedPO.vendorName}</p>
//                   </div>
//                   <button
//                     onClick={() => setShowDetails(false)}
//                     className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                   >
//                     <XCircle size={24} />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                   {/* Main Content */}
//                   <div className="lg:col-span-2 space-y-6">
//                     {/* Vendor Information */}
//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
//                       <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Vendor Information</h4>
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <span className="text-gray-500 dark:text-gray-400">Vendor Name:</span>
//                           <p className="text-gray-900 dark:text-gray-100">{selectedPO.vendorName}</p>
//                         </div>
//                         <div>
//                           <span className="text-gray-500 dark:text-gray-400">Contact Person:</span>
//                           <p className="text-gray-900 dark:text-gray-100">{selectedPO.vendorContact.name}</p>
//                         </div>
//                         <div>
//                           <span className="text-gray-500 dark:text-gray-400">Email:</span>
//                           <p className="text-gray-900 dark:text-gray-100">{selectedPO.vendorContact.email}</p>
//                         </div>
//                         <div>
//                           <span className="text-gray-500 dark:text-gray-400">Phone:</span>
//                           <p className="text-gray-900 dark:text-gray-100">{selectedPO.vendorContact.phone}</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Delivery Information */}
//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
//                       <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Delivery Information</h4>
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <span className="text-gray-500 dark:text-gray-400">Delivery Address:</span>
//                           <div className="text-gray-900 dark:text-gray-100">
//                             <p>{selectedPO.deliveryAddress.name}</p>
//                             <p>{selectedPO.deliveryAddress.address}</p>
//                             <p>
//                               {selectedPO.deliveryAddress.city}, {selectedPO.deliveryAddress.state}{" "}
//                               {selectedPO.deliveryAddress.zipCode}
//                             </p>
//                           </div>
//                         </div>
//                         <div>
//                           <span className="text-gray-500 dark:text-gray-400">Expected Delivery:</span>
//                           <p className="text-gray-900 dark:text-gray-100">{selectedPO.expectedDelivery}</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Items */}
//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
//                       <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Items</h4>
//                       <div className="overflow-x-auto">
//                         <table className="w-full text-sm">
//                           <thead>
//                             <tr className="border-b border-gray-200 dark:border-gray-700">
//                               <th className="text-left py-2">Item</th>
//                               <th className="text-center py-2">Qty</th>
//                               <th className="text-right py-2">Unit Price</th>
//                               <th className="text-right py-2">Total</th>
//                               <th className="text-left py-2">Asset Category</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {selectedPO.items.map((item) => (
//                               <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800">
//                                 <td className="py-3">
//                                   <div>
//                                     <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
//                                     <div className="text-gray-600 dark:text-gray-400">{item.description}</div>
//                                     <div className="text-xs text-gray-500 dark:text-gray-400">
//                                       {item.specifications}
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="py-3 text-center">{item.quantity}</td>
//                                 <td className="py-3 text-right">${item.unitPrice.toLocaleString()}</td>
//                                 <td className="py-3 text-right font-medium">${item.totalPrice.toLocaleString()}</td>
//                                 <td className="py-3">
//                                   <div>
//                                     <div className="text-gray-900 dark:text-gray-100">{item.assetCategory}</div>
//                                     <div className="text-xs text-gray-500 dark:text-gray-400">{item.costCenter}</div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>

//                       {/* Totals */}
//                       <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
//                         <div className="flex justify-end">
//                           <div className="w-64 space-y-2">
//                             <div className="flex justify-between">
//                               <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
//                               <span className="text-gray-900 dark:text-gray-100">
//                                 ${selectedPO.totalAmount.toLocaleString()}
//                               </span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span className="text-gray-600 dark:text-gray-400">Tax:</span>
//                               <span className="text-gray-900 dark:text-gray-100">
//                                 ${selectedPO.taxAmount.toLocaleString()}
//                               </span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
//                               <span className="text-gray-900 dark:text-gray-100">
//                                 ${selectedPO.shippingAmount.toLocaleString()}
//                               </span>
//                             </div>
//                             <div className="flex justify-between font-bold text-lg border-t border-gray-200 dark:border-gray-700 pt-2">
//                               <span className="text-gray-900 dark:text-gray-100">Grand Total:</span>
//                               <span className="text-gray-900 dark:text-gray-100">
//                                 ${selectedPO.grandTotal.toLocaleString()}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Terms and Notes */}
//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
//                       <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Terms and Notes</h4>
//                       <div className="space-y-3 text-sm">
//                         <div>
//                           <span className="text-gray-500 dark:text-gray-400">Payment Terms:</span>
//                           <p className="text-gray-900 dark:text-gray-100">{selectedPO.paymentTerms}</p>
//                         </div>
//                         <div>
//                           <span className="text-gray-500 dark:text-gray-400">Terms & Conditions:</span>
//                           <p className="text-gray-900 dark:text-gray-100">{selectedPO.terms}</p>
//                         </div>
//                         {selectedPO.notes && (
//                           <div>
//                             <span className="text-gray-500 dark:text-gray-400">Notes:</span>
//                             <p className="text-gray-900 dark:text-gray-100">{selectedPO.notes}</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Sidebar */}
//                   <div className="space-y-6">
//                     {/* Status & Actions */}
//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
//                       <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Status & Actions</h4>
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between">
//                           <span className="text-gray-500 dark:text-gray-400">Status:</span>
//                           <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedPO.status)}`}>
//                             {selectedPO.status}
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span className="text-gray-500 dark:text-gray-400">Priority:</span>
//                           <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedPO.priority)}`}>
//                             {selectedPO.priority}
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span className="text-gray-500 dark:text-gray-400">Order Date:</span>
//                           <span className="text-gray-900 dark:text-gray-100">{selectedPO.orderDate}</span>
//                         </div>

//                         <div className="flex flex-col space-y-2 mt-4">
//                           {selectedPO.status === "draft" && (
//                             <button
//                               onClick={() => {
//                                 handleSendPO(selectedPO.id)
//                                 setShowDetails(false)
//                               }}
//                               className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
//                             >
//                               Send to Vendor
//                             </button>
//                           )}
//                           <button className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
//                             Download PDF
//                           </button>
//                           {(selectedPO.status === "draft" || selectedPO.status === "sent") && (
//                             <button
//                               onClick={() => {
//                                 handleCancelPO(selectedPO.id)
//                                 setShowDetails(false)
//                               }}
//                               className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
//                             >
//                               Cancel Order
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Approvals */}
//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
//                       <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Approvals</h4>
//                       <div className="space-y-3">
//                         {selectedPO.approvals.map((approval, index) => (
//                           <div key={index} className="border-l-2 border-green-200 dark:border-green-800 pl-3">
//                             <div className="flex items-center justify-between">
//                               <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                                 {approval.level}
//                               </span>
//                               <span
//                                 className={`px-2 py-1 text-xs rounded-full ${
//                                   approval.status === "approved"
//                                     ? "text-green-600 bg-green-100 dark:bg-green-900/20"
//                                     : approval.status === "rejected"
//                                       ? "text-red-600 bg-red-100 dark:bg-red-900/20"
//                                       : "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
//                                 }`}
//                               >
//                                 {approval.status}
//                               </span>
//                             </div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">{approval.approver}</p>
//                             {approval.date && (
//                               <p className="text-xs text-gray-500 dark:text-gray-400">{approval.date}</p>
//                             )}
//                             {approval.notes && (
//                               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{approval.notes}</p>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Audit Trail */}
//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
//                       <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Audit Trail</h4>
//                       <div className="space-y-3 max-h-64 overflow-y-auto">
//                         {selectedPO.auditTrail.map((entry, index) => (
//                           <div key={index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-3">
//                             <div className="flex items-center justify-between">
//                               <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                                 {entry.action}
//                               </span>
//                               <span className="text-xs text-gray-500 dark:text-gray-400">
//                                 {new Date(entry.timestamp).toLocaleDateString()}
//                               </span>
//                             </div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">{entry.user}</p>
//                             {entry.notes && (
//                               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{entry.notes}</p>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Plus, Search, Filter, Eye, CheckCircle, XCircle, FileText, User, X, Send, Truck } from 'lucide-react'
import { toast } from "sonner"

interface PurchaseOrder {
  id: string
  requisitionId: string
  title: string
  vendor: {
    id: string
    name: string
    email: string
    phone: string
    address: string
  }
  department: string
  branch: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "draft" | "pending" | "approved" | "sent" | "acknowledged" | "delivered" | "cancelled"
  totalAmount: number
  orderDate: string
  expectedDelivery: string
  deliveryAddress: string
  items: {
    id: string
    name: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    specifications: string
  }[]
  terms: string
  notes: string
  createdBy: string
  approvedBy?: string
  approvalDate?: string
}

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2024-001",
    requisitionId: "REQ-2024-001",
    title: "IT Equipment for Development Team",
    vendor: {
      id: "VEN-001",
      name: "TechSupply Corp",
      email: "orders@techsupply.com",
      phone: "+1-555-0123",
      address: "123 Tech Street, Silicon Valley, CA 94000",
    },
    department: "Information Technology",
    branch: "HO-NY",
    priority: "high",
    status: "approved",
    totalAmount: 12500,
    orderDate: "2024-01-16",
    expectedDelivery: "2024-02-01",
    deliveryAddress: "456 Office Plaza, New York, NY 10001",
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
    terms: "Net 30 days, FOB destination",
    notes: "Urgent delivery required for new team members",
    createdBy: "John Smith",
    approvedBy: "Mike Wilson",
    approvalDate: "2024-01-16",
  },
  {
    id: "PO-2024-002",
    requisitionId: "REQ-2024-002",
    title: "Office Furniture for New Branch",
    vendor: {
      id: "VEN-002",
      name: "Office Solutions Inc",
      email: "sales@officesolutions.com",
      phone: "+1-555-0456",
      address: "789 Furniture Ave, Los Angeles, CA 90001",
    },
    department: "Operations",
    branch: "BO-CA",
    priority: "medium",
    status: "sent",
    totalAmount: 8750,
    orderDate: "2024-01-13",
    expectedDelivery: "2024-01-28",
    deliveryAddress: "321 Business Center, Los Angeles, CA 90210",
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
    terms: "Net 15 days, FOB destination",
    notes: "Installation service required",
    createdBy: "Sarah Johnson",
    approvedBy: "Mike Wilson",
    approvalDate: "2024-01-13",
  },
]

export default function PurchaseOrdersManagement() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders)
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredPurchaseOrders = purchaseOrders.filter((po) => {
    const matchesSearch =
      po.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || po.status === statusFilter
    const matchesPriority = priorityFilter === "all" || po.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
      case "pending":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
      case "approved":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      case "sent":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/20"
      case "acknowledged":
        return "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20"
      case "delivered":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "cancelled":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
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

  const handleSendPO = (id: string) => {
    setPurchaseOrders((prev) =>
      prev.map((po) => (po.id === id ? { ...po, status: "sent" as const } : po))
    )
    toast.success("Purchase Order sent to vendor")
  }

  const handleViewDetails = (po: PurchaseOrder) => {
    setSelectedPO(po)
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
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <ShoppingCart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Purchase Orders</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage purchase orders and vendor communications</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>New Purchase Order</span>
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
              placeholder="Search purchase orders..."
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
            <option value="sent">Sent</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="delivered">Delivered</option>
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

      {/* Purchase Orders List */}
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
                  Purchase Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Expected Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#1e293b] divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPurchaseOrders.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{po.id}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{po.title}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        Req: {po.requisitionId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-gray-100">{po.vendor.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{po.vendor.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(po.priority)}`}>
                      {po.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(po.status)}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${po.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {po.expectedDelivery}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(po)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {po.status === "approved" && (
                        <button
                          onClick={() => handleSendPO(po.id)}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                          title="Send to Vendor"
                        >
                          <Send size={16} />
                        </button>
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
        {showDetails && selectedPO && (
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedPO.id}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedPO.title}</p>
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
                    {/* Vendor Information */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Vendor Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Name:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedPO.vendor.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Email:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedPO.vendor.email}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedPO.vendor.phone}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Address:</span>
                          <p className="text-gray-900 dark:text-gray-100">{selectedPO.vendor.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Items</h4>
                      <div className="space-y-3">
                        {selectedPO.items.map((item) => (
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

                    {/* Terms & Notes */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Terms & Notes</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Payment Terms:</span>
                          <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">{selectedPO.terms}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Notes:</span>
                          <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">{selectedPO.notes}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Delivery Address:</span>
                          <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">{selectedPO.deliveryAddress}</p>
                        </div>
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
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedPO.status)}`}>
                            {selectedPO.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Priority:</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedPO.priority)}`}>
                            {selectedPO.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Total Amount:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            ${selectedPO.totalAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Expected Delivery:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedPO.expectedDelivery}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Order Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Order Date:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedPO.orderDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Created By:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedPO.createdBy}</span>
                        </div>
                        {selectedPO.approvedBy && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Approved By:</span>
                            <span className="text-gray-900 dark:text-gray-100">{selectedPO.approvedBy}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Department:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedPO.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Branch:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedPO.branch}</span>
                        </div>
                      </div>
                    </div>
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
