import React from "react";
import {
  useToast,
  Alert,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
} from "native-base";
import { ToastStatus } from "../constant/SystemStatus";
const useMessageToast = () => {
  const toast = useToast();

  const showToast = (status, title, description) => {
    let variant;
    switch (status) {
      case ToastStatus.Success:
        variant = ToastStatus.Success;
        break;
      case ToastStatus.Info:
        variant = ToastStatus.Info;
        break;
      case ToastStatus.Warning:
        variant =  ToastStatus.Warning;
        break;
      case ToastStatus.Error:
        variant = ToastStatus.Error;
        break;
      default:
        variant = ToastStatus.Info;
    }

    const toastId = toast.show({
      render: (props) => (
        <Alert variant="left-accent" status={status} w="100%">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  flexShrink={1}
                  color="darkText"
                >
                  {title}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" />}
                _icon={{ color: "darkText" }}
                onPress={() => toast.close(toastId)}
              />
            </HStack>
            <Text px="6" color="darkText">
              {description}
            </Text>
          </VStack>
        </Alert>
      ),
      duration: 1000, // You can adjust the duration as needed
    });

    return toastId;
  };

  return showToast;
};

export default useMessageToast;
