import React, { useState ,useEffect} from 'react';
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
    // setTimeout(() => {
      setCurrentView('warehouseManager');
    // },1500)
    
  };

  useEffect(() => {
    if (currentView === 'hubspot') {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/v2.js';
      document.body.appendChild(script);

      script.addEventListener('load', () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: "na1",
            portalId: "24031861",
            formId: "e2857982-a11e-494b-a5e3-cae149755208",
            onFormSubmitted: handleHubspotSubmission,
          });
        }
      });

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [currentView]);


  return (
    <section className="flex flex-col max-w-[1100px] p-4 mx-auto">
      {currentView === 'initial' && (
        <WarehouseForm onSave={handleWarehouseFormSave} onCancel={() => {}} />
      )}
      {currentView === 'hubspot' && (
        <div>
          {/* Embed your HubSpot form here */}
          <h2>Submit the form below to proceed</h2>
          <div id="hubspotForm"></div>
        </div>
      )}
      {currentView === 'warehouseManager' && (
        <WarehouseManager initialWarehouseData={initialWarehouseData} />
      )}
    </section>
  );
}

export default App;
