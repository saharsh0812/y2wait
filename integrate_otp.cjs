const fs = require('fs');
const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

const newVerifyFunction = `
  const handleVerifyOtp = async () => {
    if (otpVal.length !== 4) return;
    try {
      const res = await verifyOtp(user.mobile, otpVal);
      if (res.verified) {
        if (authModal.step === 'forgot_otp') executeLogin();
        else setAuthModal({ open: true, step: 'kyc' });
      }
    } catch (err: any) {
      alert(err.error || "Galat OTP hai Bhai!");
    }
  };
`;

// Insert the new function right after executeLogin
const insertPoint = `const executeLogin = () => { setIsLoggedIn(true); setAuthModal({ open: false, step: 'role' }); handlePageChange('dashboard'); };`;
content = content.replace(insertPoint, insertPoint + newVerifyFunction);

// Replace the inline button click
const oldButton = `<button type="button" onClick={() => { if (otpVal.length !== 4) return; if (otpVal === "1234") { if(authModal.step === 'forgot_otp') executeLogin(); else setAuthModal({ open: true, step: 'kyc' }); } else { alert("Invalid OTP. Use 1234 for demo."); } }} disabled={otpVal.length !== 4} className="w-full bg-[#EA580C] disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg mt-6 transition-colors text-base">Verify Secure Code</button>`;

const newButton = `<button type="button" onClick={handleVerifyOtp} disabled={otpVal.length !== 4} className="w-full bg-[#EA580C] disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg mt-6 transition-colors text-base">Verify Secure Code</button>`;

content = content.replace(oldButton, newButton);

fs.writeFileSync(appPath, content);
console.log("Replaced verify OTP logic");
