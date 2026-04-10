import { RadioTower, Tags, CalendarClock, Zap } from 'lucide-react';

interface ProjectIconProps {
  slug: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'audio-streaming-stack': RadioTower,
  'media-metadata-api': Tags,
  'broadcast-scheduler': CalendarClock,
};

export default function ProjectIcon({ slug, size = 20, className }: ProjectIconProps) {
  const Icon = iconMap[slug] ?? Zap;
  return <Icon size={size} className={className} />;
}
