import React, { useState } from 'react';
import WarehouseManager from './components/WarehouseManager';
import WarehouseForm from './components/WarehouseForm';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('initial');
  const [initialWarehouseData, setInitialWarehouseData] = useState(null);

  const handleWarehouseFormSave = (data) => {
    setInitialWarehouseData(data);
    setCurrentView('hubspot');
  };

  const handleHubspotSubmission = () => {
    setCurrentView('warehouseManager');
  };

  return (
    <section className="flex flex-col max-w-[1100px] p-4 mx-auto">
      {currentView === 'initial' && (
        <WarehouseForm onSave={handleWarehouseFormSave} onCancel={() => {}} />
      )}
      {currentView === 'hubspot' && (
        <div>
          {/* Embed your HubSpot form here */}
          <h2>Submit the form below to proceed</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleHubspotSubmission();
            }}
          >
            {/* Replace with your actual HubSpot form */}
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {currentView === 'warehouseManager' && (
        <WarehouseManager initialWarehouseData={initialWarehouseData} />
      )}
    </section>
  );
}

export default App;
