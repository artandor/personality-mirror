// lib/init-resvg.js
import { initWasm } from "@resvg/resvg-wasm";
import { readFile } from "fs/promises";

let initialized = false;

export async function ensureResvgInitialized() {
  if (!initialized) {
    const wasmBuffer = await readFile(`${process.cwd()}/public/resvg.wasm`);
    await initWasm(wasmBuffer);
    initialized = true;
  }
}
