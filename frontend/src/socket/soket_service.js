import {io} from "socket.io-client";
import {actions} from '../slices/message_slice'
import {useDispatch} from "react-redux";

export class SocketApi {
    static socket = null

    static createConnection() {
        this.socket = io('/', )
        this.socket.on('newChannel', (payload) => {
        });
        this.socket.on('disconnect', (e) => {
            console.log('disconnect')
            console.log(e)
        })
        this.socket.on('connect', () => {
            console.log('connect')
        })
        this.socket.on('newMessage', (payload) => {
            console.log('Я начал читать сообщение')
            console.log(payload) //{ body: "new message", channelId: 7, id: 8, username: "admin" }
            console.log('Я начал записывать в хранилище')
            console.log('Я закончил читать сообщение')
        });
    }
}