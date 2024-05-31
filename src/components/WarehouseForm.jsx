import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { fieldKey, fields, pricing } from "../constants";

const labelClass = "text-sm text-[#474747]";
const formGroup = "flex flex-col gap-1";

const NumberInput = ({ min, max, step, value, onChange }) => {
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
    <div className="flex items-center justify-between gap-2 border-2 rounded-md w-32 px-2 py-2">
      <button type="button" onClick={decrement}>
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        min={min}
        max={max}
        className="w-15 text-center appearance-none"
        style={{ MozAppearance: "textfield" }}
      />
      <button type="button" onClick={increment}>
        +
      </button>
    </div>
  );
};

const FieldGenerator = ({ register, field, watch, setValue }) => {
  const platform = watch(fieldKey.PLATFORM);
  if (field.key === fieldKey.GEOGRAPHY && platform) {
    const geoLocations = pricing.Providers[platform]?.geoLocations || {};
    field.values = Object.entries(geoLocations).map(([key, location]) => ({
      value: key,
      name: location.displayName,
    }));
  }

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
          value={watch(field.key) || 0}
          onChange={(val) => setValue(field.key, val)}
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
      className="bg-[#F9F9FF] pt-[25px] rounded-2xl px-5 lg:px-0 max-w-[820px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[27px] gap-x-[41px] ">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-[27px] gap-x-[41px] mt-10 ">
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
      <div className="mt-[39px] flex gap-10 mb-[49px] justify-center">
        <button
          className="py-[11px] px-4 border-2 border-custom_purple bg-custom_purple bg-opacity-5 rounded-md text-custom_purple"
          type="submit"
        >
          Save
        </button>
        <button
          className="py-[11px] px-4 border-2 border-custom_purple bg-custom_purple bg-opacity-5 rounded-md text-custom_purple"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default WarehouseForm;
