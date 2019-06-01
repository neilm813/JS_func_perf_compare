const iterations = 10000;
const params = [];
const funcs = [];

// paste functions here
funcs[0] = Function;

funcs[1] = Function;

function setRuntime(cb) {

	const start = window.performance.now();

	for (let i = 0; i < iterations; i++)
		cb(...params);

	const end = window.performance.now();
	cb.runtime = Math.round(end - start);
}

setRuntime(funcs[0]);
setRuntime(funcs[1]);

const fasterFuncIdx = funcs[0].runtime < funcs[1].runtime ? 0 : 1;
const slowerFuncIdx = 1 - fasterFuncIdx;
const runtimePctDiff = Math.round(100 - (funcs[fasterFuncIdx].runtime / funcs[slowerFuncIdx].runtime) * 100);

console.table({
	[funcs[fasterFuncIdx].name]: `${funcs[fasterFuncIdx].runtime} ms`,
	[funcs[slowerFuncIdx].name]: `${funcs[slowerFuncIdx].runtime} ms`,
	[funcs[fasterFuncIdx].name + " is faster than " + funcs[slowerFuncIdx].name + " by"]: `${runtimePctDiff}%`
});