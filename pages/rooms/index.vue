<template>
  <div>
    <div style="font-size: 25px; margin-top: 10px;" v-if="getRooms.length">Select Room
      <ul v-for="room in getRooms" :key="room.id">
        <li @click="join(room)">{{ room.name }}</li>
      </ul>
    </div>
    <div style="font-size: 25px; margin-top: 10px;" @click="$router.push('/create-room')">Create Room
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getRooms: 'getRooms',
      getUser: 'getUser',
      getSocket: 'getSocket',
    }),
  },
  methods: {
    ...mapActions({
    }),
    join(room) {
      this.getSocket.joinToRoom({
        user: this.getUser,
        room,
      })
    },
  }
}
</script>