<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\AsCommand;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

// #[AsCommand(
//     name: 'make:service',
//     description: 'Create a new service class'
// )]
class MakeServiceCommand extends Command
{
      protected $signature = 'make:service {name}';

    protected $description = 'Create a new service class';
    public function handle(): int
    {
        $name = $this->argument('name');

        $directory = app_path('Services');
        $path = "{$directory}/{$name}.php";

        if (File::exists($path)) {
            $this->error("Service {$name} already exists.");

            return self::FAILURE;
        }

        File::ensureDirectoryExists($directory);

        $content = <<<PHP
<?php

namespace App\Services;

class {$name}
{
    public function getAll{$name}()
    {
        // Implement your logic here
    }
}

PHP;

        File::put($path, $content);

        $this->info("Service {$name} created successfully.");

        return self::SUCCESS;
    }

 
}