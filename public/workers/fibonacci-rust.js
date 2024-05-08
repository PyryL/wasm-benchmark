importScripts('/modules/rust_lib.js')

self.onmessage = async () => {
  if (!wasm_bindgen.__wbindgen_wasm_module) {
    await wasm_bindgen('/modules/rust_lib_bg.wasm');
  }

  const t0 = performance.now()
  const result = wasm_bindgen.fibonacci(40)
  const t1 = performance.now()
  self.postMessage({
    result,
    time: t1 - t0,
  })
}
