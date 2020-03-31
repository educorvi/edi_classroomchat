<template>
  <div class="home">
      <Chat/>
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
        }
    },
}
</script>
