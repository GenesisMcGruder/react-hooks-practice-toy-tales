import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then((res)=> res.json())
    .then((data)=> setToys(data))
  },[])

  function addToy(newToy){
    setToys([...toys, newToy])
  }

  function deleteToy(deletedToy){
    const updatedToys = toys.filter((toy)=> toy.id !== deletedToy.id);
    setToys(updatedToys)
  }

  function updateLikes(updatedLike){
    const updatedLikes = toys.map((toy)=>{
      if(toy.id === updatedLike.id) {
        return updatedLike
      } else {
        return toy
      }
    })
    setToys(updatedLikes)
  }
  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} updateLikes={updateLikes}/>
    </>
  );
}

export default App;
