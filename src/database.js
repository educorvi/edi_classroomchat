/* eslint-disable no-unused-vars */
import PouchDB from "pouchdb";
// import pdau from "pouchdb-authentication"
import store from "./store/index"

// PouchDB.plugin(pdau);

const local = new PouchDB('chatcouch');
const remoteCouch = new PouchDB("http://chatgrabber:ABCCBA77145@astra2441.server4you.de:5984/chatroom_1");
// const remoteCouch = "http://astra2441.server4you.de:5984/chatroom_1";
// const remote = new PouchDB(remoteCouch);
// remote.logIn('chatgrabber', 'ABCCBA77145').then(function (batman) {
//     console.log("I'm Batman.");
// });


local.changes({
    since: 'now',
    live: true
}).on('change', getAllMessages);


function sync() {
    local.sync(remoteCouch, {
        live: true,
        retry: true
    }).on('error', function (err) {
        log("Failed to sync Database", "#ff0000")
    });
    log("Syncing Database", "#32bd04");
}

if (remoteCouch) {
    sync()
}
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
    local.put({
        ...message,
        "_id": message.time.toISOString()+message.user
    })
}

export function getAllMessages() {
    return local.allDocs({
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




function log(text, bg) {
    setTimeout(console.log.bind(console, `%c${text}`, `background: ${bg};color:#FFF;padding-left:5px;padding-right:5px;border-radius: 5px;line-height: 26px;`));
}
