<?php


namespace App\Http\Controllers;

use App\Models\FinancialReport;
use Illuminate\Http\Request;

class FinancialReportController extends Controller
{
    public function index()
    {
        $reports = FinancialReport::with('user')->get();
        return response()->json($reports);
    }

    public function store(Request $request)
    {
        $report = FinancialReport::create($request->all());
        return response()->json($report);
    }

    public function show($id)
    {
        $report = FinancialReport::with('user')->findOrFail($id);
        return response()->json($report);
    }

    public function update(Request $request, $id)
    {
        $report = FinancialReport::findOrFail($id);
        $report->update($request->all());
        return response()->json($report);
    }

    public function destroy($id)
    {
        FinancialReport::destroy($id);
        return response()->json(['message' => 'Report deleted successfully']);
    }
}

