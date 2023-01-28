# PC MUSEUM

https://pc-museum-yvkf9.ondigitalocean.app/

admin:
  - admin@szerveroldali.hu
  - adminpwd
  
users:
  - user{1-15}@szerveroldali.hu
  - password



## Beüzemelés

**1.** Composeres csomagok telepítése
```
composer install --no-interaction --quiet
```

**2.** .env fájl:
```
APP_NAME="Laravel app"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite
```

**3.** Encryption key kigenerálása
```
php artisan key:generate
```

**4.** Node Package Manager-es csomagok telepítése (csendes módban)
```
npm install --silent
```
**5.** Frontend oldali asset-ek kigenerálása. A build opcióval a Vite dobja a watch módot
(amitől megakadna az init folyamat), de ha Mix kapja meg, akkor ignorálja
```
npm run dev -- build
```

**6.** Üres database/database.sqlite fájl előállítása, hogy a migration működjön

**7.** Táblák létrehozása, seed-elés
```
php artisan migrate:fresh --seed
```

**8.** Elképzelhető, hogy a storage-ben nem létezik a public, de szükséges legalább
egy üres könyvtár a szimbolikus link elkészítéséhez
```
mkdir .\storage\app\public
```
**9.** Symlink készítése, alap config szerint a /public/storage-ról a /storage/app/public-ra
```
php artisan storage:link
```

**10.** Alkalmazás indítása
```
php artisan serve
```
