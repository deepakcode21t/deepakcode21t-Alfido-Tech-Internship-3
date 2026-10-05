# Alfido Tech Task 3 - Authentication & Protected Routes (JWT)

This project demonstrates signup/login, bcrypt password hashing, JWT verification, HTTP-only cookie token storage, protected API routes, React protected routes, and logout.

## Run backend
```bash
cd server
npm install
```
Create `.env` from `.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/alfido_task3
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```
Then:
```bash
npm run dev
```
Expected: `MongoDB connected` and `Server running at http://localhost:5000`.

## Run frontend
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
Open the Vite URL, normally `http://localhost:5173`.

## Test
1. Sign up.
2. You are taken to the protected Dashboard.
3. Dashboard calls `/api/auth/me` and `/api/protected`.
4. Logout.
5. Try `/dashboard`; you should be redirected to Login.

## API
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- POST `/api/auth/logout`
- GET `/api/protected`

## Security notes
Passwords are stored only as bcrypt hashes. JWT is kept in an HTTP-only cookie. Never commit `.env` or real secrets. Use HTTPS and CSRF protection in production.

## Suggested screenshots
1. Signup page / successful registration
2. Login page / successful login
3. Protected Dashboard
4. MongoDB Compass user document showing a bcrypt hash (no real secrets)
5. VS Code project structure
