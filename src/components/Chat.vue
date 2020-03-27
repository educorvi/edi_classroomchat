<template>
    <div id="chathistory">
            <transition-group name="chat" @after-enter="customScroll">
                <chatmessage v-for="message in messages" :user="user" :key="message.user+message.time.toISOString()" :message="message"/>
            </transition-group>
        <chatsend-bar @send="send"/>
    </div>
</template>

<script>
    import Chatmessage from "@/components/Chatmessage";
    import ChatsendBar from "@/components/chatsendBar";

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
        methods: {
            send(p) {
                this.messages.push({
                    user: this.user,
                    text: p,
                    time: new Date()
                });
            },
            customScroll() {
                window.scrollTo(0, document.getElementById("chathistory").scrollHeight);
            }
        },
        data() {
            return {
                messages: [
                    {
                        user: 14,
                        text: "Hallo du Troller",
                        time: new Date()
                    },
                    {
                        user: 12,
                        text: "Hallöchen",
                        time: new Date()
                    },
                    {
                        user: 12,
                        text: "Aloa",
                        time: new Date()
                    },
                    {
                        user: 13,
                        text: "Servus",
                        time: new Date()
                    }
                ]
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
</style>
