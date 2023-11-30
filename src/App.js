// import logo from './logo.svg';
import './App.css';
import './Card.css'
import React, { useEffect,useState } from 'react';
import axios from 'axios';

function App() {
  const [filter,setFilter] =useState('');
  const [movies, setMovies] = useState([])
  const handleChange = e => {
    e.preventDefault();
    setFilter(e.target.value);
    // console.log(filter)
  }

  const handleSubmit = async () => {
    const m = await axios.get('https://ott-details.p.rapidapi.com/advancedsearch',{headers:{
      'X-RapidAPI-Key': '7573ba1ee8msh0d491e2d2e780f2p10bcb6jsn17400bffb4b5',
      'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
    }})
    // console.log(m.data)
    setMovies(m.data.results)
  }
  useEffect(()=>{handleSubmit()}, []);

  document.title = 'Movie App';
  return (
    
    <div className="App">
      <h1>Movie App</h1>
      <input type='text' name='filter' id='filter' onChange={handleChange} />
      <button onClick={handleSubmit}>Search</button>
      { movies ? movies.map((m,index)=>{
        if (m.title.toLowerCase().includes(filter.toLowerCase()) || m.genre[0].toLowerCase().includes(filter.toLowerCase()) || m.imdbrating == filter){
          return (
          <div className='Container' key={index}>
      <div className="Card-Container">
        <div className="Image-Container">
              <img src={m.imageurl[0]} alt="" />
        </div>

        <div className="Details-Container">
          <div className="Title-Container">
            <h2>{m.title}</h2>
            <p>Genre : {m.genre[0]}</p>
          </div>
          <div className="RG-Container">
            <p>Rating : {m.imdbrating} ⭐</p>
          </div>
        </div>
      </div>
    </div>
    )}
      })


        
      : null }
   </div>
  );
}

export default App;
