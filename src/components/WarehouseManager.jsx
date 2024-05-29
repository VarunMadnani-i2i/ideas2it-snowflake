import React, { useEffect, useState } from 'react';
import WarehouseForm from './WarehouseForm';
import WarehouseView from './WareHouseBlock';
import { getPriceByCategory, getStorageCost, getCreditHrs } from '../util';

function WarehouseManager({ initialWarehouseData }) {
  const [warehouses, setWarehouses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isAddingNew, setIsAddingNew] = useState(false); // New state for adding warehouses

  useEffect(() => {
    if (initialWarehouseData) {
      setWarehouses([initialWarehouseData]);
    }
  }, [initialWarehouseData]);

  const handleSave = (data) => {
    if (editingIndex >= 0) {
      // Update existing warehouse
      const updatedWarehouses = warehouses.map((item, index) =>
        index === editingIndex ? data : item
      );
      setWarehouses(updatedWarehouses);
    } else if (isAddingNew) {
      // Add new warehouse
      setWarehouses([...warehouses, data]);
    }
    setEditingIndex(-1);
    setIsAddingNew(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setIsAddingNew(false);
  };

  const handleDelete = (index) => {
    const updatedWarehouses = warehouses.filter((_, i) => i !== index);
    setWarehouses(updatedWarehouses);
  };

  const handleCancel = () => {
    setEditingIndex(-1);
    setIsAddingNew(false);
  };

  const calculateTotalCredits = () => {
    return warehouses.reduce((total, warehouse) => {
      const totalHrs =
        (Number(warehouse.sessionDuration) *
          Number(warehouse.sessionsPerDay) *
          (Number(warehouse.daysPerWeek) * 4.5)) /
        60;

      const credits = getCreditHrs(warehouse.size) * totalHrs;
      console.log(getCreditHrs(warehouse.size), totalHrs);
      return total + credits;
    }, 0);
  };

  const calculateTotalCost = () => {
    return warehouses.reduce((total, warehouse) => {
      const totalHrs =
        (Number(warehouse.sessionDuration) *
          Number(warehouse.sessionsPerDay) *
          (Number(warehouse.daysPerWeek) * 4.5)) /
        60;
      const credits = getCreditHrs(warehouse.size) * totalHrs;
      const pricePerCredit = getPriceByCategory(
        warehouse.cloudPlatform,
        warehouse.category,
        warehouse.geography
      );
      const storageCost = getStorageCost(
        warehouse.cloudPlatform,
        warehouse.storageType,
        warehouse.geography
      );
      const charges =
        credits * pricePerCredit +
        storageCost * Number(warehouse.estimatedStorage);

      console.log({ totalHrs, credits, pricePerCredit, storageCost, charges });
      return total + charges;
    }, 0);
  };
  return (
    <div className="flex flex-col">
      <div>
        <div>Total Credits: {calculateTotalCredits()}</div>
        <div>Total Cost: {calculateTotalCost()}</div>
      </div>
      {isAddingNew && (
        <WarehouseForm onSave={handleSave} onCancel={handleCancel} />
      )}
      {warehouses.map((warehouse, index) => (
        <div key={warehouse + index}>
          {editingIndex === index ? (
            <WarehouseForm
              defaultValues={warehouse}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <div className="mb-6">
              <div className="flex text-lg mb-2">
                <p>Warehouse {index + 1}</p>
                <div className="ml-auto text-sm underline text-[#5C409C] flex gap-4">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
              <WarehouseView warehouse={warehouse} />
              {/* <div>{JSON.stringify(warehouse)}</div> */}
            </div>
          )}
        </div>
      ))}
      <button
        className="mx-auto border border-[#5C409C] text-[#5C409C] cursour-pointer rounded-md px-4 py-2"
        onClick={() => {
          setIsAddingNew(true);
          setEditingIndex(-1);
        }}
      >
        Add another warehouse
      </button>
    </div>
  );
}

export default WarehouseManager;
