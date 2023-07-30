import { useState , useEffect } from 'react';
import axios from 'axios';
import { Name } from './components/Name';
import { eventChange } from './components/eventChange';
import { addName } from './components/addName';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("");
  const [filterPerson, setFilterPerson] = useState("");
  const [notification, setNotification] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/api/persons') //IDK?
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleAddName = addName(newName, newNumber, persons, setNewName, setNewNumber, setPersons, setNotification, setIsError)
  const handleNameChange = eventChange(setNewName)
  const handleNumberChange = eventChange(setNewNumber)

  const filterByName = (event) => {
    setFilterPerson(event.target.value);
  }

  const deleteName = (specificPerson) => {
    const answer = window.confirm(`Are you sure you want to delete ${specificPerson.name}?`)
    if(answer) {
      const url = `http://localhost:3001/api/persons/${specificPerson.id}`;
      const deleteName = persons.find(person => person.id === specificPerson.id)
      const changedPersons = {...deleteName }

      axios.delete(url, changedPersons).then(response => {
        setPersons(persons.filter(person => person.id !== specificPerson.id ? person : response.data.id))
  
      })
    }
  }


  const Notification = ({message, isError}) => {
    let styleNotif = {}; 
    if (isError === false) {
      styleNotif = {
        color: "green",
      }
    }
    if (isError === true) {
      styleNotif = {
        color: "red",
      }
    }
    if (message === "") {
      return null
    }
      return (
        <div style={styleNotif}>
          <h4>{message}</h4>
        </div>
      )


  }


  const namesToShow = filterPerson === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError}/>
      <p>Filter names: <input value={filterPerson} onChange={filterByName}/></p>
      <h2>Add a new name: </h2>
      <form onSubmit={handleAddName}>
        <div>
          <p>Name: <input value ={newName} onChange={handleNameChange}/></p>
          <p>Number: <input value={newNumber} onChange={handleNumberChange}/></p>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {namesToShow.map(person =>
          <Name name={person} deleteName={()=>deleteName(person)}key={person.id}/>
      )}
    </div>
  )
}

export default App




