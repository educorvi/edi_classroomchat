<template>
  <div class="home">
      <Chat :user="user" :room="room"/>
  </div>
</template>

<script>
// @ is an alias to /src

import Chat from "@/components/Chat";
export default {
  name: 'Home',
  components: {
    Chat
  },
    data() {
        return {
            user: 12,
            room: 24
        }
    },
}
</script>
