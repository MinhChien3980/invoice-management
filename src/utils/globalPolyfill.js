// Polyfill để giải quyết lỗi "global is not defined" trong sockjs-client
if (typeof global === 'undefined') {
    window.global = window;
}

export default {}; 