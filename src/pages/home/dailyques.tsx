import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dailyques.css";

export function DailyQues({ isPopup }: { isPopup?: boolean }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cry_today: "",
    panic_attack: "",
    happy_today: "",
    argue_anyone: "",
    mood_today: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  // Check if the user has already filled the form for the day
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString(); // Get current date (e.g., "9/19/2024")
    const completedDate = localStorage.getItem("formCompletedDate");

    // If the form was completed today, don't show it
    if (completedDate === currentDate) {
      setIsFormCompleted(true);
    } else {
      checkTime(); // Check if it's after 8 PM
    }
  }, []);

  // Function to check if it's after 8 PM
  const checkTime = () => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 20) {
      setIsFormVisible(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Save the form data (optional)
    localStorage.setItem("classifyFormData", JSON.stringify(formData));

    // Mark the form as completed for the day
    const currentDate = new Date().toLocaleDateString();
    localStorage.setItem("formCompletedDate", currentDate);

    // Hide the form and mark as completed
    setIsFormCompleted(true);
    setIsFormVisible(false);

    // Optionally navigate to a different page
    navigate("/login");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={isPopup ? "popup" : "questions"}>
      {!isPopup ? <h1>Daily Questions</h1> : <></>}
      {/* Show form only if it's after 8 PM and not completed */}
      {isFormVisible && !isFormCompleted ? (
        <form onSubmit={handleSubmit} style={{ padding: "10px 30px" }}>
          <label>Did you cry today?</label>
          <br />
          <label>
            <input
              type="radio"
              name="cry_today"
              value="YES"
              checked={formData.cry_today === "YES"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="cry_today"
              value="NO"
              checked={formData.cry_today === "NO"}
              onChange={handleChange}
            />
            No
          </label>
          <br />
          <label>Did you have a panic attack today?</label>
          <br />
          <label>
            <input
              type="radio"
              name="panic_attack"
              value="YES"
              checked={formData.panic_attack === "YES"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="panic_attack"
              value="NO"
              checked={formData.panic_attack === "NO"}
              onChange={handleChange}
            />
            No
          </label>
          <br />
          <label>Were you happy today?</label>
          <br />
          <label>
            <input
              type="radio"
              name="happy_today"
              value="YES"
              checked={formData.happy_today === "YES"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="happy_today"
              value="NO"
              checked={formData.happy_today === "NO"}
              onChange={handleChange}
            />
            No
          </label>
          <br />
          <label>Did you argue with anyone today?</label>
          <br />
          <label>
            <input
              type="radio"
              name="argue_anyone"
              value="YES"
              checked={formData.argue_anyone === "YES"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="argue_anyone"
              value="NO"
              checked={formData.argue_anyone === "NO"}
              onChange={handleChange}
            />
            No
          </label>
          <br />
          <label>How is your mood today?</label>
          <br />
          <select
            name="mood_today"
            value={formData.mood_today || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Angry">Angry</option>
            <option value="Neutral">Neutral</option>
          </select>
          <br />
          <button type="submit">Submit</button>
        </form>
      ) : isFormCompleted ? (
        <p>You've already completed the form for today. See you tomorrow!</p>
      ) : (
        <p>The form will be available after 8 PM.</p>
      )}
    </div>
  );
}
