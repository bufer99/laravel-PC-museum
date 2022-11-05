# PC MUSEUM
## Beüzemelés

Composeres csomagok telepítése
```
composer install --no-interaction --quiet
```

.env fájl:
```
APP_NAME="Laravel app"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite
```

Encryption key kigenerálása
```
php artisan key:generate
```

Node Package Manager-es csomagok telepítése (csendes módban)
```
npm install --silent
```
Frontend oldali asset-ek kigenerálása. A build opcióval a Vite dobja a watch módot
(amitől megakadna az init folyamat), de ha Mix kapja meg, akkor ignorálja
```
npm run dev -- build
```

Üres database/database.sqlite fájl előállítása, hogy a migration működjön

Táblák létrehozása, seed-elés
```
php artisan migrate:fresh --seed
```

Elképzelhető, hogy a storage-ben nem létezik a public, de szükséges legalább
egy üres könyvtár a szimbolikus link elkészítéséhez
```
mkdir .\storage\app\public
```
Symlink készítése, alap config szerint a /public/storage-ról a /storage/app/public-ra
```
php artisan storage:link
```

Alkalmazás indítása
```
php artisan serve
```
