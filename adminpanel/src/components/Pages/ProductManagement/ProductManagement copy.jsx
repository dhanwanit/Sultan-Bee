import React, { useState, useEffect } from "react";

function App1() {
  const [CountryId, setCountryId] = useState('');
  const [StateId, setStateId] = useState('');
  const [cat, setCat] = useState([]);
  const [rest, setRest] = useState([]);

  const selectdropdown = async () => {
    const resp = await fetch('http://localhost:8080/api/category/fetch_category', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await resp.json();
    console.log(data);
    setCat(data);
    console.log(cat);
  }

  const ChangeteState = async (e) => {
    setCountryId({
      CountryId: e.target.value
    });
    console.log(e.target.value);

    const resp = await fetch(`http://localhost:8080/api/restaurant/fetch_restaurant_by_categoryId/${e.target.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await resp.json();
    setRest(data);
    console.log(rest);
  }

  const ChangeCity = (e) => {
    setStateId({
      StateId: e.target.value
    });
  }

  useEffect(() => {
    selectdropdown();
  }, []);

  return (
    <>
      <div className='categoryGet'>
        <select
          value={CountryId}
          onChange={ChangeteState}
        >
          <option>Select</option>
          {cat.map((e, key) => {
            return <option key={key} value={e._id}>{e.category_name}</option>;
          })}
        </select>
      </div>

      <div>
        <select
          value={StateId}
          onChange={ChangeCity}
        >
          <option>Select</option>
          {rest.map((e, key) => {
            return <option key={key} value={e._id}>{e.restaurant_name}</option>;
          })}
        </select>
      </div>
    </>
  );
}

export default App1;