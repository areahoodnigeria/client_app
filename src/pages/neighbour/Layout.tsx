import { useState } from "react";
import { Search, Filter } from "lucide-react";
import Sidebar, {
  neighbourLinks,
  neighbourBottomLinks,
} from "../../components/dashboard/Sidebar";
import { Route, Routes } from "react-router-dom";
import NeighbourHome from "./NeighbourHome";
import Profile from "./Profile";
import PublicProfile from "./PublicProfile";
import Groups from "./Groups";
import DiscoverPage from "./discover/DiscoverPage";
import OrganizationDetails from "./discover/OrganizationDetails";
import InvitePage from "./InvitePage";
import RentalsPage from "./rentals/RentalsPage";
import PostDetails from "./PostDetails";

export default function NeighbourLayout() {
  const [collapsed] = useState(true);

  // Home content is rendered via NeighbourHome component

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative flex">
      <div className="w-10 md:w-16 flex-shrink-0">
        <Sidebar
          collapsed={collapsed}
          links={neighbourLinks}
          bottomLinks={neighbourBottomLinks}
          topOffset={0}
        />
      </div>

      {/* Main content area padding accounts for fixed sidebar */}
      <main
        className={`pt-6 transition-all px-4 md:px-8 flex flex-col items-center w-full`}
      >
        <div className="container-custom w-full">
          {/* Sticky search bar */}
          <div className="sticky top-4 z-10">
            <div className="glass-card p-3 md:p-4">
              <div className="flex items-center gap-3 backdrop-blur-lg">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search your neighborhood..."
                    className="w-full pl-9 pr-12 py-2 md:py-3 rounded-xl bg-background/60 border border-border focus:ring-2 focus:ring-primary/50 outline-none text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Filter className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<NeighbourHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:userId" element={<PublicProfile />} />
            <Route path="groups" element={<Groups />} />
            <Route path="invite" element={<InvitePage />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="discover/:id" element={<OrganizationDetails />} />
            <Route path="rentals" element={<RentalsPage />} />
            <Route path="post/:postId" element={<PostDetails />} />
          </Routes>{" "}
        </div>
      </main>
    </div>
  );
}
