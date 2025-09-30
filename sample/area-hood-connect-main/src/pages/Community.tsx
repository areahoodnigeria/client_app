import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus,
  MapPin,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";

const Community = () => {
  const [newPost, setNewPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const posts = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "SC",
      location: "Downtown District",
      time: "2 hours ago",
      content: "Has anyone tried the new coffee shop on Main Street? The barista recommended their signature blend and it was absolutely amazing! They also have great pastries. Highly recommend checking it out if you're in the area. ☕️",
      image: null,
      likes: 24,
      comments: 8,
      category: "recommendation"
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      avatar: "MR",
      location: "Elm Street Area",
      time: "4 hours ago",
      content: "Community garden meeting this Saturday at 10 AM! We'll be planting winter vegetables and planning our spring layout. Bring gloves, water, and enthusiasm. New members always welcome! 🌱",
      image: null,
      likes: 32,
      comments: 18,
      category: "event"
    },
    {
      id: 3,
      user: "Emily Johnson",
      avatar: "EJ",
      location: "Oak Park Neighborhood",
      time: "6 hours ago",
      content: "Lost cat spotted near the playground yesterday evening. Orange tabby with white paws, very friendly. If you've seen him or if he's yours, please let me know! Sharing for visibility. 🐱",
      image: null,
      likes: 45,
      comments: 12,
      category: "alert"
    },
    {
      id: 4,
      user: "David Kim",
      avatar: "DK",
      location: "Pine Street",
      time: "8 hours ago",
      content: "Free book exchange box is now set up at the corner of Pine and 5th! Feel free to take a book and leave a book. Let's keep our community reading! 📚",
      image: null,
      likes: 28,
      comments: 15,
      category: "community"
    },
    {
      id: 5,
      user: "Lisa Thompson",
      avatar: "LT",
      location: "Riverside Area",
      time: "12 hours ago",
      content: "Neighborhood watch reminder: There have been a few reports of package theft in our area. Please keep an eye out for suspicious activity and report anything unusual. Stay safe everyone! 🚨",
      image: null,
      likes: 67,
      comments: 22,
      category: "safety"
    }
  ];

  const trendingTopics = [
    "Coffee Shops",
    "Community Garden",
    "Local Events",
    "Safety Updates",
    "Book Exchange"
  ];

  const categories = [
    { name: "All", count: posts.length, active: true },
    { name: "Recommendations", count: 12, active: false },
    { name: "Events", count: 8, active: false },
    { name: "Safety", count: 5, active: false },
    { name: "Community", count: 15, active: false }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "recommendation": return "bg-blue-100 text-blue-700";
      case "event": return "bg-green-100 text-green-700";
      case "alert": return "bg-yellow-100 text-yellow-700";
      case "community": return "bg-purple-100 text-purple-700";
      case "safety": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Community <span className="text-gradient">Feed</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay connected with your neighbors and discover what's happening in your area
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6 animate-slide-in-left">
            {/* Quick Stats */}
            <Card className="glass card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Community Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Active Members</span>
                    </div>
                    <span className="font-semibold text-foreground">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Posts Today</span>
                    </div>
                    <span className="font-semibold text-foreground">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Engagement</span>
                    </div>
                    <span className="font-semibold text-primary">+15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="glass card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-glow ${
                        category.active
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm">{category.count}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="glass card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Trending Topics</h3>
                <div className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={topic}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
                    >
                      <span className="text-xs font-bold text-primary">#{index + 1}</span>
                      <span className="text-sm text-muted-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search posts, topics, or neighbors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass border-primary/20 focus:border-primary"
                />
              </div>
              <Button variant="outline" className="btn-ghost flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </div>

            {/* Create Post */}
            <Card className="glass card-hover animate-fade-up delay-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">You</span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <Textarea
                      placeholder="What's happening in your neighborhood?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="glass border-primary/20 focus:border-primary resize-none"
                      rows={3}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>Downtown District</span>
                      </div>
                      <Button className="btn-hero flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post, index) => (
                <Card key={post.id} className={`glass card-hover animate-fade-up cursor-glow delay-${(index + 2) * 100}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{post.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{post.user}</h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{post.location}</span>
                              <span>•</span>
                              <Clock className="w-3 h-3" />
                              <span>{post.time}</span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                        </div>
                        
                        <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <button className="flex items-center space-x-2 hover:text-red-500 transition-colors cursor-glow">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 hover:text-primary transition-colors cursor-glow">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-2 hover:text-primary transition-colors cursor-glow">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center animate-fade-up">
              <Button variant="outline" size="lg" className="btn-ghost">
                Load More Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Community;