<template>
    <div id="chathistory" v-show="first || first === 0">
        <div class="sticky">
            <b-alert fade class="rounded-0 customalert" :show="!connected" variant="danger" id="alert">Keine Verbindung
                zum Internet. Nachrichten können nicht gesendet werden
            </b-alert>
            <b-alert fade dismissible class="rounded-0 customalert" show="true" variant="primary">{{user.role === "teacher"? "Durch einen Rechtsklick auf eine Nachricht (bzw. an Touchgeräten durch Gedrückthalten der Nachricht) können Sie diese aus dem Chat löschen":"Durch einen Rechtsklick auf eine Ihrer Nachrichten (bzw. an Touchgeräten durch Gedrückthalten der Nachricht) können Sie diese aus dem Chat löschen"}}</b-alert>
        </div>
        <div id="overflow" class="customscroll">
            <b-button v-if="first>0" @click="revealOlder" style="width: 100%">Ältere Nachrichten</b-button>
            <transition-group name="chat" @after-enter="customScroll">
                <chatmessage :id="message._id" v-for="message in shortendMessages" :user="user"
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
                document.getElementById("overflow").scrollTo(0, document.getElementById("chathistory").scrollHeight*4);
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
                // eslint-disable-next-line no-constant-condition
                if (this.reveal === 0 && this.messages.length > 7) {

                    // document.getElementById("overflow").scrollTo({
                    //     top: 99999999999999999999999999999,
                    //     behavior: "smooth"
                    // });
                    document.getElementById(this.shortendMessages[this.shortendMessages.length - 1]._id).scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                } else {
                    this.reveal--;
                }
            },
            revealOlder() {
                const scrollTo = this.shortendMessages[0]._id;
                this.$store.state.scrollWithChat = false;
                this.reveal = this.first < 50 ? this.first : 50;
                this.first = this.first < 50 ? 0 : this.first - 50;
                document.getElementById(scrollTo).scrollIntoView({block: "start"});
            }
        },
        data() {
            return {
                connected: true,
                first: null,
                reveal: 0
            }
        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            scrollWithChat: (newValue) => {
                // eslint-disable-next-line no-constant-condition
                if (false) {
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
        padding: 10px;
    }

    .customscroll::-webkit-scrollbar-track {
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
        border-radius: 0;
        background-color: rgba(245, 245, 245, 0);
    }
    .customscroll::-webkit-scrollbar {
        width: 5px;
        background-color: #F5F5F5;
    }
    .customscroll::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #007bff;
    }
</style>
