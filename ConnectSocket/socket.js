import io from 'socket.io-client'

const socketUrl = "http://192.168.0.102:4000/";

export const socket = io(socketUrl);