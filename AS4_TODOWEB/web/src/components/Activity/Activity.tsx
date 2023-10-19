import { Tr } from "@chakra-ui/react";
import { TodoModels } from "../../models/activity";
import View from "./Non-Editable/View";
import EditableRows from "./Editable/EditableRows";
import { useState } from "react";
interface ActivityProps {
  data: TodoModels;
  Editing: (id: number, name: string, when: string) => void;
  Deleting: (id: number) => void;
}
function Activity({ data, Editing, Deleting }: ActivityProps) {
  const [bg, SetBg] = useState("white");
  const [isEditing, SetIsEditing] = useState(false);
  const SetEditing = () => {
    SetIsEditing(!isEditing);
    SetBg(bg === "white" ? "gray.100" : "white");
  };

  const ConfirmEditing = (name: string, when: string) => {
    SetEditing();
    Editing(data.ID, name, when);
  };

  const Deletings = () => {
    Deleting(data.ID)
  };
  
  return (
    <Tr bg={bg}>
      {isEditing ? (
        <EditableRows
          data={data}
          Cancel={SetEditing}
          SetEditing={ConfirmEditing}
        />
      ) : (
        <View data={data} SetEditing={SetEditing} Deleting={Deletings} />
      )}
    </Tr>
  );
}

export default Activity;
