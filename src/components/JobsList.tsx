
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/api/job-service";
import { useAuth } from "@/context/AuthContext";

interface JobsListProps {
  jobs: Job[];
  isLoading: boolean;
}

const JobsList = ({ jobs, isLoading }: JobsListProps) => {
  const { user } = useAuth();
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  
  useEffect(() => {
    // If user is on free plan, limit to 5 jobs
    if (user?.plan === "free" && jobs.length > 5) {
      setDisplayedJobs(jobs.slice(0, 5));
      setShowUpgradePrompt(true);
    } else {
      setDisplayedJobs(jobs);
      setShowUpgradePrompt(false);
    }
  }, [jobs, user?.plan]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (displayedJobs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-lg font-medium">No jobs found</p>
          <p className="text-muted-foreground">Try adjusting your search filters</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {displayedJobs.map((job) => (
        <Card key={job.jobId} className="group">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {job.companyLogoUrl ? (
                <img 
                  src={job.companyLogoUrl} 
                  alt={job.companyName} 
                  className="w-12 h-12 object-contain rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-muted flex items-center justify-center rounded">
                  <span className="text-lg font-bold">{job.companyName.charAt(0)}</span>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-lg font-medium group-hover:text-jobPortal-blue">
                  <Link to={`/jobs/${job.jobId}`}>{job.jobTitle}</Link>
                </h3>
                
                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <span>{job.companyName}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.experienceRange}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {job.skills.slice(0, 5).map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.skills.length - 5}
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-muted-foreground">
                    Posted {new Date(job.datePosted).toLocaleDateString()}
                  </span>
                  
                  <div className="flex gap-2">
                    <Link to={`/jobs/${job.jobId}`}>
                      <Button size="sm" variant="outline">View Details</Button>
                    </Link>
                    <Link to={job.jobUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm">Apply</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {showUpgradePrompt && (
        <Card className="border-jobPortal-blue/30 bg-jobPortal-blue/5">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Upgrade to see more jobs</h3>
              <p className="text-muted-foreground mb-4">
                You're viewing 5 out of {jobs.length} available jobs. 
                Premium members get unlimited job listings.
              </p>
              <Link to="/pricing">
                <Button>View Premium Plans</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobsList;
