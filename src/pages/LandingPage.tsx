
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Tag } from "lucide-react";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results page with query parameters
    window.location.href = `/jobs?designation=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(location)}`;
  };

  const categories = [
    { name: "Software Development", icon: Briefcase, count: 1243 },
    { name: "Marketing", icon: Tag, count: 865 },
    { name: "Design", icon: Briefcase, count: 532 },
    { name: "Sales", icon: Briefcase, count: 621 },
    { name: "Customer Support", icon: Briefcase, count: 412 },
    { name: "Finance", icon: Briefcase, count: 385 },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "I found my dream job within a week of using JobPortal. The alerting system is a game changer!",
      name: "Sarah Johnson",
      title: "Software Engineer",
      company: "TechCorp",
    },
    {
      id: 2,
      quote: "The search filters helped me narrow down exactly the kind of position I was looking for.",
      name: "Michael Chen",
      title: "Product Manager",
      company: "InnovateCo",
    },
    {
      id: 3,
      quote: "JobPortal's premium plan was worth every penny. I received daily matches that were spot on.",
      name: "Jessica Miller",
      title: "Marketing Director",
      company: "BrandBoost",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="mb-6 font-bold">Find Your Next Career Opportunity</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Discover thousands of job opportunities with all the information you need.</p>
          
          <form onSubmit={handleSearch} className="bg-white dark:bg-card rounded-lg p-2 md:p-3 shadow-lg flex flex-col md:flex-row max-w-4xl mx-auto gap-2">
            <div className="flex items-center bg-background dark:bg-accent rounded-md px-3 py-2 flex-1">
              <Search className="h-5 w-5 text-muted-foreground mr-2" />
              <Input 
                type="text" 
                placeholder="Job title, skills, or company" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            
            <div className="flex items-center bg-background dark:bg-accent rounded-md px-3 py-2 flex-1">
              <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
              <Input 
                type="text" 
                placeholder="Location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            
            <Button type="submit" className="md:w-auto">
              Search Jobs
            </Button>
          </form>
          
          <div className="mt-6 text-sm">
            <span className="opacity-80">Popular searches:</span>
            <span className="ml-2">
              <Link to="/jobs?keywords=react" className="text-white underline mx-1 hover:opacity-80">React</Link>
              <Link to="/jobs?keywords=marketing" className="text-white underline mx-1 hover:opacity-80">Marketing</Link>
              <Link to="/jobs?keywords=remote" className="text-white underline mx-1 hover:opacity-80">Remote</Link>
            </span>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-center mb-12">Browse Job Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={`/jobs?category=${encodeURIComponent(category.name)}`}
                className="flex items-center p-6 rounded-lg border hover:border-jobPortal-blue hover:shadow-md transition duration-200"
              >
                <div className="mr-4 p-3 bg-jobPortal-lightGray rounded-full">
                  <category.icon className="h-6 w-6 text-jobPortal-blue" />
                </div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} open positions</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 bg-jobPortal-gray dark:bg-background">
        <div className="container mx-auto">
          <h2 className="text-center mb-4">How JobPortal Works</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Find and land your next job with our simple, streamlined process.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-jobPortal-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-medium mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">Sign up and build your profile to help us find the perfect job matches for you.</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-jobPortal-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-medium mb-2">Set Up Job Alerts</h3>
              <p className="text-muted-foreground">Create custom job alerts to be notified when new relevant positions become available.</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-jobPortal-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-medium mb-2">Apply and Get Hired</h3>
              <p className="text-muted-foreground">Apply to positions that match your skills and experience, and land your dream job.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-center mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6 rounded-lg border bg-white dark:bg-card">
                <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.title}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-jobPortal-blue text-white text-center">
        <div className="container mx-auto">
          <h2 className="mb-6">Ready to Find Your Next Opportunity?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Create your profile now and get access to thousands of jobs from top companies.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button variant="secondary" size="lg">Create Account</Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-jobPortal-blue">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
