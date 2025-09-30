import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Send,
  Clock,
  Globe,
  Shield,
  Heart
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "hello@areahood.com",
      link: "mailto:hello@areahood.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our support team directly",
      contact: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help with our live chat support",
      contact: "Available 9 AM - 6 PM PT",
      link: "#"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Drop by our office for an in-person meeting",
      contact: "123 Community St, San Francisco, CA 94102",
      link: "#"
    }
  ];

  const faqs = [
    {
      question: "How do I verify my neighborhood?",
      answer: "We use address verification to confirm you live in the area. Simply enter your address during signup and we'll verify it within 24 hours."
    },
    {
      question: "Is Area Hood free to use?",
      answer: "Yes! Area Hood is completely free for all neighbors. We believe community connection shouldn't have a price tag."
    },
    {
      question: "How do you ensure user safety?",
      answer: "We verify all users, moderate content, and provide reporting tools. We take community safety very seriously."
    },
    {
      question: "Can I start Area Hood in my neighborhood?",
      answer: "Absolutely! We're always expanding to new areas. Contact us to learn about bringing Area Hood to your neighborhood."
    }
  ];

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Have a question, suggestion, or just want to say hello? 
              We'd love to hear from you. Our community team is here to help.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={method.title}
                className={`glass card-hover animate-fade-up cursor-glow delay-${index * 100}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {method.description}
                  </p>
                  <a
                    href={method.link}
                    className="text-primary hover:text-primary-hover font-medium text-sm transition-colors cursor-glow"
                  >
                    {method.contact}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-primary/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <Card className="glass-strong card-hover">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Send us a message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="glass border-primary/20 focus:border-primary"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="glass border-primary/20 focus:border-primary"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger className="glass border-primary/20">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Question</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="press">Press Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        className="glass border-primary/20 focus:border-primary"
                        placeholder="Brief description of your message"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="glass border-primary/20 focus:border-primary resize-none"
                        placeholder="Tell us more about how we can help..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full btn-hero text-lg py-6">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Information & FAQs */}
            <div className="space-y-8 animate-slide-in-right">
              {/* Business Hours */}
              <Card className="glass card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">
                      Business Hours
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="text-foreground font-medium">9:00 AM - 6:00 PM PT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="text-foreground font-medium">10:00 AM - 4:00 PM PT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="text-foreground font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card className="glass card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">
                      Company Information
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Founded:</span>
                      <span className="text-foreground font-medium ml-2">2023</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Headquarters:</span>
                      <span className="text-foreground font-medium ml-2">San Francisco, CA</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Communities Served:</span>
                      <span className="text-foreground font-medium ml-2">500+</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Active Users:</span>
                      <span className="text-foreground font-medium ml-2">10,000+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQs */}
              <Card className="glass card-hover">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-border/50 last:border-b-0 pb-4 last:pb-0">
                        <h4 className="font-medium text-foreground mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-strong rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 left-8 animate-float">
                <Shield className="w-20 h-20 text-primary" />
              </div>
              <div className="absolute bottom-8 right-8 animate-float delay-200">
                <Heart className="w-16 h-16 text-secondary" />
              </div>
            </div>

            <div className="relative z-10 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our <span className="text-gradient">Promise</span> to You
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                We promise to respond to every message within 24 hours, treat every question with care, 
                and work tirelessly to build the community platform you deserve. Your feedback shapes 
                our future, and your success is our success.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>24-hour response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Privacy protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Community focused</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;