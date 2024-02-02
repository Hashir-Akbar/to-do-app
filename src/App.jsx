import React, { useState, useEffect } from "react";
// css
import css from "./app.module.css";

// componetns

// CRUD OPERARIONS
const App = () => {
  const [value, setValue] = useState([
    { todo: "This is Test data, you can add yours" },
  ]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    // Save data to local storage after a 1-second delay
    const timerId = setTimeout(() => {
      localStorage.setItem("valueSave", JSON.stringify(value));
    }, 500);

    // Cleanup function to clear the timer if the component unmounts or 'value' changes
    return () => clearTimeout(timerId);
  }, [value]); // Add 'value' to the dependency array

  useEffect(() => {
    // Retrieve data from local storage
    const storedValue = JSON.parse(localStorage.getItem("valueSave"));

    // Set the state with the retrieved data
    if (storedValue) {
      setValue(storedValue);
    }
  }, []);

  function getValue() {
    const input = document.getElementById("getValue").value;
    const obj = { todo: input };
    input && setValue((v) => [...v, obj]);
    document.getElementById("getValue").value = "";
  }

  function deleteBtn(i) {
    setValue((v) => v.filter((_, index) => i !== index));
  }

  function editTodo(i) {
    setEdit((e) => i);
  }
  function save(i) {
    const inputVal = document.getElementById("inputVal").value;
    setValue((v) =>
      v.map((get, index) => (index === i ? { ...get, todo: inputVal } : get))
    );
    setEdit(() => null);
  }

  return (
    <>
      <div className={css.container}>
        <div className={css.inputWrapper}>
          <input
            className={css.input}
            id="getValue"
            type="text"
            placeholder="ADD TO DO LIST"
          />
          <button className={css.button} onClick={getValue}>
            ADD TODO
          </button>
        </div>
        <div className={css.orderList}>
          {value.map((get, i) => (
            <div key={i}>
              {edit !== i ? (
                <div>{get.todo}</div>
              ) : (
                <input id="inputVal" type="text" defaultValue={get.todo} />
              )}

              <div className={css.btn}>
                <button onClick={() => deleteBtn(i)}>DELETE</button>
                <button onClick={() => editTodo(i)}>Edit</button>
                <button onClick={() => save(i)}>Save</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
