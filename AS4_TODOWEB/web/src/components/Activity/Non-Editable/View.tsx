import { TodoModels } from "../../../models/activity";
import { Td } from "@chakra-ui/react";
import Action from "./Action";
import { formatDateThai } from "../../../functions/function";

function View(props: {
  data: TodoModels;
  SetEditing: () => void;
  Deleting: () => void;
}) {
  const thaiDateTime = formatDateThai(props.data.when);
  return (
    <>
      <Td>{props.data.name}</Td>
      <Td>{thaiDateTime}</Td>
      <Action Editing={props.SetEditing} Deleting={props.Deleting} />
    </>
  );
}

export default View;
