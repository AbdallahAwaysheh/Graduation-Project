<?php


namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::with('user')->get();
        return response()->json($expenses);
    }

    public function store(Request $request)
    {
        $expense = Expense::create($request->all());
        return response()->json($expense);
    }

    public function show($id)
    {
        $expense = Expense::with('user')->findOrFail($id);
        return response()->json($expense);
    }

    public function update(Request $request, $id)
    {
        $expense = Expense::findOrFail($id);
        $expense->update($request->all());
        return response()->json($expense);
    }

    public function destroy($id)
    {
        Expense::destroy($id);
        return response()->json(['message' => 'Expense deleted successfully']);
    }
}

