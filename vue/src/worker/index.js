// worker.js
import wasmUrl from "./main.wasm?url";
import "./wasm_exec.js";

const responsePromise = fetch(wasmUrl);
const go = new Go();
let exports;

WebAssembly.instantiateStreaming(responsePromise, go.importObject)
  .then((result) => {
    exports = result.instance.exports;
    go.run(result.instance);
    postMessage({ action: "ready", payload: null });
  })
  .catch((err) => {
    console.error("Worker failed to load module: ", err);
  });

onmessage = ({ data }) => {
  const { action, payload } = data;
  if (Object.hasOwn(exports, action)) {
	const res = exports[action]?.apply(this, payload);
	postMessage({ action, payload: res });
  }
};
