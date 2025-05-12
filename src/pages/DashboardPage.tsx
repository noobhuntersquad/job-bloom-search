
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Bell, Building, Eye, ChevronRight } from "lucide-react";
import { Alert } from "@/api/alert-service";
import { Job } from "@/api/job-service";
import { useAuth } from "@/context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState({
    viewedJobs: 0,
    savedJobs: 0,
    activeAlerts: 0,
    totalMatches: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    const fetchDashboardData = () => {
      setTimeout(() => {
        // Mock data for demonstration purposes
        setRecentAlerts([
          {
            _id: "681f9b003aab3a8f1727dc22",
            name: "Senior React Developer Jobs",
            criteria: {
              designation: "Senior Developer",
              keywords: ["React", "Node.js"],
              location: "Bangalore",
              exp_min: 5
            },
            frequency: "daily",
            active: true,
            lastSent: "2025-05-10T09:15:22.921Z",
            createdAt: "2025-05-11T10:24:16.921Z"
          },
          {
            _id: "681f9b003aab3a8f1727dc23",
            name: "Frontend JavaScript Jobs",
            criteria: {
              keywords: ["JavaScript", "TypeScript", "Frontend"],
              location: "Remote",
              exp_min: 2
            },
            frequency: "weekly",
            active: true,
            lastSent: "2025-05-09T11:32:15.921Z",
            createdAt: "2025-05-10T08:14:26.921Z"
          }
        ]);
        
        setRecentJobs([
          {
            jobId: "in-38f3a1a2c5681664",
            jobTitle: "Senior React Developer",
            companyName: "Harness",
            companyLogoUrl: "",
            location: "Bangalore, KA",
            skills: ["React", "Node.js", "MongoDB"],
            experienceRange: "5-8 years",
            datePosted: "2025-05-09",
            jobUrl: "#",
            description: "We are looking for a Senior React Developer to join our team..."
          },
          {
            jobId: "in-38f3a1a2c5681665",
            jobTitle: "Full Stack JavaScript Engineer",
            companyName: "Tech Innovations",
            companyLogoUrl: "",
            location: "Remote",
            skills: ["JavaScript", "React", "Express", "MongoDB"],
            experienceRange: "3-6 years",
            datePosted: "2025-05-10",
            jobUrl: "#",
            description: "Join our team as a Full Stack JavaScript Engineer..."
          },
          {
            jobId: "in-38f3a1a2c5681666",
            jobTitle: "Frontend Engineer",
            companyName: "GlobalTech",
            companyLogoUrl: "",
            location: "New York, NY",
            skills: ["JavaScript", "TypeScript", "React", "CSS"],
            experienceRange: "2-5 years",
            datePosted: "2025-05-11",
            jobUrl: "#",
            description: "Exciting opportunity for a Frontend Engineer..."
          }
        ]);
        
        setStats({
          viewedJobs: 24,
          savedJobs: 8,
          activeAlerts: 2,
          totalMatches: 43,
        });
        
        setIsLoading(false);
      }, 1000);
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.firstName || "User"}</p>
          </div>
          
          <div className="flex gap-2">
            <Link to="/jobs">
              <Button variant="outline" className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Search Jobs
              </Button>
            </Link>
            <Link to="/alerts/new">
              <Button className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Jobs Viewed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                ) : (
                  stats.viewedJobs
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Saved Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                ) : (
                  stats.savedJobs
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                ) : (
                  stats.activeAlerts
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Job Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                ) : (
                  stats.totalMatches
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Job Matches */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Job Matches</CardTitle>
                  <CardDescription>Jobs that match your skills and preferences</CardDescription>
                </div>
                <Link to="/jobs">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-start gap-4 animate-pulse">
                        <div className="w-10 h-10 bg-muted rounded"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                          <div className="h-3 bg-muted rounded w-1/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <Building className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="font-medium mb-1">No job matches yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create job alerts to get matching jobs
                    </p>
                    <Link to="/alerts/new">
                      <Button>Create Alert</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <div key={job.jobId} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        {job.companyLogoUrl ? (
                          <img 
                            src={job.companyLogoUrl} 
                            alt={job.companyName} 
                            className="w-10 h-10 object-contain rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-jobPortal-lightGray flex items-center justify-center rounded">
                            <span className="text-jobPortal-darkGray font-bold">
                              {job.companyName.charAt(0)}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium truncate">{job.jobTitle}</h4>
                            <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {new Date(job.datePosted).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground flex items-center">
                            {job.companyName} · {job.location}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {job.skills.slice(0, 3).map((skill, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <Link
                          to={`/jobs/${job.jobId}`}
                          className="text-jobPortal-blue hover:text-jobPortal-darkBlue"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                      </div>
                    ))}
                    
                    <div className="pt-4 text-center">
                      <Link to="/jobs">
                        <Button variant="outline" size="sm">See all job listings</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Job Alerts */}
          <div>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Job Alerts</CardTitle>
                  <CardDescription>Get notified about new opportunities</CardDescription>
                </div>
                <Link to="/alerts">
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2 mb-1"></div>
                        <div className="h-3 bg-muted rounded w-1/3"></div>
                      </div>
                    ))}
                  </div>
                ) : recentAlerts.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="font-medium mb-1">No alerts yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create your first job alert to get notified
                    </p>
                    <Link to="/alerts/new">
                      <Button>Create Alert</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert._id} className="p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{alert.name}</h4>
                          <Badge variant={alert.active ? "default" : "outline"}>
                            {alert.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.criteria.designation || alert.criteria.keywords?.join(", ")}
                          {alert.criteria.location && ` • ${alert.criteria.location}`}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <span>{alert.frequency === "daily" ? "Daily" : "Weekly"}</span>
                          <span>Last sent: {new Date(alert.lastSent || "").toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <Link to={`/alerts/${alert._id}`}>
                            <Button variant="outline" size="sm">Edit</Button>
                          </Link>
                          <Link to={`/jobs?alertId=${alert._id}`}>
                            <Button size="sm" className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              View Jobs
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 text-center">
                      <Link to="/alerts/new">
                        <Button variant="outline">Create new alert</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Subscription Card */}
        {user?.plan === "free" && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Upgrade to Premium</h3>
                  <p className="text-muted-foreground">
                    Get unlimited job searches, advanced filtering, and daily job alerts.
                  </p>
                </div>
                <Link to="/pricing">
                  <Button>View Plans</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
