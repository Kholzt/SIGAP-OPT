#!/bin/sh
set -e

# Pastikan seluruh direktori storage dan cache tersedia
mkdir -p /var/www/html/storage/framework/cache/data \
         /var/www/html/storage/framework/sessions \
         /var/www/html/storage/framework/views \
         /var/www/html/storage/logs \
         /var/www/html/bootstrap/cache

# Atur permission storage dan bootstrap/cache secara otomatis
chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

# Jalankan command utama
exec "$@"
