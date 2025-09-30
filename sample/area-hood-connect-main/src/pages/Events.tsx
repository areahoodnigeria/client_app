import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  MapPin,
  Clock,
  Users,
  Plus,
  Filter,
  Grid3x3,
  List,
  Star
} from "lucide-react";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const events = [
    {
      id: 1,
      title: "Community Garden Workday",
      date: "Saturday, Dec 2",
      time: "10:00 AM - 2:00 PM",
      location: "Community Garden, Elm Street",
      distance: "0.5 miles",
      organizer: "Green Thumbs Society",
      attendees: 24,
      maxAttendees: 30,
      category: "Community Service",
      description: "Join us for our monthly community garden workday! We'll be planting winter vegetables, cleaning up beds, and planning for spring. All skill levels welcome.",
      image: null,
      rsvpStatus: "not_rsvped",
      price: "Free"
    },
    {
      id: 2,
      title: "Neighborhood Watch Meeting",
      date: "Tuesday, Dec 5",
      time: "7:00 PM - 8:30 PM",
      location: "Community Center, Main Hall",
      distance: "1.2 miles",
      organizer: "Neighborhood Safety Committee",
      attendees: 18,
      maxAttendees: 50,
      category: "Safety",
      description: "Monthly neighborhood watch meeting to discuss recent safety updates and community concerns. Light refreshments provided.",
      image: null,
      rsvpStatus: "going",
      price: "Free"
    },
    {
      id: 3,
      title: "Holiday Cookie Exchange",
      date: "Sunday, Dec 10",
      time: "2:00 PM - 5:00 PM",
      location: "Sarah's House, Oak Park",
      distance: "0.8 miles",
      organizer: "Sarah Chen",
      attendees: 12,
      maxAttendees: 15,
      category: "Social",
      description: "Bring 2 dozen cookies to share and take home a variety! Perfect way to try new recipes and meet neighbors. Hot cocoa and coffee provided.",
      image: null,
      rsvpStatus: "maybe",
      price: "Free"
    },
    {
      id: 4,
      title: "Local Business Showcase",
      date: "Saturday, Dec 16",
      time: "6:00 PM - 9:00 PM",
      location: "Downtown Square",
      distance: "1.5 miles",
      organizer: "Downtown Business Association",
      attendees: 65,
      maxAttendees: 100,
      category: "Business",
      description: "Discover local businesses in our community! Food trucks, live music, and special offers from neighborhood shops and services.",
      image: null,
      rsvpStatus: "not_rsvped",
      price: "Free"
    },
    {
      id: 5,
      title: "Winter Solstice Celebration",
      date: "Thursday, Dec 21",
      time: "5:00 PM - 8:00 PM",
      location: "Riverside Park Pavilion",
      distance: "2.1 miles",
      organizer: "Parks & Recreation",
      attendees: 43,
      maxAttendees: 75,
      category: "Cultural",
      description: "Celebrate the winter solstice with community bonfire, hot cider, caroling, and stargazing. Bring blankets and warm clothes!",
      image: null,
      rsvpStatus: "not_rsvped",
      price: "Free"
    },
    {
      id: 6,
      title: "New Year's Resolution Workshop",
      date: "Monday, Jan 8",
      time: "7:00 PM - 9:00 PM",
      location: "Library Meeting Room",
      distance: "1.8 miles",
      organizer: "Wellness Together Group",
      attendees: 8,
      maxAttendees: 20,
      category: "Wellness",
      description: "Set meaningful goals for the new year with guidance from a certified life coach. Materials and light snacks provided.",
      image: null,
      rsvpStatus: "not_rsvped",
      price: "$10"
    }
  ];

  const categories = [
    "All Events",
    "Community Service",
    "Safety",
    "Social",
    "Business",
    "Cultural",
    "Wellness",
    "Education",
    "Sports"
  ];

  const getRSVPColor = (status: string) => {
    switch (status) {
      case "going": return "bg-green-100 text-green-700 border-green-200";
      case "maybe": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "not_rsvped": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getRSVPText = (status: string) => {
    switch (status) {
      case "going": return "Going";
      case "maybe": return "Maybe";
      case "not_rsvped": return "RSVP";
      default: return "RSVP";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Community Service": return "bg-green-100 text-green-700";
      case "Safety": return "bg-red-100 text-red-700";
      case "Social": return "bg-pink-100 text-pink-700";
      case "Business": return "bg-blue-100 text-blue-700";
      case "Cultural": return "bg-purple-100 text-purple-700";
      case "Wellness": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Community <span className="text-gradient">Events</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and join events happening in your neighborhood
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 animate-fade-up delay-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for events, categories, or organizers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-primary/20 focus:border-primary"
            />
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="btn-ghost flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>This Week</span>
            </Button>

            <Button variant="outline" className="btn-ghost flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 animate-fade-up delay-200">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-sm text-muted-foreground">
              {events.length} upcoming events
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors cursor-glow ${
                  viewMode === "grid"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors cursor-glow ${
                  viewMode === "list"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <Button className="btn-hero flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </Button>
        </div>

        {/* Events Grid/List */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }`}>
          {events.map((event, index) => (
            <Card key={event.id} className={`glass card-hover animate-fade-up cursor-glow delay-${(index + 3) * 100} ${
              viewMode === "list" ? "w-full" : ""
            }`}>
              <CardContent className={`p-6 ${viewMode === "list" ? "flex space-x-6" : ""}`}>
                {/* Image placeholder */}
                <div className={`${
                  viewMode === "list" ? "w-32 h-32" : "w-full h-48"
                } bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4 ${
                  viewMode === "list" ? "mb-0" : ""
                }`}>
                  <div className="text-4xl">📅</div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                        {event.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-primary ml-2">
                      {event.price}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} going • {event.maxAttendees - event.attendees} spots left</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span>Organized by </span>
                      <span className="font-medium text-foreground">{event.organizer}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className={`${
                        event.rsvpStatus === "going" 
                          ? "bg-green-500 hover:bg-green-600" 
                          : event.rsvpStatus === "maybe"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "btn-hero"
                      }`}
                    >
                      {getRSVPText(event.rsvpStatus)}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12 animate-fade-up">
          <Button variant="outline" size="lg" className="btn-ghost">
            Load More Events
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Events;