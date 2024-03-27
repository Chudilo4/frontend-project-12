import {useEffect} from "react";
import {SocketApi} from "../socket/soket_service";

export const useSocketConnection = () => {
    const connectSocket = () => {
        SocketApi.createConnection()
    }
    useEffect(()  => {
        connectSocket()
    }, [])
}