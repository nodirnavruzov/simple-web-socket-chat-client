// import Vue from 'vue'
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'

// const connectionOptions =  {
//   "force new connection" : true,
//   "reconnectionAttempts": "Infinity",
//   "timeout" : 10000,
//   "transports" : ["websocket"]
// };
// export default function ({ store }) {
//   Vue.use(new VueSocketIO({
//     debug: false,
//     connection: SocketIO('http://127.0.0.1:8081', connectionOptions),
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
//   }))
// }