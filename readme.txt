- php vendor/bin/homestead make
- vagrant up (`192.168.10.10 homestead.app` toevoegen aan je hosts file)
- npm install

- npm run dev
---> webpack-dev-server starten, bij aanpassingen in modules wordt de browser gerefreshed
---> dit gebeurd allemaal in-memory, dus er komen geen bestanden in /public/build

- npm run build
---> development build maken, komt in /public/build/

- npm run dist
---> production build maken, komt in /public/build/ (nu worden meer webpack plugins gebruikt, waaronder minifiers)

- npm run stats
---> genereert een stats.json bestand in de root folder. Is te openen in https://webpack.github.io/analyse/. Cool!


/resources/assets/app/index.js is het entry-point voor de frontend
/resources/assets/admin/index.js is het entry-point voor de backend indien nodig