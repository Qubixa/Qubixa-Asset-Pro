// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter, usePathname } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   LayoutDashboard,
//   Package,
//   ArrowLeftRight,
//   TrendingDown,
//   Wrench,
//   Tag,
//   FileCheck,
//   Trash2,
//   Archive,
//   BarChart3,
//   Users,
//   Settings,
//   LogOut,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   List,
//   Eye,
//   Truck,
//   FileText,
//   Calculator,
//   History,
//   Calendar,
//   QrCode,
//   ScanLine,
//   MapPin,
//   Upload,
//   Shield,
//   UserCheck,
//   Building,
//   Globe,
//   Download,
//   Cog,
//   Layers,
//   FolderOpen,
//   CheckCircle,
//   Boxes,
//   Share2,
//   Building2
// } from "lucide-react"
// import { useAuth } from "@/contexts/AuthContext"
// import Link from "next/link"
// import Image from "next/image"

// interface MenuItem {
//   id: string
//   icon: React.ReactNode
//   label: string
//   path?: string
//   submenu?: { label: string; path: string; icon: React.ReactNode }[]
// }

// const menuItems: MenuItem[] = [
//   {
//     id: "dashboard",
//     icon: <LayoutDashboard size={20} />,
//     label: "Dashboard",
//     path: "/dashboard",
//   },
//   {
//     id: "assets",
//     icon: <Package size={20} />,
//     label: "Asset Management",
//     submenu: [
//       { label: "Add Asset", path: "/assets/add", icon: <Plus size={16} /> },
//       { label: "Asset List", path: "/assets", icon: <List size={16} /> },
//       { label: "Asset Detail", path: "/assets/detail", icon: <Eye size={16} /> },
//       { label: "Asset Allocation", path: "/assets/allocation", icon: <Boxes size={16} /> },
//       { label: "Asset Transfer", path: "/assets/transfer", icon: <Share2 size={16} /> },
//       { label: "Department View", path: "/assets/department-view", icon: <Building2 size={16} /> },
//     ]
//   },
//   {
//     id: "transfers",
//     icon: <ArrowLeftRight size={20} />,
//     label: "Transfers & Allocation",
//     submenu: [
//       { label: "Initiate Transfer", path: "/transfers/initiate", icon: <Truck size={16} /> },
//       { label: "Allocation Logs", path: "/transfers/logs", icon: <FileText size={16} /> },
//     ],
//   },
//   {
//     id: "depreciation",
//     icon: <TrendingDown size={20} />,
//     label: "Depreciation",
//     submenu: [
//       { label: "Depreciation Calculator", path: "/depreciation/calculator", icon: <Calculator size={16} /> },
//       { label: "Depreciation History", path: "/depreciation/history", icon: <History size={16} /> },
//     ],
//   },
//   {
//     id: "maintenance",
//     icon: <Wrench size={20} />,
//     label: "Maintenance",
//     submenu: [
//       { label: "Work Orders", path: "/maintenance/work-orders", icon: <FileText size={16} /> },
//       { label: "Maintenance Schedule", path: "/maintenance", icon: <Calendar size={16} /> },
//       { label: "Maintenance History", path: "/maintenance/history", icon: <History size={16} /> },
//     ],
//   },
//   {
//     id: "tagging",
//     icon: <Tag size={20} />,
//     label: "Tagging & Tracking",
//     submenu: [
//       { label: "Assign Tag (QR / RFID)", path: "/tagging/assign", icon: <QrCode size={16} /> },
//       { label: "Asset Scan Logs", path: "/tagging/scan-logs", icon: <ScanLine size={16} /> },
//       { label: "Geo-Fencing", path: "/tagging/geo-fencing", icon: <MapPin size={16} /> },
//     ],
//   },
//   {
//     id: "compliance",
//     icon: <FileCheck size={20} />,
//     label: "Compliance & Audit",
//     submenu: [
//       { label: "Upload Compliance Docs", path: "/compliance/upload", icon: <Upload size={16} /> },
//       { label: "Audit Logs", path: "/compliance/audit-logs", icon: <FileText size={16} /> },
//       { label: "Access Logs", path: "/compliance/access-logs", icon: <Shield size={16} /> },
//     ],
//   },
//   {
//     id: "disposal",
//     icon: <Trash2 size={20} />,
//     label: "Disposal & Write-off",
//     submenu: [
//       { label: "Disposal Request", path: "/disposal/request", icon: <Trash2 size={16} /> },
//       { label: "Disposal History", path: "/disposal/history", icon: <History size={16} /> },
//     ],
//   },
//   {
//     id: "consumables",
//     icon: <Archive size={20} />,
//     label: "Consumables Management",
//     submenu: [
//       { label: "Add Consumable", path: "/consumables/add", icon: <Plus size={16} /> },
//       { label: "Inventory View", path: "/consumables", icon: <FolderOpen size={16} /> },
//       { label: "Issue / Consume Items", path: "/consumables/issue", icon: <FileText size={16} /> },
//       { label: "Reorder Alerts", path: "/consumables/alerts", icon: <CheckCircle size={16} /> },
//     ],
//   },
//   {
//     id: "reports",
//     icon: <BarChart3 size={20} />,
//     label: "Reports & Dashboards",
//     submenu: [
//       { label: "KPI Dashboard", path: "/reports/kpi", icon: <BarChart3 size={16} /> },
//       { label: "Asset Reports", path: "/reports", icon: <FileText size={16} /> },
//       { label: "Maintenance Reports", path: "/reports/maintenance", icon: <Wrench size={16} /> },
//       { label: "Consumables Reports", path: "/reports/consumables", icon: <Archive size={16} /> },
//     ],
//   },
//   {
//     id: "users",
//     icon: <Users size={20} />,
//     label: "User Management",
//     submenu: [
//       { label: "Users & Roles", path: "/users", icon: <Users size={16} /> },
//       { label: "Permissions Matrix", path: "/users/permissions", icon: <UserCheck size={16} /> },
//     ],
//   },
//   {
//     id: "settings",
//     icon: <Settings size={20} />,
//     label: "Settings",
//     submenu: [
//       { label: "Organization Info", path: "/settings/organization", icon: <Building size={16} /> },
//       { label: "Localization Settings", path: "/settings/localization", icon: <Globe size={16} /> },
//       { label: "Data Import / Export", path: "/settings/data", icon: <Download size={16} /> },
//       { label: "System Configuration", path: "/settings/system", icon: <Cog size={16} /> },
//     ],
//   },
// ]

// interface SidebarProps {
//   onCollapseChange?: (collapsed: boolean) => void
// }

// export default function Sidebar({ onCollapseChange }: SidebarProps) {
//   const [isCollapsed, setIsCollapsed] = useState(false)
//   const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
//   const router = useRouter()
//   const pathname = usePathname()
//   const { logout, user } = useAuth()

//   const handleMenuClick = (item: MenuItem) => {
//     if (item.submenu) {
//       setActiveSubmenu(activeSubmenu === item.id ? null : item.id)
//     } else if (item.path) {
//       router.push(item.path)
//       setActiveSubmenu(null)
//     }
//   }

//   const handleSubmenuClick = (path: string) => {
//     router.push(path)
//     if (isCollapsed) {
//       setActiveSubmenu(null)
//     }
//   }

//   const handleLogout = () => {
//     logout()
//     router.push("/")
//   }

//   const isActive = (path: string) => {
//     return pathname === path
//   }

//   const isActiveParent = (item: MenuItem) => {
//     if (item.path && pathname === item.path) return true
//     if (item.submenu && item.submenu.some((sub) => pathname === sub.path)) return true
//     return false
//   }

//   const handleCollapseToggle = () => {
//     const newCollapsedState = !isCollapsed
//     setIsCollapsed(newCollapsedState)
//     if (onCollapseChange) {
//       onCollapseChange(newCollapsedState)
//     }
//   }

//   return (
//     <div className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
//       <div className="h-full bg-white dark:bg-[#1e293b] shadow-lg border-r border-gray-200 dark:border-gray-800 flex flex-col">
//         {/* Logo */}
//         <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
//           {!isCollapsed && (
//             <Link href="/dashboard" className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <Layers size={20} className="text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-900 dark:text-white">AssetManager</span>
//             </Link>
//           )}
//           {isCollapsed && (
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
//               <Layers size={20} className="text-white" />
//             </div>
//           )}
//           <button
//             onClick={handleCollapseToggle}
//             className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//           >
//             {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
//           </button>
//         </div>

//         {/* Menu Items */}
//         <div className="flex-1 py-4 flex flex-col overflow-y-auto">
//           <div className="space-y-1 px-2">
//             {menuItems.map((item) => (
//               <div key={item.id}>
//                 <button
//                   onClick={() => handleMenuClick(item)}
//                   className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${isActiveParent(item)
//                       ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
//                       : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
//                     }`}
//                   title={isCollapsed ? item.label : undefined}
//                 >
//                   <div className="flex items-center space-x-3">
//                     {item.icon}
//                     {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
//                   </div>
//                   {item.submenu && !isCollapsed && (
//                     <motion.div
//                       animate={{ rotate: activeSubmenu === item.id ? 180 : 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <ChevronDown size={16} />
//                     </motion.div>
//                   )}
//                 </button>

//                 {/* Submenu */}
//                 <AnimatePresence>
//                   {item.submenu && activeSubmenu === item.id && !isCollapsed && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="ml-6 mt-1 space-y-1">
//                         {item.submenu.map((subItem) => (
//                           <button
//                             key={subItem.path}
//                             onClick={() => handleSubmenuClick(subItem.path)}
//                             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${isActive(subItem.path)
//                                 ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
//                                 : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
//                               }`}
//                           >
//                             {subItem.icon}
//                             <span className="text-sm">{subItem.label}</span>
//                           </button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//           </div>

//           {/* Logout Button */}
//           <div className="mt-auto px-2 pb-4">
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//               title={isCollapsed ? "Logout" : undefined}
//             >
//               <LogOut size={20} />
//               {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
//             </button>
//           </div>

//           {/* User Info */}
//           {!isCollapsed && (
//             <div className="px-2 pb-4">
//               <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
//                 <div className="h-10 w-10 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
//                   {user?.avatar ? (
//                     <Image
//                       src={user.avatar || "/placeholder.svg"}
//                       alt="User avatar"
//                       width={40}
//                       height={40}
//                       className="rounded-full"
//                     />
//                   ) : (
//                     <Users size={20} className="text-blue-600 dark:text-blue-400" />
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.username}</p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, Package, ArrowLeftRight, TrendingDown, Wrench, Tag, FileCheck, Trash2, Archive, BarChart3, Users, Settings, LogOut, ChevronDown, ChevronLeft, ChevronRight, Plus, List, Eye, Truck, FileText, Calculator, History, Calendar, QrCode, ScanLine, MapPin, Upload, Shield, UserCheck, Building, Globe, Download, Cog, Layers, FolderOpen, CheckCircle, Boxes, Share2, Building2, ShoppingCart, ClipboardList, Receipt, TrendingUp, FileSearch, DollarSign, CheckSquare } from 'lucide-react'
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import Image from "next/image"

interface MenuItem {
  id: string
  icon: React.ReactNode
  label: string
  path?: string
  submenu?: { label: string; path: string; icon: React.ReactNode }[]
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    path: "/dashboard",
  },
    {
    id: "procurement",
    icon: <ShoppingCart size={20} />,
    label: "Procurement",
    submenu: [
      { label: "Requisitions", path: "/procurement/requisitions", icon: <ClipboardList size={16} /> },
      { label: "Purchase Orders", path: "/procurement/purchase-orders", icon: <FileText size={16} /> },
      { label: "Invoices", path: "/procurement/quotes", icon: <TrendingUp size={16} /> },
      { label: "Goods Receipt", path: "/procurement/goods-receipt", icon: <Receipt size={16} /> },
      { label: "Vendor Management", path: "/procurement/vendors", icon: <Building size={16} /> },
    ]
  },
  {
    id: "assets",
    icon: <Package size={20} />,
    label: "Asset Management",
    submenu: [
      { label: "Add Asset", path: "/assets/add", icon: <Plus size={16} /> },
      { label: "Asset List", path: "/assets", icon: <List size={16} /> },
      { label: "Asset Detail", path: "/assets/detail", icon: <Eye size={16} /> },
      { label: "Asset Allocation", path: "/assets/allocation", icon: <Boxes size={16} /> },
      { label: "Asset Transfer", path: "/assets/transfer", icon: <Share2 size={16} /> },
      { label: "Department View", path: "/assets/department-view", icon: <Building2 size={16} /> },
    ]
  },
  {
    id: "depreciation",
    icon: <TrendingDown size={20} />,
    label: "Depreciation",
    submenu: [
      { label: "Depreciation Calculator", path: "/depreciation/calculator", icon: <Calculator size={16} /> },
      { label: "Depreciation History", path: "/depreciation/history", icon: <History size={16} /> },
    ],
  },
  {
    id: "maintenance",
    icon: <Wrench size={20} />,
    label: "Maintenance",
    submenu: [
      { label: "Work Orders", path: "/maintenance/work-orders", icon: <FileText size={16} /> },
      { label: "Maintenance Schedule", path: "/maintenance", icon: <Calendar size={16} /> },
      { label: "Maintenance History", path: "/maintenance/history", icon: <History size={16} /> },
    ],
  },
  // {
  //   id: "tagging",
  //   icon: <Tag size={20} />,
  //   label: "Tagging & Tracking",
  //   submenu: [
  //     { label: "Assign Tag (QR / RFID)", path: "/tagging/assign", icon: <QrCode size={16} /> },
  //     { label: "Asset Scan Logs", path: "/tagging/scan-logs", icon: <ScanLine size={16} /> },
  //     { label: "Geo-Fencing", path: "/tagging/geo-fencing", icon: <MapPin size={16} /> },
  //   ],
  // },
  {
    id: "compliance",
    icon: <FileCheck size={20} />,
    label: "Compliance & Audit",
    submenu: [
      { label: "Upload Compliance Docs", path: "/compliance/upload", icon: <Upload size={16} /> },
      { label: "Audit Logs", path: "/compliance/audit-logs", icon: <FileText size={16} /> },
      { label: "Access Logs", path: "/compliance/access-logs", icon: <Shield size={16} /> },
    ],
  },
  {
    id: "disposal",
    icon: <Trash2 size={20} />,
    label: "Disposal & Write-off",
    submenu: [
      { label: "Disposal Request", path: "/disposal/request", icon: <Trash2 size={16} /> },
      { label: "Disposal History", path: "/disposal/history", icon: <History size={16} /> },
    ],
  },
  {
    id: "consumables",
    icon: <Archive size={20} />,
    label: "Consumables Management",
    submenu: [
      { label: "Add Consumable", path: "/consumables/add", icon: <Plus size={16} /> },
      { label: "Inventory View", path: "/consumables", icon: <FolderOpen size={16} /> },
      { label: "Issue / Consume Items", path: "/consumables/issue", icon: <FileText size={16} /> },
      { label: "Reorder Alerts", path: "/consumables/alerts", icon: <CheckCircle size={16} /> },
    ],
  },
  {
    id: "reports",
    icon: <BarChart3 size={20} />,
    label: "Reports & Dashboards",
    submenu: [
      { label: "KPI Dashboard", path: "/reports/kpi", icon: <BarChart3 size={16} /> },
      { label: "Asset Reports", path: "/reports", icon: <FileText size={16} /> },
      { label: "Maintenance Reports", path: "/reports/maintenance", icon: <Wrench size={16} /> },
      { label: "Consumables Reports", path: "/reports/consumables", icon: <Archive size={16} /> },
    ],
  },
  {
    id: "users",
    icon: <Users size={20} />,
    label: "User Management",
    submenu: [
      { label: "Users & Roles", path: "/users", icon: <Users size={16} /> },
      { label: "Permissions Matrix", path: "/users/permissions", icon: <UserCheck size={16} /> },
    ],
  },
  {
    id: "settings",
    icon: <Settings size={20} />,
    label: "Settings",
    submenu: [
      { label: "Organization Info", path: "/settings/organization", icon: <Building size={16} /> },
      { label: "Localization Settings", path: "/settings/localization", icon: <Globe size={16} /> },
      { label: "Data Import / Export", path: "/settings/data", icon: <Download size={16} /> },
      { label: "System Configuration", path: "/settings/system", icon: <Cog size={16} /> },
    ],
  },
]

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void
}

export default function Sidebar({ onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { logout, user } = useAuth()

  const handleMenuClick = (item: MenuItem) => {
    if (item.submenu) {
      setActiveSubmenu(activeSubmenu === item.id ? null : item.id)
    } else if (item.path) {
      router.push(item.path)
      setActiveSubmenu(null)
    }
  }

  const handleSubmenuClick = (path: string) => {
    router.push(path)
    if (isCollapsed) {
      setActiveSubmenu(null)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const isActiveParent = (item: MenuItem) => {
    if (item.path && pathname === item.path) return true
    if (item.submenu && item.submenu.some((sub) => pathname === sub.path)) return true
    return false
  }

  const handleCollapseToggle = () => {
    const newCollapsedState = !isCollapsed
    setIsCollapsed(newCollapsedState)
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState)
    }
  }

  return (
    <div className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className="h-full bg-white dark:bg-[#1e293b] shadow-lg border-r border-gray-200 dark:border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center space-x-3">
             
              <span className="text-xl font-bold text-gray-900 dark:text-white">AssetManager</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <Layers size={20} className="text-white" />
            </div>
          )}
          <button
            onClick={handleCollapseToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4 flex flex-col overflow-y-auto">
          <div className="space-y-1 px-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${isActiveParent(item)
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </div>
                  {item.submenu && !isCollapsed && (
                    <motion.div
                      animate={{ rotate: activeSubmenu === item.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  )}
                </button>

                {/* Submenu */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.id && !isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.path}
                            onClick={() => handleSubmenuClick(subItem.path)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${isActive(subItem.path)
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                              }`}
                          >
                            {subItem.icon}
                            <span className="text-sm">{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="mt-auto px-2 pb-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>

          {/* User Info */}
          {!isCollapsed && (
            <div className="px-2 pb-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar || "/placeholder.svg"}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <Users size={20} className="text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
