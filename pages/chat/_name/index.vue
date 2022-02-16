<template>
  <chat />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getSocket: 'getSocket',
      getUser: 'getUser',
      getRooms: 'getRooms',
      getRoom: 'getRoom',
    }),
  },

  
  methods: {
    ...mapActions({
      onClient: 'onClient',
    }),
  },

}
</script>
