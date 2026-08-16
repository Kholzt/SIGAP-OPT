# Graph Report - SIGAP-TANI  (2026-08-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 753 nodes · 1194 edges · 91 communities (80 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.58)
- Token cost: 3,727 input · 911 output

## Graph Freshness
- Built from commit: `d7bc5ab5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Authentication and User Testing
- UI Component Library
- Admin Layout and Hooks
- Request Validation and Throttling
- Composer Dependencies
- Python Database Services
- Frontend Package Dependencies
- Composer Scripts and Lifecycle
- Database Migrations
- Attack History Management
- Endemic Status Mapping
- District Management
- Auth and Verification Controllers
- Python Data Models
- Pest Control Services
- Auth and Dashboard Controllers
- Auth Routing and Responses
- App Initialization and Middleware
- Excel Data Import
- Endemic Status Services
- ML Data Preprocessing
- Database and Session Config
- Database Seeders
- Dashboard Resource Controller
- User Profile Management
- Public Map Controller
- JS Path Configuration
- Prediction Model Controller
- Peak Attack Controller
- App Service Providers
- System Architecture Overview
- Custom CLI Commands
- Logging Configuration
- Unit Testing
- Excel Integration Config
- Console Commands
- Docker Entrypoint Script
- Exception Rendering
- Development Documentation
- Docker Compose Config

## God Nodes (most connected - your core abstractions)
1. `User` - 36 edges
2. `Controller` - 28 edges
3. `OPTService` - 21 edges
4. `Kecamatan` - 19 edges
5. `OptService` - 19 edges
6. `TestCase` - 18 edges
7. `HistoriSerangan` - 18 edges
8. `DataSeranganService` - 18 edges
9. `OPT` - 17 edges
10. `StatusEndemisService` - 17 edges

## Surprising Connections (you probably didn't know these)
- `Python ML Service` --references--> `MySQL Database`  [EXTRACTED]
  apps/ml/PRD.md → docker-compose.yml
- `Laravel Web Application` --references--> `MySQL Database`  [EXTRACTED]
  apps/web/AGENT.md → docker-compose.yml
- `KecamatanController` --inherits--> `Controller`  [EXTRACTED]
  apps/web/app/Http/Controllers/KecamatanController.php → apps/web/app/Http/Controllers/Controller.php
- `DataSeranganController` --references--> `KecamatanService`  [EXTRACTED]
  apps/web/app/Http/Controllers/DataSeranganController.php → apps/web/app/Services/KecamatanService.php
- `ConfirmablePasswordController` --inherits--> `Controller`  [EXTRACTED]
  apps/web/app/Http/Controllers/Auth/ConfirmablePasswordController.php → apps/web/app/Http/Controllers/Controller.php

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **ML Forecasting Pipeline** — apps_ml_prd, apps_ml_fastapi, mysql_db [EXTRACTED 0.95]
- **SIGAP-TANI System Architecture** — apps_web_laravel, apps_ml_fastapi, mysql_db, apps_web_vite [EXTRACTED 1.00]

## Communities (91 total, 11 thin omitted)

### Community 0 - "Authentication and User Testing"
Cohesion: 0.06
Nodes (22): User, AuthenticationTest, EmailVerificationTest, PasswordConfirmationTest, PasswordResetTest, PasswordUpdateTest, RegistrationTest, ExampleTest (+14 more)

### Community 1 - "UI Component Library"
Cohesion: 0.09
Nodes (17): ApplicationLogo(), Checkbox(), DangerButton(), Dropdown(), DropDownContext, InputError(), InputLabel(), Modal() (+9 more)

### Community 2 - "Admin Layout and Hooks"
Cohesion: 0.07
Nodes (23): Alert(), Pagination(), BULAN_OPTIONS, EMPTY_FORM, useDataSerangan(), useSearch(), AdminLayout(), DataSeranganDeleteModal() (+15 more)

### Community 3 - "Request Validation and Throttling"
Cohesion: 0.05
Nodes (12): LoginRequest, ImportDataSeranganRequest, StoreDataSeranganRequest, StoreKecamatanRequest, StoreOptRequest, UpdateDataSeranganRequest, UpdateOptRequest, Illuminate\Auth\Events\Lockout (+4 more)

### Community 4 - "Composer Dependencies"
Cohesion: 0.04
Nodes (44): pestphp/pest-plugin, php-http/discovery, autoload, autoload-dev, psr-4, psr-4, config, allow-plugins (+36 more)

### Community 5 - "Python Database Services"
Cohesion: 0.08
Nodes (24): Any, get_db(), Test database connection., test_db_connection(), OptService, Mengambil seluruh data master kecamatan., Mengambil seluruh data master OPT., Mengambil tahun minimal dan maksimal dari histori serangan. (+16 more)

### Community 6 - "Frontend Package Dependencies"
Cohesion: 0.05
Nodes (38): dependencies, chart.js, @inertiajs/react, leaflet, lucide-react, react, react-chartjs-2, react-dom (+30 more)

### Community 7 - "Composer Scripts and Lifecycle"
Cohesion: 0.08
Nodes (26): scripts, dev, post-autoload-dump, post-create-project-cmd, post-root-package-install, post-update-cmd, pre-package-uninstall, setup (+18 more)

### Community 8 - "Database Migrations"
Cohesion: 0.13
Nodes (3): Illuminate\Database\Migrations\Migration, Illuminate\Database\Schema\Blueprint, Illuminate\Support\Facades\Schema

### Community 9 - "Attack History Management"
Cohesion: 0.15
Nodes (7): DataSeranganController, HistoriSerangan, DataSeranganService, Illuminate\Database\Eloquent\Relations\BelongsTo, Illuminate\Http\UploadedFile, Illuminate\Support\Facades\DB, Maatwebsite\Excel\Facades\Excel

### Community 10 - "Endemic Status Mapping"
Cohesion: 0.17
Nodes (11): getStatusColor(), StatusBadge(), centerCoords, normalizeName(), StatusEndemisMap(), Header(), StatusEndemisMapLanding(), FilterWilayahCard() (+3 more)

### Community 11 - "District Management"
Cohesion: 0.16
Nodes (4): KecamatanController, UpdateKecamatanRequest, Kecamatan, KecamatanService

### Community 12 - "Auth and Verification Controllers"
Cohesion: 0.17
Nodes (9): AuthenticatedSessionController, EmailVerificationNotificationController, PasswordController, VerifyEmailController, Controller, Illuminate\Foundation\Auth\EmailVerificationRequest, Illuminate\Http\RedirectResponse, Illuminate\Support\Facades\Hash (+1 more)

### Community 13 - "Python Data Models"
Cohesion: 0.17
Nodes (11): HistoriSerangan, Kecamatan, ModelMetadata, Opt, Model untuk tabel model_metadata (menyimpan histori training & metrik model)., Model untuk tabel kecamatan., Model untuk tabel opt (Organisme Pengganggu Tanaman)., Model untuk tabel histori_serangan. (+3 more)

### Community 14 - "Pest Control Services"
Cohesion: 0.20
Nodes (4): OptController, StatusEndemisController, OPT, OPTService

### Community 15 - "Auth and Dashboard Controllers"
Cohesion: 0.20
Nodes (7): Illuminate\Auth\Events\PasswordReset, Illuminate\Auth\Events\Registered, Illuminate\Support\Facades\Auth, Illuminate\Support\Facades\Password, Illuminate\Validation\Rules, Illuminate\Validation\ValidationException, Inertia\Inertia

### Community 16 - "Auth Routing and Responses"
Cohesion: 0.17
Nodes (6): ConfirmablePasswordController, EmailVerificationPromptController, PasswordResetLinkController, RegisteredUserController, Illuminate\Support\Facades\Route, Inertia\Response

### Community 17 - "App Initialization and Middleware"
Cohesion: 0.19
Nodes (8): NewPasswordController, HandleInertiaRequests, Illuminate\Foundation\Application, Illuminate\Foundation\Configuration\Exceptions, Illuminate\Foundation\Configuration\Middleware, Illuminate\Http\Request, Inertia\Middleware, Tighten\Ziggy\Ziggy

### Community 18 - "Excel Data Import"
Cohesion: 0.22
Nodes (9): HistoriSeranganImport, Maatwebsite\Excel\Concerns\Importable, Maatwebsite\Excel\Concerns\SkipsOnError, Maatwebsite\Excel\Concerns\SkipsOnFailure, Maatwebsite\Excel\Concerns\ToModel, Maatwebsite\Excel\Concerns\WithHeadingRow, Maatwebsite\Excel\Concerns\WithValidation, Maatwebsite\Excel\Validators\Failure (+1 more)

### Community 19 - "Endemic Status Services"
Cohesion: 0.21
Nodes (4): StatusEndemis, StatusEndemisService, Illuminate\Database\Eloquent\Model, Illuminate\Support\Facades\Cache

### Community 20 - "ML Data Preprocessing"
Cohesion: 0.22
Nodes (8): OptDataPreprocessor, prepare_opt_dataset(), Modul Preprocessing dan Feature Engineering untuk Dataset Serangan OPT sesuai…, FR-05: Time Series Split Membagi data training (tahun < test_year) dan testing…, Fungsi pembantu untuk memproses dataset mentah menjadi dataset berfitur., FR-02: Data Cleaning - Menghapus duplikat - Menangani missing values - Validasi…, FR-04: Feature Engineering - Time Features: bulan (sin/cos encoding), tahun -…, DataFrame

### Community 21 - "Database and Session Config"
Cohesion: 0.20
Nodes (5): UserFactory, Illuminate\Database\Eloquent\Factories\Factory, Illuminate\Support\Str, Pdo\Mysql, static

### Community 22 - "Database Seeders"
Cohesion: 0.29
Nodes (5): DatabaseSeeder, KecamatanSeeder, OPTSeeder, Illuminate\Database\Console\Seeds\WithoutModelEvents, Illuminate\Database\Seeder

### Community 24 - "User Profile Management"
Cohesion: 0.25
Nodes (4): ProfileController, ProfileUpdateRequest, Illuminate\Contracts\Auth\MustVerifyEmail, Illuminate\Support\Facades\Redirect

### Community 26 - "JS Path Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, baseUrl, paths, exclude, ziggy-js, node_modules, public, ./vendor/tightenco/ziggy

### Community 29 - "App Service Providers"
Cohesion: 0.33
Nodes (3): AppServiceProvider, Illuminate\Support\Facades\Vite, Illuminate\Support\ServiceProvider

### Community 30 - "System Architecture Overview"
Cohesion: 0.47
Nodes (6): Python ML Service, ML Product Requirements, Performance Analysis Report, Laravel Web Application, Vite / React Frontend, MySQL Database

### Community 31 - "Custom CLI Commands"
Cohesion: 0.40
Nodes (4): MakeServiceCommand, Illuminate\Console\Attributes\AsCommand, Illuminate\Console\Command, Illuminate\Support\Facades\File

### Community 32 - "Logging Configuration"
Cohesion: 0.40
Nodes (4): Monolog\Handler\NullHandler, Monolog\Handler\StreamHandler, Monolog\Handler\SyslogUdpHandler, Monolog\Processor\PsrLogMessageProcessor

## Knowledge Gaps
- **82 isolated node(s):** `DropDownContext`, `centerCoords`, `BULAN_OPTIONS`, `EMPTY_FORM`, `BULAN_NAMES` (+77 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `User` connect `Authentication and User Testing` to `Request Validation and Throttling`, `Auth and Dashboard Controllers`, `Auth Routing and Responses`, `Database and Session Config`, `Database Seeders`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `Controller` connect `Auth and Verification Controllers` to `Attack History Management`, `District Management`, `Pest Control Services`, `Auth and Dashboard Controllers`, `Auth Routing and Responses`, `App Initialization and Middleware`, `Dashboard Resource Controller`, `User Profile Management`, `Public Map Controller`, `Prediction Model Controller`, `Peak Attack Controller`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `HistoriSerangan` connect `Attack History Management` to `Endemic Status Services`, `Excel Data Import`, `Request Validation and Throttling`, `Pest Control Services`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `DropDownContext`, `centerCoords`, `BULAN_OPTIONS` to the rest of the system?**
  _82 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Authentication and User Testing` be split into smaller, more focused modules?**
  _Cohesion score 0.06291591046581972 - nodes in this community are weakly interconnected._
- **Should `UI Component Library` be split into smaller, more focused modules?**
  _Cohesion score 0.09333333333333334 - nodes in this community are weakly interconnected._
- **Should `Admin Layout and Hooks` be split into smaller, more focused modules?**
  _Cohesion score 0.070578231292517 - nodes in this community are weakly interconnected._