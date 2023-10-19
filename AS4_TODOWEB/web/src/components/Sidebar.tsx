import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
  ListItem,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { HamburgerIcon } from "@chakra-ui/icons";
function Sidebar() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="Open Sidebar"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        size="lg"
      />

      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px"></DrawerHeader>
          <DrawerBody>
            <UnorderedList styleType="none">
              <ListItem>
                <Button
                  variant="link"
                  colorScheme="linkedin"
                  onClick={() => navigate("/")}
                >
                  Main
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  variant="link"
                  colorScheme="linkedin"
                  onClick={() => navigate("/credit")}
                >
                  Credit
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  variant="link"
                  colorScheme="linkedin"
                  onClick={() => navigate("/signout")}
                >
                  Signout
                </Button>
              </ListItem>
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
