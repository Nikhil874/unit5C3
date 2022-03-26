import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { BookCard } from "../BookCard/BookCard";
import { SortAndFilterButtons } from "../SortAndFilterButtons/SortAndFilterButtons";
import styled from "styled-components";
const Main = styled.div`
/* Same as Homepage */
display: flex;
  flex-wrap: wrap;
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

const [filterSort,setFilter]=useState({
  parameter:"",
  value:null,
})
const handleSort=(parameter,value)=>{
setFilter({parameter,value})
// console.log(filterSort);
}

  return (
    <>
  
      <h2 style={{ textAlign: "center" }}>
        {
          name//   Show section name heren 
        }
      </h2>
      <SortAndFilterButtons handleSort={
        handleSort} />

      <Main className="sectionContainer">
        {/* SHow same BookCard component here, just like homepage but with books only belong to this Section */}
         {allbooks.sort((a,b)=>{
          if(filterSort.parameter=="title"&&filterSort.value==1){
            return a["title"].localeCompare(b["title"]);
          }else if(filterSort.parameter=="title"&&filterSort.value==-1){
            return b["title"].localeCompare(a["title"]);
          }else if(filterSort.parameter=="price"&&filterSort.value==1){
            return a["price"]-b["price"];
          }else if(filterSort.parameter=="price"&&filterSort.value==-1){
            return b["price"]-a["price"];
          }
        })
        
        
        .map((e)=>{
        return  <BookCard id={e.id} imageUrl={e.imageUrl} title={e.title} price={e.price} ></BookCard>
        })}
      </Main>
    </>
  );
};
