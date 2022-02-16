<template>
  <div>
    <Nuxt/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ChatConnection from '@/components/ChatConnection'
import EventBus from '~/utils/event-bus'
export default {
  head: {
    title: "Live Chat"
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getSocket: 'getSocket',
      getRoom: 'getRoom',
      getUser: 'getUser'
    }),
  },

  async mounted() {
    this.onSocket(new ChatConnection())
    await this.getSocket.connect()
    this.initListeners()
    const user = JSON.parse(localStorage.getItem('user') ) 
    const room = JSON.parse(localStorage.getItem('room') ) 
    if (user) {
      if (this.$router.currentRoute.path === '/') {
        this.$router.push('/rooms')
      } else  if (this.$router.currentRoute.path === '/rooms') {
        this.$router.push(this.$router.currentRoute.path)
      } else {
        this.$router.push('/rooms')
      }
      this.getSocket.exitRoom({
        roomId: room.id,
        user
      })
      this.getSocket.reLogin(user)
    }
  },  
  methods: {
    ...mapActions({
      onUser: 'onUser',
      onRooms: 'onRooms',
      onSocket: 'onSocket',
      onRoom: 'onRoom',
      onMessage: 'onMessage',
      onConnectionStatus: 'onConnectionStatus',
    }),
    
    onLogin(data) {
      this.onUser(data.user)
      this.onRooms(data.rooms)
      this.$router.push('/rooms')
      localStorage.setItem('user', JSON.stringify(data.user))

    },
    onReLogin(data) {
      console.log('onReLogin', data)

      this.onUser(data.user)
      this.onRooms(data.rooms)
      localStorage.setItem('user', JSON.stringify(data.user))
      if (this.$router.currentRoute.path === '/') {
        this.$router.push('/rooms')
      } else  if (this.$router.currentRoute.path === '/rooms') {
        this.$router.push(this.$router.currentRoute.path)
      } else {
        this.$router.push('/rooms')
      }
    },
    onCreateRoom(data) {
      localStorage.setItem('room', JSON.stringify(data))

      this.onRoom(data)
      this.$router.push(`/chat/${data.name}`)
    },
    onJoinRoom(data) {
      console.log('onJoinRoom', data)
      if (data.user.id === this.getUser.id) {
        this.onMessage(data.room.messages)
      }
      this.onRoom(data.room)
      localStorage.setItem('room', JSON.stringify(data.room))
      this.$router.push(`/chat/${data.room.name}`)
      EventBus.$emit('userLeftOrJoin', {...data, status: 'join'})
    },
    onUserLeft(data) {
      EventBus.$emit('userLeftOrJoin', {user: data, status: 'left'})
    },
    onAddMessage(data) {
      this.onMessage(data)
    },
    onRoomList(data) {
      this.onRooms(data.rooms)
    },
    connectionStatus(data) {
      this.onConnectionStatus(data)
    },
    initListeners() {
      if (this.getSocket)
        this.getSocket.connectionStatus = this.connectionStatus
        this.getSocket.onAddMessage = this.onAddMessage
        this.getSocket.onLogin = this.onLogin
        this.getSocket.onCreateRoom = this.onCreateRoom
        this.getSocket.onJoinRoom = this.onJoinRoom
        this.getSocket.onUserLeft = this.onUserLeft
        this.getSocket.onRoomList = this.onRoomList
        this.getSocket.onReLogin = this.onReLogin

    }
  },
  // beforeDestroy() {
  //   const room = JSON.parse(localStorage.getItem('room') || this.getRoom)
  //   const user = JSON.parse(localStorage.getItem('user') || this.getUser)
  //   if (room && user) {
  //     this.getSocket.exitRoom({
  //       roomId: room.id,
  //       user: user
  //     })
  //   }

  // }
}
</script>
