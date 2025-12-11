# Assignment 2 — Online Hangout Environment
_Minimal Frontend + Real-Time Backend (Socket.io)_

## 🚀 Overview
This project implements a **virtual hangout environment** where multiple users join a room and interact in real time through:
- Chat
- Click synchronisation
- Scroll synchronisation
- Page synchronisation
- Live participant tracking

Backend handles authentication, room flow, and all socket events.  
Frontend is intentionally minimal as required in the assignment.

## ✅ Features Implemented

### 1. Authentication
- Register
- Login
- Profile
- JWT-based auth for API + Socket

### 2. Room Management
- Create Room
- Join Room
- Leave Room
- Live participant tracking

**API Endpoints**
| Method | Route | Purpose |
|--------|--------|---------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login user |
| GET | /auth/profile | Current user |
| POST | /rooms/room | Create room |
| POST | /rooms/join | Join room |

### 3. Real-Time Events (Socket.io)

**Client → Server**
- join_room
- leave_room
- message
- click_event
- scroll_update
- page_change

**Server → Client**
- user_joined
- user_leaved
- message
- user_clicked
- scroll_updated
- page_changed

### 4. Shared Activity (Shopping Demo)
- 20 static products
- Click highlights synced instantly
- Scroll synced across all users
- Page changes synced

### 5. Real-Time Chat
- Instant messaging
- Auto-scroll
- Toast on join
- Online indicator

## 🏗 Architecture Summary

### Backend
- Node.js
- Express
- typescript
- Socket.io
- JWT
- MongoDB
- In-memory participant store

### Frontend
- Vite + React
- Axios
- Socket.io-client
- link : 

## ⚙ Running the Project

### Backend
```
npm install
npm run start
```

## 🧪 Testing Steps
1. Register two accounts
2. Login both
3. User A creates a room
4. User B joins same room
5. Validate:
   - Join/Leave notifications
   - Chat sync
   - Click sync
   - Scroll sync
   - Page sync
   - Participant list updates

## ✔ Status
All core requirements of **Assignment 2** completed:
- Authentication ✔
- Room flow ✔
- Real-time events ✔
- Shared state sync ✔
- Minimal UI ✔
- Backend architecture ✔

##  StatusScaling Approach
1. Stateless API Layer
All REST APIs use JWT authentication and store no server-side session data, enabling horizontal scaling.
2. Horizontal WebSocket Scaling with Sticky Sessions
Multiple WebSocket servers run in parallel with load balancer session affinity for stable connections.
3. Redis Pub/Sub for Cross-Node Real-Time Sync
Redis is used to broadcast events across all WebSocket nodes for real-time synchronization.
4. Distributed Room State (In-Memory + Redis)
Room participant data stored in memory with optional Redis mirroring for consistency and failover.
5. Room-Based Sharding
Rooms are evenly distributed across WebSocket nodes to prevent bottlenecks and support thousands of users.