import { ButtonGroup, IconButton,Td } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface ActionProps {
  Editing: () => void;
  Deleting: () => void;
}
function Action({Editing,Deleting}: ActionProps) {
  return (
    <Td>
      <ButtonGroup variant="solid" size="sm" spacing={3}>
        <IconButton
          onClick={Editing}
          colorScheme="blue"
          icon={<EditIcon />}
          aria-label="Edit"
          variant="solid"
        />
        <IconButton
          colorScheme="red"
          variant="solid"
          icon={<DeleteIcon />}
          aria-label="Delete"
          onClick={Deleting}
        />
      </ButtonGroup>
    </Td>
  );
}

export default Action;
