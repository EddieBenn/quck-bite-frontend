import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { getUserAllFoods } from "../slices/userGetAllFoodSlice";
import "./Cards.css";
import { Link } from "react-router-dom";
import Image1 from "../assets/all-foods.jpg";

const ITEMS_PER_PAGE = 12;

const AllFoodsCard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const { allFoods /*isLoading*/ } = useAppSelector(
    (state) => state.userAllFood
  );
  useEffect(() => {
    dispatch(getUserAllFoods());
  }, [dispatch]);

  const titleStyle = {
    backgroundImage: `url(${Image1})`,
    backgroundSize: "cover",
    backgroundPosition: "cover",
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

  const paginatedData = allFoods.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allFoods.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="title-AllFoods" style={titleStyle}>
        <h1 className="all-foods">All Foods</h1>
      </div>
      <div className="wrapper">
        {paginatedData?.map((item, index) => (
          <div className="card-container">
            <div className="image-container">
              <img src={item.food_image} alt="" />
            </div>
            <div className="card-content" key={index}>
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
export default AllFoodsCard;
