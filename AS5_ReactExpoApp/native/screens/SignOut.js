import React from "react";
import { Button, Modal, Center, NativeBaseProvider,Box,VStack,Heading,HStack,Flex } from "native-base";
import { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { deleteSecureValue } from "../storage";
const SignOut = () => {
  const nav = useNavigation();

  const cancel = () => {
    nav.navigate("Main")
  }
  const confirm = () => {
    deleteSecureValue("token")
    nav.navigate("SignIn")
  }

  return (
    <Center h="full">
      <Flex w="70%" h="30%" justify="space-around" align="center">
        <Heading>ต้องการออกจากระบบ ?</Heading>
        <HStack space={4}>
          <Button
            px="8"
            size="lg"
            variant="outline"
            colorScheme="blueGray"
            onPress={cancel}
          >
            ไม่ใช่
          </Button>
          <Button px="8" size="lg" onPress={confirm}>
            ใช่
          </Button>
        </HStack>
      </Flex>
     
    </Center>
  );
};

export default SignOut