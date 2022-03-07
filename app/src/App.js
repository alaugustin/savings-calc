import React, { useState, useEffect } from 'react';
// import { useForm } from "react-hook-form";
import './App.css';

function App() {
  const [submitForm, setSubmitForm] = useState(false);
  const handleSubmitMessage = event => {
    event.preventDefault();
    setSubmitForm(true);

    setTimeout(() => {
      setSubmitForm(false);

    }, 3000)
  }

  // ---------- API hook ----------
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // https://reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    fetch("https://api.salestaxapi.ca/v2/province/ON")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])




  return (
    <div>
      <h1>Main Page</h1>

      {error &&
        <div>Error: {error.message}</div>
      }

       {!isLoaded &&
        <div>Loading...</div>
      }

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>

      <hr />
      {/* https://react-hook-form.com/ */}
      <form id="mainForm" onSubmit={handleSubmitMessage}>
        <p>Select a province</p>

        {/* <div>
          <label htmlFor="on"><input type="radio" id="on" value="on" name="location" value="on" />Ontario</label>
          <label htmlFor="mb"><input type="radio" id="mb" value="mb" name="location" value="mb" />Manitoba</label>
        </div>

        <div>
          <label htmlFor="gas">
            How many tanks of gas per week? <br />
            <input type="number" id="gas" name="location" value="0" />
          </label>
        </div>

        <div>
          <label htmlFor="wash">
            How many car washes per week do you purchase along with gas? <br />
            <input type="number" id="wash" name="location" value="0" />
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
            <input type="number" id="sundries" name="location" value="0" />
          </label>
        </div> */}

        <button type="submit">Submit</button>

        {submitForm &&
          <div>Submtting Form&hellip;</div>
        }
      </form>
    </div>
  );
}

export default App;
