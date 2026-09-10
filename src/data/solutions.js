// Shared solution data — used by the homepage ea-solutions section, the
// /solutions overview, and the /solutions/:slug detail pages.
// Copy is verbatim from emailagency.com/solutions/.
// Images: /public/images/solutions/<slug>.webp (1600x2000) + <slug>-tn.webp (200x200).

export const SOLUTIONS = [
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    icon: '🎯',
    body: 'Lead generation is one of our specialties, which is focused on acquiring new leads for your business. Through a wide variety of strategies, such as email marketing and networking, we help businesses attract prospects and turn them into customers and clients.',
  },
  {
    slug: 'leadlogic',
    title: 'LeadLogic',
    icon: '🧭',
    body: 'LeadLogic software is a full featured lead management (LMS) and customer relationship management (CRM) software built around leads requiring documents for delivery. Build custom verticals, call center forms, QA processes, delivery campaigns without needing a programmer, and run reporting on your data like a professional.',
  },
  {
    slug: 'call-center-services',
    title: 'Call Center Services',
    icon: '📞',
    body: 'Are you struggling to handle call volume at your growing business? Would you like to create the impression of a more professional operation? We offer call center services that allow you to manage customer calls and queries in an efficient and practical manner.',
  },
  {
    slug: 'media-buys',
    title: 'Media Buys',
    icon: '📺',
    body: "We help increase your business's exposure through media channels, ensuring you get the most impact from your marketing budget.",
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    icon: '💬',
    body: "Our team is experienced in utilizing social media channels to boost your business's brand and maximize the potential that social channels offer. We help your business to create a close relationship with customers online.",
  },
  {
    slug: 'web-design',
    title: 'Web Design',
    icon: '🖥️',
    body: 'Much of your marketing efforts will be to increase traffic to your website. Therefore, it is essential that your website is aesthetic, easy to navigate, and up-to-date. Let our team handle everything.',
  },
]

export const solutionBySlug = (slug) => SOLUTIONS.find((s) => s.slug === slug)
