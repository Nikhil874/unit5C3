import { BookCard } from "../BookCard/BookCard";
import { SortAndFilterButtons } from "../SortAndFilterButtons/SortAndFilterButtons";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
const Main = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
    /* Apply some responsive styling to children */
  `;
export const Home = () => {
  // get all books when user lands on the page
  // populate them as mentioned below

  const [allbooks,setAllbooks]=useState([]);
  useEffect(()=>{
    console.log("1");
     axios.get("http://localhost:8080/books").then((res)=>{
       setAllbooks(res.data);
       console.log(res.data);
     })

  },[]);

  

  return (
    <div className="homeContainer">
      <h2 style={{ textAlign: "center" }}>Home</h2>
      <SortAndFilterButtons
        handleSort={
          "give handleSort function to this component, that sorts books"
        }
      />
  
      <Main className="mainContainer">
        {
        allbooks.map((e)=>{
         return <BookCard id={e.id} imageUrl={e.imageUrl} title={e.title} price={e.price} ></BookCard>
        })
        
        
        
        
        /* 
            Iterate over books that you get from network
            populate a <BookCard /> component
            pass down books id, imageUrl, title, price and anything else that you want to 
            show in books Card.
        */}
      </Main>
      <h2>Check</h2>
    </div>
  );
};
