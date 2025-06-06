// socketManager.js
let ioInstance = null;

function setIO(io) {
    ioInstance = io;
}

function getIO() {
    if (!ioInstance) {
        throw new Error("Socket.IO chưa được khởi tạo!");
    }
    return ioInstance;
}

export { setIO, getIO };