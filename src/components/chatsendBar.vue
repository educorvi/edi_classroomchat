<template>
    <div id="senddiv">
        <b-form inline @submit="send" autocomplete="off">
<!--            <b-checkbox class="mt-n1" switch v-model="$store.state.scrollWithChat">Scrolle automatisch mit dem Chat</b-checkbox>-->
            <b-row align-v="center" style="width: 100%">
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
        created() {

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
        width: 100%;
        padding: 12px 12px 30px;
        background-color: white;
        height: 80px;
        max-width: 900px;
    }
</style>
