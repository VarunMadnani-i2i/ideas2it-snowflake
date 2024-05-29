import React from 'react';
import { fields } from '../constants';

function FieldView({ label, data, key }) {
  return (
    <div className="flex flex-col" key={key}>
      <strong>{label}</strong> {data}
    </div>
  );
}
function WarehouseView({ warehouse }) {
  return (
    <div className="bg-[#F9F9FF] p-4 rounded-2xl">
      <div className="grid grid-cols-3 gap-4">
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
