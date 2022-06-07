import axios from 'axios';
import {useState,useEffect} from 'react';
import './App.css';


function App() {

  const [info,setInfo] = useState([]);

  const storiesURL = `https://hacker-news.firebaseio.com/v0/topstories.json`;
  //  `https://hacker-news.firebaseio.com/v0/item/${id}.json`

  async function dataFetch(){ 
    const newArray = []
    axios.get(storiesURL)    //retreive all the id 
      .then((response)=>{
        for(let i=0;i<10;i++){
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${response.data[i]+1}.json`) //retreive all the users by using the id fetched previously
            .then((response)=>{
              newArray.push(response.data)//push the data inside the array we create inside the function
              setInfo([...newArray])//spread the element of the newArray inside  the useState array (info)
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
