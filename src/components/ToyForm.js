import React, { useState } from "react";

function ToyForm({addToy}) {

  const [newToy, setNewToy] = useState({
    name:"",
    image:""
  })

  function handleChange(e){
    const key = e.target.name
    setNewToy({...newToy, [key]: e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    const formData = {
      name : newToy.name,
      image : newToy.image
    }
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    })
    .then((res)=> res.json())
    .then((data)=>{
      addToy(data)
      setNewToy({
        name:"",
        image:""
      })
    })
  }
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          value={newToy.name}
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          value={newToy.image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
