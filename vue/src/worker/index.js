// worker.js
import ACTION from "@/enums/action.js";
import wasmUrl from "./main.wasm?url";
import "./wasm_exec.js";

const responsePromise = fetch(wasmUrl);
const go = new Go();
let exports;

WebAssembly.instantiateStreaming(responsePromise, go.importObject)
    .then(async ({ instance }) => {
        exports = instance.exports;
        await go.run(instance);
        postMessage({ action: ACTION.READY, id: null, method: null, payload: null });
    })
    .catch((err) => {
        console.error("Worker failed to load module: ", err);
    });

onmessage = ({ data }) => {
    const { action, id, method, payload } = data;

    switch (action) {
        case ACTION.READY:
            console.log("ready", data);
            break;
        case ACTION.CALL:
            if (Object.hasOwn(exports, method) && typeof exports[method] === 'function') {
                const res = exports[method].apply(this, payload);
                postMessage({ action: ACTION.RESULT, id, method, payload: res });
            }
            break;
        default:
            break;
    }  
};
