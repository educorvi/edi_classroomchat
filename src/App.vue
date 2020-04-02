<template>
  <div id="app" v-if="!error">
    <Home v-if="finished"></Home>
    <custom-spinner v-else/>
  </div>
  <div v-else>
    <h2 style="color: red">Es gab einen Fehler beim Abrufen der Chatdaten:</h2>
    <h6 style="color: red"> {{error}}</h6>
  </div>
</template>

<style>
  #app {
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 12px;
    padding-bottom: 90px;
    display: flex;
    justify-content: center;
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
      const session=this.getCookie("beaker.session");
      console.log(session);
        axios.get(`../classroomchat`, {withCredentials: true}).then(res => {
          if (res.data.error) {
            this.error = res.data.error;
          } else {
            this.$store.state.chatdata = res.data;
            setRemote()
            this.finished = true;
          }

        })
    },
    data() {
      return {
        finished: false,
        error: false
      }
    },
    methods: {
      getCookie(name) {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          cookie = cookie.split("=");
          if (cookie[0] === name) {
            return cookie[1]
          }
        }
        return null;
      }
    },
    computed: {
      ...mapGetters(["chatdata"])
    }
  }
</script>
