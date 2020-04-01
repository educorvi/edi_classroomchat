/* eslint-disable no-unused-vars */
import PouchDB from "pouchdb";
// import pdau from "pouchdb-authentication"
import store from "./store/index"

// PouchDB.plugin(pdau);

// const local = new PouchDB('chatcouch');
// const remoteCouch = new PouchDB("https://chatgrabber:ABCCBA77145@couch.kraeks.de/chatroom_1");
let remoteCouch;
// const remoteCouch = "http://astra2441.server4you.de:5984/chatroom_1";
// const remote = new PouchDB(remoteCouch);
// remote.logIn('chatgrabber', 'ABCCBA77145').then(function (batman) {
//     console.log("I'm Batman.");
// });

export function setRemote() {
   remoteCouch = new PouchDB(store.getters.remoteCouch)
    remoteCouch.changes({
        since: 'now',
        live: true
    }).on('change', getAllMessages);
}


// function sync() {
//     local.sync(remoteCouch, {
//         live: true,
//         retry: true
//     }).on('error', function (err) {
//         log("Failed to sync Database", "#ff0000")
//     });
//     log("Syncing Database", "#32bd04");
// }
//
// if (remoteCouch) {
//     sync()
// }
// const sync = PouchDB.sync(local, remoteCouch, {
//     live: true,
//     // retry: true
// })

function syncErrorTo(err) {
    log("Failed to sync to Database", "#ff0000")
}

function syncErrorFrom(err) {
    log("Failed to sync from Database", "#ff0000")
}


export function putMessage(message) {
    remoteCouch.put({
        ...message,
        "_id": message.time.toISOString()+message.user
    })
}

export function getAllMessages() {
    return remoteCouch.allDocs({
        include_docs: true,
        attachments: true
    }).then(res => {
        let result = [];
        for (const row of res.rows) {
            result.push(row.doc)
        }
        store.state.messages = result
    })

}

export function getUserId({name, pin}) {
    return name + "_" + pin;
}

export function getNameOfUser(user) {
    const classlist = store.getters.classlist;
    // const search = getUserId(user);
    const item = classlist.filter(listitem => getUserId(listitem) === user)[0];
    return item?item.name:"Unbekannt";
}

export function areUsersEqual(user1, user2) {
    return getUserId(user1) === getUserId(user2)
}

export function deleteChat(message) {
    putMessage({
        ...message,
        deleted: true,
        time: new Date(message.time)
    })
}


function log(text, bg) {
    setTimeout(console.log.bind(console, `%c${text}`, `background: ${bg};color:#FFF;padding-left:5px;padding-right:5px;border-radius: 5px;line-height: 26px;`));
}
