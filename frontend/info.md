#fix

> not use: useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
> useRopeJoint(fixed, j1, {
> anchorA: [0, 0, 0],
> anchorB: [0, 0, 0],
> length: 1,
> });

---

## #add unsplash api

> tailwind daisyui chat bubble className="truncate" | chat | skeleton |
> file with onload and onloadend

---

`socket.io`

> ![socket](https://socket.io/docs/v4/tutorial/introduction) > `npm i socket.io` **_for backend_** > `npm i socket.io-client` **_for client_**
> use connectSocket in login,signup,checkAuth of useAuthStore
> use disconetSocket in logout
> get().socket?.connected from [https://socket.io/docs/v4/client-api/#socketconnected](https://socket.io/docs/v4/client-api/#socketconnected)

`online user`

> handshake [https://socket.io/docs/v4/middlewares/](https://socket.io/docs/v4/middlewares/)

```socket.handshake.query.userId
const userId = socket.handshake.query.userId;
if (userId) userSocketMap[userId] = socket.id
io.emit() is used to send events to all connected clients
```

> io.emit()[https://socket.io/docs/v4/client-options/#query](https://socket.io/docs/v4/client-options/#query)

| Thành phần            | Vai trò                                            |
| --------------------- | -------------------------------------------------- |
| `io` (ở backend)      | Quản lý toàn bộ các kết nối của client             |
| `socket` (ở backend)  | Tương ứng với một kết nối duy nhất (1 user, 1 tab) |
| `io.on("connection")` | Khi client kết nối tới backend                     |
| `socket.on("...")`    | Lắng nghe 1 sự kiện từ client                      |
| `io.emit("...")`      | Gửi 1 sự kiện tới tất cả client                    |
| `socket.emit("...")`  | Gửi sự kiện tới client cụ thể này                  |

`getState()`

> zustand use to get all state in useAuthStore
> const socket= useAuthStore.getState().socket;

\*fix selecuser send wrong person
if (newMessage.senderId !== selectedUser.\_id) return;
======

## Deploy backend and frontend in 1 folder

```js
import path from 'path';
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}
```

```js
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:
        import.meta.MODE === 'development'
            ? 'http://localhost:8080/api'
            : '/api',
    withCredentials: true,
});
```

# search

`npm install lodash`
