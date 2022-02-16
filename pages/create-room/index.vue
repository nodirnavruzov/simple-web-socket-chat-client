<template>
  <div class="login">
    <form action="">
       <input type="text" v-model="room.name" name="username" placeholder="Room name"  v-on:keydown.enter.prevent="createRoom" >
    </form>
    <div class="join-btn">
      <div class="button" @click="createRoom" v-if="showBtn">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Join To Chat
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      room: {
        name: ''
      },
    }
  },
  mounted() {
    // this.initListeners()
  },
  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getSocket: 'getSocket'
    }),
    showBtn() {
      if(this.room > 2) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      onRoom: 'onRoom'
    }),
    createRoom() {
      this.getSocket.createRoom({
        user: this.getUser,
        room: this.room
      })
    },
  },
}
</script>
