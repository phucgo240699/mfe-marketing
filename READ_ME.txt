==== Local run ====
Node version: 22.13.0

Dev - 3031:
npm run start
Prod - 8081:
npm run build
npm run start:build

==== Docker run ====
Dev - 3031:
docker-compose -f docker-compose-dev.yml up -d --build
Prod - 8081:
docker-compose -f docker-compose-prod.yml up -d --build