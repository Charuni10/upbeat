import React, { useEffect } from "react";

export function Classify() {
  useEffect(() => {
    // Retrieve data from local storage
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

  return (
    <div>
      <h1>Classify Page</h1>
      <label>Do you have mood swings regularly?</label>
      <br></br>
      <label>
        <input type="radio" name="mood_swing" value="YES" />
        Yes
      </label>
      <label>
        <input type="radio" name="mood_swing" value="NO" />
        No
      </label>
      <br></br>

      <label>Do you feel optimistic in life?</label>
      <br></br>
      <select name="optimisim">
        <option value="1 From 10">1 </option>
        <option value="2 From 10">2 </option>
        <option value="3 From 10">3 </option>
        <option value="4 From 10">4 </option>
        <option value="5 From 10">5 </option>
        <option value="6 From 10">6 </option>
        <option value="7 From 10">7 </option>
        <option value="8 From 10">8 </option>
        <option value="9 From 10">9 </option>
      </select>
      <br></br>

      <label>Are you happy in your daily life?</label>
      <br></br>
      <select name="euphoric">
        <option value="Seldom">Seldom</option>
        <option value="Most-Often">Most-Often</option>
        <option value="Usually">Usually</option>
        <option value="Sometimes">Sometimes</option>
      </select>
      <br></br>
      <label>Do you feel exhausted most of the time?</label>
      <br></br>
      <select name="exhausted">
        <option value="Sometimes">Sometimes</option>
        <option value="Usually">Usually</option>
        <option value="Seldom">Seldom</option>
        <option value="Most-Often">Most-Often</option>
      </select>
      <br></br>
      <label>Do you lack concentration?</label>
      <br></br>
      <select name="concentration">
        <option value="1 From 10">1 </option>
        <option value="2 From 10">2 </option>
        <option value="3 From 10">3 </option>
        <option value="4 From 10">4 </option>
        <option value="5 From 10">5 </option>
        <option value="6 From 10">6 </option>
        <option value="7 From 10">7 </option>
        <option value="8 From 10">8 </option>
        <option value="9 From 10">9 </option>
      </select>
      <br></br>
      <label>Do you feel lonely?</label>
      <br></br>
      <select name="sexual_activity">
        <option value="1 From 10">1 </option>
        <option value="2 From 10">2 </option>
        <option value="3 From 10">3 </option>
        <option value="4 From 10">4 </option>
        <option value="5 From 10">5 </option>
        <option value="6 From 10">6 </option>
        <option value="7 From 10">7 </option>
        <option value="8 From 10">8 </option>
        <option value="9 From 10">9 </option>
      </select>
      <br></br>
      <label>Do you behave aggressively?</label>
      <br></br>
      <label>
        <input type="radio" name="aggressive_response" value="YES" />
        Yes
      </label>
      <label>
        <input type="radio" name="aggressive_response" value="NO" />
        No
      </label>
      <br></br>
      <label>Do you have suicidal thoughts?</label>
      <br></br>
      <label>
        <input type="radio" name="suicidal_thoughts" value="YES" />
        Yes
      </label>
      <label>
        <input type="radio" name="suicidal_thoughts" value="NO" />
        No
      </label>
      <br></br>
      <label>Do you feel respectful in your regular life?</label>
      <br></br>
      <label>
        <input type="radio" name="authority_respect" value="YES" />
        Yes
      </label>
      <label>
        <input type="radio" name="authority_respect" value="NO" />
        No
      </label>
      <br></br>
      <label>Do you feel sad majority of the day?</label>
      <br></br>
      <select name="sadness">
        <option value="Usually">Usually</option>
        <option value="Sometimes">Sometimes</option>
        <option value="Seldom">Seldom</option>
        <option value="Most-Often">Most-Often</option>
      </select>
    </div>
  );
}
