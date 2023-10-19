import { removeCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Center, Spinner, VStack, Text } from "@chakra-ui/react";
import { CustomToast } from "../components";
function Signout() {
  const navigate = useNavigate();
  const { addToast } = CustomToast();

  useEffect(() => {
    removeCookie("token");
    addToast({ description: "logout success", status: "success" });
    navigate("/");
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Center minH="100vh" w="full">
      <VStack spacing={4}>
        <Spinner size="xl" />
        <Text>กำลังออกจากระบบ</Text>
      </VStack>
    </Center>
  );
}

export default Signout;
