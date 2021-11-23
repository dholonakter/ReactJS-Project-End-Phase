import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer"
import ProductsRow from "../components/ProductsRow";
import bikeImg from "../assests/images/bike.jpg"
import bookImg from "../assests/images/book.jpg"
import NewNavigation from "../components/NewNavigation";

const fakeData = {
  bikesData: [
    {
      img: bikeImg,
      title: "Bike 1",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4
    },
    {
      img: bikeImg,
      title: "Bike 2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4
    },
    {
      img: bikeImg,
      title: "Bike 3",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4
    },
    {
      img: bikeImg,
      title: "Bike 4",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4
    },
  ],

  booksData: [
    {
      img: bookImg,
      title: "Book 1",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4
    },
    {
      img: bookImg,
      title: "Book 2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4
    },
    {
      img: bookImg,
      title: "Book 3",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4
    },
    {
      img: bookImg,
      title: "Book 4",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto?",
      price: 50,
      rating: 4
    },
  ]
}

function NewHome() {
  return (
    <div className="home">
     <NewNavigation/>
      <Banner />
      <ProductsRow sectionTitle="Bikes" data={fakeData.bikesData}/>
      <ProductsRow sectionTitle="Books" data={fakeData.booksData}/>
    </div>
  );
}
export default NewHome;

