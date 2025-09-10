import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import ResultsDisplay from "@/components/ResultsDisplay";

interface AnalysisResult {
  aiProbability: number;
  confidence: number;
  fileName: string;
  wordCount: number;
  detectedPatterns: string[];
}

const Analyze = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock result - in real app, this would come from your AI detection API
    const mockResult: AnalysisResult = {
      aiProbability: Math.floor(Math.random() * 100),
      confidence: Math.floor(Math.random() * 30) + 70,
      fileName: file.name,
      wordCount: Math.floor(Math.random() * 1000) + 200,
      detectedPatterns: [
        "Repetitive phrasing",
        "Unusual sentence structure",
        "Generic vocabulary",
        "Artificial patterns",
        "Inconsistent style"
      ].slice(0, Math.floor(Math.random() * 3) + 1)
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Navigation */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Analyze Your Content</h1>
              <p className="text-muted-foreground text-lg">
                Upload your document, image, or video and get detailed AI detection results in seconds
              </p>
            </div>
            
            <FileUpload onAnalyze={handleFileAnalyze} isAnalyzing={isAnalyzing} />
            
            {result && (
              <div className="mt-12">
                <ResultsDisplay result={result} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analyze;