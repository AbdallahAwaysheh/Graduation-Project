import { Link, Route, Routes } from "react-router-dom"

import Bookings from "./pages/Bookings"
import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import FinancialReports from "./pages/FinancialReports"
import Guests from "./pages/Guests"
import Payments from "./pages/Payments"
import Rooms from "./pages/Rooms"
import Users from "./pages/Users"
import Sidebar from "./components/Sidebar"


function App() {


  return (
    <>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/* background */}
        <div className="fixed inset-0 z-0">
          {/* <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600  to-purple-500 opacity-80" /> */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-700 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />

        </div>

        {/* sidebar */}
        <Sidebar />


        {/* content */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/financial-reports" element={<FinancialReports />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>

    </>
  )
}

export default App
