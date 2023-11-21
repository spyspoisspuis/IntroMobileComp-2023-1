import React, { useEffect } from "react";
import {Center,Heading} from "native-base"
import {getSecureValue} from "../storage";
import { useNavigation } from "@react-navigation/native";
const Wrapper = () => {
  const nav = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Retrieve the token from secure storage
        const token = await getSecureValue("token");

        if (token) {
          // Token exists, navigate to the next screen
          nav.navigate("Main"); // Replace 'Home' with the name of your home screen
        } else {
          // Token doesn't exist, redirect to signin screen
          nav.navigate("SignIn"); // Replace 'Signin' with the name of your signin screen
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();

    // The rest of your code here (fetchData, setToDos, etc.)
  }, []);

  return (
    <Center h="full">
        <Heading> Checking your session ... </Heading> 
    </Center>


  );
};


export default Wrapper;
