<template>
  <div id="app" >
    <Home></Home>
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

  export default {
    components: {Home},
    created() {

    }
  }
</script>
