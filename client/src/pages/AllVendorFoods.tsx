import CardSection from "../components/CardSection";
import "../styles/allVendorFoods.css";
import Header from "../components/Header";
import HeaderNotAuth from "../components/HeaderNotAuth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getSingleVendor } from "../slices/singleVendorSlice";
import { getVendorFoods } from "../slices/vendorFoodsSlice";
import { useEffect } from "react";

const AllVendorFoods = () => {
  const dispatch = useAppDispatch();

  const { vendor } = useAppSelector((state) => state.getSingleVendor);

  const { Foods } = useAppSelector((state) => state.getVendorFoods);

  useEffect(() => {
    // const vendorId = localStorage.getItem("vndorid");
    dispatch(getSingleVendor()).unwrap();

    dispatch(getVendorFoods()).unwrap();
  }, [dispatch]);

  return (
    <>
      {localStorage.getItem("token") ? <Header /> : <HeaderNotAuth />}
      <div>
        <div
          className="cover-photo"
          style={{ backgroundImage: `url(${vendor.cover_image})` }}
        >
          {/* <img src={cover_photo} alt="" /> */}
        </div>
        <div className="vendorInfo">
          <h2>{vendor.restaurant_name}</h2>
          <p>⭐️ {vendor.rating} | Min order: N2500 | delivery: N1500</p>
        </div>
        <hr />
      </div>

      {Foods.map((item, i) => (
        <CardSection
          key={i}
          name={item.name}
          description={item.description}
          price={item.price}
          item={item}
          food_image={item.food_image}
        />
      ))}
    </>
  );
};

export default AllVendorFoods;
