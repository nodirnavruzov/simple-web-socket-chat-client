export const strict = false
export const state = () => ({
  socket: null,
  user: {},
  users: [],
  room: {}, 
  rooms: [],
  messages: [],
  connectionStatus: false
})

export const mutations = {
  setSocket(state, socket) {
    state.socket = socket
  },
  setConnectionStatus(state, status) {
    state.connectionStatus = status
  },
  setUser(state, user) {
    state.user = user
  },
  setUsers(state, users) {
    state.users = users
  },
  setRoom(state, room) {
    state.room = room
  },
  setRooms(state, rooms) {
    state.rooms = rooms
  },
  setNewMessage(state, msg) {
    state.messages = msg
  },
  updateUsers(state, users) {
    state.users = users
  },
  clearRoomAndMessages(state) {
    state.messages = []
    state.room = {}
  },
  clearData(state) {
    state.user = {}
    state.users = []
    state.room = {}
    state.rooms = []
    state.messages = []
  }
}

export const actions = {
  onMessage({commit},  data) {
   commit('setNewMessage', data)
  },
  onSocket({ commit }, socket) {
    commit('setSocket', socket)
  },
  onConnectionStatus({ commit }, status) {
    commit('setConnectionStatus', status)
  },
  onUser({ commit }, val) {
    commit('setUser', val)
  },
  onUsers({ commit }, val) {
    commit('setUsers', val)
  },
  onRoom({ commit }, val) {
    commit('setRoom', val)
  },
  onRooms({ commit }, val) {
    commit('setRooms', val)
  },
  onUpdateUsers({ commit }, val) {
    commit('updateUsers', val)
  },
  onClearRoomAndMessages({ commit }) {
    commit('clearRoomAndMessages')
  },
  onClearData({ commit }) {
    commit('clearData')
  },
}

export const getters = {
  getSocket: (state) => state.socket,
  getUser: (state) => state.user,
  getUsers: (state) => state.users,
  getRoom: (state) => state.room,
  getRooms: (state) => state.rooms,
  getMessages: (state) => state.messages,
  getConnectionStatus: (state) => state.connectionStatus,
}
