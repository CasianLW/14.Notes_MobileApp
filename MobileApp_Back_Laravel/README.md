# NOTES APP API

## About the app

The goal is to write and put into production an HTTP note management API
personal. This API will be the back-end of a mobile web application.
(See 'API.pdf' inside main git)

## Install

1. Download & unzip 'Mobile_back_laravel' git.
2. Enter project, `composer install` & fufill .env with correct infos
3. `php artisan migrate` to create tables in DB & `php artisan serve` to launch project
4. Optional: test with postman/ see api routes in routes/api.php

## Deploy to render.com

1. Add to the projet the Docker & nginx configs (see commits)
2. Create an postgresql db on render if not already the case
3. Link the project to render via Git (src/mobileapp_back_laraver for my case)
4. Add .env by using the postgresql db infos in it
5. Test on Postman (see routes /api.php)
6. If not the case, create the tables inside your db:

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    content TEXT,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE personal_access_tokens (
    id BIGSERIAL PRIMARY KEY,
    tokenable_id BIGINT NOT NULL,
    tokenable_type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    abilities TEXT,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tokenable_id) REFERENCES users(id) ON DELETE CASCADE
);
```
