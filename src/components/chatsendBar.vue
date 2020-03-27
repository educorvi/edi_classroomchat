<template>
    <div id="senddiv">
        <b-form inline @submit="send">
            <b-row style="width: 100%">
                <b-col cols="8">
                    <b-input v-model="newMessage" placeholder="Nachricht senden" style="width: 100%"></b-input>
                </b-col>
                <b-col cols="4">
                    <b-button type="submit" variant="primary" style="width: 100%"><b-icon-cursor/></b-button>
                </b-col>
            </b-row>
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
        /*display: flex;*/
        /*justify-content: space-between;*/
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 12px;
        background-color: white;
        height: 10vh;
    }
</style>
