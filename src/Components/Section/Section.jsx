import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { BookCard } from "../BookCard/BookCard";
import { SortAndFilterButtons } from "../SortAndFilterButtons/SortAndFilterButtons";
import styled from "styled-components";
const Main = styled.div`
/* Same as Homepage */
`;
export const Section = () => {
  // you will receive section name from URL here.
  // Get books for only this section and show
  //   Everything else is same as Home page
  const [allbooks,setAllbooks]=useState([]);
 

 const  {name} =useParams();

 useEffect(()=>{
  console.log("1");
   axios.get("http://localhost:8080/books").then((res)=>{
    let data=res.data;
    let result=data.filter((e)=>{
      if(e.section==name){
        return true;
      }
   })
   setAllbooks(result);
   console.log(result);
   
   });
   return;

},[name]);



  return (
    <>
  
      <h2 style={{ textAlign: "center" }}>
        {
          name//   Show section name heren 
        }
      </h2>
      <SortAndFilterButtons handleSort={"give sorting function to component"} />

      <Main className="sectionContainer">
        {/* SHow same BookCard component here, just like homepage but with books only belong to this Section */}
        {allbooks.map((e)=>{
        return  <BookCard items={e}></BookCard>
        })}
      </Main>
    </>
  );
};
