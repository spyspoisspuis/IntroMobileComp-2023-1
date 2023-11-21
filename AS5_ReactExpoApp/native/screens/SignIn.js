import {
  Box,
  Heading,
  Center,
  VStack,
  FormControl,
  Input,
  Button,
  Pressable,
  Icon,
  Text,
} from "native-base";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useMessageToast from "../hook/messageToast";
import { ToastStatus } from "../constant/SystemStatus";
import { login, ResetPassword } from "../api";
const SignIn = () => {
  const messageToast = useMessageToast();

  const nav = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  let color = isForgetPassword ? "amber" : "indigo";

  const formSubmit = async () => {
    if (isForgetPassword) {
      // TODO: Connect with backend for forget password
      try {
        const result = await ResetPassword(username, password);
        messageToast(ToastStatus.Success, "Success", "change password success");
        nav.navigate("Main");
      } catch (error) {
        messageToast(
          ToastStatus.Error,
          "Failed",
          error.message || "An error occurred"
        );
      }
    } else {
      try {
        const result = await login(username, password);
        messageToast(ToastStatus.Success, "Success", "Login success");
        nav.navigate("Main");
      } catch (error) {
        messageToast(
          ToastStatus.Error,
          "Login Failed",
          error.message || "An error occurred"
        );
      }
    }
  };

  return (
    <Center h="100%" w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          {isForgetPassword ? "Reset your password" : "Welcome"}
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          {isForgetPassword
            ? "Enter username and new password"
            : "Sign in to continue"}
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              placeholder="username"
              size="md"
              onChangeText={(username) => setUsername(username)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              {isForgetPassword ? "New Password" : "Password"}
            </FormControl.Label>
            <Input
              size="md"
              type={show ? "text" : "password"}
              onChangeText={(password) => setPassword(password)}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
            />
            <Pressable
              onPress={() => setIsForgetPassword(!isForgetPassword)}
              alignSelf="flex-end"
              mt="1"
            >
              <Text fontSize="xs" fontWeight="500" color={`${color}.500`}>
                {isForgetPassword ? "Back to login" : "Forget Password?"}
              </Text>
            </Pressable>
          </FormControl>
          <Button mt="2" colorScheme={color} onPress={formSubmit}>
            {isForgetPassword ? "Reset password" : "Sign in"}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignIn;
