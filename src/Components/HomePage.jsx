import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const HomePage = () => {
  const [product, setProduct] = useState();

  const router = useNavigate();

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products` //Pagination Id
        );

        if (response) {
          setProduct(response.data);
        } else {
          console.log("Response Not Found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fechData();
  }, []);

  // console.log(product);

  const addToCart = (e) => {
    let isLogin = JSON.parse(localStorage.getItem("currentUser"));

    if (!isLogin) return alert("Login to add Cart");
    
    console.log(isLogin["current-user-email"]);

    let userInfo = JSON.parse(localStorage.getItem("userData"));

    for (let i = 0; i < userInfo.length; i++) {
      if (isLogin["current-user-email"] === userInfo[i].email) {

        if(userInfo[i].cart === undefined){
          userInfo[i].cart = [e];
        }else{
          userInfo[i].cart.push(e);
        }
        localStorage.setItem("userData", JSON.stringify(userInfo));
      } 
    }

    console.log(userInfo);


    alert("Add to Cart");
  };

  return (
    <>
      {product ? (
        product.map((e, i) => (
          <div key={i}>
            <img src={e.image} alt="productImage"></img>
            <p>{e.category}</p>
            <p>{e.description}</p>
            <p>${e.price}</p>
            <button onClick={() => addToCart(e)}>Add to Cart</button>
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default HomePage;
