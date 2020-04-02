<template>
    <div id="chathistory" v-show="first || first === 0">
        <div class="sticky">
            <b-alert fade class="rounded-0 customalert" :show="!connected" variant="danger" id="alert">Keine Verbindung
                zum Internet. Nachrichten können nicht gesendet werden
            </b-alert>
            <b-alert fade dismissible class="rounded-0 customalert" show="true" variant="primary">{{user.role === "teacher"? "Durch einen Rechtsklick auf eine Nachricht (bzw. an Touchgeräten durch Gedrückthalten der Nachricht) können Sie diese aus dem Chat löschen":"Durch einen Rechtsklick auf eine Ihrer Nachrichten (bzw. an Touchgeräten durch Gedrückthalten der Nachricht) können Sie diese aus dem Chat löschen"}}</b-alert>
        </div>
        <b-button v-if="first>0" @click="revealOlder" style="width: 100%">Ältere Nachrichten</b-button>
        <div id="overflow">
            <transition-group name="chat" @after-enter="customScroll">
                <chatmessage v-for="message in shortendMessages" :user="user"
                             :key="message.user+new Date(message.time).toISOString()" :message="message"/>
            </transition-group>
        </div>
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
            let lastScrollTop = 0;
            document.getElementById("overflow").onscroll = function (evt) {
                let st = document.getElementById("overflow").scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
                if (st <= lastScrollTop) {
                    evt.preventDefault()
                    store.state.scrollWithChat = false;
                } else {
                    store.state.scrollWithChat = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight;
                }
                lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
            };
        },
        created() {
            getAllMessages().then(() => {
                this.first = this.messages.length - Math.min(this.messages.length, 50);
                document.getElementById("overflow").scrollTo(0, document.getElementById("chathistory").scrollHeight);
                document.getElementById("senddiv").scrollIntoView({behavior: "smooth", block: "end"});
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
                    document.getElementById("overflow").scrollTo({
                        top: document.getElementById("chathistory").scrollHeight*2,
                        left: 0,
                        behavior: "smooth"
                    });
                }
            },
            revealOlder() {
                this.$store.state.scrollWithChat = false;
                this.first = this.first < 50 ? 0 : this.first - 50;
            }
        },
        data() {
            return {
                connected: true,
                first: null,
            }
        },
        watch: {
            scrollWithChat: (newValue) => {
                if (newValue) {
                    document.getElementById("overflow").scrollTo({
                        top: document.getElementById("chathistory").scrollHeight,
                        left: 0,
                        behavior: "smooth"
                    });
                }
            }
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
        max-width: 800px;
    }

    .sticky {
        position: sticky;
        top: 12px;
        left: 0;
        z-index: 4000;
    }

    .customalert {
        width: 100%;
    }

    #overflow {
        overflow-y: scroll;
        height: 70vh;
    }
</style>
