// imports python
importScripts("https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js");

async function loadPyodideAndPackages() { // loads pyodide
  self.pyodide = await loadPyodide(); // loads pyodide
  await self.pyodide.loadPackage(["numpy", "pytz"]); // waits until these python packpages are loaded to continue
}
let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (message) => { // when the worker.js receives a message...
  await pyodideReadyPromise; // GO OVER

// creates a function in python using pyodide
// pyodide.runPython runs python code and returns the value of the last expression
  const wrappedAdd = pyodide.runPython(`
  def add(a,b):
      return a + b
  `);

// calls the function so that the sum is returned
  wrappedAdd(a,b);

  try {
    let results = await self.pyodide.runPythonAsync(python); // GO OVER
    self.postMessage( results ); // waits to see if the code is completed
  } catch (error) {
    self.postMessage ({ error: error.message, id }) // sends a message to script.js if there is an error
  }
};
