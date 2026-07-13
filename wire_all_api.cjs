const fs = require('fs');
const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

// 1. Update api imports
const apiImportPattern = /import \{.*?\} from '\.\/api';/;
content = content.replace(apiImportPattern, `import { sendOtp, verifyOtp, getLoads, createLoad, register, login, getTrucks, createTruck, getBusSpaces, createBusSpace, getDemands, createDemand, placeBid } from './api';`);

// 2. Add API fetchers in useEffect
const fetchEffectPattern = /\/\/ Fetch loads from backend on mount\s*useEffect\(\(\) => \{[\s\S]*?\}\)\.catch\(\(\) => \{\}\);\s*\}, \[\]\);/;
const newFetchEffect = `  // Fetch all data from backend on mount
  useEffect(() => {
    // Loads
    getLoads().then((data) => {
      if (data && data.length > 0) {
        setLoadsList(prev => [...prev.filter((x) => x.isMine), ...data.map((l) => ({...l, id: l.loadId || l.id, destination: l.dest || l.destination, targetPrice: l.targetPrice || l.price, isMine: false}))]);
      }
    }).catch(() => {});
    
    // Trucks
    getTrucks().then((data) => {
      if (data && data.length > 0) {
        setDriversList(prev => [...prev.filter((x) => x.isMine), ...data.map((t) => ({...t, id: t.truckId || t.id, isMine: false}))]);
      }
    }).catch(() => {});

    // Bus Spaces
    getBusSpaces().then((data) => {
      if (data && data.length > 0) {
        setBusSpaceList(prev => [...prev.filter((x) => x.isMine), ...data.map((b) => ({...b, id: b.busId || b.id, isMine: false}))]);
      }
    }).catch(() => {});

    // Corporate Bids
    getDemands().then((data) => {
      if (data && data.length > 0) {
        setCorporateBids(prev => [...prev.filter((x) => x.isMine), ...data.map((d) => ({...d, id: d.demandId || d.id, L1: d.currentL1 || d.initialL1, isMine: false}))]);
      }
    }).catch(() => {});
  }, []);`;
content = content.replace(fetchEffectPattern, newFetchEffect);

// 3. Update handlers for API post
const postTruckPattern = /const handlePostTruck = \(e: React\.FormEvent\) => \{[\s\S]*?setBookingStep\(1\);\s*\};/;
const newPostTruck = `const handlePostTruck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTruck.origin) return;
    const created = { id: \`TRK-\${Math.floor(1000 + Math.random() * 9000)}\`, driverName: user.firstName || 'Driver', phone: user.mobile, dp: user.dp, currentLoc: newTruck.origin, destLoc: newTruck.dest, capacity: newTruck.capacity || '16', charges: Number(newTruck.charges) || 50000, status: 'Booked', type: 'Open Body', isMine: true, truckImg: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400' };
    setDriversList([created, ...driversList]); setPlatformStats((prev: any) => ({...prev, trucks: prev.trucks + 1, cities: prev.cities + 2})); setListingTab('my_listings'); setNewTruck({ origin: '', dest: '', capacity: '', charges: '', vehicleNumber: '' }); setBookingStep(1);
    try {
      await createTruck({ origin: newTruck.origin, destination: newTruck.dest, capacity: newTruck.capacity || '16 Tons', charges: newTruck.charges || 50000, truckType: 'Open Body' });
    } catch(err) {}
  };`;
content = content.replace(postTruckPattern, newPostTruck);

const postBusPattern = /const handlePostBus = \(e: React\.FormEvent\) => \{[\s\S]*?setBookingStep\(1\);\s*\};/;
const newPostBus = `const handlePostBus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBus.route) return alert(t("Please enter Route.", "कृपया रूट डालें।"));
    const isDriver = selectedRole === 'driver' || selectedRole === 'transporter';
    const capacityText = isDriver ? \`\${newBus.capacity} Space\` : \`\${newBus.productType} (\${newBus.weight} KG)\`;
    const busPayload = { id: \`BUS-\${Math.floor(Math.random() * 9000)}\`, operator: user.businessName || user.firstName || 'Travels', phone: user.mobile, dp: user.dp, route: newBus.route, capacity: capacityText, price: Number(newBus.price) || 500, isMine: true, serviceType: newBus.serviceType || 'Standard', busImg: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400' };
    setBusSpaceList([busPayload, ...busSpaceList]); setNewBus({ route: '', serviceType: 'Standard', price: '', vehicleNumber: '', capacity: '', productType: '', weight: '' }); setBusTab('my_listings'); setBookingStep(1);
    try {
      await createBusSpace({ route: newBus.route, capacity: capacityText, price: newBus.price || 500, serviceType: newBus.serviceType || 'Standard', productType: newBus.productType, weight: newBus.weight });
    } catch(err) {}
  };`;
content = content.replace(postBusPattern, newPostBus);

const postBidPattern = /const handlePostBid = \(e: React\.FormEvent\) => \{[\s\S]*?setNewBid\(\{ demand: '', route: '', initialL1: '' \}\);\s*\};/;
const newPostBid = `const handlePostBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!newBid.demand) return;
    const created = { id: \`#\${Math.floor(10000 + Math.random() * 90000)}\`, company: user.businessName || 'Corporate', demand: newBid.demand, route: newBid.route, L1: Number(newBid.initialL1) || 50000, time: '7 Days Left', l1Holder: 'Awaiting Bids', isMine: true };
    setCorporateBids([created, ...corporateBids]); setNewBid({ demand: '', route: '', initialL1: '' });
    try {
      await createDemand({ demand: newBid.demand, route: newBid.route, initialL1: newBid.initialL1 });
    } catch(err) {}
  };`;
content = content.replace(postBidPattern, newPostBid);

const processBidPattern = /const processBid = \(\) => \{[\s\S]*?alert\(t\("Bid Placed Successfully! You are now L1\.", "बोली सफलतापूर्वक लगाई गई!"\)\);\s*\};/;
const newProcessBid = `const processBid = async () => {
     if (!counterOffer) return;
     if (Number(counterOffer) >= (negotiationTarget?.data?.L1 || 0)) return alert(t("Bid must be lower than current L1 price!", "बोली वर्तमान L1 कीमत से कम होनी चाहिए!"));
     const updatedBids = corporateBids.map((b: any) => b.id === negotiationTarget?.data?.id ? { ...b, L1: Number(counterOffer) } : b);
     setCorporateBids(updatedBids); 
     const demandId = negotiationTarget?.data?.id;
     setNegotiationTarget(null); setCounterOffer('');
     alert(t("Bid Placed Successfully! You are now L1.", "बोली सफलतापूर्वक लगाई गई!"));
     try {
       // Check if demandId looks like a Mongo ID or mock ID
       if (demandId && demandId.length > 10) await placeBid(demandId, Number(counterOffer));
     } catch(err) {}
  };`;
content = content.replace(processBidPattern, newProcessBid);

// 4. Update executeLogin to call register/login API
const loginPattern = /const executeLogin = \(\) => \{ setIsLoggedIn\(true\); setAuthModal\(\{ open: false, step: 'role' \}\); handlePageChange\('dashboard'\); \};/;
const newLogin = `const executeLogin = async () => { 
    try {
      if (user.firstName || user.businessName) {
        // KYC flow completed, register
        await register({ ...user, password: 'password123' });
      } else {
        // Just login
        await login(user.mobile, 'password123');
      }
    } catch (err) {}
    setIsLoggedIn(true); setAuthModal({ open: false, step: 'role' }); handlePageChange('dashboard'); 
  };`;
content = content.replace(loginPattern, newLogin);

fs.writeFileSync(appPath, content);
console.log("App.tsx updated for full API wiring.");
