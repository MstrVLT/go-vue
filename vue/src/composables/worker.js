// worker.js
import { ref, onScopeDispose, getCurrentScope } from "vue";
import GoWorker from "@/worker?worker";
import mitt from "mitt";

const resultSymbol = Symbol();
const emitter = mitt();
const worker = new GoWorker();

worker.onmessage = ({ data }) => {
  let { action, payload } = data;
  switch (action) {
    case "ready":
      console.log("we got a result: ", data);
      break;
    default:
      emitter.emit(resultSymbol, payload);
      break;
  }
};

export function useWorker() {
  const call = (action, ...payload) => worker.postMessage({ action, payload });
  const onResult = (fn) => {
    emitter.on(resultSymbol, fn);
    const offFn = () => emitter.off(fn);
    if (getCurrentScope()) {
      onScopeDispose(offFn);
      return true;
    }
    return {
      off: offFn,
    };
  };
  return { call, onResult };
}
