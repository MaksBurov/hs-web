FROM node:20

# создание директории приложения
WORKDIR /hs-web

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --omit=dev

# копируем исходный код
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]