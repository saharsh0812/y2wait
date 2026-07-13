const fs = require('fs');

const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

const headerStart = `<header className="bg-white/95`;
const headerEnd = `</header>`;

const startIdx = content.indexOf(headerStart);
const endIdx = content.indexOf(headerEnd) + headerEnd.length;

if (startIdx !== -1 && endIdx !== -1) {
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx);
    
    const replacement = `<AppHeader 
        handlePageChange={handlePageChange}
        activeView={activeView}
        t={t}
        language={language}
        setLanguage={setLanguage}
        isLoggedIn={isLoggedIn}
        user={user}
        setDrawerOpen={setDrawerOpen}
        setAuthModal={setAuthModal}
      />`;
    
    let newAppContent = before + replacement + after;
    if (!newAppContent.includes("import AppHeader")) {
        newAppContent = newAppContent.replace("import SupplementaryViews", "import AppHeader from './components/AppHeader';\nimport SupplementaryViews");
    }
    
    fs.writeFileSync('src/App.tsx', newAppContent);
    console.log("AppHeader extracted successfully!");
} else {
    console.log("Markers not found");
}
