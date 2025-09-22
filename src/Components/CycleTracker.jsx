import React, { useState, useEffect } from "react";

const CycleTracker = () => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodDuration, setPeriodDuration] = useState("3");

  const [nextPeriod, setNextPeriod] = useState("");
  const [fertilityWindow, setFertilityWindow] = useState("");
  const [pmsAlert, setPmsAlert] = useState("");

  // Add days to date helper
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Format date as "Month Day, Year"
  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return "";
    return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  const updateCycle = () => {
    if (!lastPeriod) {
      alert("Please select your last period date.");
      return;
    }

    const lastDate = new Date(lastPeriod);
    if (isNaN(lastDate)) {
      alert("Invalid date.");
      return;
    }

    const cycle = parseInt(cycleLength);
    const nextPeriodDate = addDays(lastDate, cycle);
    const fertilityStart = addDays(nextPeriodDate, -14);
    const fertilityEnd = addDays(fertilityStart, 4);
    const pmsDate = addDays(nextPeriodDate, -3);

    setNextPeriod(formatDate(nextPeriodDate));
    setFertilityWindow(`${formatDate(fertilityStart)} - ${formatDate(fertilityEnd)}`);
    setPmsAlert(formatDate(pmsDate));
  };

  return (
    <div className="track-container">
    <div id="tracker" className="section">
      <h2 className="track-heading">📅 Cycle Tracker</h2>

      <div className="form-group">
        <label className="track" htmlFor="lastPeriod">Last Period Date:</label>
        <input
          type="date"
          id="lastPeriod"
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cycleLength">Average Cycle Length:</label>
        <select
          id="cycleLength"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
        >
          <option value="21">21 days</option>
          <option value="24">24 days</option>
          <option value="28">28 days</option>
          <option value="30">30 days</option>
          <option value="32">32 days</option>
          <option value="35">35 days</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="periodDuration">Period Duration:</label>
        <select
          id="periodDuration"
          value={periodDuration}
          onChange={(e) => setPeriodDuration(e.target.value)}
        >
          <option value="3">3 days</option>
          <option value="4">4 days</option>
          <option value="5">5 days</option>
          <option value="6">6 days</option>
          <option value="7">7 days</option>
        </select>
      </div>

      <button className="btn" onClick={updateCycle}>Update Cycle Info 💖</button>

      {(nextPeriod || fertilityWindow || pmsAlert) && (
        <div className="cycle-info">
          <h3>📊 Your Cycle Predictions</h3>
          <p><strong>Next Period:</strong> {nextPeriod}</p>
          <p><strong>Fertility Window:</strong> {fertilityWindow}</p>
          <p><strong>PMS Alert:</strong> {pmsAlert}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default CycleTracker;
