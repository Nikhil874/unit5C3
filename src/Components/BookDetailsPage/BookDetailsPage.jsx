import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export const BookDetailsPage = () => {
  // Get book details based on ID whenever user lands on the page
  // ID will come from route
  const {id}=useParams();
  const navigate=useNavigate();
const [book,setBook]=useState({
  id:"",
  reviews:[]
});

  useEffect(()=>{
    console.log("1");
     axios.get(`http://localhost:8080/books/${id}`).then((res)=>{
       setBook(res.data);
    
     }).catch((e)=>{
       return navigate("*");
     })

  },[]);

  return (
    <>
      <div className="bookContainer">
        <h2 className="title">{book.title}</h2>
        <img className="image" src={book.imageUrl} alt="#" />
        <div className="author">{book.author}</div>
        <div className="description">{book.description}</div>
        <div className="price">{book.price}</div>
        <div className="section">{book.section}</div>
        <div className="isbnNumber">{book.isbnNumber}</div>
        <ul className="reviews">
          {/* Reviews will be an array, iterate over them and create a new <li> for every review */}
          <>
          {book.reviews.map((e)=>{
           return <li>{e}</li>
          })}
          </>
        </ul>
      </div>
    </>
  );
};
