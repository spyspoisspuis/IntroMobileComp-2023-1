import { AuthenForm, CustomToast } from "../components";
import { Center, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";

function Signin() {
  const navigate = useNavigate();
  const { addToast } = CustomToast();

  const loginsubmit = (username: string, password: string) => {
    axios
      .post("http://localhost:8100/user/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.result == false) {
          addToast({
            description: "username or password incorrect",
            status: "warning",
          });
        } else {
          addToast({ description: "login success", status: "success" });
          const token = res.data.token;
          setCookie("token", token);
          navigate("/");
        }
      });
  };
  return (
    <Center w="full" minH="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <Center>
        <AuthenForm
          submit={loginsubmit}
          title={"Sign in to your account"}
          isShowForgetPassword={true}
        />
      </Center>
    </Center>
  );
}

export default Signin;
