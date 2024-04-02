import React, { useState } from "react";
import "./profile.css"; // Import CSS file for styling

// Component for the first part of the profile form
function ProfileFormPart1({ onNextClick }: { onNextClick: () => void }) {
  return (
    <div>
      <h2>Profile Up!</h2>
      <p>Complete your profile to unlock the full app experience!</p>
        <form>
          <label>
            Name:
            <input type="text" name="username" />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phone_number" />
          </label>
          <label>
            Date of Birth:
            <input type="date" name="dob" />
          </label>
          <label>
            How do you want the report:
            <input type="checkbox" name="report" value="Weekly" />
            <label>Weekly</label>
            <input type="checkbox" name="report" value="Monthly" />
            <label>Monthly</label>
          </label>
          <label>Which time would you prefer to answer a few questions daily?</label>
          <select>
            <option>7 PM</option>
            <option>8 PM</option>
            <option>9 PM</option>
          </select>
      </form>
      <input type="button" value="Next" className="btn" onClick={onNextClick} />
    </div>
  );
}

// Component for the second part of the profile form
function ProfileFormPart2({ onNextClick }: { onNextClick: () => void }) {
  return (
    <div>
      <h2>Add up</h2>
      <p>Please fill any one of your emergency contact for us to connect when neccessary</p>
      <form>
        <label>
          Emergency Contact Name:
          <input type="text" name="emergency_contact_name" />
        </label>
        <label>
          Emergency Contact Phone Number:
          <input type="text" name="emergency_contact_phone" />
        </label>
        <input type="button" value="Next" className="btn" onClick={onNextClick} />

        {/* Add additional fields as needed */}
      </form>
    </div>
  );
}
function ProfileFormPart3() {
    return (
      <div>
        <h2>Doctor's Information</h2>
        <p>If you are reaching out to a pschycatrist, give us the details to send reports to him </p>
        <form>
        <label>
         Contact Name:
          <input type="text" name="dr_name" />
        </label>
        <label>
          Phone Number:
          <input type="text" name="dr_phone" />
        </label>
        <label>
          Clinic name:
          <input type="text" name="dr_clinic_name" />
        </label>
        <label>
          Email address:
          <input type="text" name="dr_email" />
        </label>
        <input type="button" value="Submit" className="btn" />

        </form>
      </div>
    );
  }
  
  export function Profile() {
    const [showSecondPart, setShowSecondPart] = useState(false);
    const [showThirdPart, setShowThirdPart] = useState(false);
  
    const handleNextClick = () => {
      if (!showSecondPart) {
        setShowSecondPart(true); // Show the second part of the form when the "Next" button is clicked
      } else if (!showThirdPart) {
        setShowThirdPart(true); // Show the third part of the form when the "Next" button is clicked
      }
    };
  
    return (
      <div className="prof-container">
        <div className="prof-left-section">
          {/* Content of the left section */}
        </div>
        <div className="prof-right-section">
          {/* Render either the first, second, or third part of the form based on the state */}
          {showThirdPart ? (
            <ProfileFormPart3 />
          ) : showSecondPart ? (
            <ProfileFormPart2 onNextClick={handleNextClick} />
          ) : (
            <ProfileFormPart1 onNextClick={handleNextClick} />
          )}
        </div>
      </div>
    );
  }