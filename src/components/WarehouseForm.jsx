import React from 'react';
import { useForm } from 'react-hook-form';
import { fieldKey, fields, pricing } from '../constants';

const labelClass = 'text-sm text-[#474747]';
const formGroup = 'flex flex-col gap-2';

const FieldGenerator = ({ register, field, watch }) => {
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
      {field.type === 1 && (
        <>
          <select {...register(field.key)}>
            {field.values.map((e) => (
              <option key={e.value} value={e.value}>
                {e.name}
              </option>
            ))}
          </select>
        </>
      )}
      {field.type === 2 && (
        <input
          type="number"
          {...register(field.key)}
          step={field.step}
          min={field.min}
          max={field.max}
        />
      )}
    </div>
  );
};

function WarehouseForm({ defaultValues, onSave, onCancel }) {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    onSave(data);
    reset();
  };

  return (
    <form
      className="bg-[#F9F9FF] p-4 rounded-2xl grid grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map((field) => (
        <FieldGenerator
          key={field.key}
          register={register}
          field={field}
          watch={watch}
        />
      ))}
      {/* <FieldGenerator register={register} field={fields[0]} />
      <div>
        <label>Cloud Platform:</label>
        <select {...register('cloudPlatform')}>
          <option value="aws">AWS</option>
          <option value="azure">Microsoft Azure</option>
          <option value="googleCloud">Google Cloud</option>
        </select>
      </div>
      <div>
        <label>Geography:</label>
        <select {...register('geography')}>
          <option value="usEast">US East</option>
          <option value="eu">EU</option>
        </select>
      </div>
      <div>
        <label>Type of Storage:</label>
        <select {...register('storageType')}>
          <option value="onDemand">On Demand</option>
          <option value="prePurchase">Pre Purchase</option>
        </select>
      </div>
      <div>
        <label>Size of Warehouse:</label>
        <select {...register('size')}>
          <option value="xs">XS</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div>
        <label>Number of Sessions per Day:</label>
        <input type="number" {...register('sessionsPerDay')} />
      </div>
      <div>
        <label>Number of Days per Week:</label>
        <input type="number" {...register('daysPerWeek')} />
      </div>
      <div>
        <label>Estimated Storage per Month:</label>
        <input type="number" {...register('estimatedStorage')} />
      </div>
      <div>
        <label>Duration of Each Session (hours):</label>
        <input type="number" {...register('sessionDuration')} />
      </div> */}
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default WarehouseForm;
