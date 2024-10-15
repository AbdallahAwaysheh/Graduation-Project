<?php



namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with('guest', 'room')->get();
        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $booking = Booking::create($request->all());
        return response()->json($booking);
    }

    public function show($id)
    {
        $booking = Booking::with('guest', 'room')->findOrFail($id);
        return response()->json($booking);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update($request->all());
        return response()->json($booking);
    }

    public function destroy($id)
    {
        Booking::destroy($id);
        return response()->json(['message' => 'Booking deleted successfully']);
    }
}

