// imports pyodide library
importScripts("https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js");

async function loadPyodideAndPackages() { // loads pyodide
  self.pyodide = await loadPyodide(); // run the function and wait for the result (base library)
  await self.pyodide.loadPackage(["numpy", "pytz"]); // waits until these python packpages are loaded to continue
}
let pyodideReadyPromise = loadPyodideAndPackages(); // run the functions stored in lines 4

self.onmessage = async (message) => { // when the worker.js receives a message...
  await pyodideReadyPromise; // waits for loadPyodideAndPackages to load and run. for the second time it doesn't take anytime

// creates a function in python using pyodide
// pyodide.runPython runs python code and returns the value of the last expression
// pyodide.runPython is a syncronous function (returns when its finished automatically)
  const wrappedAdd = pyodide.runPython(`
  def add(a,b):
      return a + b
  `);

  try {
    let results = wrappedAdd(message[0], message[1]); // calls the function so that the sum is returned
    self.postMessage(results); // waits to see if the code is completed
  } catch (error) {
    self.postMessage ({ error: error.message, id }) // sends a message to script.js if there is an error
  }
};
