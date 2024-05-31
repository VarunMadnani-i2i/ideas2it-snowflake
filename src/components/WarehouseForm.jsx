import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { fieldKey, fields, pricing } from "../constants";

const labelClass = "text-sm text-[#474747]";
const formGroup = "flex flex-col gap-1";

const NumberInput = ({
  min,
  max,
  step,
  value,
  onChange,
  unitOptions,
  unit,
  onUnitChange,
}) => {
  const decrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  const increment = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  return (
    <div className="flex items-center justify-between border-2 border-gray-300 rounded-md w-36 px-2 py-2">
      {!unitOptions && (
        <button type="button" onClick={decrement}>
          <img
            className="w-[14px] h-[14px]"
            src={
              value === min || value === 0
                ? "assets/minus.svg"
                : "assets/darkMinus.png"
            }
            alt="minus button"
          />
        </button>
      )}
      <input
        type="number"
        value={value || min}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        min={min}
        max={max}
        className="text-center appearance-none text-custom_purple"
        style={{ MozAppearance: "textfield" }}
      />
      {!unitOptions && (
        <button type="button" onClick={increment}>
          <img
            className="w-[14px] h-[14px]"
            src="assets/plus.svg"
            alt="plus button"
          />
        </button>
      )}
      {unitOptions && (
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="ml-2 appearance-none text-custom_purple font-medium"
          style={{
            MozAppearance: "none",
            WebkitAppearance: "none",
            appearance: "none",
          }}
        >
          {unitOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};



const FieldGenerator = ({ register, field, watch, setValue }) => {
  const platform = watch(fieldKey.PLATFORM);
  const value = watch(field.key);
  const unitValue = watch(`${field.key}_unit`);

  if (field.key === fieldKey.GEOGRAPHY && platform) {
    const geoLocations = pricing.Providers[platform]?.geoLocations || {};
    field.values = Object.entries(geoLocations).map(([key, location]) => ({
      value: key,
      name: location.displayName,
    }));
  }

  const unitOptions =
    field.label === "Est. storage per month "
      ? ["TB", "GB", "MB"]
      : field.label === "Duration of each session"
      ? ["mins", "hrs"]
      : null;

  return (
    <div className={formGroup}>
      <label className={labelClass} htmlFor={field.key}>
        {field.label}
      </label>
      <div className="text-custom_purple">
        {field.type === 1 && field.label === "Geography" && (
          <select
            className="bg-custom_purple bg-opacity-5 py-[6px] pl-3 pr-[100px] md:pr-[140px]"
            {...register(field.key)}
          >
            {field.values.map((e) => (
              <option key={e.value} value={e.value}>
                {e.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {field.type === 1 && field.label !== "Geography" && (
        <div className="flex flex-wrap gap-4 md:flex-row">
          {field.values.map((e, index) => (
            <div key={e.value} className="flex items-center">
              <input
                type="radio"
                id={`${field.key}-${e.value}`}
                {...register(field.key)}
                value={e.value}
                className="hidden peer"
              />
              <label
                htmlFor={`${field.key}-${e.value}`}
                className={`w-auto py-[6px] px-3 rounded-md peer-checked:bg-custom_purple peer-checked:text-white ${
                  e.value !== watch(field.key)
                    ? "bg-custom_purple bg-opacity-5 text-custom_purple"
                    : ""
                }`}
              >
                {e.name}
              </label>
            </div>
          ))}
        </div>
      )}
      {field.type === 2 && (
        <NumberInput
          min={field.min}
          max={field.max}
          step={field.step}
          value={value || 0}
          onChange={(val) => setValue(field.key, val)}
          unitOptions={unitOptions}
          unit={unitValue || (unitOptions ? unitOptions[0] : "")}
          onUnitChange={(unit) => setValue(`${field.key}_unit`, unit)}
        />
      )}
    </div>
  );
};



function WarehouseForm({ defaultValues, onSave, onCancel }) {
  const [showInfo, setShowInfo] = useState(true);
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    onSave(data);
    reset();
    setShowInfo(false);
  };

  return (
    <form
      className="bg-[#F9F9FF] pt-[20px] mt-[20px] rounded-2xl lg:px-0 mx-auto max-w-[820px] mb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 pl-5 gap-y-[27px] gap-x-[41px] ">
        {fields
          .filter((field) => field.type !== 2)
          .map((field) => (
            <FieldGenerator
              key={field.key}
              register={register}
              field={field}
              watch={watch}
              setValue={setValue}
            />
          ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 pl-5 gap-y-[27px] gap-x-[41px] mt-10 ">
        {fields
          .filter((field) => field.type === 2)
          .map((field) => (
            <FieldGenerator
              key={field.key}
              register={register}
              field={field}
              watch={watch}
              setValue={setValue}
            />
          ))}
      </div>
      <div className="mt-[39px] flex gap-10 pb-5  justify-center">
        <button
          className="flex gap-2 py-[11px] px-4 border-2 border-custom_purple bg-custom_purple bg-opacity-5 rounded-md text-custom_purple font-medium"
          type="submit"
        >
          Calculate
          <img src="assets/rightArrow.png" alt="arrow" className="w-6 h-auto" />
        </button>
      </div>
    </form>
  );
}

export default WarehouseForm;
