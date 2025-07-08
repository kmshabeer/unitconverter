import React, { useState } from "react";

const metrics = {
  length: ["meter", "kilometer", "mile", "yard"],
  temperature: ["celsius", "fahrenheit", "kelvin"],
};

function App() {
  const [metric, setMetric] = useState("length");
  const [fromUnit, setFromUnit] = useState(metrics["length"][0]);
  const [toUnit, setToUnit] = useState(metrics["length"][1]);
  const [value, setValue] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleMetricChange = (e) => {
    const m = e.target.value;
    setMetric(m);
    setFromUnit(metrics[m][0]);
    setToUnit(metrics[m][1]);
    setResult(null);
    setError("");
  };

  const handleConvert = async () => {
    setError("");
    setResult(null);
    try {
      const res = await fetch(
        `/api/convert?metric=${metric}&from_unit=${fromUnit}&to_unit=${toUnit}&value=${value}`
      );
      if (!res.ok) throw new Error("Conversion failed");
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Unit Converter</h2>
      <div>
        <label>Metric: </label>
        <select value={metric} onChange={handleMetricChange}>
          {Object.keys(metrics).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>From: </label>
        <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
          {metrics[metric].map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <label style={{ marginLeft: 10 }}>To: </label>
        <select value={toUnit} onChange={e => setToUnit(e.target.value)}>
          {metrics[metric].map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Value: </label>
        <input type="number" value={value} onChange={e => setValue(e.target.value)} />
      </div>
      <button style={{ marginTop: 15 }} onClick={handleConvert}>Convert</button>
      {result !== null && (
        <div style={{ marginTop: 15 }}>
          <strong>Result: {result}</strong>
        </div>
      )}
      {error && (
        <div style={{ marginTop: 15, color: "red" }}>{error}</div>
      )}
    </div>
  );
}

export default App; 