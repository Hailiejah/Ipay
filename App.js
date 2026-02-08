import React, { useState, useEffect } from 'react';
import { 
  Play, Music, Gamepad2, ClipboardList, Tv, Lock, X, CheckCircle2, 
  Gift, AlertCircle, Clock, ShieldAlert, Check, Ban, Zap, Calendar, Users, Search
} from 'lucide-react';

export default function IPAYApp() {
  // --- CORE STATE ---
  const [view, setView] = useState('signup');
  const [activeModal, setActiveModal] = useState(null);
  const [isActivated, setIsActivated] = useState(false);
  const [userTier, setUserTier] = useState(null); // 'basic' or 'elite'
  const [userId, setUserId] = useState('');
  const [taskBalance, setTaskBalance] = useState(42000); // Starting bait
  const [refBalance, setRefBalance] = useState(0);
  
  // --- ADMIN CONTROLLED STATE ---
  const [withdrawalsEnabled, setWithdrawalsEnabled] = useState({ task: false, ref: true });
  const [withdrawRequests, setWithdrawRequests] = useState([
    { id: 'REQ-1', user: 'IPAY-442109', type: 'ref', amount: '6,000', tier: 'Basic' }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const ADMIN_EMAIL = "admin@fortunex.io";
  const SUPPORT_LINK = "https://t.me/ipayng";

  useEffect(() => {
    setUserId("IPAY-" + Math.floor(100000 + Math.random() * 900000));
  }, []);

  // --- HANDLERS ---
  const handleWithdrawal = (type) => {
    if (!isActivated) { setActiveModal('pricing'); return; }
    if (!withdrawalsEnabled[type]) { alert("Withdrawal portal is currently closed for maintenance."); return; }
    
    if (type === 'ref' && userTier === 'elite') {
      setActiveModal('success_payout'); // Instant Feel
    } else {
      setActiveModal('audit_tracker'); // Manual Feel
    }
  };

  // --- COMPONENTS ---
  const AdminHQ = () => (
    <div className="p-6 bg-slate-950 min-h-screen text-slate-100 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-black text-blue-500 italic uppercase">FortuneX HQ</h2>
        <button onClick={() => setView('signup')} className="text-[10px] bg-white/10 px-4 py-2 rounded-xl font-bold">EXIT</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800">
          <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Total Revenue</p>
          <p className="text-xl font-black text-green-500">₦4.89M</p>
        </div>
        <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800">
          <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Total Users</p>
          <p className="text-xl font-black">1,240</p>
        </div>
      </div>

      {/* Global Toggles */}
      <div className="flex gap-4 mb-8">
        <button onClick={() => setWithdrawalsEnabled({...withdrawalsEnabled, task: !withdrawalsEnabled.task})} 
          className={`flex-1 p-4 rounded-2xl border font-black text-[10px] uppercase flex items-center justify-center gap-2 ${withdrawalsEnabled.task ? 'border-green-500/50 bg-green-500/10 text-green-500' : 'border-red-500/50 bg-red-500/10 text-red-500'}`}>
          {withdrawalsEnabled.task ? <Check size={14}/> : <Ban size={14}/>} Tasks {withdrawalsEnabled.task ? 'Open' : 'Locked'}
        </button>
        <button onClick={() => setWithdrawalsEnabled({...withdrawalsEnabled, ref: !withdrawalsEnabled.ref})} 
          className={`flex-1 p-4 rounded-2xl border font-black text-[10px] uppercase flex items-center justify-center gap-2 ${withdrawalsEnabled.ref ? 'border-green-500/50 bg-green-500/10 text-green-500' : 'border-red-500/50 bg-red-500/10 text-red-500'}`}>
          {withdrawalsEnabled.ref ? <Check size={14}/> : <Ban size={14}/>} Ref {withdrawalsEnabled.ref ? 'Open' : 'Locked'}
        </button>
      </div>

      {/* User Search */}
      <div className="mb-8 relative">
        <input type="text" placeholder="Search user email..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 p-5 rounded-[2rem] border border-slate-800 text-xs font-bold outline-none"/>
        <button onClick={() => setSelectedUser({id: 'IPAY-882', email: searchQuery, tier: 'Basic', tasks: 42000})} className="absolute right-4 top-3 bg-blue-600 p-2 rounded-xl text-[10px] font-black uppercase">Find</button>
      </div>

      {/* User Result */}
      {selectedUser && (
        <div className="bg-blue-900/20 border-2 border-blue-500/30 p-6 rounded-[2.5rem] mb-8 animate-in zoom-in-95">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black">{selectedUser.email}</h3>
            <button onClick={()=>setSelectedUser(null)}><X size={18}/></button>
          </div>
          <div className="flex gap-2 mb-4">
             <div className="flex-1 bg-slate-800 p-3 rounded-xl"><p className="text-[8px] text-slate-500 uppercase">Tier</p><p className="text-xs font-black text-amber-500">{selectedUser.tier}</p></div>
             <div className="flex-1 bg-slate-800 p-3 rounded-xl"><p className="text-[8px] text-slate-500 uppercase">Balance</p><p className="text-xs font-black">₦{selectedUser.tasks}</p></div>
          </div>
          <button onClick={() => alert("Upgraded to Elite!")} className="w-full bg-amber-500 py-3 rounded-xl text-[10px] font-black uppercase text-black">Force Elite Upgrade</button>
        </div>
      )}

      {/* Request Queue */}
      <div className="bg-slate-900 p-6 rounded-[2.5rem]">
        <h3 className="text-[10px] font-black text-slate-500 uppercase mb-6 flex items-center gap-2"><Clock size={14}/> Approval Queue</h3>
        {withdrawRequests.map((req, i) => (
          <div key={i} className="bg-slate-800 p-4 rounded-2xl flex justify-between items-center mb-3">
            <div><p className="text-xs font-black">{req.user}</p><p className="text-[8px] text-slate-500 font-bold uppercase">{req.tier} • ₦{req.amount}</p></div>
            <div className="flex gap-2">
              <button onClick={() => alert("Rejected")} className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Ban size={16}/></button>
              <button onClick={() => alert("Approved")} className="p-2 bg-green-500/20 text-green-500 rounded-lg"><Check size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 font-sans relative overflow-hidden">
      
      {view === 'signup' ? (
        <div className="min-h-screen bg-white p-8 flex flex-col justify-center text-center">
          <h1 className="text-6xl font-black text-blue-700 italic tracking-tighter mb-4">IPAY</h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10">Entertainment & Monthly Payouts</p>
          <input type="email" placeholder="Email Address" id="adminCheck" className="w-full p-5 bg-gray-50 rounded-[2rem] outline-none mb-4 border-2 border-transparent focus:border-blue-100 font-bold" />
          <button onClick={() => document.getElementById('adminCheck').value === ADMIN_EMAIL ? setView('admin') : setView('dashboard')} className="w-full bg-blue-700 text-white py-5 rounded-[2.5rem] font-black shadow-xl shadow-blue-100 uppercase tracking-widest">Connect Wallet</button>
        </div>
      ) : view === 'admin' ? (
        <AdminHQ />
      ) : (
        <div className="pb-24 animate-in fade-in">
          {/* Header */}
          <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center">
            <h1 className="text-2xl font-black text-blue-700 italic">IPAY</h1>
            <div className="bg-blue-50 px-4 py-1.5 rounded-full font-black text-[10px] text-blue-700 uppercase tracking-widest">{userId}</div>
          </div>

          {/* Monthly Task Card */}
          <div className={`m-4 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden ${userTier === 'elite' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-blue-700'}`}>
             <p className="opacity-70 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Task Wallet (Next Pay: Feb 28)</p>
             <h2 className="text-5xl font-black mt-1 tracking-tighter">₦{taskBalance.toLocaleString()}</h2>
             <div className="mt-6 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="w-[56%] h-full bg-white" />
             </div>
             <button onClick={() => handleWithdrawal('task')} className="mt-8 w-full bg-white text-blue-700 py-4 rounded-2xl font-black text-[10px] uppercase shadow-lg">Withdraw Monthly</button>
          </div>

          {/* Daily Referral Card */}
          <div className="m-4 bg-white border border-gray-100 rounded-[2.5rem] p-8 text-gray-800 shadow-xl">
             <div className="flex justify-between items-start mb-6">
               <div>
                 <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Ref Wallet (Instant for Elites)</p>
                 <h2 className="text-3xl font-black text-blue-700">₦{refBalance.toLocaleString()}</h2>
               </div>
               <div className={`p-3 rounded-2xl ${userTier === 'elite' ? 'bg-amber-100 text-amber-600' : 'bg-green-50 text-green-600'}`}><Zap size={20}/></div>
             </div>
             <button onClick={() => handleWithdrawal('ref')} className="w-full bg-blue-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase shadow-md active:scale-95 transition">Withdraw Daily</button>
          </div>

          {/* Service Grid */}
          <div className="px-6 grid grid-cols-5 gap-2 mt-10">
            {['Tasks', 'Music', 'Comedy', 'KDrama', 'Gaming'].map((lab, i) => (
              <div key={i} className="flex flex-col items-center gap-2" onClick={() => !isActivated ? setActiveModal('pricing') : alert("Daily quota reached. Check back in 14 hours.")}>
                <div className="w-12 h-12 rounded-[1.25rem] bg-white border border-gray-100 flex items-center justify-center text-blue-700 shadow-sm active:scale-90 transition transform">
                  {[<ClipboardList/>, <Music/>, <Play/>, <Tv/>, <Gamepad2/>][i]}
                </div>
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">{lab}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- PRICING TIER MODAL --- */}
      {activeModal === 'pricing' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[150] flex flex-col items-center justify-center p-6">
          <h2 className="text-white text-2xl font-black mb-8 uppercase tracking-tighter text-center">Select Activation Plan</h2>
          <div className="w-full space-y-4">
            <div onClick={() => { setIsActivated(true); setUserTier('basic'); setActiveModal(null); }} className="bg-white p-6 rounded-[2.5rem] cursor-pointer">
              <div className="flex justify-between items-center mb-2"><span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">Basic</span><span className="text-xl font-black">₦3,000</span></div>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Manual audit for payouts (24-48hrs)</p>
            </div>
            <div onClick={() => { setIsActivated(true); setUserTier('elite'); setActiveModal(null); }} className="bg-white p-6 rounded-[2.5rem] border-4 border-amber-400 cursor-pointer relative">
              <div className="absolute top-0 right-0 bg-amber-400 text-white text-[8px] font-black px-4 py-1 rounded-bl-xl uppercase">Fastest</div>
              <div className="flex justify-between items-center mb-2"><span className="bg-amber-100 text-amber-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Elite</span><span className="text-xl font-black">₦6,000</span></div>
              <p className="text-[10px] text-gray-500 font-bold uppercase italic">Instant Payouts for Referrals & VIP Priority</p>
            </div>
          </div>
          <a href={SUPPORT_LINK} target="_blank" className="mt-10 text-white/50 font-black text-[10px] uppercase underline">Purchase ACT-Code from Support</a>
        </div>
      )}

      {/* --- AUDIT TRACKER (BASIC) --- */}
      {activeModal === 'audit_tracker' && (
        <div className="fixed inset-0 bg-white z-[200] p-10 flex flex-col justify-center animate-in slide-in-from-bottom duration-500">
           <h2 className="text-2xl font-black italic uppercase text-blue-700 mb-12">Security Audit</h2>
           <div className="space-y-10">
              <div className="flex gap-4"><div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white"><Check size={14}/></div><div><p className="text-xs font-black uppercase">Request Logged</p><p className="text-[9px] text-gray-400 uppercase">Ticket #772-IPAY</p></div></div>
              <div className="flex gap-4"><div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white animate-pulse"><Clock size={14}/></div><div><p className="text-xs font-black uppercase text-blue-600">Referral Fraud Scan</p><p className="text-[9px] text-gray-400 uppercase">Verifying authenticity...</p></div></div>
              <div className="flex gap-4"><div className="w-6 h-6 bg-gray-200 rounded-full" /><div><p className="text-xs font-black uppercase text-gray-300">Final Disbursement</p></div></div>
           </div>
           <button onClick={()=>setActiveModal(null)} className="mt-12 w-full py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black uppercase text-gray-400">Cancel Request</button>
        </div>
      )}

      {/* --- SUCCESS MODAL (ELITE) --- */}
      {activeModal === 'success_payout' && (
        <div className="fixed inset-0 bg-emerald-600 z-[200] flex flex-col items-center justify-center p-10 text-center text-white">
          <CheckCircle2 size={80} className="mb-6 animate-bounce" />
          <h2 className="text-4xl font-black mb-2 uppercase italic tracking-tighter">Success!</h2>
          <p className="opacity-80 font-bold text-[11px] uppercase tracking-widest leading-relaxed">Your Elite Instant Payout has been approved and sent to your bank account.</p>
          <button onClick={() => setActiveModal(null)} className="mt-12 bg-white text-emerald-600 px-10 py-4 rounded-full font-black text-[10px] uppercase shadow-2xl">Return Home</button>
        </div>
      )}

    </div>
  );
    }
          
