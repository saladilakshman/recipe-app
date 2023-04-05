import React,{useState,useEffect}from "react";
import axios from "axios";
import Flip from 'react-reveal/Flip';
import './App.css';
function App() {
  const[data,setData]=useState([]);
  const[load,setLoad]=useState(true);
  const[singleItem,setSingleItem]=useState({});
  const[isvisible,setIsvisible]=useState(false);
  const[error,setError]=useState(false);
const[query,setQuery]=useState('Chicken');
  useEffect(()=>{
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=31091f28&app_key=e3050d3b4fd7b7fc83b876c06ca2b51a&ingr=20`)
  .then(res=>{
    if(res.status===200){
      setData(res.data.hits)
      setLoad(false)
      //setError(false)
    }
    else{
      setData([]);
      setLoad(false);
      setError(prevState=>!prevState)
    }
  })
  .catch(()=>setError(true));
  },[query,error])
  return (
    <div className="App">
     <header>
      <img src="https://cdn-icons-png.flaticon.com/512/877/877951.png"className="app-icon"alt=""/>
      <h3 style={{fontFamily:'system-ui',fontSize:'2rem',color:'#6BF178'}}>Recipe App</h3>
     </header>
      <div className="app-image">
        <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"alt=""className="logo"/>
      </div>
      <Flip left>
      <h1>Let's find the recipe you want</h1></Flip>
      <div style={{display:'flex',
      justifyContent:'center',
      alignItems:'center',
      gap:'0.5rem',
      marginBlockStart:'2rem'}}>
      <input type="search"style={{
width:'18rem',
boxShadow:'0px 0px 5px rgba(0,0,0,0.5)',
border:'none',
height:'1.8rem',
borderRadius:'0.2rem',
paddingLeft:'1rem'
      }}className="input-search"placeholder='Salads,drinks,cookies,pasta'/>
      <button style={{
        border:'none',
        backgroundColor:'#EF5B5B',
        color:'white',
        width:'5rem',
        borderRadius:'0.2rem',
    height:'1.8rem',
    paddingInlineStart:'0.5rem',
    paddingInlineEnd:'0.5rem'
      }} id="search-button"onClick={()=>{
        const searchInput=document.querySelector('.input-search');
        //Check whether user entered the value or not
        if(searchInput.value===""){
          window.alert('please enter value to search');
        }
        else{
          const splittedText=searchInput.value.split("");
          const firstLetter=splittedText[0].toUpperCase();
          splittedText[0]=firstLetter
          const joinedText=splittedText.join('');
          setQuery(joinedText);
          setLoad(true)
          setData([])
          setError(!error)
  return
        }
      }}>search</button>
      </div>
     {load && <div className="loading-icon">
        <img src="https://cdn-icons-png.flaticon.com/512/2276/2276931.png"alt=""className="loading-logo"/>
      </div>}
      {data &&
       <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'}} id="recipe-flex">
      <article>
      {data.map((item,index)=>{
        const{label,image}=item.recipe;
        return <div key={index} className="data-card">
          <img src={image}alt={label}className="data-image"loading="lazy"/>
          <p className="data-label">{label}</p>
          <button className="data-button"onClick={()=>{
            const singleItem=data.find((el)=>el.recipe.label===label);
            setSingleItem(singleItem)
            setIsvisible(prevState=>!prevState);
            document.body.classList.add('styles');
          }}>see more</button>
          {isvisible &&<div className='card-overlay'>
<div className="card-content">
<ol>
  {singleItem.recipe.ingredientLines.map((item,index)=>{
    return <li key={index}>{item}</li>
  })}
  </ol>
  <div  style={{display:'flex',justifyContent:'space-around',alignItems:'center',gap:'1rem'}}>
    <button className="download-button"onClick={()=>{
      const ingredientText=singleItem.recipe.ingredientLines;
      const blob=new Blob([ingredientText],{type:'text/plain'});
      const url=URL.createObjectURL(blob)
      const anchor=document.createElement('a');
      anchor.href=url;
      anchor.download=`${singleItem.recipe.label} making steps.txt`;
      anchor.click();
      document.body.appendChild(anchor);
    }}>download</button>
    <button className="cancel-button"onClick={()=>setIsvisible(prevState=>!prevState)}>Cancel</button>
  </div>
</div>
          </div>}
        </div>
      })}
      </article>
      </div>
}
 {!error &&<h2 style={{
  textAlign:'center',
  fontFamily:'helvetica',
  color:'red',
  fontWeight:'500'
 }}>No recipes found</h2>}  
   
    </div>
  );
}

export default App;
