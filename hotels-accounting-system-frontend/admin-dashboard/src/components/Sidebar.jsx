import { BarChart2, DollarSign, FileText, User, CreditCard, Home, Users, Menu } from 'lucide-react'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SIDEBAR_ITEMS = [
    {
        name: "Dashboard",
        icon: BarChart2,
        color: "#6366f1",
        path: "/"
    },
    {
        name: "Bookings",
        icon: FileText,
        color: "#34d399",
        path: "/bookings"
    },
    {
        name: "Expenses",
        icon: DollarSign,
        color: "#fbbf24",
        path: "/expenses"
    },
    {
        name: "Financial Reports",
        icon: FileText,
        color: "#f87171",
        path: "/financial-reports"
    },
    {
        name: "Guests",
        icon: Users,
        color: "#f87171",
        path: "/guests"
    },
    {
        name: "Payments",
        icon: CreditCard,
        color: "#f472b6",
        path: "/payments"
    },
    {
        name: "Rooms",
        icon: Home,
        color: "#818cf8",
        path: "/rooms"
    },
    {
        name: "Users",
        icon: User,
        color: "#4ade80",
        path: "/users"
    }
];
const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
            animate={{ width: isSidebarOpen ? "w-256" : "w-80" }}
        >
            <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
                >
                    <Menu size={24} />
                </motion.button>
                <nav className='mt-8 flex-grow'>
                    {SIDEBAR_ITEMS.map((item, index) => (
                        <Link
                            to={item.path}
                            key={index}
                        >
                            <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors mb-2'>
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2, delay: 0.3 }}
                                            className='ml-4 whitespace-nowrap'
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.div >
    )
}

export default Sidebar