// Shared solution data — used by the homepage ea-solutions section, the
// /solutions overview, and the /solutions/:slug detail pages.
//
// `body` is verbatim from emailagency.com/solutions/ — used anywhere a short
// summary is needed (homepage panels, overview cards, hero lead, meta description).
// `article` is original long-form copy for the detail pages, written around
// Email Agency's performance-marketing focus in legal, insurance, home
// services, home warranties, and personal injury.
//
// Images: /public/images/solutions/<slug>.webp (1600x2000) + <slug>-tn.webp (200x200).

export const SOLUTIONS = [
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    icon: '🎯',
    body: 'Lead generation is one of our specialties, which is focused on acquiring new leads for your business. Through a wide variety of strategies, such as email marketing and networking, we help businesses attract prospects and turn them into customers and clients.',
    article: [
      {
        heading: 'Lead Generation Built for Performance Marketing',
        paragraphs: [
          "Most agencies sell lead generation as a numbers game — more clicks, more forms, more volume. In legal, insurance, home services, home warranties, and personal injury, that approach breaks down fast. These are high-consideration, high-cost-per-acquisition categories, where a single bad lead can cost more than a week of ad spend, and where consumers only convert when the message, the timing, and the offer line up. Email Agency builds lead generation programs around that reality, not around vanity metrics.",
          "Our approach draws on email marketing, affiliate and publisher networks, and direct outreach to reach people at the exact moment they're searching for a solution — a claimant who needs to understand a legal option, a homeowner with a broken HVAC system, a driver comparing insurance quotes, or a family trying to understand what a home warranty actually covers. We build the acquisition strategy around the buyer's moment, not the other way around.",
        ],
      },
      {
        heading: 'Why High-CPA, Regulated Verticals Need a Different Playbook',
        paragraphs: [
          "Legal, insurance, home services, home warranty, and personal injury leads share a few traits that make generic lead gen risky: long sales cycles, real compliance requirements — TCPA, TSR, state insurance regulations, attorney advertising rules — and a buyer who is often stressed, uncertain, or comparing several providers at once. Volume without qualification doesn't remove the cost of a bad match, it just moves that cost downstream, onto your intake team, your call center, or your sales staff.",
          "We build qualification into every campaign from the first touch: pre-screening questions, consent capture that holds up to scrutiny, and creative that filters out people who were never going to convert in the first place. The result is a funnel that produces fewer total leads and more usable ones, which is the only volume number that actually shows up on your P&L.",
          "We also treat lead quality as a moving target, not a one-time setup. Qualifying criteria shift — a mass tort opens or closes, a state changes its insurance requirements, a home warranty provider adjusts its coverage terms — and a lead generation program that isn't built to adapt quickly becomes a liability of its own. We review performance by source, not just by campaign, so we can shut off what stops working before it burns budget.",
        ],
      },
      {
        heading: 'Vertical Coverage',
        paragraphs: [
          "In legal and mass tort marketing, timing and eligibility are everything. A claimant who doesn't meet the criteria for a specific case type, or who missed a filing window, isn't a lead — it's a liability. We build acquisition campaigns around the qualifying criteria for each case type, so the people who reach your intake team actually belong in your pipeline.",
          "Insurance lead generation lives and dies by seasonality, carrier appointments, and eligibility rules that shift by state and by product line. We build campaigns that respect those constraints — targeting the right coverage type, the right geography, and the right moment in a shopper's renewal or life-event cycle — so the leads that reach your agents are ones they can actually quote.",
          "Home services and home warranty leads are often urgent — a broken furnace in January doesn't wait for a follow-up email. We build campaigns that capture that urgency without letting it turn into low-intent noise, using service-area targeting, fast delivery, and messaging that matches what a homeowner is actually dealing with, whether that's an emergency repair or a renewal decision.",
          "Personal injury shoppers are frequently reaching out at one of the most vulnerable moments in the funnel — recovering from an accident, dealing with an insurance adjuster, unsure whether they even have a case. We build campaigns that lead with clarity and screening rather than pressure, so the claimants who reach your intake team already understand what they're signing up for.",
        ],
      },
      {
        heading: 'From Click to Qualified Lead',
        paragraphs: [
          "Every campaign runs on the same discipline: define the qualifying criteria for the case type or coverage line, build creative and landing experiences around it, capture consent and intent data at the point of contact, and route the result into your systems — or ours, if you're running on LeadLogic — with the documentation your intake or sales team needs to act immediately.",
          "That process runs on a feedback loop, not a set-and-forget campaign. We track lead quality all the way through to what happens after delivery — did the claimant qualify, did the policy bind, did the homeowner book the job — and use that data to refine targeting and creative on an ongoing basis. A source that produces cheap leads that never convert gets cut. A source that produces slightly more expensive leads that consistently close gets more budget.",
        ],
      },
      {
        heading: 'Reporting You Can Act On',
        paragraphs: [
          "Every program comes with reporting that shows more than raw lead counts: source-level cost per qualified lead, conversion rates by campaign, and delivery timing, so you can see which channels are actually earning their share of the budget. If you're running on LeadLogic, that reporting lives in the same platform your intake team already uses, so there's no separate dashboard to reconcile against your CRM.",
        ],
      },
      {
        heading: 'Ready to Build a Pipeline That Converts',
        paragraphs: [
          "If your current lead generation is producing volume you can't use, we can help you fix the input, not just the output. Get in touch and we'll walk through your qualifying criteria, your compliance requirements, and what a properly built acquisition program looks like for your vertical.",
        ],
      },
    ],
  },
  {
    slug: 'leadlogic',
    title: 'LeadLogic',
    icon: '🧭',
    body: 'LeadLogic software is a full featured lead management (LMS) and customer relationship management (CRM) software built around leads requiring documents for delivery. Build custom verticals, call center forms, QA processes, delivery campaigns without needing a programmer, and run reporting on your data like a professional.',
    article: [
      {
        heading: 'Software Built Around the Leads Nobody Else Wants to Handle',
        paragraphs: [
          "Most CRMs are built for straightforward pipelines — a contact, a deal stage, a close date. Legal, insurance, home services, home warranty, and personal injury leads aren't that simple. They come with documents: signed retainers, medical releases, proof of coverage, inspection reports, consent records. LeadLogic is a lead management and CRM platform built specifically around leads that require documentation for delivery, not leads that just need a follow-up email.",
        ],
      },
      {
        heading: 'Why Off-the-Shelf Tools Fall Short',
        paragraphs: [
          "Generic CRMs treat every lead the same. A mass tort claimant, a homeowner filing a warranty claim, and a shopper comparing insurance quotes all need different intake questions, different qualifying logic, different documents attached, and different compliance checks before they're usable. Forcing that into a one-size-fits-all pipeline means building workarounds — spreadsheets, side systems, manual QA — that slow teams down and create gaps where bad leads slip through.",
          "The gap shows up fastest in reporting. A generic CRM can tell you how many leads came in this month. It can't easily tell you how many were signed and delivered with a compliant retainer, how many failed QA and why, or which affiliate source is quietly producing the highest rate of manufactured submissions. LeadLogic was built to answer those questions natively, because those are the questions that actually determine whether a lead generation program is profitable.",
        ],
      },
      {
        heading: 'What LeadLogic Does',
        paragraphs: [
          "Build custom verticals without waiting on a developer, and configure intake forms and call center scripts to match the qualifying criteria for a specific case type, coverage line, or service category. Route leads through multi-stage QA queues that catch duplicates, manufactured submissions, and non-qualifying claimants before they ever reach a client. Automate delivery campaigns so qualified leads move into your pipeline — or your buyer's — the moment they clear QA. Run reporting on volume, quality, and source performance without exporting data into a separate analytics tool.",
          "Set role-based permissions so intake staff, QA reviewers, and account managers each see exactly what they need and nothing they don't. Track a lead's full history — source, qualifying answers, documents attached, and every status change — in a single record instead of scattered across email threads and spreadsheets.",
        ],
      },
      {
        heading: 'Built to Scale With Your Volume',
        paragraphs: [
          "LeadLogic is built to handle the swings that come with performance marketing: a mass tort that opens and needs intake capacity overnight, a home warranty renewal season that doubles claim volume, an insurance open enrollment period that compresses months of activity into a few weeks. Because verticals, forms, and QA rules are configurable rather than hard-coded, scaling up doesn't mean waiting on a development sprint — it means adjusting settings your team already knows how to use.",
        ],
      },
      {
        heading: 'Vertical Fit',
        paragraphs: [
          "For legal and mass tort intake, LeadLogic manages the full chain of custody — screening questions specific to each case type, signed retainer and medical release capture, and documentation packaged for delivery to the firm handling the case.",
          "For insurance, LeadLogic can be configured around eligibility rules by state and product line, capturing the consent and coverage details an agent needs to quote a lead the moment it arrives.",
          "For home services and home warranty programs, LeadLogic handles service-area routing, urgency flags, and the claim or service-request documentation a contractor or claims team needs to act on the same day.",
          "For personal injury, LeadLogic supports the same claimant-screening and documentation workflow used in mass tort intake, scaled to individual case volume.",
          "Across every vertical, the same principle holds: an intake system should never be the bottleneck between an interested consumer and the person ready to help them.",
        ],
      },
      {
        heading: 'Security and Compliance at the Platform Level',
        paragraphs: [
          "Every workflow in LeadLogic is designed with the compliance requirements of these verticals in mind — consent language capture, document retention, and audit trails that hold up when a claim, a policy, or a lead source gets questioned later. Because compliance is built into the platform rather than layered on top of it, your team isn't relying on someone remembering to follow a separate checklist.",
        ],
      },
      {
        heading: 'Built by Operators',
        paragraphs: [
          "LeadLogic isn't software built by developers guessing at what a lead generation team needs — it's the platform built to run LawLogic, Email Agency's own legal intake operation, and proven against real claimant volume before it's offered to anyone else. Every workflow reflects a problem we've had to solve for ourselves first.",
        ],
      },
      {
        heading: 'See It on Your Data',
        paragraphs: [
          "If you're running lead delivery through spreadsheets, generic CRMs, or a patchwork of tools, we'll walk you through what LeadLogic looks like configured for your vertical — your intake questions, your documentation requirements, your QA rules.",
        ],
      },
    ],
  },
  {
    slug: 'call-center-services',
    title: 'Call Center Services',
    icon: '📞',
    body: 'Are you struggling to handle call volume at your growing business? Would you like to create the impression of a more professional operation? We offer call center services that allow you to manage customer calls and queries in an efficient and practical manner.',
    article: [
      {
        heading: 'The First Call Is the Whole Campaign',
        paragraphs: [
          "In performance marketing, the call center is where a marketing spend either turns into revenue or turns into waste. A well-targeted lead that gets a slow answer, an untrained script, or a rushed qualification call is a wasted lead, no matter how good the media buy behind it was. Email Agency's call center services are built to be the connective tissue between acquisition and conversion, not an afterthought bolted on at the end.",
        ],
      },
      {
        heading: 'Why Legal, Insurance, Home Services, Home Warranty, and PI Calls Are Different',
        paragraphs: [
          "A script that works for a retail hotline will not work for a mass tort intake call, an insurance eligibility screen, an emergency HVAC dispatch, or a personal injury qualification conversation. Each of these calls carries its own compliance requirements, its own sensitivity, and its own information the agent needs to capture correctly the first time, because in most of these categories there usually isn't a good second chance to recontact the consumer.",
          "Legal and personal injury calls require agents trained to ask about case details, treatment history, and incident timing without sounding like they're reading a form, because for a lot of callers this is the first time they've said any of it out loud. Insurance calls require eligibility screening that matches carrier and state requirements before a quote conversation starts. Home services and home warranty calls often carry real urgency — a homeowner without heat or water — and need agents who can move fast without skipping the qualifying and scheduling details a contractor needs to actually show up.",
        ],
      },
      {
        heading: 'How We Run It',
        paragraphs: [
          "Every account gets a script and qualification flow built around its specific vertical, not a generic template. Agents are trained on the compliance requirements relevant to that vertical — consent language, required disclosures, and what they can and cannot say. Every call runs through a QA process that checks for accuracy and compliance, not just call length or agent tone. Call data flows directly into LeadLogic or your existing system, so a qualified caller becomes a documented lead with no manual re-entry.",
          "New agents don't take live calls until they've been trained and tested on the specific vertical they're supporting — the qualifying questions, the compliance language, and the tone that fits a caller who may be anxious, in pain, or simply trying to get a repair scheduled before the end of the day. Ongoing coaching is built around real call recordings from that account, not generic call-center benchmarks that don't reflect what a legal intake or insurance eligibility call actually requires.",
        ],
      },
      {
        heading: 'Handling Peaks Without Dropping Quality',
        paragraphs: [
          "Call volume in these verticals rarely arrives evenly. A mass tort can generate a surge of intake calls the week it opens. A cold snap can flood a home services line with emergency HVAC calls in a single afternoon. Open enrollment compresses months of insurance shopping into a few weeks. We staff and train for that variability, so a spike in volume doesn't turn into a spike in abandoned calls or rushed qualification.",
          "We build staffing plans around your known peak periods and keep flexible capacity on standby for the ones nobody can fully predict, so a surge in calls doesn't force a choice between answering fast and answering well.",
        ],
      },
      {
        heading: 'Compliance-First Calling',
        paragraphs: [
          "Every script includes the consent and disclosure language required for outbound and inbound calls in a regulated vertical, and every agent is trained on what triggers a required disclosure and what doesn't. That matters because a call center that generates leads quickly but carelessly can create liability that outlasts any short-term volume gain.",
        ],
      },
      {
        heading: 'Scaling Without Losing the Human Part',
        paragraphs: [
          "The reason to run a call center at all, instead of pure web forms, is that some of the highest-value decisions in these verticals still happen on the phone: a homeowner deciding whether to trust a contractor, a claimant deciding whether to talk about an accident, a shopper comparing insurance options out loud. We built our call center operation to scale volume without losing the part of the phone call that actually builds trust.",
          "That's also why every account gets a team familiar with your specific business, rather than a rotating pool of generalist agents. Callers can tell the difference between someone reading a script for the first time and someone who actually understands what a policy covers or how a claim moves forward.",
        ],
      },
      {
        heading: "Let's Talk About Your Call Volume",
        paragraphs: [
          "Whether you need overflow support during peak season or a full outsourced intake operation, we'll walk through your current call handling and where a dedicated, vertical-trained team would change your close rate.",
        ],
      },
    ],
  },
  {
    slug: 'media-buys',
    title: 'Media Buys',
    icon: '📺',
    body: "We help increase your business's exposure through media channels, ensuring you get the most impact from your marketing budget.",
    article: [
      {
        heading: 'Media That Understands Regulated, High-CPA Categories',
        paragraphs: [
          "Buying media for legal, insurance, home services, home warranty, and personal injury campaigns is not the same discipline as buying media for a retail or e-commerce brand. Cost per click and cost per lead in these categories can run many times higher than general consumer advertising, competition is intense on the highest-intent keywords, and several of these verticals carry advertising rules — bar association guidelines, state insurance advertising regulations, platform-specific restrictions on legal and financial content — that a generic media buyer won't know to navigate.",
        ],
      },
      {
        heading: 'Where We Spend, and Why',
        paragraphs: [
          "We build media plans across paid search, paid social, native advertising, connected TV, and affiliate and publisher networks, weighted according to what actually performs in each vertical rather than a one-size-fits-all channel mix. Search tends to capture high-intent, bottom-of-funnel demand — someone already looking for legal help or an emergency repair. Social and native are often better suited to building awareness and capturing demand earlier, before a consumer has started actively searching. Affiliate and publisher relationships extend reach into channels a direct media buy can't always access on its own.",
        ],
      },
      {
        heading: 'Vertical Considerations',
        paragraphs: [
          "Legal and mass tort media buying means competing for some of the most expensive keywords and placements in digital advertising, while staying inside rules that vary by jurisdiction and case type. We plan campaigns around qualifying criteria first, so spend goes toward claimants who are actually eligible rather than broad, expensive traffic that never converts.",
          "Insurance media has real seasonality — open enrollment periods, renewal cycles, weather-driven demand spikes for property coverage — and carrier restrictions on how certain products can be advertised. We build media calendars around those cycles instead of running flat, always-on budgets that overspend in slow periods and underspend when demand peaks.",
          "Home services and home warranty media blends local and national targeting — a homeowner searching for an emergency repair nearby behaves differently than one comparing home warranty providers nationally. We build campaigns that separate local, urgent intent from broader consideration-stage traffic.",
          "Personal injury advertising sits under some of the strictest attorney advertising rules in the industry. We build creative and targeting that stays compliant while still reaching people at the moment they're deciding whether to seek help after an accident.",
        ],
      },
      {
        heading: 'Attribution That Matches How These Leads Actually Convert',
        paragraphs: [
          "A lead in these verticals doesn't always convert on the first visit — a shopper compares three insurance quotes over a week, a homeowner researches a repair before calling, a claimant talks to more than one firm before signing. We build attribution models that account for that longer, multi-touch path instead of crediting only the last click, so budget doesn't get pulled away from the channels doing real work earlier in the funnel.",
        ],
      },
      {
        heading: 'Compliance Review Before Spend Goes Live',
        paragraphs: [
          "Every piece of creative in a regulated vertical — legal, insurance, and increasingly home warranty — goes through a compliance review before it launches, checking required disclosures, prohibited claims, and platform-specific advertising policies. Catching an issue before a campaign goes live is far cheaper than pulling it after a platform flags it or a regulator does.",
        ],
      },
      {
        heading: 'Creative That Earns the Click',
        paragraphs: [
          "Ad creative in these verticals has to do more work than a typical retail ad — it has to signal legitimacy and answer an implicit question, whether that's a real law firm, a licensed contractor, or a real insurance option, before it can ask for a click. We build creative around that trust-first requirement rather than borrowing templates built for lower-consideration purchases.",
        ],
      },
      {
        heading: 'Working With What You Already Have',
        paragraphs: [
          "Not every account starts from zero. When a business already has an established media presence, we audit what's running before recommending a rebuild, keeping what's working, restructuring what's wasting spend, and layering in the vertical-specific targeting and compliance review that's often been missing from a generic media buy.",
        ],
      },
      {
        heading: 'Testing and Efficiency',
        paragraphs: [
          "Every media plan runs on a testing framework — creative variants, audience segments, and landing experiences tested against each other continuously, with budget shifting toward what's actually producing qualified leads rather than what's producing the cheapest clicks. In categories where cost per acquisition is this high, small efficiency gains compound fast.",
        ],
      },
      {
        heading: 'Put Your Budget to Work',
        paragraphs: [
          "If you're not sure whether your current media mix matches how your buyers actually behave in your vertical, we'll review it with you and show you where the spend is working, and where it isn't.",
        ],
      },
    ],
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    icon: '💬',
    body: "Our team is experienced in utilizing social media channels to boost your business's brand and maximize the potential that social channels offer. We help your business to create a close relationship with customers online.",
    article: [
      {
        heading: 'Trust Is Built — or Lost — in the Feed',
        paragraphs: [
          "For most consumers, social media is the first place they check before hiring a contractor, choosing an insurance agent, evaluating a law firm, or deciding whether a home warranty company is legitimate. In categories where the purchase decision involves real risk — legal representation, insurance coverage, a costly home repair, a personal injury claim — a thin or inconsistent social presence reads as a red flag, even when the underlying business is excellent.",
        ],
      },
      {
        heading: 'Why This Matters More in These Verticals',
        paragraphs: [
          "Legal, insurance, home services, home warranty, and personal injury businesses are all, in different ways, selling trust before they're selling anything else. A law firm's social presence signals credibility to potential claimants who are already anxious about the process. A home services company's reviews and project photos answer the question of whether someone will actually show up and do good work, before a homeowner ever picks up the phone. Insurance and home warranty brands use social to explain coverage in plain language, because confusion is one of the biggest reasons shoppers stall out before converting.",
        ],
      },
      {
        heading: 'How We Manage It',
        paragraphs: [
          "We build content calendars around what each vertical's audience actually wants to see: case results and firm culture for legal, before-and-after project work for home services, plain-language coverage explainers for insurance and home warranty, and educational content for personal injury audiences who are often searching for answers rather than a sales pitch. Community management runs consistently, so comments, messages, and reviews get a timely, on-brand response instead of going stale. Regulated-industry content — legal claims, insurance coverage statements, health-adjacent messaging — goes through a compliance review before it publishes, so growth doesn't come at the cost of a regulatory problem.",
        ],
      },
      {
        heading: 'Reputation and Review Management',
        paragraphs: [
          "Reviews carry outsized weight in these verticals — a homeowner choosing between contractors, a family choosing a personal injury firm, or a shopper choosing an insurance agent will almost always check reviews before reaching out. We monitor review platforms alongside social accounts, flag negative reviews for a fast, professional response, and build review requests into the customer journey so satisfied clients are asked to share their experience while it's still fresh.",
        ],
      },
      {
        heading: 'Platform Strategy by Vertical',
        paragraphs: [
          "Not every platform earns the same effort in every vertical. Home services and home warranty brands tend to see the strongest return from visual platforms where before-and-after project content performs well. Legal and personal injury accounts often do more work on platforms that support longer-form, educational content explaining a process most followers have never had to navigate before. We build the channel mix around where your specific audience actually spends time, rather than maintaining every platform at the same shallow level.",
        ],
      },
      {
        heading: "Content That Doesn't Sound Like an Ad",
        paragraphs: [
          "Consumers in these verticals are wary of anything that feels like a sales pitch, especially around legal, medical, or financial decisions. We write and design content that informs first — what a process actually involves, what a coverage term actually means, what to expect from a service call — because content that helps outperforms content that just promotes, and it's more likely to get shared.",
        ],
      },
      {
        heading: 'Consistency Across Every Account',
        paragraphs: [
          "Whether you have one office or locations across multiple states, we keep messaging, compliance review, and brand voice consistent across every account we manage, so a follower's experience with your brand doesn't change depending on which page they land on. If you already have an audience, we start by learning what's resonated with them historically before changing direction — rebuilding a following from scratch is slower and more expensive than redirecting one that already trusts you.",
        ],
      },
      {
        heading: 'Measuring What Matters',
        paragraphs: [
          "We report on the metrics that connect to pipeline — click-throughs to your site, messages and calls generated from social, and review volume — rather than vanity metrics like impressions alone, so you can see whether the investment is translating into actual contact volume.",
        ],
      },
      {
        heading: 'Turning Social Proof Into Pipeline',
        paragraphs: [
          "Social media rarely closes a sale on its own in these verticals, but it does something just as valuable: it removes the hesitation that keeps a ready buyer from picking up the phone or filling out a form. We track engagement and follower growth, but we manage toward the metric that actually matters — whether the account is reinforcing the trust your acquisition campaigns are trying to build, or working against it.",
        ],
      },
      {
        heading: "Let's Build Your Presence",
        paragraphs: [
          "If your accounts have gone quiet, feel generic, or don't reflect the trust your business has actually earned, we'll put together a plan built around your vertical and your audience.",
        ],
      },
    ],
  },
  {
    slug: 'web-design',
    title: 'Web Design',
    icon: '🖥️',
    body: 'Much of your marketing efforts will be to increase traffic to your website. Therefore, it is essential that your website is aesthetic, easy to navigate, and up-to-date. Let our team handle everything.',
    article: [
      {
        heading: 'Websites That Convert Skeptical, High-Intent Visitors',
        paragraphs: [
          "A website in legal, insurance, home services, home warranty, or personal injury marketing has one job that matters more than any other: convert a visitor who is often stressed, price-comparing, or unsure whether to trust you, before they leave and call a competitor instead. That's a different design problem than a typical brochure site, and it's one most template-based web design misses entirely.",
        ],
      },
      {
        heading: 'Why Generic Templates Fall Short',
        paragraphs: [
          "Template websites are built to look good in a portfolio, not to survive contact with a real visitor deciding, in the first few seconds, whether to trust a business with something as significant as a legal claim, an insurance policy, or a home repair. They tend to bury the phone number, hide the intake form behind extra clicks, skip the trust signals — licensing, certifications, reviews, required disclosures — that these categories need, and load slowly on the mobile connections most home services and personal injury visitors are searching from.",
        ],
      },
      {
        heading: 'What We Build Instead',
        paragraphs: [
          "Every site starts with the conversion path — the phone number, the intake form, the quote request — placed where a visitor actually looks, not buried in a navigation menu. Page speed gets treated as a conversion metric, not a technical afterthought, because a slow-loading site loses mobile visitors before they see anything else. Trust signals — licensing, certifications, case results, reviews, required legal and insurance disclosures — are built into the design, not treated as boilerplate at the bottom of the page. Forms integrate directly with LeadLogic or your existing intake system, so a completed form becomes an actionable lead immediately instead of sitting in an inbox.",
        ],
      },
      {
        heading: 'Vertical Notes',
        paragraphs: [
          "Legal and personal injury sites need to balance approachability with credibility — visitors are often searching in a moment of real stress, and a site that feels either too corporate or too aggressive will lose them. We design for clarity first: what kind of case do you handle, what should a visitor do next, and how quickly can they reach a real person.",
          "Insurance and home warranty sites live or die on how clearly they explain coverage. We design comparison-friendly layouts and plain-language coverage breakdowns that reduce the confusion that causes shoppers to abandon a quote request halfway through.",
          "Home services sites need to perform for both emergency, high-urgency searches and longer-consideration project searches, often on the same site. We design navigation and calls-to-action that serve both without competing with each other.",
        ],
      },
      {
        heading: 'Mobile-First, Because Your Visitors Are',
        paragraphs: [
          "Most visitors in home services, personal injury, and insurance search from a phone, often while dealing with the exact problem that brought them to your site — a leak, an accident, a renewal deadline. We design and test for mobile first, not as an afterthought to a desktop layout, so the experience holds up under real-world conditions.",
        ],
      },
      {
        heading: 'Built on a Foundation That’s Easy to Maintain',
        paragraphs: [
          "A site is only as good as how easy it is to update. We build on platforms and content structures your team can actually manage — adding a new service page, updating a phone number, publishing a new review — without needing a developer for every small change.",
        ],
      },
      {
        heading: 'Tracking What Happens After the Click',
        paragraphs: [
          "Every site we build includes conversion tracking tied to the actions that actually matter — a completed form, a phone call, a chat started — so you can see which pages and campaigns are producing real contact volume, not just traffic.",
        ],
      },
      {
        heading: 'SEO and Ongoing Optimization',
        paragraphs: [
          "A site that isn't found doesn't get the chance to convert anyone. We build with technical SEO fundamentals in place from launch — clean site structure, fast load times, structured data for services and reviews — and treat the site as something that keeps improving after launch, not a project that ends the day it goes live. Pages get revisited based on real visitor behavior: where people drop off, which calls-to-action get ignored, and which service pages need clearer content.",
        ],
      },
      {
        heading: 'Accessible and Compliant by Default',
        paragraphs: [
          "Legal, insurance, and home warranty sites in particular need to meet accessibility standards and carry the disclosures their industries require, and we build those in from the start rather than patching them in after a complaint or an audit. An accessible, compliant site isn't just a safeguard — it's a wider funnel, since it works for more of the visitors trying to reach you.",
        ],
      },
      {
        heading: "Let's Talk About Your Site",
        paragraphs: [
          "If your current site isn't converting the traffic your other campaigns are sending it, the fix is often the site, not the traffic. We'll take a look and show you where visitors are dropping off.",
        ],
      },
    ],
  },
]

export const solutionBySlug = (slug) => SOLUTIONS.find((s) => s.slug === slug)
