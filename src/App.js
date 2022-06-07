import axios from 'axios';
import {useState,useEffect} from 'react';
import './App.css';


function App() {

  const [info,setInfo] = useState([]);


  
  

  const storiesURL = `https://hacker-news.firebaseio.com/v0/topstories.json`;
  //  `https://hacker-news.firebaseio.com/v0/item/${id}.json`


  async function dataFetch(){ 
    const newArray = []
    //id fetch
    axios.get(storiesURL)
      .then((response)=>{
        for(let i=0;i<10;i++){
          //users fetch
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${response.data[i]+1}.json`)
            .then((response)=>{
              newArray.push(response.data)
              console.log(newArray)
              setInfo([...newArray])
            })
        }
      }).catch((err)=>{
        console.log(err)
      })
     
  }


useEffect(()=>{
  dataFetch();
},[])

console.log(info,'data')
  return (
    <div className="App">
      {info.map((user,index)=>{
        if(user.type==='comment'){
          return (
            <div key={index}>
              <p>Username: {user.by}</p>
              <br/>
              <p>Score:  {user.score ? user.score : '---' }</p>
              <p>Title:  {user.title ? user.title : '---'}</p>
              <br/>
              <p>Type:  {user.type}</p>
              <p>Comment:  {user.text ? user.text : '---'}</p>
              <hr></hr>
            </div>
            
          )
        }
        
      })}
    </div>
  );
}

export default App;
