import { useEffect, useState } from 'react'
import axios from "axios" 
import  './App.css'
import Jobsugget from './Jobsugget';
const api_key="https://hacker-news.firebaseio.com/v0/jobstories.json"
const api_Perpage=6;
function App() {
  
// const api_key="https://hacker-news.firebaseio.com/v0/jobstories.json"
// const api_Perpage=6;
const exa_responce={
  "by": "jamilbk",
  "id": 35908337,
  "score": 1,
  "time": 1683838872,
  "title": "Firezone (YC W22) is hiring Elixir and Rust engineers",
  "type": "job",
  "url": "https://www.ycombinator.com/companies/firezone/jobs"
}
const[items,setitem]=useState([]);
const[itesid,setitemid]=useState(null)
const[fetchingdetails,setfetchingdetails]=useState(false)
const[currentPage,setcurrentPage]=useState(0);

const fetchItems=async(currPage)=>{
setcurrentPage(currPage)
setfetchingdetails(true)
let itemlist=itesid;
if(itemlist===null){
  const responce=await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
  itemlist= await responce.json()
  setitemid(itemlist)
}
// console.log(itemlist)

const itemsidforpage=itemlist.slice(
  currPage*api_Perpage,
currPage*api_Perpage+api_Perpage
)
const itemforpage=await Promise.all(
  itemsidforpage.map((itemid)=>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${itemid}.json`).then(res=>
      res.json()
    )
  )
)
setitem([...items,...itemforpage])
setfetchingdetails(false)
}
useEffect(()=>{
if(currentPage===0)fetchItems(currentPage)
},[currentPage])
// console.log(itemlist)

  return <>
  <div className='app'>

      <h1 className='title'>Job boards</h1>
     { (items===null ||items.length)<1?(
        <p className='loading'>loading</p>
      ):(
        <div>
      <div className='items' role='list'> 
        {
           
          items.map((item)=>
            {
            return <Jobsugget key={item.id} {...item}/>

          })
        }
{/* <Jobsugget/> */}
      </div>
      <button onClick={()=>fetchItems(currentPage+1)} disabled={fetchingdetails}>
        {fetchingdetails?"Loading...":"Load more jobs"}
        
      </button>
      </div>
      )
    }
    </div>
    </>
}

export default App
