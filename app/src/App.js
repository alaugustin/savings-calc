// import logo from './logo.svg';
import React;
import './App.css';
import Label from './Label';

function App() {
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    // ... submit to API or something
  };

  return (
    <div>
      <h1>Main Page</h1>

      <hr />

      <form id="mainForm" method="post">
        <p>Select a province</p>
        <input type="radio" id="on" name="location" value="on" onChange={handleChange} />
        <Label htmlFor="on" labelCopy="Ontario" /><br />

        <input type="radio" id="mb" name="location" value="mb" onChange={handleChange} />
        <Label htmlFor="mb" labelCopy="Manitoba" /><br />

        <Label htmlFor="gas" labelCopy="How many tanks of gas per week?" /><br />
        <input type="number" id="gas" name="gas" onChange={handleChange} /><br />

        <Label htmlFor="wash" labelCopy="How many car washes per week do you purchase along with gas?" /><br />
        <input type="number" id="wash" name="wash" onChange={handleChange} /><br />

        <div id="washTypeHolder">
          <Label htmlFor="washType" labelCopy="What type of car wash do you purchase?" /><br />
          <select name="washType" id="washType" onChange={handleChange}>
            <option value="">-----</option>
            <option value="basic">Basic</option>
            <option value="deluxe">Deluxe</option>
            <option value="ultimate">Ultimate</option>
          </select><br />
        </div>

        <Label htmlFor="sundries" labelCopy="How much do you spend in-store per week?" /><br />
        <input type="number" id="sundries" name="sundries" onChange={handleChange}/><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
