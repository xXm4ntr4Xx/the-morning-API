import React from 'react';
import axios from 'axios';
import {useState,useEffect} from 'react';

export const Main = () => {
  const [info,setInfo] = useState([])
  const [allData,setAllData] = useState([])

  const storiesURL = `https://hacker-news.firebaseio.com/v0/topstories.json`;
  //  `https://hacker-news.firebaseio.com/v0/item/${id}.json`

  const dataFetch = async() =>{ 
    return(
     axios.get(storiesURL)
     .then((response)=>{
      setInfo(response.data)
     }).catch(error=>{
       console.log(error)
     })
    )
}

  const singleItemFetch = ()=>{ 
    info.map(item=>{
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
        .then(response=>{
          setAllData({name:response.data.by})
          // console.log(response.data)
      })
    })
}

useEffect(()=>{
  dataFetch()
  singleItemFetch() 

},[]);


  return (
    <div>
      
    </div>
  )
}
