import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUserForm from './AddUserForm';
import UserCard from './UserCard';

function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    };

    const handleUserAdded = (newUser) => {
        setUsers([...users, newUser]);
    };

    return (
        <div className="container mx-auto p-6">
            <AddUserForm onUserAdded={handleUserAdded} />
            <div className="flex flex-wrap">
                {users.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}

export default UserManagement;
