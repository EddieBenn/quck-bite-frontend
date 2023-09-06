// import Cards from "./Cards"

import { Link } from "react-router-dom";
import "./Cards.css";
import Image from "../assets/restaurant-background.jpg";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { getAllRestaurant } from "../slices/getAllRestaurantSlice";

const ITEMS_PER_PAGE = 12;

const Cardlist = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { allRestaurant, isLoading } = useAppSelector(
    (state) => state.allRestaurant
  );
  useEffect(() => {
    dispatch(getAllRestaurant());
  }, [dispatch]);

  const titleStyle = {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "420px",
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <span key={i} className="star">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            &#9734;
          </span>
        );
      }
    }
    return stars;
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedData = allRestaurant.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allRestaurant.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="title-restaurants" style={titleStyle}>
        <h1 className="all-restaurants">All Restaurants</h1>
      </div>
      <div className="wrapper">
        {paginatedData?.map((item, index) => (
          <div className="card-container" key={index}>
            <div className="image-container">
              <img src={item.cover_image} alt="" />
            </div>
            <div className="card-content">
              <div className="card-title">
                <h3
                  style={{
                    fontSize: "1.5rem",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  {item.restaurant_name}
                </h3>
              </div>
              <div className="card-body">
                <p> {item.isAvailable}</p>
                <p className="rating">
                  {" "}
                  Rating :
                  <span className="star"> {renderStars(item.rating)} </span>
                </p>
              </div>

              <Link to="/allvendorfoods">
                <button
                  onClick={() => localStorage.setItem("vendorid", item.id)}
                >
                  <a className="view">Order Now</a>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cardlist;
