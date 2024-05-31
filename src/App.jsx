import React, { useState, useEffect } from "react";
import WarehouseManager from "./components/WarehouseManager";
import WarehouseForm from "./components/WarehouseForm";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Info from "./components/Info";
// import { montserrat } from "./font";

function App() {
  const [currentView, setCurrentView] = useState("initial");
  const [initialWarehouseData, setInitialWarehouseData] = useState(null);

  const handleWarehouseFormSave = (data) => {
    setInitialWarehouseData(data);
    setCurrentView("hubspot");
  };

  const handleHubspotSubmission = () => {
    setTimeout(() => {
      setCurrentView("warehouseManager");
    }, 1500);
  };

  useEffect(() => {
    if (currentView === "hubspot") {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/v2.js";
      document.body.appendChild(script);

      script.addEventListener("load", () => {
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
    <body>
      <section className="z-20 bg-white">
        {(currentView === "initial" || currentView === "hubspot") && (
          <>
            <div>
              <HeroSection />
              {currentView === "initial" && <Info />}
              <section className="flex flex-col max-w-[800px] mx-auto">
                {currentView === "initial" && (
                  <WarehouseForm
                    onSave={handleWarehouseFormSave}
                    onCancel={() => {}}
                  />
                )}
                {currentView === "hubspot" && (
                  <div className="flex flex-col gap-4 pt-10 pb-8 px-5">
                    {/* Embed your HubSpot form here */}
                    <h2 className="text-2xl max-w-[800px] mx-auto">
                      You are just a step away from seeing the cost.{" "}
                    </h2>
                    <p className="text-xl max-w-[485px] mx-auto">
                      Enter your name and email address to continue.
                    </p>
                    <div id="hubspotForm"></div>
                  </div>
                )}
              </section>
            </div>
          </>
        )}

        {currentView === "warehouseManager" && (
          <section>
            <WarehouseManager initialWarehouseData={initialWarehouseData} />
          </section>
        )}
      </section>
    </body>
  );
}

export default App;
