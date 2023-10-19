// import { useToast } from "@chakra-ui/react";
import { ToastStatus } from "../constant";

interface MessageToastProps {
  description: string;
  status: ToastStatus;
}



import { useToast } from "@chakra-ui/react";

function CustomToast () {
  const toast = useToast();
  // types are: "success", "info", "warning", "error"

  const addToast = (newRes: MessageToastProps) => {
    toast({
      description: newRes.description,
      status: newRes.status,
      position: "top",
      isClosable: true,
      duration: 5000,
      variant: "left-accent",
    });
  };

  return { addToast };
}

export default CustomToast;