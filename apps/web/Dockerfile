FROM php:8.3-cli

WORKDIR /var/www/html

# 1. Install System Dependencies & PHP Extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    && docker-php-ext-install \
        pdo_mysql \
        mbstring \
        bcmath \
        zip \
        gd \
        xml \
        curl \
    && rm -rf /var/lib/apt/lists/*

# 2. Install Composer Binary
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 3. Solusi Git Safe Directory di Docker
RUN git config --global --add safe.directory '*'

# 4. Copy Manifest Files
COPY composer.json composer.lock ./

# 5. Install Laravel Dependencies
RUN COMPOSER_MEMORY_LIMIT=-1 composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --no-scripts

# 6. Copy seluruh Source Code Laravel
COPY . .

# 7. Setup Direktori Storage & Cache Permission, serta Dump Autoloader
RUN mkdir -p storage/framework/cache/data \
             storage/framework/sessions \
             storage/framework/views \
             storage/logs \
             bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache \
    && composer dump-autoload -o

# 8. Copy Entrypoint Script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]