import type { ReactNode, SVGProps } from "react";

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string[];
  media?: MediaItem[];
  detailedDescription?: string;
  githubUrl?: string;
  liveUrl?: string;
  certificateUrl?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  certificateUrl?: string;
  media?: MediaItem[];
  detailedDescription?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
  filePath: string;
  category: "academic" | "competition" | "professional";
}

export interface SocialLink {
  name: string;
  url: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
}

export interface DebugConfig {
  particleDensity: number; // Divisor: smaller is denser
  mouseRadius: number;
  connectionDistance: number;
  idleZapFrequency: number;
  pulseIntensity: number;
  useProfilePicture: boolean;
}
