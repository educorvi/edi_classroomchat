<template>
    <div :class="isSelf?'rightDiv':'leftDiv'" @contextmenu="handler($event)">
        <b-card no-body class="message">
            <b-card-header v-if="!isSelf">
                <p class="m-n2" style="font-size: small">{{userName}}</p>
            </b-card-header>
            <b-card-body>
                <p class="m-n2 mt-n3" v-if="!message.deleted">{{message.text}}</p>
                <p class="m-n2 mt-n3 text-muted" v-else><i>Diese Nachricht wurde gelöscht</i></p>
                <p class="mt-2 mb-n3 mr-n3 text-muted float-right">{{!isToday(new Date(message.time))?date+", ":""}} {{new Date(message.time).toLocaleTimeString()}}</p>
            </b-card-body>
        </b-card>
    </div>

</template>

<script>
    import {getUserId, deleteChat, getNameOfUser} from "@/database";

    export default {
        name: "Chatmessage",
        props: {
            message: {
                type: Object,
                required: true
            },
            user: {
                type: Object,
                required: true
            }
        },
        computed: {
            isSelf() {
                return getUserId(this.user) === this.message.user
            },
            userName() {
                return getNameOfUser(this.message.user)
            },
            date() {
                const d = new Date(this.message.time)
                const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
                const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d)
                return `${da}.${mo}.${ye}`
            }
        },
        methods: {
            handler: function (e) {
                e.preventDefault();
                if ((this.isSelf || this.user.role === "teacher") && !this.message.deleted) {
                    this.$bvModal.msgBoxConfirm(`Wollen sie die Nachricht "${this.message.text}" wirklich löschen?`, {
                        title: "Nachricht löschen?",
                        okVariant: "danger",
                        okTitle: "Löschen",
                        cancelTitle: "Abbrechen",
                        centered: true
                    }).then(value => {
                        if (value) {
                            deleteChat(this.message)
                        }
                    });
                }
            },
            isToday(someDate) {
                const today = new Date()
                return someDate.getDate() === today.getDate() &&
                    someDate.getMonth() === today.getMonth() &&
                    someDate.getFullYear() === today.getFullYear()

            }
        }
    }
</script>

<style lang="scss" scoped>
    .message {
        margin-top: 10px;
        max-width: 80%;
        width: fit-content;
    }

    .messageDivs {
        width: 100%;
        display: flex;
    }

    .leftDiv {
        @extend .messageDivs;
        justify-content: flex-start;
    }

    .rightDiv {
        @extend .messageDivs;
        justify-content: flex-end;
    }
</style>
