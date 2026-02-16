import { useState, useEffect } from "react";
import { Wallet as WalletIcon, ArrowRight, Clock, ShieldCheck, X, Sparkles, TrendingUp, Landmark, CreditCard, ChevronRight } from "lucide-react";
import api from "../../../api/api";
import { requestWithdrawal, getBanks, resolveAccount } from "../../../api/activeRentalsApi";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface WalletData {
  wallet_balance: number;
  pending_balance: number;
}

export default function Wallet() {
  const [balance, setBalance] = useState<WalletData>({ wallet_balance: 0, pending_balance: 0 });
  const [loading, setLoading] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankSearchQuery, setBankSearchQuery] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [resolvingAccount, setResolvingAccount] = useState(false);
  const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);
  const [withdrawForm, setWithdrawForm] = useState({
    amount: "",
    bankName: "",
    bankCode: "",
    accountNumber: "",
    accountName: ""
  });

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  useEffect(() => {
      if (showWithdrawModal && banks.length === 0) {
          fetchBanks();
      }
  }, [showWithdrawModal]);

  useEffect(() => {
      if (withdrawForm.accountNumber.length === 10 && withdrawForm.bankCode) {
          handleResolveAccount();
      } else {
        // Reset account name if account number is invalid
        if(withdrawForm.accountName) {
             setWithdrawForm(prev => ({ ...prev, accountName: "" }));
        }
      }
  }, [withdrawForm.accountNumber, withdrawForm.bankCode]);


  const fetchBanks = async () => {
      try {
          const bankList = await getBanks();
          setBanks(bankList);
      } catch (error) {
          toast.error("Failed to load banks");
      }
  }

  const handleResolveAccount = async () => {
      try {
          setResolvingAccount(true);
          const res = await resolveAccount(withdrawForm.accountNumber, withdrawForm.bankCode);
          setWithdrawForm(prev => ({ ...prev, accountName: res.account_name }));
          toast.success("Account verified: " + res.account_name);
      } catch (error) {
          toast.error("Could not verify account details");
          setWithdrawForm(prev => ({ ...prev, accountName: "" }));
      } finally {
          setResolvingAccount(false);
      }
  }


  const fetchWalletBalance = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/profile/me"); 
      const user = res.data.data;
      setBalance({
        wallet_balance: user.wallet_balance || 0,
        pending_balance: user.pending_balance || 0
      });
    } catch (error) {
      console.error("Error fetching wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawForm.amount);
    
    if (isNaN(amount) || amount < 100) {
      toast.error("Minimum withdrawal is ₦100");
      return;
    }

    if (amount > balance.wallet_balance) {
      toast.error("Insufficient balance");
      return;
    }

    if (!withdrawForm.accountName) {
        toast.error("Please ensure account is verified");
        return;
    }

    try {
      setWithdrawLoading(true);
      const res = await requestWithdrawal({
        amount,
        bankName: withdrawForm.bankName,
        bankCode: withdrawForm.bankCode,
        accountNumber: withdrawForm.accountNumber,
        accountName: withdrawForm.accountName
      });
      
      toast.success("Withdrawal request submitted!");
      setBalance(prev => ({ ...prev, wallet_balance: res.new_balance }));
      setShowWithdrawModal(false);
      setWithdrawForm({ amount: "", bankName: "", bankCode: "", accountNumber: "", accountName: "" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Withdrawal failed");
    } finally {
      setWithdrawLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="relative">
           <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
           <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground animate-soft-pulse">Syncing Treasury...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-20">
      {/* Animated Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 md:h-72 rounded-[40px] overflow-hidden flex flex-col items-center justify-center bg-foreground p-8 text-center"
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              x: [-10, 30, -10]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-emerald-500 to-transparent blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1.3, 1, 1.3],
              rotate: [-90, 0, -90],
              x: [30, -10, 30]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-primary to-transparent blur-[120px] rounded-full"
          />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2"
           >
             <ShieldCheck className="w-3.5 h-3.5" />
             Secure Escrow System
           </motion.div>
           <h1 className="text-4xl md:text-6xl font-black text-muted-foreground tracking-tighter leading-none italic uppercase">
             Capital <span className="text-primary">Hub</span>
           </h1>
           <p className="text-white/60 text-sm md:text-base font-medium max-w-lg mx-auto">
             Manage your transactions, monitor your earnings, and handle withdrawals with absolute confidence.
           </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 px-2">
        {/* Available Balance Card */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="glass-panel p-10 relative overflow-hidden group transition-all duration-500 hover:shadow-premium rounded-[40px]"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
            <WalletIcon className="w-40 h-40" />
          </div>
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 blur-[60px] rounded-full" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
               <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <TrendingUp className="w-5 h-5" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Liquid Asset</p>
            </div>
            
            <div className="space-y-1">
               <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter italic">
                 ₦{balance.wallet_balance.toLocaleString()}
               </h2>
               <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Available for withdrawal</p>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowWithdrawModal(true)}
              className="w-full flex items-center justify-center gap-3 py-5 bg-foreground text-background rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-primary-glow hover:text-white transition-colors shadow-xl"
            >
              Request Withdrawal <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Pending/Escrow Balance Card */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="glass-panel p-10 relative overflow-hidden group transition-all duration-500 hover:shadow-premium rounded-[40px] border-primary/10"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity -rotate-12">
            <ShieldCheck className="w-40 h-40 text-primary" />
          </div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Secured Capital</p>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border border-primary-glow/20">
                        ESCROW
                    </div>
                </div>
            </div>
            
            <div className="space-y-1">
               <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter italic">
                 ₦{balance.pending_balance.toLocaleString()}
               </h2>
               <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">In transit / verification</p>
            </div>
            
            <div className="flex items-start gap-4 p-5 rounded-[24px] bg-white/40 border border-white/60 backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">
                  Funds are protected in AreaHood Escrow until the community confirms successful delivery or receipt.
                </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info Section - How Payments Work */}
      <div className="px-2">
        <div className="glass-panel p-12 rounded-[48px] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                 <div className="p-3 rounded-2xl bg-foreground text-black">
                    <Sparkles className="w-5 h-5" />
                 </div>
                 <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Escrow Ecosystem</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                  <motion.div whileHover={{ y: -5 }} className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black italic shadow-lg">01</div>
                      <div className="space-y-2">
                         <p className="text-sm font-black uppercase tracking-widest text-foreground">Secure Payment</p>
                         <p className="text-xs font-medium text-muted-foreground leading-relaxed">Borrower pays upfront, but your money remains in the safe-haven of AreaHood Escrow.</p>
                      </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-foreground text-black flex items-center justify-center font-black italic shadow-lg">02</div>
                      <div className="space-y-2">
                         <p className="text-sm font-black uppercase tracking-widest text-foreground">Trustful Exchange</p>
                         <p className="text-xs font-medium text-muted-foreground leading-relaxed">The exchange takes place. Once the borrower confirms the quality, the seal is broken.</p>
                      </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-black italic border border-primary/30">03</div>
                      <div className="space-y-2">
                         <p className="text-sm font-black uppercase tracking-widest text-foreground">Instant Release</p>
                         <p className="text-xs font-medium text-muted-foreground leading-relaxed">Funds hit your liquid balance instantly, ready for withdrawal to your verified bank account.</p>
                      </div>
                  </motion.div>
              </div>
           </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWithdrawModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl glass-panel bg-white/70 shadow-2xl overflow-hidden border-white/40 rounded-[48px]"
            >
              <div className="p-8 md:p-12 space-y-8">
                <div className="flex items-center justify-between">
                   <div>
                      <div className="flex items-center gap-2 text-primary mb-1">
                         <Landmark className="w-4 h-4" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bank Transfer</span>
                      </div>
                      <h2 className="text-3xl font-black text-foreground tracking-tight italic uppercase leading-none">
                        Withdraw <span className="text-primary">Funds</span>
                      </h2>
                   </div>
                   <motion.button 
                     whileHover={{ rotate: 90, scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={() => setShowWithdrawModal(false)}
                     className="p-3 rounded-2xl bg-white/50 text-muted-foreground hover:text-foreground border border-white/80 shadow-sm transition-colors"
                   >
                     <X className="w-5 h-5" />
                   </motion.button>
                </div>

                <form onSubmit={handleWithdraw} className="space-y-6">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black italic uppercase tracking-widest text-muted-foreground ml-1">Capital Amount (₦)</label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min="100"
                          max={balance.wallet_balance}
                          value={withdrawForm.amount}
                          onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                          className="w-full px-6 py-5 rounded-[24px] bg-white/50 border border-white focus:border-primary outline-none transition-all font-black text-lg shadow-sm placeholder:text-muted-foreground/40 text-gray-900"
                          placeholder="0.00"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary uppercase">NGN</div>
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground/60 ml-4 flex items-center gap-1">
                        <WalletIcon className="w-3 h-3" /> Max Liquidity: ₦{balance.wallet_balance.toLocaleString()}
                      </p>
                    </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black italic uppercase tracking-widest text-muted-foreground ml-1">Merchant Bank</label>
                        <div 
                          onClick={() => setShowBankModal(true)}
                          className="relative cursor-pointer group"
                        >
                          <Landmark className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none z-10 transition-transform group-hover:scale-110" />
                          <div
                            className="w-full pl-14 pr-6 py-5 rounded-[24px] bg-white/50 border border-white hover:border-primary/50 transition-all font-bold text-sm shadow-sm text-gray-900 flex items-center justify-between"
                          >
                             <span className={withdrawForm.bankName ? "text-foreground" : "text-muted-foreground"}>
                               {withdrawForm.bankName || "Select Bank"}
                             </span>
                             <ChevronRight className="w-4 h-4 rotate-90 text-muted-foreground" />
                          </div>
                        </div>
                      </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black italic uppercase tracking-widest text-muted-foreground ml-1">Account Number</label>
                        <div className="relative">
                           <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                           <input
                            type="text"
                            required
                            maxLength={10}
                            value={withdrawForm.accountNumber}
                            onChange={(e) => setWithdrawForm({ ...withdrawForm, accountNumber: e.target.value })}
                            className="w-full pl-14 pr-6 py-5 rounded-[24px] bg-white/50 border border-white focus:border-primary outline-none transition-all font-bold text-sm shadow-sm text-gray-900"
                            placeholder="0123456789"
                           />
                             {resolvingAccount && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                     <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                </div>
                             )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black italic uppercase tracking-widest text-muted-foreground ml-1">Beneficiary Name</label>
                        <input
                          type="text"
                          required
                          readOnly
                          value={withdrawForm.accountName}
                          className="w-full px-6 py-5 rounded-[24px] bg-white/30 border border-white/50 focus:border-primary outline-none transition-all font-bold text-sm shadow-sm text-gray-900 cursor-not-allowed"
                          placeholder="Auto-verified Name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowWithdrawModal(false)}
                      className="flex-1 py-5 rounded-[24px] hover:bg-white text-muted-foreground hover:text-foreground transition-all font-black uppercase tracking-widest text-[10px]"
                    >
                      Discard
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={withdrawLoading}
                      className="flex-[2] py-5 rounded-[24px] bg-foreground text-background font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-premium disabled:opacity-50 hover:bg-primary-glow hover:text-white transition-all"
                    >
                      {withdrawLoading ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Process Transfer <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bank Selection Modal */}
      <AnimatePresence>
        {showBankModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBankModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm glass-panel bg-white/90 shadow-2xl overflow-hidden border-white/40 rounded-[32px] max-h-[80vh] flex flex-col"
            >
              <div className="p-6 border-b border-white/10 shrink-0">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-xl font-black text-foreground tracking-tight uppercase italic">Select Bank</h3>
                   <button 
                     onClick={() => setShowBankModal(false)}
                     className="p-2 rounded-full hover:bg-black/5 transition-colors"
                   >
                     <X className="w-5 h-5" />
                   </button>
                </div>
                
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search banks..."
                    value={bankSearchQuery}
                    onChange={(e) => setBankSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 outline-none font-bold text-sm transition-all placeholder:font-medium"
                  />
                </div>
              </div>

              <div className="overflow-y-auto p-2 scrollbar-hide flex-1">
                {banks
                  .filter(bank => bank.name.toLowerCase().includes(bankSearchQuery.toLowerCase()))
                  .map((bank) => (
                    <button
                      key={bank.code}
                      onClick={() => {
                        setWithdrawForm({ ...withdrawForm, bankCode: bank.code, bankName: bank.name });
                        setShowBankModal(false);
                        setBankSearchQuery("");
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-between group"
                    >
                      <span className="font-bold text-sm">{bank.name}</span>
                      {withdrawForm.bankCode === bank.code && (
                        <div className="w-2 h-2 rounded-full bg-primary shadow-glow" />
                      )}
                    </button>
                  ))}
                  
                {banks.filter(bank => bank.name.toLowerCase().includes(bankSearchQuery.toLowerCase())).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-xs font-bold uppercase tracking-widest">No banks found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
