import "./Cards.css";
import Image from "../assets/restaurant-background.jpg";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { useEffect } from "react";
// import { getAllRestaurant } from "../slices/getAllRestaurantSlice";

const Cards = () => {
  // const dispatch = useAppDispatch();
  // const { allRestaurant, isLoading } = useAppSelector(
  //   (state) => state.allRestaurant
  // );

  // useEffect(() => {
  //   dispatch(getAllRestaurant());
  // }, [dispatch]);
  return (
    <div className = "wrapper">
      {/* <div className="card-container">
        <div className="image-container">
          <img src={Image} alt="" />
        </div>
        <div className="card-content">
          <div className="card-title">
            <h3 style={{ fontSize: '1.5rem', color: 'green' }} >Vendors </h3>
          </div>
          <div className="card-body">
            <p>tedshjjkzkz,µ</p>
          </div>
          <div className="btn"></div>

          <button>
            <a>view more</a>
          </button>
        </div>
      </div> */}

      <div className="card-container">
        <div className="image-container">
          <img src={Image} alt="" />
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
              Vendors{" "}
            </h3>
          </div>
          <div className="card-body">
            <p>Bringing flavors to life, making every meal....</p>
          </div>
          <div className="btn"></div>

          <button>
            <a className="view">view more</a>
          </button>
        </div>
      </div>
      <div className="card-container">
        <div className="image-container">
          <img src={Image} alt="" />
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
              Vendors{" "}
            </h3>
          </div>
          <div className="card-body">
            <p>Bringing flavors to life, making every meal....</p>
          </div>
          <div className="btn"></div>

          <button>
            <a className="view">view more</a>
          </button>
        </div>
      </div>
      <div className="card-container">
        <div className="image-container">
          <img src={Image} alt="" />
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
              Vendors
            </h3>
          </div>
          <div className="card-body">
            <p>Bringing flavors to life, making every meal....</p>
          </div>
          <div className="btn"></div>

          <button>
            <a className="view">view more</a>
          </button>
        </div>
      </div>
      <div className="card-container">
        <div className="image-container">
          <img src={Image} alt="" />
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
              Vendors
            </h3>
          </div>
          <div className="card-body">
            <p>Bringing flavors to life, making every meal....</p>
          </div>
          <div className="btn"></div>

          <button>
            <a className="view">view more</a>
          </button>
        </div>
      </div>
      <div className="card-container">
        <div className="image-container">
          <img src={Image} alt="" />
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
              Vendors{" "}
            </h3>
          </div>
          <div className="card-body">
            <p>Bringing flavors to life, making every meal....</p>
          </div>
          <div className="btn"></div>

          <button>
            <a className="view">view more</a>
          </button>
        </div>
      </div>
      <div className="card-container">
        <div className="image-container">
          <img src={Image} alt="" />
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
              Vendors
            </h3>
          </div>
          <div className="card-body">
            <p>Bringing flavors to life, making every meal....</p>
          </div>
          <div className="btn"></div>

          <button>
            <a className="view">view more</a>
          </button>
        </div>
      </div>
      <div className="card-container">
        <div className="image-container">
          <img src={Image} alt="" />
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
              Vendors
            </h3>
          </div>
          <div className="card-body">
            <p>Bringing flavors to life, making every meal....</p>
          </div>
          <div className="btn"></div>

          <button>
            <a className="view">view more</a>
          </button>
        </div>
      </div>

      <div className="card-container">
        <div className="image-container">
          <img src={Image} alt="" />
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
              Vendors
            </h3>
          </div>
          <div className="card-body">
            <p>Bringing flavors to life, making every meal....</p>
          </div>
          <div className="btn"></div>

          <button>
            <a className="view">view more</a>
          </button>
        </div>
      </div>

      <div className="card-container">
        <div className="image-container">
          <img src={Image} alt="" />
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
              Vendors
            </h3>
          </div>
          <div className="card-body">
            <p>Bringing flavors to life, making every meal...</p>
          </div>
          <div className="btn"></div>

          <button>
            <a className="view">view more</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
