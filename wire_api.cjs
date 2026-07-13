const fs = require('fs');
const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

// 1. Add useEffect for fetching loads right after the showDemo effect (line 132 ends at showDemo effect)
const insertAfterDemo = `  }, [showDemo]);\r\n\r\n  // --- ACTIONS ---`;
const withFetchEffect = `  }, [showDemo]);\r\n\r\n  // Fetch loads from backend on mount\r\n  useEffect(() => {\r\n    getLoads().then((data) => {\r\n      if (data && data.length > 0) {\r\n        const mapped = data.map((l) => ({\r\n          id: l.id,\r\n          companyName: l.companyName || 'Shipper',\r\n          material: l.material,\r\n          weight: l.weight,\r\n          origin: l.origin,\r\n          destination: l.dest || l.destination,\r\n          targetPrice: l.price ? Number(String(l.price).replace(/[^0-9]/g, '')) : 0,\r\n          isMine: false\r\n        }));\r\n        setLoadsList(prev => {\r\n          const mine = prev.filter((x) => x.isMine);\r\n          return [...mine, ...mapped];\r\n        });\r\n      }\r\n    }).catch(() => {});\r\n  }, []);\r\n\r\n  // --- ACTIONS ---`;

content = content.replace(insertAfterDemo, withFetchEffect);

// 2. Update handleMobileSubmit to call sendOtp API
const oldMobileSubmit = `  const handleMobileSubmit = () => {\r\n    if (user.mobile.length !== 10) return;\r\n    if (user.mobile === '8210160012') {\r\n      setAuthModal({ open: true, step: 'login_pass' });\r\n    } else {\r\n      setAuthModal({ open: true, step: 'register_otp' });\r\n    }\r\n  };`;

const newMobileSubmit = `  const handleMobileSubmit = async () => {\r\n    if (user.mobile.length !== 10) return;\r\n    try {\r\n      const res = await sendOtp(user.mobile);\r\n      if (res && res.message) alert(res.message);\r\n    } catch (err) {\r\n      // Backend down - silent fallback\r\n    }\r\n    if (user.mobile === '8210160012') {\r\n      setAuthModal({ open: true, step: 'login_pass' });\r\n    } else {\r\n      setAuthModal({ open: true, step: 'register_otp' });\r\n    }\r\n  };`;

content = content.replace(oldMobileSubmit, newMobileSubmit);

// 3. Update handlePostLoad to also call backend
const oldPostLoad = `  const handlePostLoad = (e: React.FormEvent) => {\r\n    e.preventDefault();\r\n    if (!newLoad.origin) return;\r\n    const loadPayload = { id: \`LOD-\${Date.now()}\`, companyName: user.businessName || \`\${user.firstName}'s Enterprise\`, phone: user.mobile, dp: user.dp, material: newLoad.material, weight: newLoad.weight, origin: newLoad.origin, destination: newLoad.destination, targetPrice: Number(newLoad.targetPrice), status: 'Booked', isMine: true };\r\n    setLoadsList([loadPayload, ...loadsList]); setPlatformStats((prev: any) => ({...prev, parcels: prev.parcels + 1, cities: prev.cities + 2})); setListingTab('my_listings'); setNewLoad({ material: '', weight: '', origin: '', destination: '', targetPrice: '' }); setBookingStep(1);\r\n  };`;

const newPostLoad = `  const handlePostLoad = async (e: React.FormEvent) => {\r\n    e.preventDefault();\r\n    if (!newLoad.origin) return;\r\n    const loadPayload = { id: \`LOD-\${Date.now()}\`, companyName: user.businessName || \`\${user.firstName}'s Enterprise\`, phone: user.mobile, dp: user.dp, material: newLoad.material, weight: newLoad.weight, origin: newLoad.origin, destination: newLoad.destination, targetPrice: Number(newLoad.targetPrice), status: 'Booked', isMine: true };\r\n    setLoadsList([loadPayload, ...loadsList]);\r\n    setPlatformStats((prev: any) => ({...prev, parcels: prev.parcels + 1, cities: prev.cities + 2}));\r\n    setListingTab('my_listings');\r\n    setNewLoad({ material: '', weight: '', origin: '', destination: '', targetPrice: '' });\r\n    setBookingStep(1);\r\n    // Sync to backend (non-blocking)\r\n    try {\r\n      await createLoad({\r\n        origin: newLoad.origin,\r\n        dest: newLoad.destination,\r\n        material: newLoad.material,\r\n        weight: newLoad.weight,\r\n        price: \`₹\${newLoad.targetPrice}\`,\r\n      });\r\n    } catch (err) {}\r\n  };`;

content = content.replace(oldPostLoad, newPostLoad);

const changed1 = content.includes('getLoads().then');
const changed2 = content.includes('sendOtp(user.mobile)');
const changed3 = content.includes('Sync to backend');

fs.writeFileSync(appPath, content);
console.log(`Applied: fetchLoads=${changed1}, sendOtp=${changed2}, postLoad=${changed3}`);
