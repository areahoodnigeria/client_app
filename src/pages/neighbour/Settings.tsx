import { useState } from "react";
import { 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Smartphone,
  LogOut,
  Globe
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "display", label: "Display & Appearance", icon: Eye },
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 border-r border-border pr-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-border">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="glass-card p-6">
                <h2 className="text-lg font-bold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <input type="text" className="w-full p-3 bg-muted/50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all" defaultValue="Samuel Okon" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <input type="email" className="w-full p-3 bg-muted/50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all" defaultValue="samuel@example.com" />
                  </div>
                  <div className="lg:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Bio</label>
                    <textarea className="w-full p-3 bg-muted/50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" rows={3} defaultValue="Active neighbor who loves gardening and community events." />
                  </div>
                </div>
                <button className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-medium">
                  Save Changes
                </button>
              </div>

              <div className="glass-card p-6 divide-y divide-border">
                <h2 className="text-lg font-bold mb-4">Account Features</h2>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-muted-foreground">Allow others to see your profile details.</p>
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-primary cursor-pointer" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Stay Discoverable</p>
                      <p className="text-sm text-muted-foreground">Show up in neighbors' discover feeds.</p>
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-primary cursor-pointer" defaultChecked />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="glass-card p-6">
                <h2 className="text-lg font-bold mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                   {[
                     { title: "New Posts", desc: "Notify when someone posts in your hood." },
                     { title: "Likes & Comments", desc: "Notify when someone interacts with your posts." },
                     { title: "Community Alerts", desc: "Urgent neighborhood safety notifications." },
                     { title: "Rentals & Lending", desc: "Updates about your items and requests." }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between py-2">
                       <div>
                         <p className="font-medium">{item.title}</p>
                         <p className="text-sm text-muted-foreground">{item.desc}</p>
                       </div>
                       <input type="checkbox" className="w-5 h-5 accent-primary cursor-pointer" defaultChecked />
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== "profile" && activeTab !== "notifications" && (
            <div className="flex flex-col items-center justify-center py-20 glass-card">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground italic">Coming soon to settings...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export default Settings;
