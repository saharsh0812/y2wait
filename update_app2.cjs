const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = "{/* FEATURE DETAIL PAGE */}";
const endMarker = "{/* LOGGED IN DASHBOARD MODULES */}";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const before = content.slice(0, startIndex);
  const after = content.slice(endIndex);
  
  const replacement = `{/* FEATURE DETAIL PAGE */}
        {activeView === 'feature_detail' && selectedFeature && (
          <FeatureDetailView 
            selectedFeature={selectedFeature}
            handlePageChange={handlePageChange}
            setAuthModal={setAuthModal}
          />
        )}

        `;
        
  let newContent = before + replacement + after;
  if (!newContent.includes("import FeatureDetailView")) {
    newContent = newContent.replace("import LandingView", "import FeatureDetailView from './components/FeatureDetailView';\nimport LandingView");
  }
  
  fs.writeFileSync('src/App.tsx', newContent);
  console.log("Replaced FeatureDetailView successfully!");
} else {
  console.log("Could not find markers.");
}
