const fs = require('fs');
const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

// 1. Add import for MapComponents
const importMarker = "import { MapPin,";
const mapImport = `import { LiveRadarMap, RouteMap } from './components/MapComponents';\n`;
if (!content.includes('LiveRadarMap')) {
    content = content.replace(importMarker, mapImport + importMarker);
}

// 2. Replace the radar SVG block with LiveRadarMap
const oldRadarPattern = /<div className="flex-\[2\] relative rounded-\[1\.5rem\] overflow-hidden bg-\[#000000\] shadow-inner border border-slate-800 h-\[450px\]">[\s\S]*?<div className="flex-1 flex flex-col gap-6">/;
const newRadar = `<div className="flex-[2] relative rounded-[1.5rem] overflow-hidden bg-[#000000] shadow-inner border border-slate-800 h-[450px]">
           <LiveRadarMap trucks={safeDrivers} />
        </div>

        <div className="flex-1 flex flex-col gap-6">`;
content = content.replace(oldRadarPattern, newRadar);

fs.writeFileSync(appPath, content);
console.log("Replaced mock radar with real LiveRadarMap!");
