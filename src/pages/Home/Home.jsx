import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { HomeCarousel } from "../../components/HomeCarousel/HomeCarousel";


export const Home = () => {
    const [count, setCount] = useState(0);
    const [inputData, setInputData] = useState("");
    const password = "contraseña secreta";

    const navigate = useNavigate()
  
    // handlers
    const addCountButtonHandler = () => {
      setCount(count + 1);
    };
  
    const inputHandler = (event) => {
      setInputData(event.target.value);
    };
  

    // useEffects
    useEffect(() => {}, [count]);
  
    useEffect(() => {
      if (inputData === password) {
        console.log("SON IGUALES!");
        setCount(9999);
        navigate("/login")
      }
    }, [inputData]);
  
  return (
    <>
      <HomeCarousel />
    </>
  );
};