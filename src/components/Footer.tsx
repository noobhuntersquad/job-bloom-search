
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-foreground">Find Jobs</Link>
              </li>
              <li>
                <Link to="/alerts" className="text-muted-foreground hover:text-foreground">Job Alerts</Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground">Career Resources</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">Our Story</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Use</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground">Twitter</a>
              </li>
              <li>
                <a href="https://linkedin.com" className="text-muted-foreground hover:text-foreground">LinkedIn</a>
              </li>
              <li>
                <a href="https://facebook.com" className="text-muted-foreground hover:text-foreground">Facebook</a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-muted-foreground hover:text-foreground">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
