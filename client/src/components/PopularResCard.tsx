//import Cards from "./Cards"
import { Link } from "react-router-dom";
import "./Cards.css";
import Image from "../assets/1restuarant.jpg";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { getPopularRestaurant } from "../slices/popularRestaurantSlice";


const ITEMS_PER_PAGE = 12;

const PopularResCard = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { popularRestaurant, isLoading } = useAppSelector(
    (state) => state.popularRestaurant
  );
  useEffect(() => {
    dispatch(getPopularRestaurant());
  }, [dispatch]);

  const titleStyle = {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover", // Adjust as needed
    backgroundPosition: "center", // Adjust as needed
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

  // Slice the data for the current page
  const paginatedData = popularRestaurant.slice(startIndex, endIndex);

  const totalPages = Math.ceil(popularRestaurant.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="title-popular-restaurants" style={titleStyle}>
        <h1 className="popular-res">Popular Restaurants</h1>
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
                    color: "darkgreen",
                    fontWeight: "bold",
                  }}
                >
                  {item.restaurant_name}{" "}
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

              <div className="btn"></div>

              <Link to="/allvendorfoods">
                <button
                  onClick={() => localStorage.setItem("vendorid", item.id)}
                >
                  <a className="view">Order now</a>
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
  <span>Page {currentPage} of {totalPages}</span>
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

export default PopularResCard;
