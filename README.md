# URL Shortener

A simple URL shortener application built using **Node.js**, **Express**, and **TypeScript**.

## Introduction

This application allows users to shorten long URLs into concise, easy-to-share links. It also provides functionality to redirect users from the shortened URL back to the original URL. The URLs are stored in a database, and each shortened URL is associated with a unique identifier.

## Features

- Shorten long URLs into compact URLs.
- Redirect to the original URL using the shortened URL.
- Basic URL validation.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Docker
- Prisma ORM

## Prerequisites

Make sure you have the following installed:

- Docker
- Docker compose

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/url-shortener.git
    ```

2. Set up environment variables in the backend folder:

   Create a `.env` file in the backend folder of the project and add the following and make changes as per your environment:

    ```bash
    DATABASE_URL='postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA'
    PORT=8080
    ```

4. To start all services:
    ```bash
    docker compose up --build
    ```

    The app will run at `http://localhost:8080` by default.

5. To setup database:
    
    1. Running Migrations:
        
        To ensure that the database schema is up to date, you need to run migrations. If you're setting up the project for the first time or have made schema changes, run:

        ```bash
        docker-compose exec server npx prisma migrate deploy
        ```

    2. Generate Prisma Client: 
    
        After running migrations, generate the Prisma client to interact with the database:
        ```bash
        docker-compose exec server npx prisma generate
        ```

## Usage

To shorten a URL, send a `POST` request to the `/url/create` endpoint with a JSON body containing the `longUrl` field:

```bash
curl -X POST http://localhost:8080/url/create -H "Content-Type: application/json" -d '{"longUrl": "https://www.example.com"}'
```