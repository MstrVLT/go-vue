// worker.js
import { ref, onScopeDispose, getCurrentScope, readonly } from "vue";
import GoWorker from "@/worker?worker";
import mitt from "mitt";

const resultSymbol = Symbol();
const emitter = mitt();
let worker = null
const workerReady = ref(false)

const initWorker = () => {
    if (worker !== null) return
    worker = new GoWorker();
    worker.onmessage = ({ data }) => {
        let { action, method: _, payload } = data;
        switch (action) {
            case "ready":
                console.log("ready", data);
                worker.postMessage({ action: "ready", method: null, payload: null });
                workerReady.value = true
                break;
            case "result":
                emitter.emit(resultSymbol, payload);
                break;
            default:
                console.log("unknown action", action);
                break;
        }
    };
}

export function useWorker() {
    const call = (method, ...payload) =>
        worker.postMessage({ action: "call", method, payload });
    const onResult = (fn) => {
        emitter.on(resultSymbol, fn);
        const offFn = () => emitter.off(resultSymbol, fn)
        if (getCurrentScope()) {
            onScopeDispose(offFn);
        }
        return {
            off: offFn,
        };
    };

    initWorker()
    return { ready: readonly(workerReady), call, onResult };
}
