
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, MapPin, Briefcase } from "lucide-react";
import jobService, { Job, JobSearchParams } from "@/api/job-service";

const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  
  // Form state
  const [searchQuery, setSearchQuery] = useState(searchParams.get("designation") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [experienceRange, setExperienceRange] = useState<[number, number]>([0, 15]);
  const [selectedSources, setSelectedSources] = useState<string[]>([
    "google_jobs",
    "indeed_jobs",
  ]);
  
  const jobSources = [
    { id: "google_jobs", label: "Google Jobs" },
    { id: "indeed_jobs", label: "Indeed" },
    { id: "linkedin_jobs", label: "LinkedIn" },
    { id: "monster_jobs", label: "Monster" },
  ];

  const fetchJobs = async (page: number = 1) => {
    setIsLoading(true);
    
    const params: JobSearchParams = {
      page,
      limit: 10,
    };
    
    if (searchQuery) {
      params.designation = searchQuery;
    }
    
    if (location) {
      params.location = location;
    }
    
    if (experienceRange[0] > 0) {
      params.exp_min = experienceRange[0];
    }
    
    if (experienceRange[1] < 15) {
      params.exp_max = experienceRange[1];
    }
    
    if (selectedSources.length > 0 && selectedSources.length < jobSources.length) {
      params.sources = selectedSources.join(",");
    }
    
    try {
      const response = await jobService.searchJobs(params);
      setJobs(response.results);
      setTotalJobs(response.total);
      setCurrentPage(response.page);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      let errorMessage = "Failed to fetch jobs.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial search on component mount based on URL params
  useEffect(() => {
    fetchJobs();
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL params
    const newSearchParams = new URLSearchParams();
    if (searchQuery) newSearchParams.set("designation", searchQuery);
    if (location) newSearchParams.set("location", location);
    setSearchParams(newSearchParams);
    
    fetchJobs(1);
  };
  
  const handleSourceToggle = (sourceId: string) => {
    setSelectedSources((prev) => {
      if (prev.includes(sourceId)) {
        return prev.filter((id) => id !== sourceId);
      } else {
        return [...prev, sourceId];
      }
    });
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchJobs(page);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
  };
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pagesToShow = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(5, totalPages);
      } else {
        startPage = Math.max(1, endPage - 4);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }
    
    return (
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          {startPage > 1 && (
            <>
              <Button
                variant={currentPage === 1 ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(1)}
              >
                1
              </Button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}
          
          {pagesToShow.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <Button
                variant={currentPage === totalPages ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            </>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Jobs</h1>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Job title, skills, or keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button type="submit">
              Search Jobs
            </Button>
          </form>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-card rounded-lg shadow p-4 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  Close
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block">Experience (years)</Label>
                  <div className="px-2">
                    <Slider
                      value={experienceRange}
                      min={0}
                      max={15}
                      step={1}
                      onValueChange={(value) => setExperienceRange(value as [number, number])}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{experienceRange[0]} years</span>
                      <span>{experienceRange[1] === 15 ? "15+ years" : `${experienceRange[1]} years`}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Job Sources</Label>
                  <div className="space-y-2">
                    {jobSources.map((source) => (
                      <div key={source.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={source.id}
                          checked={selectedSources.includes(source.id)}
                          onCheckedChange={() => handleSourceToggle(source.id)}
                        />
                        <label
                          htmlFor={source.id}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {source.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6" 
                onClick={() => {
                  setShowFilters(false);
                  fetchJobs(1);
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-1">
            <div className="bg-white dark:bg-card rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">
                    {totalJobs} jobs found
                    {searchQuery && ` for "${searchQuery}"`}
                    {location && ` in ${location}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Showing page {currentPage} of {totalPages}
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="bg-white dark:bg-card rounded-lg shadow p-4 animate-pulse">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white dark:bg-card rounded-lg shadow p-8 text-center">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search filters or try a different search term.
                </p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setLocation("");
                  setExperienceRange([0, 15]);
                  setSelectedSources(["google_jobs", "indeed_jobs"]);
                  fetchJobs(1);
                }}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.jobId} className="job-card">
                    <div className="flex items-start gap-4">
                      {job.companyLogoUrl ? (
                        <img 
                          src={job.companyLogoUrl} 
                          alt={job.companyName} 
                          className="w-12 h-12 object-contain rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-jobPortal-lightGray flex items-center justify-center rounded">
                          <span className="text-jobPortal-darkGray font-bold">
                            {job.companyName.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{job.jobTitle}</h3>
                        <p className="text-muted-foreground">{job.companyName}</p>
                        
                        <div className="flex flex-wrap items-center mt-2 gap-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {job.experienceRange}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            {formatDate(job.datePosted)}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="tag-skill">
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="tag-skill">
                              +{job.skills.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <Button size="sm" asChild>
                            <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                              View Job
                            </a>
                          </Button>
                          <Button size="sm" variant="outline">
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {renderPagination()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
