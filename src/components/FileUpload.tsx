import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
}

const FileUpload = ({ onAnalyze, isAnalyzing }: FileUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const handleAnalyze = () => {
    if (uploadedFile) {
      onAnalyze(uploadedFile);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardContent className="p-8">
        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 bg-gradient-upload",
              isDragActive 
                ? "border-primary bg-accent/50" 
                : "border-border hover:border-primary/50 hover:bg-accent/30"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Drop your file here</h3>
            <p className="text-muted-foreground mb-4">
              or click to browse your files
            </p>
            <p className="text-sm text-muted-foreground">
              Supported formats: TXT, PDF, DOC, DOCX
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                disabled={isAnalyzing}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <Button 
              onClick={handleAnalyze} 
              className="w-full" 
              size="lg"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze for AI Content"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;