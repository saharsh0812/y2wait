const fs = require('fs');
const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

// Replace handleMobileSubmit
const oldMobileSubmit = `const handleMobileSubmit = () => {
    if (user.mobile.length !== 10) return;
    if (user.mobile === '8210160012') {
      setAuthModal({ open: true, step: 'login_pass' });
    } else {
      setAuthModal({ open: true, step: 'register_otp' });
    }
  };`;

const newMobileSubmit = `const handleMobileSubmit = async () => {
    if (user.mobile.length !== 10) return;
    try {
      // Send API request
      const res = await sendOtp(user.mobile);
      if (res && res.message) {
        alert(res.message); // To show the bypass token
      }
      setAuthModal({ open: true, step: 'register_otp' });
    } catch (err: any) {
      alert(err.error || "Failed to send OTP");
    }
  };`;

content = content.replace(oldMobileSubmit, newMobileSubmit);

// Import API functions
if (!content.includes("import { sendOtp, verifyOtp, getLoads, createLoad }")) {
  content = content.replace("import AppHeader from './components/AppHeader';", "import AppHeader from './components/AppHeader';\nimport { sendOtp, verifyOtp, getLoads, createLoad } from './api';");
}

fs.writeFileSync(appPath, content);
console.log("Replaced handleMobileSubmit");
