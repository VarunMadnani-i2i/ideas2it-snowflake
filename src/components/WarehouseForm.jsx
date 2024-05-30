import React from "react";
import { useForm } from "react-hook-form";
import { fieldKey, fields, pricing } from "../constants";

const labelClass = "text-sm text-[#474747]";
const formGroup = "flex flex-col gap-1";

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
        <div className="flex flex-wrap md:flex-none gap-4">
          {field.values.map((e, index) => (
            <div key={e.value} className="flex items-center">
              <input
                type="radio"
                id={`${field.key}-${e.value}`}
                {...register(field.key)}
                value={e.value}
                defaultChecked={index === 0}
                className="hidden peer"
              />
              <label
                htmlFor={`${field.key}-${e.value}`}
                className={`w-auto py-[6px] px-3 rounded-md peer-checked:bg-custom-purple bg-custom_purple peer-checked:opacity-100 ${
                  e.value === watch(field.key)
                    ? "text-white"
                    : "text-custom_purple bg-opacity-5"
                }`}
              >
                {e.name}
              </label>
            </div>
          ))}
        </div>
      )}
      {field.type === 2 && (
        <div className="flex items-center justify-between gap-2 border-2 rounded-md w-32 px-2 py-2">
          {field.label === "No. of Sessions per day" ||
          field.label === "No. of days of week" ? (
            <>
              <button
                type="button"
                onClick={() => {
                  const currentValue = watch(field.key) || field.min;
                  setValue(field.key, Math.max(field.min, currentValue - 1));
                }}
              >
                -
              </button>
              <input
                type="number"
                {...register(field.key, { valueAsNumber: true })}
                step={field.step}
                min={field.min}
                max={field.max}
                className="w-15 text-center"
              />
              <button
                type="button"
                onClick={() => {
                  const currentValue = watch(field.key) || field.min;
                  setValue(field.key, Math.min(field.max, currentValue + 1));
                }}
              >
                +
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 justify-between w-32">
              <input
                type="number"
                {...register(field.key, { valueAsNumber: true })}
                step={field.step}
                min={field.min}
                max={field.max}
                className="w-15 text-center"
              />
              <select
                className="appearance-none text-custom_purple"
                {...register(`${field.key}_unit`)}
              >
                {field.label !== "Est. storage per month" && (
                  <>
                    <option value="TB">TB</option>
                    <option value="GB">GB</option>
                    <option value="MB">MB</option>
                  </>
                )}
                {field.label === "Duration of each session" && (
                  <>
                    <option value="mins">Mins</option>
                    <option value="hrs">Hrs</option>
                  </>
                )}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function WarehouseForm({ defaultValues, onSave, onCancel }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    onSave(data);
    reset();
  };

  return (
    <form
      className="bg-[#F9F9FF] pt-[25px] rounded-2xl px-5 lg:px-0 max-w-[820px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h2 className="pt-10 pb-6 text-2xl">
          Get your answers with our Snowflake Cost Calculator and take an
          informed decision!
        </h2>
        <p className="pb-[25px] text-xl">
          Enter your warehouse usage details to calculate the cost
        </p>
      </div>
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
            />
          ))}
      </div>
      <div className="mt-4 flex gap-10 mb-[49px]">
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
