<template>
    <div id="chathistory" v-show="first || first === 0">
        <b-alert fade class="rounded-0 customalert" :show="!connected" variant="danger" id="alert">Keine Verbindung zum Internet
        </b-alert>
        <b-alert fade dismissible class="rounded-0 customalert" show="true" variant="primary">{{user.role === "teacher"? "Durch einen Rechtsklick auf eine Nachricht (bzw. an Touchgeräten durch Gedrückthalten der Nachricht) können Sie diese aus dem Chat löschen":"Durch einen Rechtsklick auf eine Ihrer Nachrichten (bzw. an Touchgeräten durch Gedrückthalten der Nachricht) können Sie diese aus dem Chat löschen"}}</b-alert>
        <b-button v-if="first>0" @click="revealOlder" style="width: 100%">Ältere Nachrichten</b-button>
        <transition-group name="chat" @after-enter="customScroll">
            <chatmessage v-for="message in shortendMessages" :user="user"
                         :key="message.user+new Date(message.time).toISOString()" :message="message"/>
        </transition-group>
        <chatsend-bar @send="send"/>
    </div>
</template>

<script>
    import Chatmessage from "@/components/Chatmessage";
    import ChatsendBar from "@/components/chatsendBar";
    import {putMessage, getAllMessages, getUserId} from "@/database";
    import {mapGetters} from "vuex"
    import store from "@/store/index"

    export default {
        name: "Chat",
        components: {ChatsendBar, Chatmessage},

        computed: {
            ...mapGetters(["messages", "scrollWithChat", "user"]),
            shortendMessages() {
                return this.messages ? this.messages.slice(this.first, this.messages.length) : []
            }
        },
        mounted() {
            window.addEventListener('online', () => {
                this.connected = true;
            });

            window.addEventListener('offline', () => {
                this.connected = false;
            });
            window.onscroll = function () {
                store.state.scrollWithChat = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight;
            };
        },
        created() {
            getAllMessages().then(() => {
                this.first = this.messages.length - Math.min(this.messages.length, 50);
                window.scrollTo(0, document.getElementById("chathistory").scrollHeight);
            });
        },
        methods: {
            send(p) {
                putMessage({
                    user: getUserId(this.user),
                    text: p,
                    time: new Date()
                })
            },
            customScroll() {
                if (this.scrollWithChat) {
                    window.scrollTo(0, document.getElementById("chathistory").scrollHeight);
                }
            },
            revealOlder() {
                this.$store.state.scrollWithChat = false;
                this.first = this.first < 50 ? 0 : this.first - 50;
            },
        },
        data() {
            return {
                connected: true,
                first: null,
            }
        },
        watch: {
            scrollWithChat: () => window.scrollTo(0, document.getElementById("chathistory").scrollHeight)
        }

    }
</script>

<style scoped>
    .chat-enter-active, .chat-leave-active {
        transition: all 0.15s;
    }

    .chat-enter, .chat-leave-to /* .chat-leave-active below version 2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }

    #chathistory {
        /*max-width: 500px;*/
    }

    .customalert {
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 4000;
    }
</style>
