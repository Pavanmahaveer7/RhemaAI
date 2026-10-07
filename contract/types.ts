// Rhema.ai shared contract. Frontend and backend both import these types.
// Rule: the server sends exactly these shapes. Anything not listed here must not be sent.

// ---------- Common ----------
export type ISODate = string;            // "2026-09-27"
export type MonthId = string;            // "2026-09"
export type RequestId = string;          // "req_3fa9c1…" — shown to user on error/blocked
export type Tradition = "Hindu" | "Buddhist" | "Christian";
export type Role = "guest" | "user" | "expert" | "pastor" | "mentor" | "reviewer" | "leader" | "admin";
export type Lang = "en" | "hi" | "bn" | "ne" | "my" | "km";   // English, Hindi, Bengali, Nepali, Burmese, Khmer

/** Every screen maps to exactly one of these. Matches #state=… in the UI kit. */
export type ScreenState = "loading" | "empty" | "error" | "unavailable" | "blocked";

export interface ApiError {
  error: {
    kind: Exclude<ScreenState, "loading">; // empty | error | unavailable | blocked
    code: ErrorCode;
    message: string;                       // plain words, safe to show as-is
    requestId: RequestId;
    retryable: boolean;
  };
}
export type ErrorCode =
  | "not_found" | "validation" | "unauthenticated" | "forbidden"
  | "blocked_injection" | "blocked_policy" | "rate_limited"
  | "service_down" | "feature_off" | "internal";

export interface Source {                 // e.g. Romans 10:9
  tradition: Tradition; work: string; reference: string;
  // Present only when the passage is loaded from a licence-checked source (ADR-007).
  quote?: string; translation?: string; license?: string; url?: string | null;
}

export interface Passage extends Source { quote: string; translation: string; license: string; url: string | null }
export interface Passages {
  term: string;
  question: string | null;
  searchedFor: Record<Tradition, string[]>;
  passages: Passage[];                     // 0..6, at most 2 per tradition
  found: boolean;                          // false => "Not in verified sources"
  model: null;                             // retrieval only; a model name appears here once a key is set
  note: string;
}
export interface Verse { ref: string; text: string; translation: string; url: string | null }

// ---------- Layer 1: Dictionary ----------
export interface TermSummary { term: string; pos: string; def: string; used: Tradition[] }

export interface Term extends TermSummary {
  sources: Source[];
  lang: Lang;                              // "en" when no reviewed translation exists
  faith: FaithMode | null;                 // null = coverage insufficient, or an alert has paused Faith mode
}

export interface FaithMode {
  parallel: string | null;
  difference: string | null;
  bridge: string | null;
  gaps: FaithGap[];                        // 0..n
  root: string | null;                     // linguistic root
  timeline: string | null;
  close: string | null;
  sources: Source[];                       // [] => "No verified source" message
  verses: Verse[];                         // quotes of this entry's loaded sources; [] => "Not covered"
  reviewedAt: ISODate;                     // only reviewed content is ever returned
}
export interface FaithGap {
  key: string; title: string;
  left: { label: string; text: string };
  right: { label: string; text: string };
  gap: string;
}

/** Expert edit. Never public until a human approves. */
export interface ExpertEdit {
  id: string; term: string;
  block: keyof Omit<FaithMode, "gaps" | "sources" | "reviewedAt"> | "gaps" | "sources";
  proposed: string;
  status: "pending_review" | "approved" | "rejected";
  submittedAt: ISODate;
  reviewedAt?: ISODate;
  previous?: string | null;                // text it replaced, kept beside the new text once approved
  // author identity is stored server-side only; not in this shape
}
export interface FaithCoverage { term: string; status: "unwritten" | "drafted" | "one_checked" | "checked"; checks: 0 | 1 | 2 }

// ---------- Layer 2: Monthly question + concept map ----------
export type FaithWord = "salvation" | "marriage" | "love" | "faith";

export interface MonthlyQuestion {
  id: MonthId;
  label: string;                           // "Sep 2026"
  question: string;                        // "What does salvation mean to you?"
  term: FaithWord;                         // must appear in question; UI links it to Faith mode
  open: boolean;                           // accepting answers
  closesAt: ISODate;
}

export interface SubmitAnswerRequest { monthId: MonthId; text: string }  // 1..280 chars
export interface SubmitAnswerResponse {
  accepted: true;
  replacedPrevious: boolean;               // one answer per person per month
  removedDetails: number;                  // count of redacted PII, never the values
  support: boolean;                        // crisis language detected -> show support line
  othersTalkedAbout: string[];             // published concept labels only, >= 3 mentions
}

/** Public map for one month. Aggregates only. */
export interface ConceptMap {
  id: MonthId; label: string; question: string; term: FaithWord;
  answers: number;                         // total answer count
  concepts: Concept[];                     // ONLY concepts with count >= 3
  links: ConceptLink[];                    // ONLY between returned concepts
  hiddenRare: number;                      // how many concepts were under 3 (count only)
  publishedAt: ISODate;
}
export interface Concept { id: string; count: number; isNew: boolean } // isNew = absent last month
export interface ConceptLink { a: string; b: string; weight: number; kind: "shared" | "apart" }

/** Scrub: this month + last month. `previous` is null when only one month exists -> UI hides scrub. */
export interface ConceptMapCompare {
  current: ConceptMap;
  previous: ConceptMap | null;
  changes: { id: string; previous: number; current: number; trend: "new" | "up" | "down" | "same" | "gone" }[];
}

/** Admin-only draft. The one place anonymous answer text may appear. */
export interface ConceptMapDraft extends Omit<ConceptMap, "concepts" | "hiddenRare" | "publishedAt"> {
  status: "draft";
  concepts: (Concept & { underThreshold: boolean })[];
  flagged: number;                         // held back, count only
  anonymousAnswers: string[];              // redacted text; no id, account, time or place
}
export type DraftEdit =
  | { op: "rename"; concept: string; to: string }
  | { op: "merge"; concept: string; into: string }
  | { op: "remove"; concept: string };

// ---------- Accounts / settings ----------
export interface Session { kind: Role; displayName: string | null; pseudonym?: string }

export interface StaffPhoneSendResponse {
  maskedPhone: string;
  expiresInSeconds: number;
  delivery: "demo_screen" | "sms_pending";
  demoCode?: string;                       // omitted when STAFF_PHONE_OTP_DEMO=false
  message?: string;
}
export interface StaffPhoneRegisterRequest {
  phone: string;
  code: string;
  password: string;
  displayName?: string;
}
export interface StaffPhoneSigninRequest { phone: string; code: string }

export interface FeedbackItem { id: string; kind: string; text: string; status: "open" | "done"; meToo: number }
export interface FeedbackChangelogEntry { at: ISODate; text: string }

export interface AdminAnalytics {
  range: string;
  region: string;
  wordViews: number;
  monthlyAnswers: number;
  checkins: number;
  betaSurveys: number;
  feedbackItems: number;
  waitlist: number;
}
export interface Preferences { theme: "dark" | "light" | "system"; lang: Lang; reduceMotion: boolean; remindMonthly: boolean } // Faith mode is never a default or a setting

/** Admin list shows pseudonyms. Real name only via reveal, which is logged. */
export interface AccountRow { id: string; pseudonym: string; role: Role; createdAt: ISODate }
export interface RevealRequest { accountId: string; reason: string }     // reason required, >= 10 chars
export interface RevealResponse { name: string; logId: string; expiresInSec: number }
export interface RevealLogEntry { logId: string; adminPseudonym: string; accountId: string; reason: string; at: ISODate }

// ---------- Layer 3: Pastor pipeline ----------
export type Stage = 0 | 1 | 2 | 3 | 4;   // Candidate, Training, Ministry placement, Active ministry, Ongoing development
export const PIPELINE_STAGE_NAMES = ["Candidate", "Training", "Ministry placement", "Active ministry", "Ongoing development"] as const;
export type PieceStatus = "in" | "missing" | "late";
export type AppSource = "Planning Center" | "ChurchPlanner" | null;

/** What the pastor sees about themself. No scores, no risk words. */
export interface PastorHome {
  first: string; church: string; stage: Stage; mentor: string; since: string;
  history: { month: string; note: string }[];
  season: { month: string; pieces: PackPieceSummary[] };  // season ring
}
export interface PackPieceSummary { key: "report" | "feedback" | "sermon" | "community" | "evidence"; status: PieceStatus } // no finance, ever

export interface Tracks {
  training: { title: string; progress: number; certificate: boolean }[];
  documents: { title: string; file: string }[];
  ministry: { title: string; date: ISODate; source: AppSource }[];
  character: { kind: "Observation" | "Feedback" | "Something to grow in"; title: string; date: ISODate; note: string }[];
  checkins: { count: number; days: number };
}

export interface MonthlyPack {
  month: string;
  report: { status: PieceStatus; activities: number; challenges: string; progress: string };
  feedback: { from: "People" | "Mentor" | "Church leaders"; status: PieceStatus }[];
  community: { area: "Local outreach" | "Community service" | "Partnerships" | "Ministry impact" | "Participation"; text: string; source: AppSource }[];
  evidence: { kind: "form" | "certificate" | "sermon" | "review" | "support"; title: string; file: string }[];
}

/** "When you can" check-in. Not daily, no streaks. mood: 1 much lighter … 3 about usual … 5 much heavier than usual. */
export interface DailyCheckin {
  clientId: string;            // uuid made on the phone; POST is idempotent on it (offline queue)
  clientCreatedAt: string;     // ISO time on the phone
  lang: Lang;
  mood: 1 | 2 | 3 | 4 | 5; prayed: boolean; visits: number; struggles: string; wins: string;
}
/** Pastor only sees the plain outcome. Never clinical labels. "queued" exists only on the phone (offline). */
export type CheckinOutcome = "pending" | "queued" | "failed" | "blocked" | "encouragement" | "waiting_for_person" | "crisis_human_notified";
export interface CheckinResponse { outcome: CheckinOutcome; text: string | null; why: string | null; crisisLine: CrisisLine | null }

// ---------- Reviewer ----------
export type ReviewStatus = "waiting" | "stable" | "additional";
export type Decision = "continue" | "development_plan" | "additional_review";

/** Reviewer row. Pseudonym + country + broad region ONLY. No street, GPS, photo. */
export interface QueueItem {
  id: string;                              // pseudonym, e.g. "P-0233"
  region: string;                          // "Bangladesh — Dhaka Division"
  stage: Stage; since: ISODate; status: ReviewStatus;
  escalated: boolean; complete: number; missing: string[];
  crisis?: { at: ISODate; note: string };
}
export interface ReviewPack extends QueueItem {
  agent: AgentPrep;                        // shown beside the human decision, never erased
  history: string[];
  pack: MonthlyPack;
  checkinCount: number;                    // count only; check-in text never reaches the reviewer
  decisions: HumanDecision[];
}
export interface AgentPrep {
  summary: string; flags: string[]; routedTo: string;
  generatedAt: ISODate; model: string;
  why: string;                             // shown behind "Why am I seeing this?"
  // agent cannot set decision or stage — there is no field for it
}
export interface HumanDecision {
  decision: Decision; note: string;
  reviewerRole: "mentor" | "church_leader" | "regional_authority";
  at: ISODate; stageBefore: Stage; stageAfter: Stage;
}
export interface DecideRequest { packId: string; decision: Decision; note: string }

// ---------- Integrations ----------
export interface Integration {
  app: "Planning Center" | "ChurchPlanner";
  status: "connected" | "not_connected" | "error";
  fills: ("ministry" | "community")[];   // never "stage", "decision" or finance
  availableIn: "US";                       // optional, US churches only; other countries get 404
  lastSync: ISODate | null;
  connectable: boolean;                    // false until the server has the app's OAuth client set
}

// ---------- System status ----------
export interface ServiceStatus { name: "API" | "Database" | "Cache" | "Graph database" | "Model gateway"; status: "up" | "degraded" | "down" }


/** Field limits the backend must enforce and the UI is tested against (#messy=1 in any kit). */
export const LIMITS = {
  termLength: 40,          // headword; longer words wrap, never overflow
  definitionLength: 600,   // longer is rejected at authoring
  answerLength: 280,       // monthly answer (UI counter shows 280)
  checkinFieldLength: 500, // each check-in text field
  churchNameLength: 90,    // shown on one line with an ellipsis
  regionLength: 80,        // broad region; one line with an ellipsis
  alertNoteLength: 140,
  pageSize: { accounts: 6, queue: 5, alertRecord: 6 }, // first page; the rest via "Load more"
} as const;
/** Every optional field above may be missing or empty; the UI shows "Not in the dictionary yet" or an empty state, never "undefined". */

// ---------- People, safety, rhythm ----------
export interface MentorNote { from: "mentor"; lines: string[]; at: ISODate }   // written by the mentor, never by the assistant
export interface MentorMessageRequest { text?: string }
export interface GuestUpgradeRequest { email: string; name?: string }          // keeps saved words; past answers never re-linked
export interface HelpedRequest { surface: "word" | "checkin" | "monthly"; id: string; value: "yes" | "no" }
export interface EventRequest { name: EventName; surface: string }            // no text, no ids of people
export interface AlertRequest { scope: string; reason: string }               // leader only; UI asks to type "alert"
export interface TranslationBundle { lang: Lang; strings: Record<string, string>; reviewed: boolean } // interface strings only
export interface MemoryItem { key: string; label: string; value: string }
export interface CrisisLine { country: string; number: string; what: string }
export interface Alert { id: string; scope: string; reason: string; status: "waiting" | "on" | "lifted"; at: ISODate; pauses: ("faith_mode" | "monthly_answers" | "map_publish" | "checkins" | "integrations" | "voice" | "save_image")[] }
export interface LeaderAlert extends Alert { confirms: number; mine: boolean }   // mine: this leader raised or confirmed it
export interface AlertLogEntry { action: "raised" | "confirmed" | "on" | "cleared"; scope: string; at: ISODate }   // no actor, no name
export interface WhyThis { why: string } // attach to every assistant-written text
export interface OnboardingState { step: 1 | 2 | 3 | 4; done: boolean }
export type EventName = "task_done" | "helped_yes" | "helped_no" | "return_next_month" | "guest_upgrade" | "alert_on";
