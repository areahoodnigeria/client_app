import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  MapPin,
  Clock,
  DollarSign,
  Plus,
  Grid3x3,
  List,
  Star
} from "lucide-react";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const items = [
    {
      id: 1,
      title: "Vintage Bicycle - Excellent Condition",
      price: 350,
      seller: "Sarah Chen",
      location: "Downtown District",
      distance: "0.5 miles",
      time: "2 hours ago",
      image: null,
      category: "Transportation",
      condition: "Like New",
      description: "Beautiful vintage bike, well maintained. Perfect for neighborhood rides and commuting.",
      likes: 12,
      messages: 5,
      rating: 4.9
    },
    {
      id: 2,
      title: "Dining Table Set - 6 Chairs",
      price: 200,
      seller: "Mike Rodriguez",
      location: "Elm Street Area",
      distance: "1.2 miles",
      time: "4 hours ago",
      image: null,
      category: "Furniture",
      condition: "Good",
      description: "Solid wood dining table with 6 matching chairs. Some minor wear but very sturdy.",
      likes: 8,
      messages: 12,
      rating: 4.7
    },
    {
      id: 3,
      title: "iPhone 13 - Unlocked",
      price: 550,
      seller: "Emily Johnson",
      location: "Oak Park Neighborhood",
      distance: "0.8 miles",
      time: "6 hours ago",
      image: null,
      category: "Electronics",
      condition: "Excellent",
      description: "iPhone 13, 128GB, unlocked. Comes with case and screen protector. No scratches.",
      likes: 24,
      messages: 18,
      rating: 5.0
    },
    {
      id: 4,
      title: "Garden Tools & Supplies",
      price: 75,
      seller: "David Kim",
      location: "Pine Street",
      distance: "1.5 miles",
      time: "8 hours ago",
      image: null,
      category: "Garden & Outdoor",
      condition: "Good",
      description: "Complete set of garden tools including shovels, rakes, and watering supplies.",
      likes: 6,
      messages: 3,
      rating: 4.5
    },
    {
      id: 5,
      title: "Baby Equipment Bundle",
      price: 120,
      seller: "Lisa Thompson",
      location: "Riverside Area",
      distance: "2.1 miles",
      time: "12 hours ago",
      image: null,
      category: "Baby & Kids",
      condition: "Very Good",
      description: "High chair, stroller, and baby carrier. All items in great condition and from smoke-free home.",
      likes: 15,
      messages: 9,
      rating: 4.8
    },
    {
      id: 6,
      title: "Books - Fiction Collection",
      price: 25,
      seller: "Alex Wilson",
      location: "Cherry Lane",
      distance: "1.8 miles",
      time: "1 day ago",
      image: null,
      category: "Books & Media",
      condition: "Good",
      description: "Collection of 20+ fiction books including bestsellers and classics. Great for book lovers!",
      likes: 9,
      messages: 7,
      rating: 4.6
    }
  ];

  const categories = [
    "All Categories",
    "Electronics",
    "Furniture",
    "Transportation",
    "Garden & Outdoor",
    "Baby & Kids",
    "Books & Media",
    "Clothing",
    "Sports & Recreation"
  ];

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Like New": return "bg-green-100 text-green-700";
      case "Excellent": return "bg-blue-100 text-blue-700";
      case "Very Good": return "bg-purple-100 text-purple-700";
      case "Good": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Neighborhood <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Buy and sell with your neighbors safely and conveniently
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 animate-fade-up delay-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for items, categories, or sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-primary/20 focus:border-primary"
            />
          </div>
          
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-48 glass border-primary/20">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-32 glass border-primary/20">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low-high">Price: Low to High</SelectItem>
                <SelectItem value="high-low">Price: High to Low</SelectItem>
                <SelectItem value="under-50">Under $50</SelectItem>
                <SelectItem value="50-200">$50 - $200</SelectItem>
                <SelectItem value="over-200">Over $200</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="btn-ghost flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 animate-fade-up delay-200">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-sm text-muted-foreground">
              Showing {items.length} items near you
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
            <span>List an Item</span>
          </Button>
        </div>

        {/* Items Grid/List */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }`}>
          {items.map((item, index) => (
            <Card key={item.id} className={`glass card-hover animate-fade-up cursor-glow delay-${(index + 3) * 100} ${
              viewMode === "list" ? "w-full" : ""
            }`}>
              <CardContent className={`p-6 ${viewMode === "list" ? "flex space-x-6" : ""}`}>
                {/* Image placeholder */}
                <div className={`${
                  viewMode === "list" ? "w-32 h-32" : "w-full h-48"
                } bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4 ${
                  viewMode === "list" ? "mb-0" : ""
                }`}>
                  <div className="text-4xl">📷</div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                      {item.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getConditionColor(item.condition)}`}>
                      {item.condition}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {item.seller.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span>{item.seller}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-glow">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-primary transition-colors cursor-glow">
                        <MessageCircle className="w-4 h-4" />
                        <span>{item.messages}</span>
                      </button>
                    </div>
                    <Button size="sm" className="btn-hero">
                      Contact Seller
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
            Load More Items
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Marketplace;