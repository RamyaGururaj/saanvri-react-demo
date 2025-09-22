import React, { useState, useEffect } from "react";
import dayjs from 'dayjs';

export default function Dashboard() {
    const [currentDay, setCurrentDay] = useState(1);

    useEffect(() => {
        const startDate = dayjs("2025-01-01");
        
        const updateDay = () => {
            const today = dayjs();
            const daysDiff = today.diff(startDate, 'day') + 1;
            
            // Reset cycle every 28 days (typical cycle length)
            const cycleDay = ((daysDiff - 1) % 28) + 1;
            setCurrentDay(cycleDay);
        };

        // Update immediately
        updateDay();

        // Update every day at midnight (86400000 ms = 24 hours)
        const interval = setInterval(updateDay, 86400000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="track-container">
            <div id="dashboard" className="section active">
                <div className="knowledge-card">
                    <h3>💡 Daily Period Wisdom</h3>
                    <p id="daily-fact">
                        Did you know? Period cramps are like tiny uterine crunches. Respect
                        the hustle 💪
                    </p>
                </div>

                <div className="dashboard-grid">
                    <div className="card">
                        <h3>🌙 Cycle Status</h3>
                        <div className="cycle-tracker">
                            <div className="cycle-day">Day {currentDay}</div>
                            <p>Ovulation phase - You're glowing today! ✨</p>
                        </div>
                    </div>

                    <div className="card">
                        <h3>💌 Today's Mood Boost</h3>
                        <p
                            style={{
                                fontStyle: "italic",
                                color: "#7b1fa2",
                                fontSize: "1.1em",
                            }}
                        >
                            "Your hormones may be wild, but your smile's still the best thing
                            about today 🌸"
                        </p>
                    </div>

                    <div className="card">
                        <h3>🩲 Pad Stock Alert</h3>
                        <p>Your cotton army is running strong! 💪</p>
                        <p style={{ fontSize: "0.9em", color: "#999" }}>
                            Next period in {28 - currentDay} days
                        </p>
                    </div>

                    <div className="card">
                        <h3>🍎 Today's Wellness Tip</h3>
                        <p>
                            Follicular phase = glow time! Try a hydrating face mask and drink
                            lots of water 💧
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
