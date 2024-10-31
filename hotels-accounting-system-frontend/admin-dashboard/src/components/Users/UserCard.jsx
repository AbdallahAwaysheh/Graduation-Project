import React from 'react';
import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

function UserCard({ user }) {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden rounded-xl border border-gray-700 max-w-xs m-10 flex flex-col '
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
        >
            <div className='p-4 h-32'>
                <h2 className='text-lg font-medium text-gray-100'>User Information</h2>
                <p className='text-sm text-gray-400'>Name: {user.name}</p>
                <p className='text-sm text-gray-400'>Email: {user.email}</p>
                <p className='text-sm text-gray-400'>Role: {user.role}</p>
            </div>
            <Link to={`/edit-user/${user.id}`} className='text-indigo-400 hover:text-indigo-300 mr-4 self-end mb-4 '>
                <Edit size={18} />
            </Link>
        </motion.div>
    );
}

export default UserCard;
