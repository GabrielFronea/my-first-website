import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState("blue")

  const handleClick = () => {
      if(color == "blue"){
          setColor("green");
      }else 
      {
        setColor("blue");
      }
  };

  const handleClick1 = () => {
    const nextIndex = (colorsIndex + 1) % colors.length;
    setColorIndex(nextIndex);
  }
  
  const colors = ["purple", "green", "red", "yellow"];
  const [colorsIndex, setColorIndex] = useState(0);

  const randomColor = [ 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray',
                        'black', 'white', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'blanchedalmond'];

  const [colorIndex, setColorIndex1] = useState(0);


  const handleClick2 = () => {
    const randomIndex = Math.floor(Math.random() * randomColor.length);
    setColorIndex1(randomIndex);
  }

  const [catImage, setCatImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": "DEMO-API-KEY"
    });

    const requestOptions : RequestInit = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    fetch("https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result && result.length > 0) {
          setCatImage(result[0].url);
        }
      })
      .catch(error => {
        console.log('error', error);
        setError(error);
      });
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="App">
      <h1>Random Cat Image</h1>
      {error && <p>Error fetching cat image: {error}</p>}
      {catImage ? (
        <img
          src={catImage}
          alt="A Random Cat"
          style={{ width: '400px', height: '300px', objectFit: 'cover' }} // Adjust width and height here
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
      <h1>Fronea Gabriel</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleClick} style={{background: color}}>
          Click me to turn green / blue
        </button>
        <button onClick={handleClick1} style={{background : colors[colorsIndex]}}>
          Click me to change color
        </button>
        <button onClick={handleClick2} style={{background : randomColor[colorIndex]}}>
          Click me to change color random
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
