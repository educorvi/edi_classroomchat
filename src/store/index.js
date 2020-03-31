import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        messages: null,
        scrollWithChat: true,
        chatdata: null
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        messages: state => state.messages,
        scrollWithChat: state => state.scrollWithChat,
        user: state => state.chatdata.user,
        chatdata: state => state.chatdata,
        classlist: state => state.chatdata.classlist,
        remoteCouch: state => state.chatdata ? `https://${state.chatdata.dbuser}:${state.chatdata.dbpassword}@couch.kraeks.de/classroomchat_${state.chatdata.classroom_uid}` : null

    }
})
