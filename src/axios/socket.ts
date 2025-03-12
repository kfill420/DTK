// import { io } from "socket.io-client";
// import { setWaitingUsers } from "../store/reducer/waitingUsers";
// import store from "../store";

// const socket = io(import.meta.env.VITE_STATUS === "dev" ? "ws://" + import.meta.env.VITE_APP_DOMAIN : "wss://" + import.meta.env.VITE_APP_DOMAIN, {
//   withCredentials: true,
//   transports: ['websocket'],
//   auth: {
//     token: localStorage.getItem("token"),
//     sessionId: localStorage.getItem("sessionId"),
//   },
// });

// socket.on("updateWaitingList", (users) => {
//   store.dispatch(setWaitingUsers(users));
// })

// export default socket;
