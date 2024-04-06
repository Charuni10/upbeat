import React, { useState } from "react";
import "./profile.css"; // Import CSS file for styling
import { useNavigate } from "react-router";
import { HStack } from "@chakra-ui/react";

// Component for the first part of the profile form
function ProfileFormPart1({ onNextClick, formData, setFormData }: { onNextClick: () => void; formData: any; setFormData: any }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gender = e.target.value;
    setFormData({ ...formData, gender });
  };
  return (
    <HStack p={0}>
      <div className="prof-left-section">

      </div>
    <div className="ProfileFormPart1">
      <h2>Profile Up!</h2>
      <p>Complete your profile to unlock the full app experience!</p>
      <form style={{padding:"10px 30px"}}>
        <label className="gender">
          Gender :
          <label>
            <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleGenderChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleGenderChange} />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="other" checked={formData.gender === "other"} onChange={handleGenderChange} />
            Other
          </label>
        </label>
        <label className="date">
          Date of Birth :
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>
        <label>
          How do you want the report :
          <select name="appointment_frequency" value={formData.appointment_frequency} onChange={handleSelectChange} >
            <option value="" disabled selected>Choose a frequency</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label>Which time would you prefer to answer a few questions daily?</label>
        <select name="test_timing" value={formData.test_timing} onChange={handleSelectChange}>
          <option value="" disabled selected>Choose a time</option>
          <option value='07:00:00'>7 PM</option>
          <option value='08:00:00'>8 PM</option>
          <option value='09:00:00'>9 PM</option>
        </select>
      </form>
      <input type="button" value="Next" className="btn" onClick={onNextClick} />
    </div>
    </HStack>
  );
}

// Component for the second part of the profile form
function ProfileFormPart2({ onNextClick, onBackClick, formData, setFormData }: { onNextClick: () => void; onBackClick: () => void; formData: any; setFormData: any }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <HStack p={0}>
    <div className="prof-left-section">

    </div>
    <div  className="ProfileFormPart2">
      <h2>Add up</h2>
      <p>Please fill any one of your emergency contact for us to connect when necessary</p>
      <form style={{padding:"10px 30px"}}>
        <label>
          Emergency Contact Name:
          <input type="text" name="contact_name" value={formData.contact_name} onChange={handleChange} />
        </label>
        <label>
          Emergency Contact Phone Number:
          <input type="text" name="emergency_contact_phone" value={formData.emergency_contact_phone} onChange={handleChange} />
        </label>
        <label >
          Relationship with the person:
          <input type="text" name="contact_relationship" value={formData.contact_relationship} onChange={handleChange} />
        </label>
        <HStack><input type="button" value="Back" className="btn" onClick={onBackClick} />
        <input type="button" value="Next" className="btn" onClick={onNextClick} /></HStack>
      </form>
    </div>
    </HStack>
  );
}

function ProfileFormPart3({ onBackClick, formData, setFormData }: { onBackClick: () => void; formData: any; setFormData: any }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Save form data to local storage
    alert(JSON.stringify(formData));

    localStorage.setItem("profileFormData", JSON.stringify(formData));

    // Navigate to the classify page
    navigate("/classify");
  };


  return (
    <HStack p={0}>
    <div className="prof-left-section">

    </div>
    <div  className="ProfileFormPart3">
      <h2>Doctor's Information</h2>
      <p style={{fontSize:"15px"}}>If you are reaching out to a psychiatrist, give us the details to send test_timings to him</p>
      <form style={{padding:"10px 30px"}}>
        <label>
          Contact Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </label>
        <label  className="name">
          Clinic name:
          <input type="text" name="clinic_or_hospital_name" value={formData.clinic_or_hospital_name} onChange={handleChange} />
        </label>
        <label>
          Email address:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <HStack>
        <input type="button" value="Back" className="btn" onClick={onBackClick} />
        <input type="button" value="Submit" className="btn" onClick={handleSubmit} />
        </HStack>
       
      </form>
    </div>
    </HStack>
  );
}

export function Profile() {
  const [showSecondPart, setShowSecondPart] = useState(false);
  const [showThirdPart, setShowThirdPart] = useState(false);
  // localStorage.clear();
  const [formData, setFormData] = useState({
    gender: "",
    dob: "",
    test_timing: "",
    appointment_frequency: "",
    contact_name: "",
    contact_phone_number: "",
    contact_relationship: "",
    name: "",
    phone_number: "",
    clinic_or_hospital_name: "",
    email: ""
  });

  const handleNextClick = () => {
    if (!showSecondPart) {
      setShowSecondPart(true); // Show the second part of the form when the "Next" button is clicked
    } else if (!showThirdPart) {
      setShowThirdPart(true); // Show the third part of the form when the "Next" button is clicked
    }
  };

  const handleBackClick = () => {
    if (showThirdPart) {
      setShowThirdPart(false); // Go back to the second part of the form
    } else if (showSecondPart) {
      setShowSecondPart(false); // Go back to the first part of the form
    }
  };

  return (
    <div className="prof-container">
      <div className="prof-right-section">
        {/* Render either the first, second, or third part of the form based on the state */}
        {showThirdPart ? (
          <ProfileFormPart3 onBackClick={handleBackClick} formData={formData} setFormData={setFormData} />
        ) : showSecondPart ? (
          <ProfileFormPart2 onNextClick={handleNextClick} onBackClick={handleBackClick} formData={formData} setFormData={setFormData} />
        ) : (
          <ProfileFormPart1 onNextClick={handleNextClick} formData={formData} setFormData={setFormData} />
        )}
      </div>
    </div>
  );
}
