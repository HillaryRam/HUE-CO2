<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        // Esto obliga a que todos los assets (CSS/JS) usen HTTPS
        if (env('APP_ENV') !== 'local' || str_contains(request()->header('host'), 'ngrok')) {
            URL::forceScheme('https');
        }
    }
}
