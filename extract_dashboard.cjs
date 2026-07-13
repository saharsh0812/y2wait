const fs = require('fs');

const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

const dashboardStart = "{/* LOGGED IN DASHBOARD MODULES */}";
const dashboardEnd = "{/* --- SUPPLEMENTARY PAGES --- */}";

const startIdx = content.indexOf(dashboardStart);
const endIdx = content.indexOf(dashboardEnd);

if (startIdx !== -1 && endIdx !== -1) {
    let dashboardJSX = content.substring(startIdx, endIdx);
    
    // Strip the outer condition 
    // `{isLoggedIn && activeView === 'dashboard' && (`  ...  `)}`
    dashboardJSX = dashboardJSX.replace("{isLoggedIn && activeView === 'dashboard' && (", "");
    // Remove the last `)}` from dashboardJSX
    dashboardJSX = dashboardJSX.trim();
    if (dashboardJSX.endsWith(")}")) {
        dashboardJSX = dashboardJSX.substring(0, dashboardJSX.length - 2);
    }
    
    // Create DashboardView component
    const dashboardComponent = `import React from 'react';
import { Truck, User, MapPin, Search, ArrowLeft, ArrowRight, Package, Box, Clock, TrendingDown, Radio, Send, Crown, CheckCircle2 } from 'lucide-react';
import { mandiProducts } from '../constants';

export default function DashboardView({
  activeModule, setActiveModule,
  listingTab, setListingTab,
  busTab, setBusTab,
  bookingStep, setBookingStep,
  freightSearch, setFreightSearch,
  busSearch, setBusSearch,
  combinedFeed, filteredBusFeed, corporateBids,
  user, selectedRole, t,
  LayeredStepIndicator, renderLiveRadar,
  newTruck, setNewTruck, handlePostTruck,
  newLoad, setNewLoad, handlePostLoad,
  newBus, setNewBus, handlePostBus,
  newBid, setNewBid, handlePostBid,
  expandedListingId, setExpandedListingId,
  negotiationTarget, setNegotiationTarget,
  counterOffer, setCounterOffer, processBid
}: any) {
  return (
    <>
      ${dashboardJSX}
    </>
  );
}
`;
    
    fs.writeFileSync('src/components/DashboardView.tsx', dashboardComponent);
    
    // Replace in App.tsx
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx);
    
    const replacement = `{/* LOGGED IN DASHBOARD MODULES */}
        {isLoggedIn && activeView === 'dashboard' && (
          <DashboardView 
            activeModule={activeModule} setActiveModule={setActiveModule}
            listingTab={listingTab} setListingTab={setListingTab}
            busTab={busTab} setBusTab={setBusTab}
            bookingStep={bookingStep} setBookingStep={setBookingStep}
            freightSearch={freightSearch} setFreightSearch={setFreightSearch}
            busSearch={busSearch} setBusSearch={setBusSearch}
            combinedFeed={combinedFeed} filteredBusFeed={filteredBusFeed} corporateBids={corporateBids}
            user={user} selectedRole={selectedRole} t={t}
            LayeredStepIndicator={LayeredStepIndicator} renderLiveRadar={renderLiveRadar}
            newTruck={newTruck} setNewTruck={setNewTruck} handlePostTruck={handlePostTruck}
            newLoad={newLoad} setNewLoad={setNewLoad} handlePostLoad={handlePostLoad}
            newBus={newBus} setNewBus={setNewBus} handlePostBus={handlePostBus}
            newBid={newBid} setNewBid={setNewBid} handlePostBid={handlePostBid}
            expandedListingId={expandedListingId} setExpandedListingId={setExpandedListingId}
            negotiationTarget={negotiationTarget} setNegotiationTarget={setNegotiationTarget}
            counterOffer={counterOffer} setCounterOffer={setCounterOffer} processBid={processBid}
          />
        )}
        
        `;
    
    let newAppContent = before + replacement + after;
    if (!newAppContent.includes("import DashboardView")) {
        newAppContent = newAppContent.replace("import FeatureDetailView", "import DashboardView from './components/DashboardView';\nimport FeatureDetailView");
    }
    
    fs.writeFileSync('src/App.tsx', newAppContent);
    console.log("DashboardView extracted successfully!");
} else {
    console.log("Markers not found");
}
