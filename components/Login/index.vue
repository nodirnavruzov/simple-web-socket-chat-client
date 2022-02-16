<template>
  <div class="login">
    <form action="">
       <input type="text" v-model="form.name" name="username" placeholder="Your name"  v-on:keydown.enter.prevent="join" >
    </form>
    <div class="join-btn">
      <div class="button" @click="join" v-if="showBtn">
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

export default {
  data() {
    return {
      form: {
        name: ''
      },
    }
  },
  mounted() {
  },
  computed: {
    showBtn() {
      if( this.form.name.length > 3) {
        return true
      }
    }
  },
  methods: {
    join() {
      this.$emit('login', this.form)
    },

  },
}
</script>
