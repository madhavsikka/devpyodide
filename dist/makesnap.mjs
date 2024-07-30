import { loadPyodide } from "./pyodide.mjs";
const py = await loadPyodide({});
await py.loadPackage("sqlglot")

for (let i = 0; i < 100; i++) {
    const timeStart = Date.now();
    const ret = await py.runPythonAsync(`
    import sqlglot
    from sqlglot.optimizer import optimize
    print(
    optimize(
    sqlglot.parse_one("""SELECT A FROM x WHERE Z = date '2021-01-01'"""), 
    schema={"x": {"A": "INT", "B": "INT", "C": "INT", "D": "INT", "Z": "STRING"}}
    ))
    `);
    const timeEnd = Date.now();
    console.log(timeEnd - timeStart);
}
