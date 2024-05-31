import React, { useEffect, useState } from "react";
import WarehouseForm from "./WarehouseForm";
import WarehouseView from "./WareHouseBlock";
import { getPriceByCategory, getStorageCost, getCreditHrs } from "../util";

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

    const totalCredits = calculateTotalCredits();
    const cost = calculateTotalCost();

    // Call update functions to pass data to parent component
    updateTotalCredits(totalCredits);
    updateEstimatedCost(cost);
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
      <div className="relative bg-blue-900 overflow-hidden text-white h-auto z-50 pt-20">
        <img
          src="assets/glow.svg"
          alt="Hero Section img"
          className="w-[800px] h-auto md:h-[700px] absolute z-0 top-0"
        />
        <img
          src="assets/hero_design.svg"
          alt="Hero Section img"
          className="absolute max-w-[272px] max-h-[272px] md:max-w-[442px] md:max-h-[441px] z-0 -top-20 md:-top-40 md:right-0 -right-20"
        />
        <div className="relative z-10 flex flex-col md:flex-row gap-[23px] md:gap-[135px] max-w-[700px] mx-auto justify-center items-center text-center">
          <div>
            <div className="flex flex-col z-50 text-2xl">
              <span className="md:text-base text-sm">
                Total Credits Cosumed:
              </span>{" "}
              <span className="text-[40px] leading-[48.76px] md:text-[80px] md:leading-[97.52px] md:font-medium">
                {calculateTotalCredits()}
              </span>
            </div>
            <p className="md:text-xl text-xs font-thin">per month</p>
          </div>
          <div>
            <div className="flex flex-col z-50 text-2xl">
              <span className="md:text-base text-sm">Estimated Cost: </span>
              <span className="text-[40px] leading-[48.76px] md:text-[80px] md:leading-[97.52px] md:font-medium">
                {calculateTotalCost()}
              </span>
            </div>
            <p className="md:text-xl text-xs font-thin">per month</p>
          </div>
        </div>
        <p className="text-xs py-10 md:max-w-[700px] md:mx-auto px-5 md:px-0">
          *This calculator aims to provide you a ball park estimate for what to
          expect as a monthly cost of Snowflake. Actual costs may vary.
        </p>
      </div>
      {isAddingNew && (
        <WarehouseForm onSave={handleSave} onCancel={handleCancel} />
      )}
      {warehouses.map((warehouse, index) => (
        <div className="mt-[45px] px-5 md:px-5" key={warehouse + index}>
          {editingIndex === index ? (
            <WarehouseForm
              defaultValues={warehouse}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <div className="mb-6">
              <div className="flex text-lg mb-3 max-w-[800px] mx-auto px-5 md:px-0">
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
      <div className="mx-auto py-8">
        <button
          className="border border-[#5C409C] text-[#5C409C] cursour-pointer rounded-md px-4 py-2"
          onClick={() => {
            setIsAddingNew(true);
            setEditingIndex(-1);
          }}
        >
          Add another warehouse
        </button>
      </div>
    </div>
  );
}

export default WarehouseManager;
