<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear Usuario Admin para pruebas
        User::factory()->create([
            'name' => 'Admin HUE',
            'username' => 'admin',
            'email' => 'admin@hue.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        $this->call([
            AnillosSeeder::class,
            RolesSeeder::class,
            CartasSeeder::class,
        ]);
    }
}
