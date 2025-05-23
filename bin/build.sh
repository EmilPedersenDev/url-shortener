
npx tsc
cp ./package.json ./dist/server/package.json
cp ./package-lock.json ./dist/server/package-lock.json
npx webpack
