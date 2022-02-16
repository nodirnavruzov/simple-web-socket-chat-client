<template>
<div>
<div class="chat">
  <header>
    <h1>LiveChat
      <div class="close" @click="closeChat"></div>
    </h1>
    <span id="status">Status: {{ getConnectionStatus ? 'Online' : 'Offline' }}</span>
    <div class="roomName">Room: {{ getRoom.name }}</div>
  </header>
  <main>
    <ul id="messages">
      <li class="notes" v-for="(message, idx) in getMessages" :key="idx">
        <span class="sender">{{message.senderName}}:</span>
        <span>{{ message.text }}</span>
      </li>
    </ul>
    <form id="form">
      <label for="message">&gt;</label>
      <input v-model="form.text" type="text" id="input" required autofocus autocomplete="off" v-on:keydown.enter.prevent="send">
    </form>
  </main>

</div>
  <div class="modal">

    <div class="modal-content">
    <div class="modal-header">
      <span class="close-btn" @click="closeModal">&times;</span>
    </div>
      <p>Do you want to leave the chat? </p>

      <div class="modal-footer">
        <div class="btns" @click="goToRooms">Rooms</div>
        <div class="btns" @click="exit">Exit</div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventBus from '~/utils/event-bus'

export default {
  data() {
    return {
      status: false,  
      form: {
        text: '',
      }
    }
  },
  mounted() {

  },
  created() {
    EventBus.$on('userLeftOrJoin', (data) => {
      this.userJoin(data)
    })
  },
  computed: {
    ...mapGetters({
      getSocket: 'getSocket',
      getUser: 'getUser',
      getRoom: 'getRoom',
      getMessages: 'getMessages',
      getConnectionStatus: 'getConnectionStatus',
    }),
  },
  methods: {
    ...mapActions({
      onClonClearRoomAndMessagesearData: 'onClearRoomAndMessages',
      onClearData: 'onClearData'
    }),
    send() {  
      this.form = {...this.form, senderId: this.getUser.id, senderName: this.getUser.name }
      this.getSocket.sendMessage({ message: this.form, roomId: this.getRoom.id})
      this.form.text = ''
    },

    closeChat() {  
      let modal = document.querySelector(".modal")
      modal.style.display = "flex"

    },
    closeModal() {
      let modal = document.querySelector(".modal")
      modal.style.display = "none"
    },
    goToRooms() {
      let modal = document.querySelector(".modal")
      modal.style.display = "none"
      this.$router.push('/rooms')
      this.onClonClearRoomAndMessagesearData()
    },
    exit() {
      let modal = document.querySelector(".modal")
      modal.style.display = "none"
      this.getSocket.exitRoom({
        roomId: this.getRoom.id,
        user: this.getUser
      })
      setTimeout(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('room')
        this.onClearData()
      }, 500)
      this.$router.push('/')
    },

    userJoin(data) {
      const messages = document.getElementById('messages');
      if (messages && data) {
        const span = document.createElement('span');
        const li = document.createElement('li');
        if (data.status === 'join') {
          li.innerHTML = `${data.user.name}`;
          span.innerHTML = ` - вошел в комнату`;
          li.classList.add("join")
        } else {
          li.innerHTML = `${data.user.name}`;
          span.innerHTML = ` - вышел из комнаты`;
          li.classList.add("left")
        }
        messages.appendChild(li);
        li.appendChild(span);
      }
    }
  },
  destroyed() {
    EventBus.$off('userLeftOrJoin', this.userJoin())
  }
}
</script>
