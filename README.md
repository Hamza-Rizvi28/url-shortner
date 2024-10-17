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

## Prerequisites

Make sure you have the following installed:

- Node.js (v20.x or higher)
- PostgreSQL
- npm or yarn
- Git

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/url-shortener.git
    cd url-shortener/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

   Create a `.env` file in the root of the project and add the following and make changes as per your environment:

    ```bash
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    PORT=8080
    ```

4. Run database migrations:

    ```bash
    npx prisma migrate dev
    ```

5. Start the server:

    ```bash
    npm run dev
    ```

    The app will run at `http://localhost:8080` by default.

## Usage

To shorten a URL, send a `POST` request to the `/url/create` endpoint with a JSON body containing the `longUrl` field:

```bash
curl -X POST http://localhost:8080/url/create -H "Content-Type: application/json" -d '{"longUrl": "https://www.example.com"}'
