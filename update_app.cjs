const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = "{/* LANDING VIEW */}";
const endMarker = "{/* FEATURE DETAIL PAGE */}";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const before = content.slice(0, startIndex);
  const after = content.slice(endIndex);
  
  const replacement = `{/* LANDING VIEW */}
        {activeView === 'landing' && (
          <LandingView 
            t={t} 
            platformStats={platformStats}
            setSelectedRole={setSelectedRole}
            setAuthModal={setAuthModal}
            setShowDemo={setShowDemo}
            handlePageChange={handlePageChange}
            heroIdx={heroIdx}
            setHeroIdx={setHeroIdx}
            setSelectedFeature={setSelectedFeature}
          />
        )}

        `;
        
  // Add import if not present
  let newContent = before + replacement + after;
  if (!newContent.includes("import LandingView")) {
    newContent = newContent.replace("import { parallelHeaders", "import LandingView from './components/LandingView';\nimport { parallelHeaders");
  }
  
  fs.writeFileSync('src/App.tsx', newContent);
  console.log("Replaced Landing View successfully!");
} else {
  console.log("Could not find markers.");
}
