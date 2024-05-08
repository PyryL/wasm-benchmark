importScripts('/modules/rust_lib.js')

self.onmessage = async () => {
  if (!wasm_bindgen.__wbindgen_wasm_module) {
    await wasm_bindgen('/modules/rust_lib_bg.wasm');
  }

  const result = wasm_bindgen.fibonacci(40)
  self.postMessage({ payload: result })
}
