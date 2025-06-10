// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Cog, Building, FolderOpen, CheckCircle, Trash2, Wrench, MapPin, Plus, Edit } from "lucide-react"
// import { toast } from "sonner"

// const configSections = [
//   {
//     title: "Branches & Locations",
//     icon: MapPin,
//     description: "Manage organizational branches and locations",
//     items: [
//       { id: 1, name: "Head Office - New York", code: "HO-NY", address: "123 Main St, NY", status: "Active" },
//       { id: 2, name: "Branch Office - California", code: "BO-CA", address: "456 Oak Ave, CA", status: "Active" },
//       { id: 3, name: "Warehouse - Texas", code: "WH-TX", address: "789 Industrial Blvd, TX", status: "Active" },
//       { id: 4, name: "Regional Office - Florida", code: "RO-FL", address: "321 Beach Rd, FL", status: "Active" },
//     ],
//   },
//   {
//     title: "Departments",
//     icon: Building,
//     description: "Manage organizational departments across branches",
//     items: [
//       { id: 1, name: "Information Technology", code: "IT", branches: ["HO-NY", "BO-CA"] },
//       { id: 2, name: "Human Resources", code: "HR", branches: ["HO-NY", "BO-CA", "RO-FL"] },
//       { id: 3, name: "Finance & Accounting", code: "FIN", branches: ["HO-NY", "BO-CA"] },
//       { id: 4, name: "Operations", code: "OPS", branches: ["All"] },
//       { id: 5, name: "Marketing", code: "MKT", branches: ["HO-NY", "BO-CA"] },
//       { id: 6, name: "Warehouse", code: "WH", branches: ["WH-TX"] },
//     ],
//   },
//   {
//     title: "Asset Categories",
//     icon: FolderOpen,
//     description: "Define asset categories with branch-specific rules",
//     items: [
//       { id: 1, name: "IT Equipment", code: "IT", transferable: true, trackable: true },
//       { id: 2, name: "Furniture", code: "FUR", transferable: true, trackable: false },
//       { id: 3, name: "Machinery", code: "MACH", transferable: false, trackable: true },
//       { id: 4, name: "Vehicles", code: "VEH", transferable: true, trackable: true },
//       { id: 5, name: "Office Equipment", code: "OFF", transferable: true, trackable: false },
//     ],
//   },
//   {
//     title: "Asset Conditions",
//     icon: CheckCircle,
//     description: "Set asset condition states and transfer rules",
//     items: [
//       { id: 1, name: "Excellent", code: "EXC", transferable: true, color: "green" },
//       { id: 2, name: "Good", code: "GOOD", transferable: true, color: "blue" },
//       { id: 3, name: "Fair", code: "FAIR", transferable: true, color: "yellow" },
//       { id: 4, name: "Poor", code: "POOR", transferable: false, color: "red" },
//       { id: 5, name: "Under Repair", code: "REPAIR", transferable: false, color: "orange" },
//     ],
//   },
//   {
//     title: "Transfer & Disposal Rules",
//     icon: Trash2,
//     description: "Configure transfer and disposal workflows",
//     items: [
//       { id: 1, name: "Inter-Department Transfer", approval: "Department Head", duration: "1-3 days" },
//       { id: 2, name: "Inter-Branch Transfer", approval: "Branch Manager", duration: "3-7 days" },
//       { id: 3, name: "Asset Disposal", approval: "Finance + IT Head", duration: "7-14 days" },
//       { id: 4, name: "Asset Revocation", approval: "Department Head", duration: "1-2 days" },
//     ],
//   },
//   {
//     title: "Maintenance & Depreciation",
//     icon: Wrench,
//     description: "Configure maintenance schedules and depreciation methods",
//     items: [
//       { id: 1, name: "Preventive Maintenance", frequency: "Monthly", branches: "All" },
//       { id: 2, name: "Corrective Maintenance", frequency: "As Needed", branches: "All" },
//       { id: 3, name: "Straight Line Depreciation", rate: "20% annually", categories: "IT, Office" },
//       { id: 4, name: "Declining Balance", rate: "30% annually", categories: "Vehicles, Machinery" },
//     ],
//   },
// ]

// export default function SystemConfiguration() {
//   const [editingSection, setEditingSection] = useState<string | null>(null)
//   const [editingItem, setEditingItem] = useState<any>(null)

//   const handleEdit = (sectionTitle: string, item: any) => {
//     setEditingSection(sectionTitle)
//     setEditingItem(item)
//     toast.info(`Editing ${item.name || item}`)
//   }

//   const handleSave = () => {
//     toast.success("Configuration updated successfully")
//     setEditingSection(null)
//     setEditingItem(null)
//   }

//   const handleCancel = () => {
//     setEditingSection(null)
//     setEditingItem(null)
//   }

//   const handleManage = (sectionTitle: string) => {
//     toast.info(`Opening ${sectionTitle} management panel`)
//   }

//   return (
//     <div className="space-y-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center justify-between"
//       >
//         <div className="flex items-center space-x-4">
//           <div className="p-3 bg-gray-100 dark:bg-gray-900/20 rounded-lg">
//             <Cog className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">System Configuration</h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1">Configure multi-branch asset management settings</p>
//           </div>
//         </div>
//         <button
//           onClick={() => toast.success("Configuration exported successfully")}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Export Config
//         </button>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {configSections.map((section, index) => (
//           <motion.div
//             key={section.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
//                 <section.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
//               </div>
//             </div>

//             <div className="space-y-2 max-h-64 overflow-y-auto">
//               {section.items.map((item, itemIndex) => (
//                 <div
//                   key={itemIndex}
//                   className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
//                 >
//                   {typeof item === "string" ? (
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-900 dark:text-gray-100">{item}</span>
//                       <button
//                         onClick={() => handleEdit(section.title, item)}
//                         className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
//                       >
//                         <Edit size={14} />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
//                         <button
//                           onClick={() => handleEdit(section.title, item)}
//                           className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
//                         >
//                           <Edit size={14} />
//                         </button>
//                       </div>
//                       {item.code && <div className="text-xs text-gray-500 dark:text-gray-400">Code: {item.code}</div>}
//                       {item.branches && (
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                           Branches: {Array.isArray(item.branches) ? item.branches.join(", ") : item.branches}
//                         </div>
//                       )}
//                       {item.address && <div className="text-xs text-gray-500 dark:text-gray-400">{item.address}</div>}
//                       {item.approval && (
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                           Approval: {item.approval} | Duration: {item.duration}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="flex space-x-2 mt-4">
//               <button
//                 onClick={() => handleManage(section.title)}
//                 className="flex-1 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
//               >
//                 Manage {section.title}
//               </button>
//               <button
//                 onClick={() => toast.info(`Adding new ${section.title.toLowerCase()}`)}
//                 className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 <Plus size={16} />
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Quick Stats */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6 }}
//         className="grid grid-cols-1 md:grid-cols-4 gap-4"
//       >
//         {[
//           { label: "Total Branches", value: "4", color: "blue" },
//           { label: "Active Departments", value: "6", color: "green" },
//           { label: "Asset Categories", value: "5", color: "purple" },
//           { label: "Transfer Rules", value: "4", color: "orange" },
//         ].map((stat, index) => (
//           <div
//             key={stat.label}
//             className="bg-white dark:bg-[#1e293b] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
//               </div>
//               <div className={`p-2 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-lg`}>
//                 <div className={`w-4 h-4 bg-${stat.color}-600 rounded`}></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   )
// }




"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Cog,
  Building,
  FolderOpen,
  CheckCircle,
  Trash2,
  Wrench,
  MapPin,
  Plus,
  Edit,
  X,
  Save,
  Trash,
  Eye,
} from "lucide-react"
import { toast } from "sonner"

interface ConfigItem {
  id: number
  name: string
  code?: string
  address?: string
  status?: string
  branches?: string[] | string
  transferable?: boolean
  trackable?: boolean
  color?: string
  approval?: string
  duration?: string
  frequency?: string
  rate?: string
  categories?: string
}

interface ConfigSection {
  title: string
  icon: React.ComponentType<{ className?: string; size?: number }>
  description: string
  items: ConfigItem[]
}

const initialConfigSections: ConfigSection[] = [
  {
    title: "Branches & Locations",
    icon: MapPin,
    description: "Manage organizational branches and locations",
    items: [
      { id: 1, name: "Head Office - New York", code: "HO-NY", address: "123 Main St, NY", status: "Active" },
      { id: 2, name: "Branch Office - California", code: "BO-CA", address: "456 Oak Ave, CA", status: "Active" },
      { id: 3, name: "Warehouse - Texas", code: "WH-TX", address: "789 Industrial Blvd, TX", status: "Active" },
      { id: 4, name: "Regional Office - Florida", code: "RO-FL", address: "321 Beach Rd, FL", status: "Active" },
    ],
  },
  {
    title: "Departments",
    icon: Building,
    description: "Manage organizational departments across branches",
    items: [
      { id: 1, name: "Information Technology", code: "IT", branches: ["HO-NY", "BO-CA"] },
      { id: 2, name: "Human Resources", code: "HR", branches: ["HO-NY", "BO-CA", "RO-FL"] },
      { id: 3, name: "Finance & Accounting", code: "FIN", branches: ["HO-NY", "BO-CA"] },
      { id: 4, name: "Operations", code: "OPS", branches: ["All"] },
      { id: 5, name: "Marketing", code: "MKT", branches: ["HO-NY", "BO-CA"] },
      { id: 6, name: "Warehouse", code: "WH", branches: ["WH-TX"] },
    ],
  },
  {
    title: "Asset Categories",
    icon: FolderOpen,
    description: "Define asset categories with branch-specific rules",
    items: [
      { id: 1, name: "IT Equipment", code: "IT", transferable: true, trackable: true },
      { id: 2, name: "Furniture", code: "FUR", transferable: true, trackable: false },
      { id: 3, name: "Machinery", code: "MACH", transferable: false, trackable: true },
      { id: 4, name: "Vehicles", code: "VEH", transferable: true, trackable: true },
      { id: 5, name: "Office Equipment", code: "OFF", transferable: true, trackable: false },
    ],
  },
  {
    title: "Asset Conditions",
    icon: CheckCircle,
    description: "Set asset condition states and transfer rules",
    items: [
      { id: 1, name: "Excellent", code: "EXC", transferable: true, color: "green" },
      { id: 2, name: "Good", code: "GOOD", transferable: true, color: "blue" },
      { id: 3, name: "Fair", code: "FAIR", transferable: true, color: "yellow" },
      { id: 4, name: "Poor", code: "POOR", transferable: false, color: "red" },
      { id: 5, name: "Under Repair", code: "REPAIR", transferable: false, color: "orange" },
    ],
  },
  {
    title: "Transfer & Disposal Rules",
    icon: Trash2,
    description: "Configure transfer and disposal workflows",
    items: [
      { id: 1, name: "Inter-Department Transfer", approval: "Department Head", duration: "1-3 days" },
      { id: 2, name: "Inter-Branch Transfer", approval: "Branch Manager", duration: "3-7 days" },
      { id: 3, name: "Asset Disposal", approval: "Finance + IT Head", duration: "7-14 days" },
      { id: 4, name: "Asset Revocation", approval: "Department Head", duration: "1-2 days" },
    ],
  },
  {
    title: "Maintenance & Depreciation",
    icon: Wrench,
    description: "Configure maintenance schedules and depreciation methods",
    items: [
      { id: 1, name: "Preventive Maintenance", frequency: "Monthly", branches: "All" },
      { id: 2, name: "Corrective Maintenance", frequency: "As Needed", branches: "All" },
      { id: 3, name: "Straight Line Depreciation", rate: "20% annually", categories: "IT, Office" },
      { id: 4, name: "Declining Balance", rate: "30% annually", categories: "Vehicles, Machinery" },
    ],
  },
]

export default function SystemConfiguration() {
  const [configSections, setConfigSections] = useState<ConfigSection[]>(initialConfigSections)
  const [modalStack, setModalStack] = useState<
    Array<{
      type: "manage" | "edit" | "add"
      sectionTitle?: string
      item?: ConfigItem | null
      formData?: Partial<ConfigItem>
    }>
  >([])
  const [formData, setFormData] = useState<Partial<ConfigItem>>({})

  const handleEdit = (sectionTitle: string, item: ConfigItem) => {
    const newModal = {
      type: "edit" as const,
      sectionTitle,
      item,
      formData: { ...item },
    }
    setModalStack((prev) => [...prev, newModal])
    setFormData({ ...item })
  }

  const handleSave = () => {
    const currentModal = modalStack[modalStack.length - 1]
    if (!currentModal || !currentModal.sectionTitle || !currentModal.item) return

    setConfigSections((prev) =>
      prev.map((section) => {
        if (section.title === currentModal.sectionTitle) {
          return {
            ...section,
            items: section.items.map((item) =>
              item.id === currentModal.item!.id ? ({ ...item, ...formData } as ConfigItem) : item,
            ),
          }
        }
        return section
      }),
    )

    toast.success("Configuration updated successfully")
    setModalStack((prev) => prev.slice(0, -1))
    setFormData({})
  }

  const handleCancel = () => {
    setModalStack((prev) => prev.slice(0, -1))
    setFormData({})
  }

  const handleAddNew = (sectionTitle: string) => {
    const newModal = {
      type: "add" as const,
      sectionTitle,
      item: null,
      formData: {
        id: Date.now(),
        name: "",
        code: "",
      },
    }
    setModalStack((prev) => [...prev, newModal])
    setFormData({
      id: Date.now(),
      name: "",
      code: "",
    })
  }

  const handleSaveNew = () => {
    const currentModal = modalStack[modalStack.length - 1]
    if (!currentModal || !currentModal.sectionTitle || !formData.name) return

    setConfigSections((prev) =>
      prev.map((section) => {
        if (section.title === currentModal.sectionTitle) {
          return {
            ...section,
            items: [...section.items, formData as ConfigItem],
          }
        }
        return section
      }),
    )

    toast.success(`New ${currentModal.sectionTitle.toLowerCase()} added successfully`)
    setModalStack((prev) => prev.slice(0, -1))
    setFormData({})
  }

  const handleManage = (sectionTitle: string) => {
    const newModal = {
      type: "manage" as const,
      sectionTitle,
      item: null,
    }
    setModalStack((prev) => [...prev, newModal])
  }

  const handleDelete = (sectionTitle: string, itemId: number) => {
    setConfigSections((prev) =>
      prev.map((section) => {
        if (section.title === sectionTitle) {
          return {
            ...section,
            items: section.items.filter((item) => item.id !== itemId),
          }
        }
        return section
      }),
    )
    toast.success("Item deleted successfully")
  }

  const renderFormField = (key: string, value: any) => {
    if (key === "branches" && Array.isArray(value)) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key}</label>
          <input
            type="text"
            value={value.join(", ")}
            onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value.split(", ") }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Enter branches separated by commas"
          />
        </div>
      )
    }

    if (typeof value === "boolean") {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.checked }))}
            className="rounded border-gray-300 dark:border-gray-600"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key}</label>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key}</label>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder={`Enter ${key}`}
        />
      </div>
    )
  }

  const renderEditForm = (modalIndex: number) => {
    const currentModal = modalStack[modalIndex]
    if (!currentModal || (currentModal.type !== "edit" && currentModal.type !== "add")) return null

    const currentData = currentModal.item || formData
    const title = currentModal.type === "edit" ? "Edit Item" : "Add New Item"
    const baseZIndex = 50 + modalIndex * 10

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        style={{ zIndex: baseZIndex }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto border-2 border-blue-500"
          style={{
            boxShadow: `0 0 0 ${modalIndex * 4}px rgba(59, 130, 246, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
          }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                {modalIndex > 0 && (
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
                    Level {modalIndex + 1}
                  </span>
                )}
              </div>
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(currentData).map(([key, value]) => {
                if (key === "id") return null
                return <div key={key}>{renderFormField(key, value)}</div>
              })}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={currentModal.type === "edit" ? handleSave : handleSaveNew}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save size={16} />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  const renderManagementPanel = (modalIndex: number) => {
    const currentModal = modalStack[modalIndex]
    if (!currentModal || currentModal.type !== "manage" || !currentModal.sectionTitle) return null

    const section = configSections.find((s) => s.title === currentModal.sectionTitle)
    if (!section) return null

    const baseZIndex = 50 + modalIndex * 10

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        style={{ zIndex: baseZIndex }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border-2 border-green-500"
          style={{
            boxShadow: `0 0 0 ${modalIndex * 4}px rgba(34, 197, 94, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
          }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <section.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Manage {section.title}</h3>
                  {modalIndex > 0 && (
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full">
                      Level {modalIndex + 1}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setModalStack((prev) => prev.slice(0, modalIndex))}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid gap-4">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h4>
                      {item.code && <p className="text-sm text-gray-600 dark:text-gray-400">Code: {item.code}</p>}
                      {item.address && <p className="text-sm text-gray-600 dark:text-gray-400">{item.address}</p>}
                      {item.branches && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Branches: {Array.isArray(item.branches) ? item.branches.join(", ") : item.branches}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(section.title, item)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(section.title, item.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => handleAddNew(section.title)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add New {section.title.slice(0, -1)}</span>
              </button>
              <button
                onClick={() => setModalStack((prev) => prev.slice(0, modalIndex))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 dark:bg-blue-900/20",
      green: "bg-green-100 dark:bg-green-900/20",
      purple: "bg-purple-100 dark:bg-purple-900/20",
      orange: "bg-orange-100 dark:bg-orange-900/20",
    }
    return colorMap[color] || "bg-gray-100 dark:bg-gray-900/20"
  }

  const getColorDot = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-600",
      green: "bg-green-600",
      purple: "bg-purple-600",
      orange: "bg-orange-600",
    }
    return colorMap[color] || "bg-gray-600"
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-100 dark:bg-gray-900/20 rounded-lg">
            <Cog className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">System Configuration</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Configure multi-branch asset management settings</p>
          </div>
        </div>
        <button
          onClick={() => {
            const config = JSON.stringify(configSections, null, 2)
            navigator.clipboard.writeText(config)
            toast.success("Configuration exported to clipboard")
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Export Config
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {configSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <section.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEdit(section.title, item)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 rounded"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(section.title, item.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1 rounded"
                          title="Delete"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </div>
                    {item.code && <div className="text-xs text-gray-500 dark:text-gray-400">Code: {item.code}</div>}
                    {item.branches && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Branches: {Array.isArray(item.branches) ? item.branches.join(", ") : item.branches}
                      </div>
                    )}
                    {item.address && <div className="text-xs text-gray-500 dark:text-gray-400">{item.address}</div>}
                    {item.approval && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Approval: {item.approval} | Duration: {item.duration}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleManage(section.title)}
                className="flex-1 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center space-x-1"
              >
                <Eye size={14} />
                <span>Manage</span>
              </button>
              <button
                onClick={() => handleAddNew(section.title)}
                className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                title="Add New"
              >
                <Plus size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Total Branches",
            value: configSections.find((s) => s.title === "Branches & Locations")?.items.length || 0,
            color: "blue",
          },
          {
            label: "Active Departments",
            value: configSections.find((s) => s.title === "Departments")?.items.length || 0,
            color: "green",
          },
          {
            label: "Asset Categories",
            value: configSections.find((s) => s.title === "Asset Categories")?.items.length || 0,
            color: "purple",
          },
          {
            label: "Transfer Rules",
            value: configSections.find((s) => s.title === "Transfer & Disposal Rules")?.items.length || 0,
            color: "orange",
          },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-[#1e293b] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
              </div>
              <div className={`p-2 ${getColorClasses(stat.color)} rounded-lg`}>
                <div className={`w-4 h-4 ${getColorDot(stat.color)} rounded`}></div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {modalStack.map((modal, index) => (
          <div key={`modal-${index}`}>
            {modal.type === "manage" && renderManagementPanel(index)}
            {(modal.type === "edit" || modal.type === "add") && renderEditForm(index)}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
