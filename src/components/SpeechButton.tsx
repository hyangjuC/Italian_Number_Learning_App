import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { useSpeech } from './useSpeech';

interface SpeechButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
}

export function SpeechButton({ 
  text, 
  className = "", 
  size = "md",
  variant = "outline"
}: SpeechButtonProps) {
  const { speak, stop, isPlaying } = useSpeech();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPlaying) {
      stop();
    } else {
      speak(text, 'it-IT');
    }
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      className={`${sizeClasses[size]} rounded-full ${
        isPlaying 
          ? "bg-[var(--italian-green)] border-[var(--italian-green)] text-white" 
          : "bg-white border-2 border-[var(--italian-green)] text-[var(--italian-green)] hover:bg-[var(--italian-green)] hover:text-white"
      } shadow-flat-2 hover:shadow-flat-3 transition-all duration-200 ${className}`}
    >
      {isPlaying ? (
        <VolumeX className={`${iconSizes[size]} animate-pulse`} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
    </Button>
  );
}