import { useEffect, useState } from "react";
import { addKeyword, getKeywords, type KeywordSubscription } from "../../../api/rentalsApi";

export default function KeywordSubscription() {
  const [keywords, setKeywords] = useState<KeywordSubscription[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getKeywords();
        setKeywords(data);
      } catch (err) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = async () => {
    if (!newKeyword.trim()) return;
    const added = await addKeyword(newKeyword.trim());
    setKeywords((prev) => [added, ...prev]);
    setNewKeyword("");
  };

  return (
    <div className="glass-card p-4">
      <div className="font-medium text-foreground">Notify me when…</div>
      <div className="mt-2 flex items-center gap-2">
        <input
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="Add a keyword (e.g., camera, generator)"
          className="flex-1 px-3 py-2 rounded-xl bg-background/60 border border-border text-sm"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-2 rounded-xl bg-orange-500 text-white shadow-sm hover:bg-orange-600"
        >
          Add
        </button>
      </div>
      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
        {loading ? (
          <div className="text-xs text-muted-foreground">Loading keywords…</div>
        ) : keywords.length === 0 ? (
          <div className="text-xs text-muted-foreground">No keywords added yet.</div>
        ) : (
          keywords.map((k) => (
            <div key={k._id} className="text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
              {k.keyword}
            </div>
          ))
        )}
      </div>
    </div>
  );
}