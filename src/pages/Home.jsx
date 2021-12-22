import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ProductsRow from "../components/ProductsRow";
import Navigation from "../components/Navigation";

const fakeData = {
  bikesData: [
    {
      img_name: "bike",
      title: "Bike 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4,
    },
    {
      img_name: "bike",
      title: "Bike 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4,
    },
    {
      img_name: "bike",
      title: "Bike 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4,
    },
    {
      img_name: "bike",
      title: "Bike 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4,
    },
  ],

  booksData: [
    {
      img_name: "book",
      title: "Book 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4,
    },
    {
      img_name: "book",
      title: "Book 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4,
    },
    {
      img_name: "book",
      title: "Book 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto",
      price: 50,
      rating: 4,
    },
    {
      img_name: "book",
      title: "Book 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut at labore ipsa dignissimos eveniet sequi iusto?",
      price: 50,
      rating: 4,
    },
  ],
};

function Home() {
  return (
    <div className="home">
      <Navigation />
      <Banner />
      <ProductsRow sectionTitle="Bikes" data={fakeData.bikesData} />
      <ProductsRow sectionTitle="Books" data={fakeData.booksData} />
      <Footer />
    </div>
  );
}
export default Home;
