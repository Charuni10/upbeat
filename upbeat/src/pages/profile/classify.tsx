import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Classify() {
  useEffect(() => {
    // Retrieve data from local storage
    // localStorage.clear();
    const storedFormData = localStorage.getItem("profileFormData");

    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      console.log(parsedFormData); // Log the retrieved data to the console

      // Personal Information
      const personalInformation = {
        dob: parsedFormData.dob,
        gender: parsedFormData.gender,
        appointment_frequency: parsedFormData.appointment_frequency,
        test_timing: parsedFormData.test_timing,
      };

      // Emergency Contact Information
      const emergencyContactInformation = {
        contact_name: parsedFormData.contact_name,
        emergency_contact_phone: parsedFormData.emergency_contact_phone,
        contact_relationship: parsedFormData.contact_relationship,
      };

      // Doctor's Information
      const doctorInformation = {
        name: parsedFormData.name,
        phone_number: parsedFormData.phone_number,
        clinic_or_hospital_name: parsedFormData.clinic_or_hospital_name,
        email: parsedFormData.email,
      };
    } else {  
      console.log("No data found in local storage");
    }
  }, []); // Run this effect only once on component mount

  const navigate = useNavigate(); // Access navigate function for navigation
  const [formData, setFormData] = useState({
    "mood_swing": "",
    "optimisim": "",
    "euphoric": "",
    "exhausted": "",
    "concentration": "",
    "sexual_activity": "",
    "aggressive_response": "",
    "suicidal_thoughts": "",
    "authority_respect": "",
    "sadness": ""
  }); 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save form data to localStorage
    localStorage.setItem("classifyFormData", JSON.stringify(formData));
    // Navigate to the login page
    navigate("/login");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h1>Classify Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Your form fields */}
        <label>Do you have mood swings regularly?</label>
        <br />
        <label>
          <input
            type="radio"
            name="mood_swing"
            value="YES"
            checked={formData.mood_swing === "YES"}
            onChange={handleChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="mood_swing"
            value="NO"
            checked={formData.mood_swing === "NO"}
            onChange={handleChange}
          />
          No
        </label>
        <br />

        <label>Do you feel optimistic in life?</label>
        <br />
        <select
          name="optimism"
          value={formData.optimisim || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1 From 10">1</option>
          <option value="2 From 10">2</option>
          <option value="3 From 10">3</option>
          <option value="4 From 10">4</option>
          <option value="5 From 10">5</option>
          <option value="6 From 10">6</option>
          <option value="7 From 10">7</option>
          <option value="8 From 10">8</option>
          <option value="9 From 10">9</option>
        </select>
        <br />

        <label>Are you happy in your daily life?</label>
        <br />
        <select
          name="euphoric"
          value={formData.euphoric || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Seldom">Seldom</option>
          <option value="Most-Often">Most-Often</option>
          <option value="Usually">Usually</option>
          <option value="Sometimes">Sometimes</option>
        </select>
        <br />

        <label>Do you feel exhausted most of the time?</label>
        <br />
        <select
          name="exhausted"
          value={formData.exhausted || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Sometimes">Sometimes</option>
          <option value="Usually">Usually</option>
          <option value="Seldom">Seldom</option>
          <option value="Most-Often">Most-Often</option>
        </select>
        <br />

        <label>Do you lack concentration?</label>
        <br />
        <select
          name="concentration"
          value={formData.concentration || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1 From 10">1</option>
          <option value="2 From 10">2</option>
          <option value="3 From 10">3</option>
          <option value="4 From 10">4</option>
          <option value="5 From 10">5</option>
          <option value="6 From 10">6</option>
          <option value="7 From 10">7</option>
          <option value="8 From 10">8</option>
          <option value="9 From 10">9</option>
        </select>
        <br />

        <label>Do you feel lonely?</label>
        <br />
        <select
          name="loneliness"
          value={formData.sexual_activity || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1 From 10">1</option>
          <option value="2 From 10">2</option>
          <option value="3 From 10">3</option>
          <option value="4 From 10">4</option>
          <option value="5 From 10">5</option>
          <option value="6 From 10">6</option>
          <option value="7 From 10">7</option>
          <option value="8 From 10">8</option>
          <option value="9 From 10">9</option>
        </select>
        <br />

        <label>Do you behave aggressively?</label>
        <br />
        <label>
          <input
            type="radio"
            name="aggressive_response"
            value="YES"
            checked={formData.aggressive_response === "YES"}
            onChange={handleChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="aggressive_response"
            value="NO"
            checked={formData.aggressive_response === "NO"}
            onChange={handleChange}
          />
          No
        </label>
        <br />

        <label>Do you have suicidal thoughts?</label>
        <br />
        <label>
          <input
            type="radio"
            name="suicidal_thoughts"
            value="YES"
            checked={formData.suicidal_thoughts === "YES"}
            onChange={handleChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="suicidal_thoughts"
            value="NO"
            checked={formData.suicidal_thoughts === "NO"}
            onChange={handleChange}
          />
          No
        </label>
        <br />

        <label>Do you feel respectful in your regular life?</label>
        <br />
        <label>
          <input
            type="radio"
            name="authority_respect"
            value="YES"
            checked={formData.authority_respect === "YES"}
            onChange={handleChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="authority_respect"
            value="NO"
            checked={formData.authority_respect === "NO"}
            onChange={handleChange}
          />
          No
        </label>
        <br />

        <label>Do you feel sad majority of the day?</label>
        <br />
        <select
          name="sadness"
          value={formData.sadness || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Usually">Usually</option>
          <option value="Sometimes">Sometimes</option>
          <option value="Seldom">Seldom</option>
          <option value="Most-Often">Most-Often</option>
        </select>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}