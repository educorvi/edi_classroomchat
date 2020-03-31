<template>
    <div id="chathistory">
        <b-alert fade class="rounded-0" :show="!connected" variant="danger" id="alert">Keine Verbindung zum Internet</b-alert>
        <transition-group name="chat" @after-enter="customScroll">
            <chatmessage v-for="message in messages" :user="user"
                         :key="message.user+new Date(message.time).toISOString()" :message="message"/>
        </transition-group>
        <chatsend-bar @send="send"/>
    </div>
</template>

<script>
    import Chatmessage from "@/components/Chatmessage";
    import ChatsendBar from "@/components/chatsendBar";
    import {putMessage} from "@/database";
    import {mapGetters} from "vuex"

    export default {
        name: "Chat",
        components: {ChatsendBar, Chatmessage},
        props: {
            user: {
                type: Number,
                required: true
            },
            room: {
                type: Number,
                required: true
            }
        },
        computed: {
            ...mapGetters(["messages"])
        },
        mounted() {
            console.log(this.messages);
            window.addEventListener('online', () => {
                this.connected = true;
            });

            window.addEventListener('offline', () => {
                this.connected = false;
            });
        },
        methods: {
            send(p) {
                putMessage({
                    user: this.user,
                    text: p,
                    time: new Date()
                })
            },
            customScroll() {
                window.scrollTo(0, document.getElementById("chathistory").scrollHeight);
            }
        },
        data() {
            return {
                connected: true
            }
        },
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

    #alert {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 4000;
    }
</style>
