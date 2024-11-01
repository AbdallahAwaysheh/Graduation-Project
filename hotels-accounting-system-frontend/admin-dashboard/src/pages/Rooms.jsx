import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import RoomsTable from '../components/Rooms/RoomsTable';
import axios from 'axios';

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editRoom, setEditRoom] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);
    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('');
    const [roomPrice, setRoomPrice] = useState('');
    const [roomStatus, setRoomStatus] = useState('available'); // Default status

    const fetchRooms = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.get('http://127.0.0.1:8000/api/rooms');
            setRooms(response.data);
        } catch (error) {
            setError('Failed to load rooms');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
        setEditRoom(null);
        setRoomNumber('');
        setRoomType('');
        setRoomPrice('');
        setRoomStatus('available'); // Reset form fields when toggling
    };

    const handleAddRoom = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/rooms', {
                room_number: roomNumber,
                type: roomType,
                price_per_night: roomPrice,
                status: roomStatus,
            });
            setSuccessMessage('Room added successfully!');
            toggleForm();
            fetchRooms(); // Refresh room list
        } catch (error) {
            setError('Failed to add room');
            console.error(error);
        }
    };

    const handleEdit = (room) => {
        setEditRoom(room);
        setRoomNumber(room.room_number);
        setRoomType(room.type);
        setRoomPrice(room.price_per_night);
        setRoomStatus(room.status);
        setShowForm(true);
    };

    const handleDelete = async (roomId) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/rooms/${roomId}`);
                fetchRooms();
                setSuccessMessage('Room deleted successfully');
            } catch (error) {
                setError('Failed to delete room');
                console.error(error);
            }
        }
    };

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Rooms' />
            <div className="flex justify-end items-center mt-4 mr-4 ml-4">
                <button
                    onClick={toggleForm}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    {showForm ? 'Hide Form' : editRoom ? 'Edit Room' : 'Add Room'}
                </button>
            </div>
            {showForm && (
                <div className='bg-gray-800 p-6 rounded-lg shadow-lg mt-4 mr-4 ml-4 mx-auto'>
                    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleAddRoom}>
                        <div className='mb-4'>
                            <label className="block text-gray-300 mb-2">Room Number</label>
                            <input
                                type="text"
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                className="w-full p-2 bg-gray-700 text-white rounded"
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-300 mb-2">Room Type</label>
                            <select
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="w-full p-2 bg-gray-700 text-white rounded"
                                required
                            >
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                                <option value="suite">Suite</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-300 mb-2">Room Price Per Night</label>
                            <input
                                type="number"
                                value={roomPrice}
                                onChange={(e) => setRoomPrice(e.target.value)}
                                className="w-full p-2 bg-gray-700 text-white rounded"
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-300 mb-2">Room Status</label>
                            <select
                                value={roomStatus}
                                onChange={(e) => setRoomStatus(e.target.value)}
                                className="w-full p-2 bg-gray-700 text-white rounded"
                                required
                            >
                                <option value="available">Available</option>
                                <option value="occupied">Occupied</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4 transition duration-200"
                        >
                            {editRoom ? 'Update Room' : 'Add Room'}
                        </button>
                    </form>
                </div>
            )}
            <RoomsTable rooms={rooms} onEdit={handleEdit} onDelete={handleDelete} refreshRooms={fetchRooms} />
        </div>
    );
}

export default Rooms;
