const funcs = [];

// small differences may become larger with more iterations, this can somewhat offset
// not having large data for args. Too many iterations can crash browser.
const iterations = 1000;

// args to pass to both functions, if possible, generate large data with a loop
const args = [];

// paste functions here then open index.html, open console
funcs[0] = Function;

funcs[1] = Function;

function setRuntime(cb) {
  const start = window.performance.now();

  for (let i = 0; i < iterations; i++) {
    cb(...args);
  }

  const end = window.performance.now();
  cb.runtime = Math.round(end - start);
}

setRuntime(funcs[0]);
setRuntime(funcs[1]);

const fasterFuncIdx = funcs[0].runtime < funcs[1].runtime ? 0 : 1;
const fasterFuncName = funcs[fasterFuncIdx].name || fasterFuncIdx;
const slowerFuncIdx = 1 - fasterFuncIdx;
const slowerFuncName = funcs[slowerFuncIdx].name || slowerFuncIdx;
const runtimePctDiff = Math.round(
  100 - (funcs[fasterFuncIdx].runtime / funcs[slowerFuncIdx].runtime) * 100
);

console.table({
  [fasterFuncName]: `${funcs[fasterFuncIdx].runtime} ms`,
  [slowerFuncName]: `${funcs[slowerFuncIdx].runtime} ms`,
  [`${fasterFuncName} is faster than ${slowerFuncName} by`]: `${runtimePctDiff}%`,
});
