import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './components/Header';
import Maps from './components/Maps';

const samples = [
  {
      n: "m1",
      position: {
        lat: 50.48,
        lng: 10.48
      }
  },
  {
    position: {
      lat: 52.503325,
      lng: 13.426746
    }
  },
  {
    position: {
      lat: 53.503325,
      lng: 15.426746
    }
  },
  {
    position: {
      lat: 51.503325,
      lng: 10.426746
    }
  },
  {
    position: {
      lat: 54.503325,
      lng: 10.426746
    }
  },
  {
    position: {
      lat: 52.503325,
      lng: 9.426746
    }
  },
  {
    position: {
      lat: 51.503325,
      lng: 13.6746
    }
  },
  {
    position: {
      lat: 53.503325,
      lng: 11.426746
    }
  },
  {
    position: {
      lat: 55.503325,
      lng: 11.426746
    }
  },
  {
    position: {
      lat: 50.503325,
      lng: 12.426746
    }
  },
  {
    position: {
      lat: 51.503325,
      lng: 11.426746
    }
  }
]

function App() {
  return (
    <div>
      <AppBar/>
      <Maps markers={samples}/>
    </div>
  );
}

export default App;
