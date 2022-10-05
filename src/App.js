import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Gist from "react-gist";


const gistData = {
  id: "e9ba5a1de4d5188f47091756c5475583",
  file: "js"
};
function App() {
  const [state, setState] = useState(0);
  const [userData, setUserData] = useState([]);

  const refreshPage = () => {
    window.location.reload();
  };

  const fetchUser = async (ignore) => {
    // Lakukan Set Kondisi Untuk Mengecek Apakah Sedang dalam Mode Prod atau Dev serta CleanUp Function
    if (process.env.NODE_ENV !== "production") {
      if (!ignore) {
        const result = await axios.get("https://randomuser.me/api/");
        setUserData(result?.data?.results);
      }
    } else {
      const result = await axios.get("https://randomuser.me/api/");
      setUserData(result?.data?.results);
    }
  };

  useEffect(() => {
    setState((current) => current + 1);
    fetchUser(true);
    return () => {
      fetchUser(false);
    };
  }, []);

  return (
    <div className="App">
      <h1>UseEffect Run : {state}</h1>
      <h1>User API DATA:</h1>
      {userData.map((item, index) => {
        return (
          <div key={index}>
            <img
              alt="user"
              src={item.picture.large}
              style={{ borderRadius: 50, width: 100 }}
            />
            <p> Name : {item.id.name}</p>
            <p> Email : {item.email}</p>
            <p> Location : {item.location.city}</p>
            <p> Phone : {item.phone}</p>
          </div>
        );
      })}
      <button style={{ height: 100, width: 400 }} onClick={refreshPage}>
        <h4> Refresh Halaman Untuk Melihat Jumlah Effect </h4>
      </button>
      <div>
        <p>
          Nb : React 18 di development mode akan tetap melakukan dua kali useEffect.
          solusi yang harus dilakukan adalah membuat flag pada saat melakukan
          request, jika telah berjalan sebanyak satu kali maka segera lakukan <code> setUserData </code> kemudian pada saat cleanUp lakukan lakukan return null atau unsubscribe pada request
          seperti contoh pada code berikut : 
          <Gist id={gistData.id} />
        </p>
        <p>
          jika ingin melihat effect run sekali lakukan npm run build untuk masuk
          ke prod mode dan serve file hasil build nya di local pc dengan command
          <code> serve -s build </code>
        </p>
        <a href="https://github.com/ryanda9910/react-18-useEffect">Full Repo</a>
      </div>
    </div>
  );
}

export default App;
