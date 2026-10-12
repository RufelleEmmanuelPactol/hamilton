export type LatLng = [number, number];

export type AgentName = "dispatch" | "assurance" | "proof" | "ops" | "system";

export interface Note {
  id: string;
  text: string;
  author: "agent" | "owner" | "driver";
  at: number; // sim minute
  source?: string;
}

export type DriverStatus = "idle" | "on_route" | "break" | "incident" | "done";

export interface DriverAutoContext {
  successRate: number; // 0-1, time-weighted
  onTimeRate: number; // 0-1, time-weighted
  deliveries30d: number;
  avgStopMins: number;
  areaFamiliarity: Record<string, number>; // area -> 0..1
  trend: "up" | "flat" | "down";
  coldStart?: boolean;
}

export interface DriverReport {
  id: string;
  type: ReportType;
  text: string;
  at: number;
  resolved?: boolean;
}

export interface Driver {
  id: string;
  name: string;
  initials: string;
  color: string;
  phone: string;
  vehicle: string;
  status: DriverStatus;
  position: LatLng;
  shiftStart: number;
  auto: DriverAutoContext;
  aiNotes: Note[];
  humanNotes: Note[];
  reports: DriverReport[];
  breakUntil?: number;
}

export interface Place {
  id: string;
  label: string;
  contactName: string;
  phone: string;
  address: string;
  area: string;
  position: LatLng;
  type: "home" | "office" | "condo" | "venue" | "shop";
  prefs: {
    window?: string;
    leaveWith?: string;
    gateCode?: string;
    instructions?: string;
  };
  stats: { deliveries: number; failed: number; answersPhone: "usually" | "sometimes" | "rarely" };
  notes: Note[];
}

export type OrderSource = "shopify" | "whatsapp" | "email" | "phone";

export type OrderStatus =
  | "inbox" // raw message, not yet parsed
  | "review" // parsed, needs owner check
  | "unassigned"
  | "assigned"
  | "heading"
  | "arrived"
  | "delivered"
  | "failed"
  | "on_hold"
  | "tomorrow";

export interface PodCheck {
  status: "checking" | "pass" | "retake";
  reasons: string[];
  confidence?: number;
}

export interface Pod {
  photo: string; // data url
  receivedBy: string;
  at: number;
  check: PodCheck;
  sample?: "good" | "blurry" | "nopackage";
}

export interface Order {
  id: string;
  code: string;
  source: OrderSource;
  raw?: string;
  customerName: string;
  phone: string;
  placeId?: string;
  address: string;
  area: string;
  position?: LatLng;
  items: string;
  value: number;
  window: { start: number; end: number }; // sim minutes from 00:00
  notes?: string;
  status: OrderStatus;
  driverId?: string;
  seq?: number;
  eta?: number;
  arrivedAt?: number;
  deliveredAt?: number;
  failReason?: string;
  pod?: Pod;
  confidence?: number;
  flags?: string[];
  confirmRequested?: boolean;
  confirmed?: boolean;
  leaveWith?: string;
}

export type Mode = "auto" | "ask" | "never";

export interface AutonomyRule {
  id: ActionType;
  label: string;
  description: string;
  mode: Mode;
  threshold?: { label: string; value: number; unit: string };
  group: "Customers" | "Dispatch" | "Proof" | "Memory" | "Money";
}

export type ActionType =
  | "notify_customer"
  | "reschedule_same_day"
  | "reschedule_next_day"
  | "reorder_route"
  | "reassign_stops"
  | "leave_with_alternate"
  | "save_memory"
  | "create_order"
  | "request_pod_retake"
  | "approve_plan"
  | "issue_refund";

export interface ProposedAction {
  id: string;
  type: ActionType;
  agent: AgentName;
  title: string;
  detail: string;
  reasoning: string[];
  payload: Record<string, unknown>;
  createdAt: number;
  status: "pending" | "approved" | "rejected" | "auto" | "blocked";
  severity: "low" | "medium" | "high";
  orderIds?: string[];
  driverId?: string;
}

export interface Activity {
  id: string;
  at: number;
  agent: AgentName;
  text: string;
  reasoning?: string[];
  mode: "auto" | "approved" | "rejected" | "blocked" | "info" | "needs_approval";
}

export interface Message {
  id: string;
  orderId: string;
  direction: "out" | "in";
  channel: "sms" | "whatsapp" | "email";
  kind: "notification" | "assistant" | "customer";
  text: string;
  at: number;
  image?: string;
}

export interface ChatMsg {
  id: string;
  role: "owner" | "agent";
  text: string;
  at: number;
  chips?: string[];
}

export interface PlanProposal {
  createdAt: number;
  routes: { driverId: string; orderIds: string[]; rationale: string[] }[];
  unassigned: { orderId: string; reason: string }[];
  summary: string[];
  status: "proposed" | "approved";
}

export type ReportType =
  | "flat_tire"
  | "lunch"
  | "running_late"
  | "not_home"
  | "wrong_address"
  | "vehicle_issue"
  | "other";
