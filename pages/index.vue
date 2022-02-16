<template>
  <login @login="login"/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    }),
  },

  methods: {
    login(val) {
      this.getSocket.login(val)
    },
  },
}
</script>
