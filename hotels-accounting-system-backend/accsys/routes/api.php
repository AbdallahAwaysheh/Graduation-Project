<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use App\Http\Controllers\{
    UserController,
    GuestController,
    RoomController,
    BookingController,
    ExpenseController,
    PaymentController,
    FinancialReportController,
    LoginController
};

// API Login
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:api');


// API Admin
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    // API User
    Route::apiResource('users', UserController::class);
    // API FinancialReport
    Route::apiResource('financial-reports', FinancialReportController::class); //crud ( Manager & Admin)
    // API Guest
    Route::apiResource('guests', GuestController::class);//View For Accountant & Manager
    // API Room
    Route::apiResource('rooms', RoomController::class);//add , delete , change status (Accountant & Manager)
    // API Booking
    Route::apiResource('bookings', BookingController::class);// delete , Update (Accountant & Manager)
    // API Expense
    Route::post('/expenses', [ExpenseController::class, 'store']);//crud (Accountant & Manager)
    // API Payment
    Route::apiResource('payments', PaymentController::class); //view (Accountant & Manager)
});

// API Manager
Route::middleware(['auth:api', 'role:manager'])->group(function () {
    Route::apiResource('guests', GuestController::class);//View For Accountant & Manager
    Route::apiResource('rooms', RoomController::class);//add , delete , change status (Accountant & Manager)
    Route::apiResource('bookings', BookingController::class);// delete , Update (Accountant & Manager)
    Route::post('/expenses', [ExpenseController::class, 'store']);//crud (Accountant & Manager)
    Route::apiResource('payments', PaymentController::class); //view (Accountant & Manager)
    Route::apiResource('financial-reports', FinancialReportController::class); //crud ( Manager & Admin)
});

// API Accountant
Route::middleware(['auth:api', 'role:accountant'])->group(function () {
    Route::apiResource('guests', GuestController::class);//View For Accountant & Manager
    Route::apiResource('rooms', RoomController::class);//add , delete , change status (Accountant & Manager)
    Route::apiResource('bookings', BookingController::class);// delete , Update (Accountant & Manager)
    Route::post('/expenses', [ExpenseController::class, 'store']);//crud (Accountant & Manager)
    Route::apiResource('payments', PaymentController::class); //view (Accountant & Manager)
    Route::prefix('bookingsQuery')->group(function () {
        Route::get('today', [BookingController::class, 'getBookingsToday']);
    });
});







