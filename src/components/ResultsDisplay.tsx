import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

interface AnalysisResult {
  aiProbability: number;
  confidence: number;
  fileName: string;
  wordCount: number;
  detectedPatterns: string[];
}

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const getScoreColor = (score: number) => {
    if (score <= 25) return "text-ai-very-low";
    if (score <= 50) return "text-ai-low";
    if (score <= 75) return "text-ai-medium";
    return "text-ai-high";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score <= 25) return "secondary";
    if (score <= 50) return "outline";
    if (score <= 75) return "secondary";
    return "destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score <= 25) return <CheckCircle className="w-5 h-5 text-ai-very-low" />;
    if (score <= 50) return <Info className="w-5 h-5 text-ai-low" />;
    if (score <= 75) return <AlertTriangle className="w-5 h-5 text-ai-medium" />;
    return <XCircle className="w-5 h-5 text-ai-high" />;
  };

  const getScoreLabel = (score: number) => {
    if (score <= 25) return "Very Likely Human";
    if (score <= 50) return "Likely Human";
    if (score <= 75) return "Possibly AI Generated";
    return "Likely AI Generated";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold">Analysis Results</CardTitle>
        <p className="text-muted-foreground">{result.fileName}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Score */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            {getScoreIcon(result.aiProbability)}
            <div>
              <div className={`text-4xl font-bold ${getScoreColor(result.aiProbability)}`}>
                {result.aiProbability}%
              </div>
              <p className="text-sm text-muted-foreground">AI Probability</p>
            </div>
          </div>
          
          <Badge variant={getScoreBadgeVariant(result.aiProbability)} className="text-sm px-4 py-1">
            {getScoreLabel(result.aiProbability)}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Human</span>
            <span>AI Generated</span>
          </div>
          <Progress value={result.aiProbability} className="h-3" />
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-semibold text-primary">{result.confidence}%</div>
            <p className="text-sm text-muted-foreground">Confidence</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-primary">{result.wordCount}</div>
            <p className="text-sm text-muted-foreground">Words Analyzed</p>
          </div>
        </div>

        {/* Detected Patterns */}
        {result.detectedPatterns.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Detected Patterns</h4>
            <div className="flex flex-wrap gap-2">
              {result.detectedPatterns.map((pattern, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {pattern}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;