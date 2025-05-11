import React, { useState } from "react";
import "./styles.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarApp() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [editingYear, setEditingYear] = useState(false);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)

  const handleMonthChange = (e) => setMonth(parseInt(e.target.value));
  const handleYearDoubleClick = () => setEditingYear(true);
  const handleYearChange = (e) => setYear(parseInt(e.target.value));
  const handleYearBlur = () => setEditingYear(false);

  const prevMonth = () => setMonth((m) => (m === 0 ? (setYear(y => y - 1), 11) : m - 1));
  const nextMonth = () => setMonth((m) => (m === 11 ? (setYear(y => y + 1), 0) : m + 1));
  const prevYear = () => setYear((y) => y - 1);
  const nextYear = () => setYear((y) => y + 1);

  const createCalendar = () => {
    const rows = [];
    let cells = Array(startDay).fill(null);

    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(d);
      if (cells.length === 7) {
        rows.push(cells);
        cells = [];
      }
    }
    if (cells.length) rows.push(cells);

    return rows;
  };

  return (
    <div>
      <h1 style={{ color: "skyblue", textAlign: "center" }}>Calendar</h1>

      <div style={{ textAlign: "center" }}>
        <select id="month-select" value={month} onChange={handleMonthChange}>
          {months.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        {editingYear ? (
          <input
            id="year-input"
            type="number"
            value={year}
            onChange={handleYearChange}
            onBlur={handleYearBlur}
            autoFocus
          />
        ) : (
          <span id="year-text" onDoubleClick={handleYearDoubleClick}> {year} </span>
        )}
      </div>

      <hr />

      <table style={{ margin: "auto", textAlign: "center" }}>
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {createCalendar().map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td key={j}>{day || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <div style={{ textAlign: "center" }}>
        <button id="prev-year" onClick={prevYear}>&lt;&lt;</button>
        <button id="prev-month" onClick={prevMonth}>&lt;</button>
        <button id="next-month" onClick={nextMonth}>&gt;</button>
        <button id="next-year" onClick={nextYear}>&gt;&gt;</button>
      </div>
    </div>
  );
}
