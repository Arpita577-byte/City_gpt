export type Role = "citizen" | "worker" | "admin";

export type ComplaintCategory =
  | "waste"
  | "water"
  | "pothole"
  | "traffic"
  | "lighting"
  | "tree"
  | "animal"
  | "emergency";

export type ComplaintStatus =
  | "reported"
  | "ai_detected"
  | "assigned"
  | "working"
  | "resolved";

export type PriorityLevel = "low" | "medium" | "high";

export interface Complaint {
  id: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  imageUrl?: string;
  beforePhoto?: string;
  afterPhoto?: string;
  priority: PriorityLevel;
  lat: number;
  lng: number;
  locationDescription: string;
  assignedTeam: string;
  status: ComplaintStatus;
  votes: number;
  verified: boolean;
  eta: string;
  dateReported: string;
  voiceRecorded?: boolean;
}

export interface Prediction {
  id: string;
  title: string;
  ward: string;
  probability: number;
  expectedWithin: string;
  recommendedAction: string;
  category: ComplaintCategory;
  lat: number;
  lng: number;
}

export interface CommunityPost {
  id: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  author: string;
  imageUrl?: string;
  date: string;
  upvotes: number;
  hasVotedByMe: boolean;
  complaintId?: string;
}

export interface RewardPointInfo {
  totalGreenPoints: number;
  badges: {
    id: string;
    title: string;
    iconName: string;
    description: string;
    unlocked: boolean;
  }[];
  history: {
    id: string;
    description: string;
    points: number;
    date: string;
  }[];
  leaderboard: {
    name: string;
    points: number;
    rank: number;
    isSelf?: boolean;
  }[];
}

export interface CityNotification {
  id: string;
  type: "info" | "warning" | "success" | "emergency";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}
