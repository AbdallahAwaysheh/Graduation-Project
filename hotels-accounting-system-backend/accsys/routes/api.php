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
    FinancialReportController
};

// API User 
Route::apiResource('users', UserController::class);

// API Guest 
Route::apiResource('guests', GuestController::class);//

// API Room 
Route::apiResource('rooms', RoomController::class);//add , delete , change status

// API Booking 
Route::apiResource('bookings', BookingController::class);//view

// API Expense 
Route::apiResource('expenses', ExpenseController::class);//crud

// API Payment 
Route::apiResource('payments', PaymentController::class);//veiw

// API Financial Report 
Route::apiResource('financial-reports', FinancialReportController::class); //crud

