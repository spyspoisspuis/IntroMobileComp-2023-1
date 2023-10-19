import { Center, useColorModeValue } from "@chakra-ui/react";
import { AuthenForm, CustomToast } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";
function ResetPassword() {
  const navigate = useNavigate();
  const { addToast } = CustomToast();

  const resetPasswordSubmit = (username: string, password: string) => {
    axios
      .put("http://localhost:8100/reset-password", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.result == false) {
          addToast({
            description: "username not found",
            status: "error",
          });
        } else {
          addToast({
            description: "change password success",
            status: "success",
          });
          const token = res.data.token;
          setCookie("token", token);
          navigate("/");
        }
      });
  };

  return (
    <Center
      w="full"
      minH="100vh"
      bg={useColorModeValue("gray.500", "gray.800")}
    >
      <Center>
        <AuthenForm
          submit={resetPasswordSubmit}
          title={"reset your password"}
          isShowForgetPassword={false}
        />
      </Center>
    </Center>
  );
}

export default ResetPassword;
