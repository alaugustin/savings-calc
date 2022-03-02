import React, { useState } from 'react';
import './App.css';

// import Input from './Input';
// import Label from './Label';

function App() {
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      submitConfirmed();
      
    }, 3000)
  }

  const onChangeValue = (event) => {
    console.log(event.target.value);
  }

  const submitConfirmed = () => {
    console.log("Form submitted");
  }

  const state = { 
    locationOnValue: "on",
    locationMbValue: "mb",
    numFieldInit: 0 
  };

  return (
    <div>
      <h1>Main Page</h1>

      <hr />
      {/* https://reactjs.org/docs/forms.html | https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react | https://vegibit.com/a-simple-react-js-form-example/*/}
      <form id="mainForm" onChange={onChangeValue} onSubmit={handleSubmit}>
        <p>Select a province</p>

        {submitting &&
          <div>Submtting Form...</div>
        }

        <div>
          <label htmlFor="on"><input type="radio" id="on" name="location" value="on" />Ontario</label>          
          <label htmlFor="mb"><input type="radio" id="mb" name="location" value="mb" />Manitoba</label>
        </div>
        
        <div>
          <label htmlFor="gas">
            How many tanks of gas per week? <br />
            <input type="number" id="gas" name="location" value={state.numFieldInit} />
          </label>
        </div>

        <div>
          <label htmlFor="wash">
            How many car washes per week do you purchase along with gas? <br />
            <input type="number" id="wash" name="location" value={state.numFieldInit} />
          </label>
        </div>

        <div>
          <label htmlFor="wash">
            What type of car wash do you purchase? <br />
            <select name="washType" id="washType">
              <option value="">-----</option>
              <option value="basic">Basic</option>
              <option value="deluxe">Deluxe</option>
              <option value="ultimate">Ultimate</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="wash">
            How much do you spend in-store per week? <br />
            <input type="number" id="sundries" name="location" value={state.numFieldInit} />
          </label>
        </div>

        {/* <Input labelType={"radio"} labelId={"on"} labelName={"location"} labelValue={state.locationOnValue} />
        <Label htmlFor="on" labelCopy="Ontario" /><br />

        <Input labelType={"radio"} labelId={"mb"} labelName={"location"} labelValue={state.locationMbValue} />
        <Label htmlFor="mb" labelCopy="Manitoba" /><br />

        <Label htmlFor="gas" labelCopy="How many tanks of gas per week?" /><br />
        <Input labelType={"number"} labelId={"gas"} labelName={"gas"} labelValue={""} /><br />

        <Label htmlFor="wash" labelCopy="How many car washes per week do you purchase along with gas?" /><br />
        <Input labelType={"number"} labelId={"wash"} labelName={"wash"} labelValue={""} /><br />

        <div id="washTypeHolder">
          <Label htmlFor="washType" labelCopy="What type of car wash do you purchase?" /><br />
          <select name="washType" id="washType">
            <option value="">-----</option>
            <option value="basic">Basic</option>
            <option value="deluxe">Deluxe</option>
            <option value="ultimate">Ultimate</option>
          </select><br />
        </div>

        <Label htmlFor="sundries" labelCopy="How much do you spend in-store per week?" /><br />
        <Input labelType={"number"} labelId={"sundries"} labelName={"sundries"} labelValue={""} /><br /> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
