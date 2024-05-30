import React from "react";
import { fields } from "../constants";

function FieldView({ label, data, key }) {
  return (
    <div className="flex flex-col" key={key}>
      <strong className="text-xs text-[#474747] font-base">{label}</strong>{" "}
      {data}
    </div>
  );
}
function WarehouseView({ warehouse }) {
  return (
    <div className="bg-[#F9F9FF] rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[820px] mx-auto">
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
