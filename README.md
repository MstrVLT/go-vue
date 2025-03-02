GOOS=js GOARCH=wasm go build -o main.wasm

wasm_exec.js located in GOROOT lib/wasm/wasm_exec.js


live example with webworker: [surge.sh](https://tolantop.surge.sh/)

live example without webworker: [surge.sh](https://eatable-trains.surge.sh/) 

Just wait until the webassembly messages from main fn start appearing in the console, and try reloading the page )


https://vite.dev/guide/features.html#import-with-query-suffixes

https://vite.dev/guide/features.html#accessing-the-webassembly-module

https://vueuse.org/shared/createEventHook/
