<?php

use App\Http\Controllers\Items\ItemController;
use Illuminate\Support\Facades\Route;

Route::pattern('item', '[0-9]+');
Route::apiResource('items', ItemController::class);
