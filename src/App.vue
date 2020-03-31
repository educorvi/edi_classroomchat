<template>
  <div id="app" >
    <Home v-if="finished"></Home>
    <custom-spinner v-else/>
  </div>
</template>

<style>
  #app {
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 12px;
    padding-bottom: 90px;
    /*max-width: 500px;*/
  }
</style>
<script>
  import Home from "@/views/Home";
  import {mapGetters} from "vuex"
  import CustomSpinner from "@/components/CustomSpinner";
  import axios from "axios"
  import {setRemote} from "@/database";

  export default {
    components: {CustomSpinner, Home},
    created() {
        axios.get("classroomchat").then(res => {
          this.$store.state.chatdata = res.data
          setRemote()
          this.finished = true;
        })
    },
    data() {
      return {
        finished: false
      }
    },
    computed: {
      ...mapGetters(["chatdata"])
    }
  }
</script>
