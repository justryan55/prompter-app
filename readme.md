# Prompter App

## First time setup

### Server

copy .env.example to .env and update the MONGO_URL to a DB which you can get by going to https://mongo..... and SECRET_KEY to a combination of letters/numbers/characters of your choosing

### Client

copy .env.example to .env and update the VITE_APP_BACKEND_URL to a backend URL of your choosing

### Developer

Run `npm i` from both `/client` and `/server`

## Development

- From `/server` run `npm run dev`
- From `/client` run `npm run dev`

## Seed database

Run node seed.mjs in /server to populate the database
