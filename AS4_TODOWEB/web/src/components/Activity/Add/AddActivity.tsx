import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import AddForm from "./AddForm";
import CustomToast from "../../MessagesToast";

interface AddActivityProps {
  SubmitForm: (name: string, when: string) => void;
}
function AddActivity({ SubmitForm }: AddActivityProps) {
  const { addToast } = CustomToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const submit = (name: string, when: string) => {
    //* validate input
    if (name == "" || when == "") {
      addToast({ description: "กรุณากรอกข้อมูลให้ครบ", status: "warning" });
      return;
    }
    onClose();
    SubmitForm(name, when);
  };
  return (
    <>
      <Button colorScheme="whatsapp" w="full" h="full" onClick={onOpen}>
        Add Activity
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddForm SubmitForm={submit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddActivity;
