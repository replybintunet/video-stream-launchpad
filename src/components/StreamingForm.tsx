import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Play, CheckCircle, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StreamingForm = () => {
  const [streamKey, setStreamKey] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loop, setLoop] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamStarted, setStreamStarted] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'video/mp4') {
      setVideoFile(file);
    } else if (file) {
      toast({
        title: "Invalid file type",
        description: "Please select an MP4 video file.",
        variant: "destructive",
      });
    }
  };

  const handleStartStreaming = async () => {
    if (!streamKey.trim()) {
      toast({
        title: "Stream key required",
        description: "Please enter your YouTube stream key.",
        variant: "destructive",
      });
      return;
    }

    if (!videoFile) {
      toast({
        title: "Video file required",
        description: "Please upload an MP4 video file.",
        variant: "destructive",
      });
      return;
    }

    setIsStreaming(true);

    // Simulate streaming start
    setTimeout(() => {
      setIsStreaming(false);
      setStreamStarted(true);
      
      toast({
        title: "Streaming started!",
        description: `Your video is now streaming to YouTube${loop ? ' on loop' : ''}.`,
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setStreamStarted(false);
        setStreamKey('');
        setVideoFile(null);
        setLoop(false);
      }, 3000);
    }, 2000);
  };

  if (streamStarted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle className="h-16 w-16 text-success mb-4" />
          <h2 className="text-2xl font-bold text-center mb-2">Streaming Started!</h2>
          <p className="text-muted-foreground text-center">
            Your video is now live on YouTube{loop ? ' and will loop continuously' : ''}.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Youtube className="h-8 w-8 text-youtube mr-2" />
          <CardTitle className="text-2xl">YouTube Streamer</CardTitle>
        </div>
        <CardDescription>
          Enter your YouTube stream key, upload your video, and press Start.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="streamKey">YouTube Stream Key</Label>
          <Input
            id="streamKey"
            type="password"
            placeholder="Your YouTube stream key"
            value={streamKey}
            onChange={(e) => setStreamKey(e.target.value)}
            className="font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="video">Video File (.mp4)</Label>
          <div className="relative">
            <Input
              id="video"
              type="file"
              accept=".mp4,video/mp4"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label
              htmlFor="video"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-youtube/50 transition-colors"
            >
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                {videoFile ? (
                  <div>
                    <p className="text-sm font-medium">{videoFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium">Upload MP4 video</p>
                    <p className="text-xs text-muted-foreground">Click to browse</p>
                  </div>
                )}
              </div>
            </Label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="loop"
            checked={loop}
            onCheckedChange={(checked) => setLoop(checked as boolean)}
          />
          <Label htmlFor="loop" className="text-sm">
            Loop video continuously
          </Label>
        </div>

        <Button
          onClick={handleStartStreaming}
          variant="youtube"
          size="lg"
          className="w-full"
          disabled={isStreaming}
        >
          {isStreaming ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Starting Stream...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Streaming
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• The stream will run in the background</p>
          <p>• Videos are temporarily stored on the server</p>
          <p>• No authentication required</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamingForm;