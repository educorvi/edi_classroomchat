<template>
    <div id="senddiv">
        <b-form inline @submit="send">
            <b-input v-model="newMessage" placeholder="Nachricht senden"></b-input>
<!--            <b-button>Senden</b-button>-->
        </b-form>

    </div>
</template>

<script>
    export default {
        name: "chatsendBar",
        data() {
            return {
                newMessage: ""
            }
        },
        methods: {
            send(evt) {
                evt.preventDefault();
                if (this.newMessage !== "") {
                    this.$emit("send", this.newMessage);
                    this.newMessage = "";
                }

            }
        },
    }
</script>

<style scoped>
    #senddiv {
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 12px;
        background-color: white;
        height: 10vh;
    }
</style>
