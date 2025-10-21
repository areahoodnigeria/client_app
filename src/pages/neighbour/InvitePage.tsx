import { useState } from "react";

type InvitePageProps = {
  referralCode?: string;
};

export default function InvitePage({ referralCode = "OBI-1234" }: InvitePageProps) {
  const [copiedMessage, setCopiedMessage] = useState<string>("");

  const referralLink = `https://areahood.com/invite?ref=${encodeURIComponent(referralCode)}`;

  const showCopied = (msg: string) => {
    setCopiedMessage(msg);
    setTimeout(() => setCopiedMessage(""), 1500);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      showCopied("Referral code copied!");
    } catch {
      showCopied("Unable to copy. Please try again.");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      showCopied("Invite link copied!");
    } catch {
      showCopied("Unable to copy. Please try again.");
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Join me on AreaHood! ${referralLink}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="glass-card p-6 md:p-8 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-2xl">🏡</div>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Invite Your Neighbors</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Help grow your community by inviting your friends to join you on AreaHood!
          </p>
        </div>

        {/* Referral Code Card */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Your referral code</div>
              <div className="mt-1 text-2xl md:text-3xl font-bold tracking-wide">{referralCode}</div>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 rounded-xl border border-border hover:bg-background/60 transition text-sm"
            >
              Copy Code
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopyLink}
              className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition text-sm"
            >
              Share via Link
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="flex-1 px-4 py-3 rounded-xl border border-border hover:bg-background/60 transition text-sm"
            >
              Share on WhatsApp
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Each friend who joins using your code helps you build a stronger community.
          </p>
        </div>

        {/* Copied Toast */}
        {copiedMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card px-4 py-2 text-sm shadow-card">
            {copiedMessage}
          </div>
        )}
      </div>
    </div>
  );
}