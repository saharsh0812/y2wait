const fs = require('fs');

const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

const suppStart = "{/* --- SUPPLEMENTARY PAGES --- */}";
const suppEnd = "</main>"; // Before the end of main

const startIdx = content.indexOf(suppStart);
const endIdx = content.indexOf(suppEnd);

if (startIdx !== -1 && endIdx !== -1) {
    let suppJSX = content.substring(startIdx, endIdx);
    
    // Create SupplementaryViews.tsx
    const suppComponent = `import React from 'react';
import { ArrowLeft, Box, QrCode, ShieldCheck, Star, Activity, Crown, History, Settings, Send, PhoneCall } from 'lucide-react';

export default function SupplementaryViews({
  activeView,
  handlePageChange,
  BackToDashboardBtn,
  t,
  isLoggedIn,
  user,
  setAuthModal,
  uploadedFiles,
  handleFileUpload,
  qrDocs,
  allDocsUploaded
}: any) {
  return (
    <>
      ${suppJSX}
    </>
  );
}
`;
    
    fs.writeFileSync('src/components/SupplementaryViews.tsx', suppComponent);
    
    // Replace in App.tsx
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx);
    
    const replacement = `{/* --- SUPPLEMENTARY PAGES --- */}
        <SupplementaryViews 
            activeView={activeView}
            handlePageChange={handlePageChange}
            BackToDashboardBtn={BackToDashboardBtn}
            t={t}
            isLoggedIn={isLoggedIn}
            user={user}
            setAuthModal={setAuthModal}
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            qrDocs={qrDocs}
            allDocsUploaded={allDocsUploaded}
        />
        
        `;
    
    let newAppContent = before + replacement + after;
    if (!newAppContent.includes("import SupplementaryViews")) {
        newAppContent = newAppContent.replace("import DashboardView", "import SupplementaryViews from './components/SupplementaryViews';\nimport DashboardView");
    }
    
    fs.writeFileSync('src/App.tsx', newAppContent);
    console.log("SupplementaryViews extracted successfully!");
} else {
    console.log("Markers not found");
}
