/* eslint-disable react-hooks/exhaustive-deps */

import './App.css';
import {useState,useEffect} from 'react';


function App() {

  const [info,setInfo] = useState([]);

  const [userInfo,setUserInfo] = useState([]);


  const storiesURL = `https://hacker-news.firebaseio.com/v0/topstories.json`;
  //  `https://hacker-news.firebaseio.com/v0/item/${id}.json`


  async function dataFetch(){ 
     const response = await fetch(storiesURL)
     const data = await response.json();
    //  console.log(data)
     setInfo(data)
    
}


async function singleItemFetch(){ 
  let tempArray=[]
  for(let i=0;i<15;i++){
    const response =  await fetch(`https://hacker-news.firebaseio.com/v0/item/${info[i]}.json`)
     const data = await  response.json()
     tempArray[i] = data
  }
  setUserInfo(tempArray)  
  console.log(tempArray,'temp array')
}


useEffect(()=>{
  dataFetch();
  singleItemFetch()
},[])


  return (
    <div className="App">
      {/* {userInfo.map(user=> { 
        return(
          <>
            <p>{user.by}</p>
          </>
        )
      })} */}
    </div>
  );
}

export default App;
