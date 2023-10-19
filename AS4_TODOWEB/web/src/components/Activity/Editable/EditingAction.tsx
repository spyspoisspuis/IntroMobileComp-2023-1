import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

interface ActionProps {
  Editing: () => void;
  Cancel: () => void;
}
function EditingAction({ Editing, Cancel }: ActionProps) {
  return (
    <ButtonGroup variant="solid" size="sm" spacing={3}>
      <IconButton
        onClick={Editing}
        variant="outline"
        colorScheme="green"
        icon={<CheckIcon />}
        aria-label="confirm"
      />
      <IconButton
        onClick={Cancel}
        colorScheme="red"
        variant="outline"
        icon={<CloseIcon />}
        aria-label="Cancel"
      />
    </ButtonGroup>
  );
}

export default EditingAction
