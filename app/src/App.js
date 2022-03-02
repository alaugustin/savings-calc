import React, { useState } from 'react';
import './App.css';

import Input from './Input';
import Label from './Label';

function App() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
  }

  return (
    <div>
      <h1>Main Page</h1>

      <hr />
      {/* https://reactjs.org/docs/forms.html */}
      <form id="mainForm" onSubmit={handleSubmit}>
        <p>Select a province</p>

        {submitting &&
          <div>Submtting Form...</div>
        }

        <Input labelType={"radio"} labelId={"on"} labelName={"location"} labelValue={"on"} />
        <Label htmlFor="on" labelCopy="Ontario" /><br />

        <Input labelType={"radio"} labelId={"mb"} labelName={"location"} labelValue={"mb"} />
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
        <Input labelType={"number"} labelId={"sundries"} labelName={"sundries"} labelValue={""} /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
