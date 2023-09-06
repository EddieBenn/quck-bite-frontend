import { Link } from "react-router-dom";
import "./Cards.css";
import Image1 from "../assets/1food.jpg";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPopularFood } from "../slices/popularSlice";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 12;
const PopularFoodsCard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();

  const { popularFood, isLoading } = useAppSelector(
    (state) => state.popularFood
  );
  useEffect(() => {
    dispatch(getPopularFood());
  }, [dispatch]);

  const titleStyle = {
    backgroundImage: `url(${Image1})`,
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

  const paginatedData = popularFood.slice(startIndex, endIndex);

  const totalPages = Math.ceil(popularFood.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  //const Image2 = popularFood.map((item) => item.food_image)
  // const VendorName = popularFood.map((item) => item.name)
  // const description = popularFood.map((item) => item.description)
  return (
    <div>
      <div className="title-popularfoods" style={titleStyle}>
        <h1 className="popular-foods">Popular Foods</h1>
      </div>
      <div className="wrapper">
        {paginatedData?.map((item, index) => (
          <div className="card-container" key={index}>
            <div className="image-container">
              <img src={item.food_image} alt="" />
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
                  {item.name}
                </h3>
              </div>
              <div className="card-body">
                <p>
                  {" "}
                  {item.description} <br />
                  Price : {item.price}{" "}
                </p>
              </div>
              <div>
                <p className="rating">
                  {" "}
                  Rating :
                  <span className="star"> {renderStars(item.rating)} </span>
                </p>
              </div>

              <Link to="/allvendorfoods">
                <button
                  onClick={() =>
                    localStorage.setItem("vendorid", item.vendorId)
                  }
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

export default PopularFoodsCard;
