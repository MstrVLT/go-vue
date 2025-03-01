// worker.js
import { ref, onScopeDispose, getCurrentScope, readonly } from "vue";
import GoWorker from "@/worker?worker";
import mitt from "mitt";
import ACTION from "@/enums/action";

const emitter = mitt();
let worker = null
const workerReady = ref(false)

const initWorker = () => {
    if (worker !== null) return
    worker = new GoWorker();
    worker.onmessage = ({ data }) => {
        let { action, id } = data;

        switch (action) {
            case ACTION.READY:
                console.log("ready", data);
                worker.postMessage({ action: ACTION.READY, id: null, method: null, payload: null });
                workerReady.value = true
                break;
            case ACTION.RESULT:
                emitter.emit(id, data);
                break;
            default:
                console.log("unknown action", action);
                break;
        }
    };
}

export function useWorker() {
    const id = crypto.randomUUID();

    const call = (method, ...payload) =>
        worker.postMessage({ action: ACTION.CALL, id, method, payload });

    const onResult = (fn) => {
        emitter.on(id, fn);
        const offFn = () => emitter.off(id, fn)
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
