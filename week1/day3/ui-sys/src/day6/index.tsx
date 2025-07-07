import { useState } from "react";
import MButton from "../widgets/common/m_button";
import ListProducts from "./list";

const ListIndex = () => {
  const [reload, setReload] = useState(false);
  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <MButton
        children="reload"
        className="capitalize"
        onClick={setReload.bind(null, !reload)}
      />
      <ListProducts reload={reload} />
    </div>
  );
};

export default ListIndex;
