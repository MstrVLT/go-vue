// worker.js
import wasmUrl from "./main.wasm?url";
import "./wasm_exec.js";

const responsePromise = fetch(wasmUrl);
const go = new Go();
let exports;

WebAssembly.instantiateStreaming(responsePromise, go.importObject)
    .then(async (result) => {
        exports = result.instance.exports;
        await go.run(result.instance);
        postMessage({ action: "ready", method: null, payload: null });
    })
    .catch((err) => {
        console.error("Worker failed to load module: ", err);
    });

onmessage = ({ data }) => {
    const { action, method, payload } = data;
    switch (action) {
        case "call":
            if (Object.hasOwn(exports, method)) {
                const res = exports[method]?.apply(this, payload);
                postMessage({ action: "result", method, payload: res });
            }
            break;
        case "ready":
            console.log("ready", data);
            break;
        default:
            console.log("unknown action", action);
    }
};
