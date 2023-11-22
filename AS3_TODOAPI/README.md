# How to use this api and database

This folder contains database (maria - db) and to do api (using golang) 
to use this 

1. Install docker in your machine and make sure it running 
2. Download zip this project/folder
3. navigate to this folder
4. duplicate .env.template and rename to .env, then change the value as you want
   for example, `WEB_CORS_TARGET=http://localhost:5173` this is the example frontend path to enable cors, 
   make sure there is no space as in my example
5. open terminal and run `docker compose up` this will run db service and backend service for you

P.S. for each api path you can check in `/web-api/internal/router` or finding each api example in `AS5_ReactExpoApp/native/api/` 
