import React, { useState } from "react";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [fare, setFare] = useState(null);
  const [remaining, setRemaining] = useState(null);

  const searchBus = async () => {
    if (!from || !to) {
      alert("Please select From and To locations");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/searchBus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          seatsBooked: Number(seatsBooked),
        }),
      });

      const data = await response.json();

      if (data.message) {
        alert(data.message);
      } else {
        setFare(data.finalFare);
        setRemaining(data.seatsRemaining);
      }
    } catch (error) {
      alert("Backend server is not running!");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #43cea2, #185a9d)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          width: "380px",
          textAlign: "center",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/61/61231.png"
          alt="Bus"
          width="80"
        />

        <h2 style={{ marginTop: "10px" }}>
          Dynamic Bus Ticket Booking
        </h2>

        <label><b>From</b></label><br />
        <select
          onChange={(e) => setFrom(e.target.value)}
          style={{ width: "80%", padding: "6px" }}
        >
          <option value="">Select</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Chennai</option>
        </select>
        <br /><br />

        <label><b>To</b></label><br />
        <select
          onChange={(e) => setTo(e.target.value)}
          style={{ width: "80%", padding: "6px" }}
        >
          <option value="">Select</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Chennai</option>
        </select>
        <br /><br />

        <label><b>Seats Booked</b></label><br />
        <input
          type="number"
          min="1"
          max="30"
          value={seatsBooked}
          onChange={(e) => setSeatsBooked(e.target.value)}
          style={{ width: "80%", padding: "6px" }}
        />
        <br /><br />

        <button
          onClick={searchBus}
          style={{
            padding: "10px 20px",
            background: "#185a9d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Check Fare
        </button>

        {fare !== null && (
          <div style={{ marginTop: "20px" }}>
            <h3>Final Fare: ₹{fare}</h3>
            <p><b>Seats Remaining:</b> {remaining}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
