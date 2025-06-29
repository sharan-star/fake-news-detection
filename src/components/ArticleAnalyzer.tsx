
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnalysisResult } from "@/types/analysis";
import { analyzeFakeNews } from "@/utils/fakeNewsDetector";

interface ArticleAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onAnalysisStart: () => void;
  isAnalyzing: boolean;
}

const ArticleAnalyzer = ({ onAnalysisComplete, onAnalysisStart, isAnalyzing }: ArticleAnalyzerProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter the article content to analyze.",
        variant: "destructive",
      });
      return;
    }

    if (content.trim().length < 50) {
      toast({
        title: "Content Too Short",
        description: "Please enter at least 50 characters for meaningful analysis.",
        variant: "destructive",
      });
      return;
    }

    onAnalysisStart();

    try {
      const fullText = `${title} ${content}`.trim();
      const result = await analyzeFakeNews(fullText);
      onAnalysisComplete(result);
      
      toast({
        title: "Analysis Complete",
        description: `Article analyzed as ${result.prediction} with ${(result.confidence * 100).toFixed(1)}% confidence.`,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the article. Please try again.",
        variant: "destructive",
      });
      onAnalysisComplete({
        prediction: 'FAKE',
        confidence: 0,
        reasoning: ['Analysis failed due to technical error'],
        processingTime: 0,
        articleLength: content.length,
        suspiciousIndicators: ['Technical error occurred'],
        reliabilityScore: 0
      });
    }
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
    setSource("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Article Title (Optional)</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the article title..."
          disabled={isAnalyzing}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="source">News Source (Optional)</Label>
        <Input
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="e.g., CNN, BBC, Reuters..."
          disabled={isAnalyzing}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Article Content *</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste the full article content here..."
          className="min-h-[200px] resize-none"
          disabled={isAnalyzing}
        />
        <p className="text-xs text-gray-500">
          {content.length} characters (minimum 50 required)
        </p>
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !content.trim() || content.trim().length < 50}
          className="flex-1"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Analyze Article
            </>
          )}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={isAnalyzing}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ArticleAnalyzer;
