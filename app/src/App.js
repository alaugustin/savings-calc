import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <h1>Main Page</h1>

      <hr />

      <form id="mainForm" method="post">
        <p>Select a province</p>
        <input type="radio" id="on" name="location" value="on" />
        <label for="on">Ontario</label><br />

        <input type="radio" id="mb" name="location" value="mb" />
        <label for="mb">Manitoba</label><br />

        <label for="gas">How many tanks of gas per week?</label><br />
        <input type="number" id="gas" name="gas" /><br />

        <label for="wash">How many car washes per week do you purchase along with gas?</label><br />
        <input type="number" id="wash" name="wash" /><br />

        <div id="washTypeHolder">
          <label for="washType">What type of car wash do you purchase?</label><br />
          <select name="washType" id="washType">
            <option value="">-----</option>
            <option value="basic">Basic</option>
            <option value="deluxe">Deluxe</option>
            <option value="ultimate">Ultimate</option>
          </select><br />
        </div>

        <label for="sundries">How much do you spend in-store per week?</label><br />
        <input type="number" id="sundries" name="sundries" /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
