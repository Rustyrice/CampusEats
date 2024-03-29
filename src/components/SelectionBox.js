import React from "react";
import { Checkbox } from "@material-tailwind/react";

const SelectionBox = (props) => {
  if (props.checked) {
    return (
      <div>
        <div data-testid="tickedCheckbox" className="hover:bg-green-100 border-2 rounded-md mt-5 border-gray-500">
          <Checkbox
            id={props.desc}
            defaultChecked
            color="green"
            label={props.desc}
            onClick={props.onClick}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="hover:bg-green-100 border-2 rounded-md mt-5 border-gray-500">
        <Checkbox id={props.desc} color="green" label={props.desc} onClick={props.onClick} />
      </div>
    </div>
  );
};

export default SelectionBox;
