import { Button } from "@/components/ui/button";
import clarifyLogo from "@/assets/clarify-logo.png";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={clarifyLogo} alt="Clarify" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-foreground">Clarify</h1>
          </div>
          <div className="flex items-center gap-6">
            {/* Social Media Links */}
            <div className="hidden md:flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it works
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm" asChild>
                <a href="/analyze">Get Started</a>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;