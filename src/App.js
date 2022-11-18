import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import './App.css';
import Card from './components/card';

function App() {

  const [data,setData] = useState({count:0,entries:[]})
  const [search,setSearch] = useState("")
  const [filter,setFilter] = useState("All Categories")
  const [showData,setShowData] = useState({count:0,entries:[]})
  const [category,setCategory] = useState([])

  const debouncedResults = useMemo(() => {
    return debounce(showResults, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  useEffect(() => {
    const url = "https://api.publicapis.org/entries";
  
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json)
        setShowData(json)
      } catch (error) {
        console.log("error", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const categories = [...new Set(data.entries.map(item => item.Category))];
    setCategory(categories)
  }, [data]);

  useEffect(() => {
    filterResults();
  }, [search,filter]);

  function showResults(e) {
    setSearch(e)
  }

  function changeResults(e) {
    setFilter(e)
  }

  function filterResults() {
    const ans = data.entries.filter((val,idx) => {
      if(val.API.indexOf(search) !== -1 || val.Description.indexOf(search) !== -1) {
        if(filter === "All Categories") {
          return val
        } else {
          if(val.Category === filter) {
            return val
          }
        }
      }
    })
    setShowData({count:ans.length,entries:ans})
  }


  return (
    <div className="App">
      <div className="filters">
        <input className="input-search" type="text" onChange={(e)=> showResults(e.target.value)}></input>
        <select name="categories" className="categories" onChange={(e)=> changeResults(e.target.value)}>
          <option value="All Categories">All Categories</option>
          {category.map((val,idx) => {return <option key = {idx} value={val}>{val}</option>})}
        </select>
      </div>
      <div className="cardGroup">
        {!showData.entries || showData.entries.length === 0 ? (<p>No Data Found</p>) : showData.entries.map((val,idx) => {return <Card key = {idx} data = {val}/>})}
      </div>
    </div>
  );
}

export default App;
