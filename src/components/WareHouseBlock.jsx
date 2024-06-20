import React from "react";
import { fields } from "../constants";

function FieldView({ label, data, key }) {
  return (
    <div className="flex flex-col" key={key}>
      <strong className="text-xs font-medium text-[#474747]">{label}</strong>{" "}
      <span className="font-medium">{data}</span>
    </div>
  );
}

// bg-[#F9F9FF]
function WarehouseView({ warehouse }) {
  return (
    <div className="bg-[#F9F9FF] rounded-2xl py-5 max-w-[820px] mx-auto pl-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-[23px] gap-x-10 max-w-[800px] mx-auto">
        {fields.map(
          (e) =>
            warehouse[e.key] && (
              <FieldView label={e.label} key={e.key} data={warehouse[e.key]} />
            )
        )}
      </div>
    </div>
  );
}

export default WarehouseView;
