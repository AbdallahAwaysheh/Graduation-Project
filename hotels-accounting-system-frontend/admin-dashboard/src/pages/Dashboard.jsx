import React from 'react'


import Header from '../components/Header'
import { motion } from 'framer-motion'
import StatCard from '../components/StatCard'
import axios from 'axios';
import { Zap, Users, User, DollarSign } from 'lucide-react';
import { s } from 'framer-motion/client';
import BookingChart from '../components/Dashboard/BookingChart';
import PaymentChart from '../components/Dashboard/PaymentChart';
import ExpensePieChart from '../components/Expenses/ExpensesChart';




function Dashboard() {

  const [totalSales, setTotalSales] = React.useState(0);
  const [payments, setPayments] = React.useState([]);
  const [bookings, setBookings] = React.useState([]);
  const [expenses, setExpenses] = React.useState([]);
  const [totalBookings, setTotalBookings] = React.useState(0);
  const [totalGuests, setTotalGuests] = React.useState(0);
  const [totalExpenses, setTotalExpenses] = React.useState(0);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [totalRevenue, setTotalRevenue] = React.useState(0);


  React.useEffect(() => {

    let total_Expenses = 0;
    axios.get('http://127.0.0.1:8000/api/expenses')
      .then(response => {
        setExpenses(response.data);
        response.data.forEach((item) => {
          total_Expenses += JSON.parse(item.amount)
        });
        setTotalExpenses(total_Expenses);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError('Failed to load data');
      })
    axios.get('http://127.0.0.1:8000/api/guests')
      .then(response => {
        setTotalGuests(response.data.length);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError('Failed to load data');
      });
    let total = 0;
    axios.get('http://127.0.0.1:8000/api/payments')
      .then(response => {
        response.data.forEach((item) => {
          total += JSON.parse(item.amount_paid)
        });
        setTotalSales(total);
        setPayments(response.data);
        console.log(response.data)
        setLoading(false);
        setTotalRevenue(total - total_Expenses);
      })
      .catch(error => {
        console.log(error);
        setError('Failed to load data');
      });
    axios.get('http://127.0.0.1:8000/api/bookings')
      .then(response => {
        setTotalBookings(response.data.length);
        setBookings(response.data);

        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError('Failed to load data');
      });

  }, []);

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Dashboard' />
      <main className='max-w-7xl mx-auto px-4 py-6 lg:px-8'>
        {error && <p>{error}</p>}
        {loading ? <p>Loading...</p> : <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Income" value={`$${totalSales}`} icon={DollarSign} color="#6366f1" />
          <StatCard name="Expenses" value={`-$${totalExpenses}`} icon={DollarSign} color="red" />
          <StatCard name="Bookings" value={totalBookings} icon={Users} color="#34d399" />
          <StatCard name="Total Guests" value={totalGuests} icon={User} color="#34d399" />
          <StatCard name="Total Revenue" value={`$${totalRevenue}`} icon={Zap} color="#34d399" />
        </motion.div>
        }
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <BookingChart bookings={bookings} />
          <PaymentChart payments={payments} />
          <ExpensePieChart expenses={expenses} />
        </div>


      </main>
    </div>
  )
}

export default Dashboard