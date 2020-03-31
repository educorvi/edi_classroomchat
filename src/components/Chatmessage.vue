<template>
    <div :class="isSelf?'rightDiv':'leftDiv'">
        <b-card no-body class="message">
            <b-card-header v-if="!isSelf">
                <p class="m-n2" style="font-size: small">Nutzer {{message.user}}</p>
            </b-card-header>
            <b-card-body>
                <p class="m-n2 mt-n3">{{message.text}}</p>
                <p class="mt-2 mb-n3 mr-n3 text-muted float-right">{{new Date(message.time).toLocaleTimeString()}}</p>
            </b-card-body>
        </b-card>
    </div>

</template>

<script>
    export default {
        name: "Chatmessage",
        props: {
            message: {
                type: Object,
                required: true
            },
            user: {
                type: Number,
                required: true
            }
        },
        computed: {
            isSelf() {
                return this.user === this.message.user
            }
        },
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
