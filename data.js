/* =====================================================================
   SCAFFOLD STUDIO · SITE CONTENT
   Edit this file to change what appears on every page.
   - Add a project:      copy one object in PROJECTS and change the fields.
   - Add a short video:  set `video: "media/my-reel.mp4"` on a SHORTS item.
   - Add a screenshot:   set `image: "media/my-site.jpg"` on a PROJECTS item.
   Everything marked SAMPLE is placeholder content. Replace before launch.
   ===================================================================== */

window.SITE = {
  brand: "Scaffold Studio",
  email: "hello@scaffold.studio",
  phone: "+91 98765 43210",
  hours: "Mon–Sat, 10am–7pm IST",
  city: "Remote-first · India & worldwide",

  social: [
    { key: "instagram", label: "Instagram", handle: "@scaffold.studio", url: "https://instagram.com/scaffold.studio", brand: "#E1306C" },
    { key: "linkedin",  label: "LinkedIn",  handle: "Scaffold Studio",  url: "https://www.linkedin.com/company/scaffold-studio", brand: "#0A66C2" },
    { key: "facebook",  label: "Facebook",  handle: "/scaffoldstudio",  url: "https://facebook.com/scaffoldstudio", brand: "#1877F2" },
    { key: "x",         label: "X",         handle: "@scaffoldstudio",  url: "https://x.com/scaffoldstudio", brand: "#121826" }
  ],

  /* ---------- Services (order = menu order) ---------- */
  services: {
    web: {
      name: "Static Websites", long: "Static Website Development", page: "static-websites.html", icon: "i-web",
      short: "Fast, SEO-ready business websites",
      scene: "web", sceneCls: "sc-web",
      headline: "Websites that load in under a second and sell while you sleep.",
      lead: "Custom-designed marketing sites for clinics, cafés, studios and service businesses. No templates, no page builders, just fast sites that rank.",
      stats: [["90+", "Lighthouse score"], ["14 days", "average go-live"], ["60+", "sites shipped"]],
      deliver: ["Custom UI design in Figma", "Mobile-first, responsive build", "On-page SEO and schema markup", "Contact forms and WhatsApp button", "Google Analytics and Search Console", "Domain, hosting and SSL setup", "Speed optimisation", "Handover video and training"],
      tools: ["Astro", "Next.js", "Tailwind", "Webflow", "Netlify", "Vercel", "Cloudflare"],
      billing: "one-time",
      tiers: [
        { t: "Starter", usd: 499, inr: 29999, d: "For new businesses that need a sharp online presence fast.", f: ["Up to 5 pages", "Mobile-first custom design", "Contact form + WhatsApp button", "Basic on-page SEO", "Live in 10–14 days"] },
        { t: "Growth", usd: 999, inr: 59999, pop: true, d: "For businesses ready to rank and convert visitors.", f: ["Up to 10 pages", "Blog with easy CMS", "Analytics + Search Console", "Speed optimisation (90+ score)", "2 rounds of revisions", "30 days free support"] },
        { t: "Scale", usd: 1899, inr: 114999, d: "For brands that want a premium, animated experience.", f: ["Up to 20 pages", "Custom animations", "Multi-language support", "Booking or lead funnels", "Copywriting included", "90 days free support"] }
      ],
      faq: [
        ["Can I edit the website myself?", "Yes. Growth and Scale include a simple CMS so you can change text, images and blog posts without touching code."],
        ["Do you write the content?", "Scale includes full copywriting. On Starter and Growth we polish the text you send and write headlines and calls to action."],
        ["What about hosting costs?", "Most static sites host free or under $10 a month on Netlify, Vercel or Cloudflare. We set it up in your name."]
      ]
    },
    fullstack: {
      name: "Full Stack Apps", long: "Full Stack Development", page: "full-stack-development.html", icon: "i-stack",
      short: "Web apps, portals and SaaS products",
      scene: "app", sceneCls: "sc-app",
      headline: "Custom software that runs your business, not the other way round.",
      lead: "Customer portals, internal dashboards, marketplaces and SaaS MVPs. We design, build, test and deploy, then stay on to support it.",
      stats: [["7 wks", "average MVP"], ["25+", "apps in production"], ["99.9%", "uptime"]],
      deliver: ["Product scoping workshop", "UX flows and clickable prototype", "React / Next.js front end", "Node, Python or Laravel API", "Auth, roles and permissions", "Payments (Stripe / Razorpay)", "Automated tests and CI/CD", "Cloud deploy and monitoring"],
      tools: ["React", "Next.js", "Node.js", "Python", "PostgreSQL", "Supabase", "AWS", "React Native"],
      billing: "one-time",
      tiers: [
        { t: "MVP", usd: 2499, inr: 149999, d: "Validate your idea with a working product.", f: ["Up to 5 core screens", "User login & roles", "Database + REST API", "Admin dashboard", "Cloud deployment"] },
        { t: "Product", usd: 4999, inr: 299999, pop: true, d: "A production-ready app your customers can rely on.", f: ["Up to 15 screens", "Payments (Stripe / Razorpay)", "Email & push notifications", "Third-party integrations", "Automated tests + CI", "60 days support"] },
        { t: "Platform", usd: 9999, inr: 599999, d: "Complex portals, marketplaces and SaaS.", f: ["Unlimited screens (scoped)", "Multi-tenant architecture", "Mobile app (React Native)", "Analytics & reporting", "Security review", "Dedicated project manager"] }
      ],
      faq: [
        ["Who owns the code?", "You do. The repository is created in your GitHub account from day one."],
        ["Can you take over an existing app?", "Yes. We start with a one-week code audit and give you a written report before quoting."],
        ["Do you offer maintenance?", "Yes, from $299/month for updates, monitoring, backups and small changes."]
      ]
    },
    ai: {
      name: "AI Automation", long: "AI Automation", page: "ai-automation.html", icon: "i-ai",
      short: "Chatbots, agents and workflow automation",
      scene: "bot", sceneCls: "sc-bot",
      headline: "Hand the repetitive work to AI. Keep the customers.",
      lead: "WhatsApp and website assistants trained on your business, plus workflows that move leads, invoices and orders between your tools automatically.",
      stats: [["18 hrs", "saved per client weekly"], ["40+", "workflows live"], ["24/7", "instant replies"]],
      deliver: ["Process audit: what to automate first", "AI chatbot trained on your docs", "WhatsApp Business API setup", "Lead capture to CRM", "Email and follow-up sequences", "Invoice and document extraction", "Internal reporting dashboards", "Team training and playbook"],
      tools: ["Claude", "OpenAI", "n8n", "Make", "Zapier", "WhatsApp API", "HubSpot", "Zoho"],
      billing: "one-time",
      tiers: [
        { t: "Assistant", usd: 799, inr: 49999, d: "A smart chatbot trained on your business.", f: ["Website or WhatsApp chatbot", "Trained on your FAQs & docs", "Lead capture to sheet/email", "Monthly usage report"] },
        { t: "Workflow", usd: 1799, inr: 109999, pop: true, d: "Connect your tools and remove manual work.", f: ["Everything in Assistant", "Up to 5 automated workflows", "CRM integration (HubSpot, Zoho)", "Auto follow-up emails", "Team training session"] },
        { t: "Operations", usd: 3499, inr: 209999, d: "AI agents across sales, support and ops.", f: ["Up to 15 workflows", "Custom AI agents", "Invoice & document processing", "Internal dashboards", "Priority support"] }
      ],
      faq: [
        ["Will the bot give wrong answers?", "We restrict it to your approved documents and add a hand-off to a human whenever it isn't sure."],
        ["What are the running costs?", "AI usage is usually $10–80 a month for a small business. We show you the estimate before building."],
        ["Is my data safe?", "Data stays in your own accounts. We use providers that don't train on your data and sign an NDA on request."]
      ]
    },
    content: {
      name: "Content Marketing", long: "Content Marketing", page: "content-marketing.html", icon: "i-pen",
      short: "SEO blogs, newsletters and landing pages",
      scene: "blog", sceneCls: "sc-blog",
      headline: "Content that ranks on Google and turns readers into buyers.",
      lead: "Keyword research, a monthly content calendar, and articles, landing pages and newsletters written by specialists in your industry.",
      stats: [["+410%", "best organic growth"], ["1,900+", "articles published"], ["34", "page-1 keywords for one client"]],
      deliver: ["Keyword and competitor research", "Monthly content calendar", "Long-form SEO articles", "Landing pages that convert", "Email newsletters", "Case studies and whitepapers", "Link building outreach", "Monthly ranking and lead report"],
      tools: ["Ahrefs", "Semrush", "Google Search Console", "Surfer", "Mailchimp", "Beehiiv", "WordPress"],
      billing: "monthly",
      tiers: [
        { t: "Starter", usd: 699, inr: 39999, d: "Steady, search-friendly content every month.", f: ["4 SEO blog posts / month", "Keyword research", "1 newsletter / month", "Monthly report"] },
        { t: "Growth", usd: 1299, inr: 79999, pop: true, d: "Content that ranks and brings in leads.", f: ["8 SEO blog posts / month", "Content calendar & strategy", "2 landing pages / month", "Weekly newsletter", "Lead tracking setup"] },
        { t: "Authority", usd: 2399, inr: 149999, d: "Own your niche with a full content engine.", f: ["12+ long-form posts / month", "Link building outreach", "Case studies & whitepapers", "Ad copy for campaigns", "Quarterly strategy review"] }
      ],
      faq: [
        ["How soon will I see results?", "Most clients see rankings move in 8–12 weeks and steady lead growth from month 4 onward."],
        ["Is the content written by AI?", "Writers research and write every piece. We use AI for research and outlines, never to publish unedited text."],
        ["Who approves the articles?", "You get a shared calendar and approve each piece before it goes live. Most clients spend 30 minutes a week."]
      ]
    },
    social: {
      name: "Social Media", long: "Social Media Management", page: "social-media.html", icon: "i-social",
      short: "Reels, posts, community and ads",
      scene: "reel", sceneCls: "sc-reel",
      headline: "Show up every day on social, without filming every day.",
      lead: "Monthly shoot days, scroll-stopping reels, carousels and stories, plus daily community replies across Instagram, LinkedIn, Facebook, X and YouTube.",
      stats: [["48k", "followers gained for one client"], ["6.1%", "avg. engagement"], ["300+", "reels a month"]],
      deliver: ["Social audit and strategy", "Monthly content shoot", "Reels, carousels and stories", "Captions and hashtags", "Scheduling across platforms", "Daily community replies", "Influencer outreach", "Paid ads management"],
      tools: ["Instagram", "LinkedIn", "Facebook", "X", "YouTube Shorts", "CapCut", "Meta Ads"],
      billing: "monthly",
      tiers: [
        { t: "Presence", usd: 599, inr: 34999, d: "Stay active and consistent on 2 platforms.", f: ["2 platforms", "12 posts / month", "4 reels / month", "Scheduling & captions"] },
        { t: "Engage", usd: 1099, inr: 64999, pop: true, d: "Grow followers and build a community.", f: ["3 platforms", "20 posts / month", "8 reels / month", "Community replies daily", "Monthly content shoot"] },
        { t: "Amplify", usd: 1999, inr: 119999, d: "Full social team plus paid ads.", f: ["4 platforms", "30 posts / month", "15 reels / month", "Influencer outreach", "Paid ads management"] }
      ],
      faq: [
        ["Do I need to be on camera?", "No. Many clients use product, team and behind-the-scenes content. We plan around what you're comfortable with."],
        ["Is the ad budget included?", "No. Ad spend is paid directly to Meta or LinkedIn. Amplify includes managing and optimising it."],
        ["Can I approve posts first?", "Yes. You get the full month's posts in a shared calendar a week before they go out."]
      ]
    }
  },

  /* ---------- Projects (SAMPLE: replace with your own) ----------
     svc: web | fullstack | ai | content | social
     kind: site | app | flow | doc | grid   (picks the preview mockup)
     colors: [main, background]  image: optional screenshot path
     featured: true shows it on the Home page                      */
  projects: [
    { svc: "web", title: "Northwind Dental", year: 2026, kind: "site", colors: ["#0E6E6E", "#D7EFEB"], desc: "Clinic website with online booking, treatment pages and Google reviews.", result: "3.2× online bookings", tags: ["Astro", "Booking", "Local SEO"], url: "https://example.com", featured: true },
    { svc: "web", title: "Lumen Interiors", year: 2026, kind: "site", colors: ["#3B2F2A", "#EDE4DA"], desc: "Portfolio site for an interior design studio with a filterable project gallery.", result: "2× enquiry rate", tags: ["Next.js", "CMS", "Gallery"], url: "https://example.com" },
    { svc: "web", title: "Bloom Yoga", year: 2025, kind: "site", colors: ["#7A4FD8", "#ECE5FB"], desc: "Studio site with class timetable, trainer profiles and membership sign-up.", result: "320 trial sign-ups", tags: ["Webflow", "Memberships"], url: "https://example.com" },
    { svc: "web", title: "Atlas Legal", year: 2025, kind: "site", colors: ["#1E3A5F", "#DDE6F1"], desc: "Law firm site with practice-area pages built to rank for local searches.", result: "Page 1 for 34 keywords", tags: ["Astro", "SEO", "Schema"], url: "https://example.com" },
    { svc: "web", title: "Kettle & Crumb", year: 2025, kind: "site", colors: ["#B4532A", "#F6E3D6"], desc: "Bakery website with menu, store locator and pre-order form.", result: "+410% organic traffic", tags: ["Astro", "Pre-orders"], url: "https://example.com" },
    { svc: "web", title: "Vanta Realty", year: 2024, kind: "site", colors: ["#111827", "#E5E7EB"], desc: "Property listings site with search filters and WhatsApp enquiry on every listing.", result: "1,200 leads in 6 months", tags: ["Next.js", "Listings"], url: "https://example.com" },

    { svc: "fullstack", title: "Greenline Dispatch", year: 2026, kind: "app", colors: ["#0F7A4A", "#DDF1E7"], desc: "Dispatch portal for a logistics company: orders, drivers, live tracking and invoices.", result: "18 hrs/week saved", tags: ["Next.js", "PostgreSQL", "Maps"], url: "https://example.com", featured: true },
    { svc: "fullstack", title: "Orbita Labs", year: 2026, kind: "app", colors: ["#2840F0", "#E2E7FF"], desc: "SaaS MVP for team OKRs with Stripe billing and Slack integration.", result: "MVP live in 7 weeks", tags: ["React", "Supabase", "Stripe"], url: "https://example.com" },
    { svc: "fullstack", title: "Mosaic Learning", year: 2025, kind: "app", colors: ["#C2410C", "#FCE7DA"], desc: "Course platform with video lessons, quizzes, certificates and Razorpay payments.", result: "2.6× course sign-ups", tags: ["Laravel", "Razorpay", "Video"], url: "https://example.com" },
    { svc: "fullstack", title: "FreshCart", year: 2025, kind: "app", colors: ["#16A34A", "#DCFCE7"], desc: "Grocery ordering app with slot booking and a store-side packing dashboard.", result: "4,800 orders / month", tags: ["React Native", "Node.js"], url: "https://example.com" },

    { svc: "ai", title: "Vanta Lead Bot", year: 2026, kind: "flow", colors: ["#25D366", "#0B3D2E"], desc: "WhatsApp assistant that answers property questions, qualifies buyers and books site visits.", result: "1,200 leads qualified", tags: ["WhatsApp API", "Claude", "HubSpot"], url: "", featured: true },
    { svc: "ai", title: "Greenline Order Agent", year: 2026, kind: "flow", colors: ["#0F7A4A", "#123528"], desc: "Reads emailed purchase orders, creates jobs in the dispatch portal and confirms to the customer.", result: "−92% manual data entry", tags: ["n8n", "Email parsing"], url: "" },
    { svc: "ai", title: "Northwind Night Desk", year: 2025, kind: "flow", colors: ["#0E6E6E", "#0A2E2E"], desc: "After-hours website chatbot that answers patient questions and fills tomorrow's slots.", result: "38% of bookings after 8pm", tags: ["Website bot", "Calendar"], url: "" },
    { svc: "ai", title: "Ledgerly Invoices", year: 2025, kind: "flow", colors: ["#7A4FD8", "#21173D"], desc: "Extracts invoice data from PDFs and photos into Zoho Books with approval rules.", result: "600 invoices / week automated", tags: ["Document AI", "Zoho"], url: "" },

    { svc: "content", title: "Atlas Legal Guides", year: 2026, kind: "doc", colors: ["#1E3A5F", "#C9D6E8"], desc: "Plain-English guides on property, family and business law for a mid-size firm.", result: "34 page-1 keywords", tags: ["SEO", "Long-form"], url: "https://example.com", featured: true },
    { svc: "content", title: "Kettle & Crumb Recipes", year: 2025, kind: "doc", colors: ["#B4532A", "#F2D3BE"], desc: "Recipe blog and seasonal newsletter that turned a local bakery into a known brand.", result: "+410% organic traffic", tags: ["Blog", "Newsletter"], url: "https://example.com" },
    { svc: "content", title: "Orbita Labs Blog", year: 2025, kind: "doc", colors: ["#2840F0", "#C8D1FF"], desc: "B2B SaaS content hub with comparison pages and a weekly founder newsletter.", result: "1,100 trial sign-ups from blog", tags: ["B2B SaaS", "Newsletter"], url: "https://example.com" },
    { svc: "content", title: "Mosaic Course Pages", year: 2024, kind: "doc", colors: ["#C2410C", "#F7CDB3"], desc: "SEO landing pages for 40 courses, each targeting a high-intent search term.", result: "2.6× course enquiries", tags: ["Landing pages", "SEO"], url: "https://example.com" },

    { svc: "social", title: "Pulse Fitness", year: 2026, kind: "grid", colors: ["#E9466B", "#3A0F1C"], desc: "Weekly trainer reels, challenges and member stories across Instagram and YouTube Shorts.", result: "48k new followers", tags: ["Reels", "YouTube Shorts"], url: "https://instagram.com", featured: true },
    { svc: "social", title: "Kettle & Crumb Instagram", year: 2025, kind: "grid", colors: ["#B4532A", "#3B1A0C"], desc: "Behind-the-oven reels and new-menu drops that sell out weekend batches.", result: "Weekend sell-outs 3×/month", tags: ["Instagram", "Food"], url: "https://instagram.com" },
    { svc: "social", title: "Bloom Yoga Community", year: 2025, kind: "grid", colors: ["#7A4FD8", "#1F1440"], desc: "Daily stories, live sessions and a 30-day challenge that filled new batches.", result: "6.1% engagement", tags: ["Community", "Lives"], url: "https://instagram.com" },
    { svc: "social", title: "Vanta Realty LinkedIn", year: 2024, kind: "grid", colors: ["#0A66C2", "#0B1E33"], desc: "Property walkthrough videos and market updates for investors on LinkedIn.", result: "2.3M impressions", tags: ["LinkedIn", "Video"], url: "https://linkedin.com" }
  ],

  /* ---------- Shorts: 3 best per service (SAMPLE) ----------
     Add `video: "media/file.mp4"` to play a real clip.
     Without a video, an animated preview is shown.           */
  shorts: [
    { svc: "web", title: "Northwind Dental rebuild", desc: "From a slow theme to a 0.8s site with booking.", dur: 42, scene: "web", bg: "#2840F0", stats: [["3.2×", "bookings"], ["0.8s", "load time"]] },
    { svc: "web", title: "Lumen Interiors gallery", desc: "A filterable portfolio that feels like a magazine.", dur: 35, scene: "web", bg: "#3B2F2A", stats: [["2×", "enquiries"], ["98", "Lighthouse"]] },
    { svc: "web", title: "Bloom Yoga sign-ups", desc: "Timetable and membership flow in one tap.", dur: 29, scene: "web", bg: "#7A4FD8", stats: [["320", "trial sign-ups"], ["12 days", "to launch"]] },

    { svc: "fullstack", title: "Greenline dispatch portal", desc: "Live operations dashboard replacing 3 spreadsheets.", dur: 68, scene: "app", bg: "#121826", stats: [["18 hrs", "saved weekly"], ["7 wks", "to launch"]] },
    { svc: "fullstack", title: "Orbita Labs SaaS MVP", desc: "OKR tracking with billing and Slack alerts.", dur: 54, scene: "app", bg: "#1B2B6B", stats: [["7 wks", "to MVP"], ["420", "paying teams"]] },
    { svc: "fullstack", title: "FreshCart ordering app", desc: "Slot booking for shoppers, packing view for staff.", dur: 47, scene: "app", bg: "#0F3D24", stats: [["4,800", "orders / month"], ["4.7★", "app rating"]] },

    { svc: "ai", title: "Vanta WhatsApp lead bot", desc: "Qualifies buyers and books visits into the CRM.", dur: 51, scene: "bot", bg: "#FFC83D", stats: [["1,200", "leads qualified"], ["24/7", "replies"]] },
    { svc: "ai", title: "Greenline order agent", desc: "Emailed orders become tracked jobs automatically.", dur: 44, scene: "bot", bg: "#9EE6B8", stats: [["−92%", "data entry"], ["3 min", "avg. turnaround"]] },
    { svc: "ai", title: "Ledgerly invoice reader", desc: "PDFs and photos straight into Zoho Books.", dur: 39, scene: "bot", bg: "#D9CCFF", stats: [["600", "invoices / week"], ["99%", "accuracy"]] },

    { svc: "content", title: "Atlas Legal content engine", desc: "Guides that rank on page one for 34 searches.", dur: 45, scene: "blog", bg: "#E7EAFB", stats: [["34", "page-1 keywords"], ["2.4×", "enquiries"]] },
    { svc: "content", title: "Kettle & Crumb, year one", desc: "Recipes blog plus newsletter, from zero to brand.", dur: 74, scene: "growth", bg: "#0F7A4A", stats: [["+410%", "organic traffic"], ["9k", "subscribers"]] },
    { svc: "content", title: "Orbita Labs newsletter", desc: "A weekly founder letter that drives trials.", dur: 33, scene: "blog", bg: "#FFE7A3", stats: [["48%", "open rate"], ["1,100", "trials"]] },

    { svc: "social", title: "Pulse Fitness reels", desc: "Trainers turned creators, classes sold out.", dur: 37, scene: "reel", bg: "#E9466B", stats: [["48k", "new followers"], ["6.1%", "engagement"]] },
    { svc: "social", title: "Kettle & Crumb oven cam", desc: "Behind-the-oven reels that sell weekend batches.", dur: 26, scene: "reel", bg: "#B4532A", stats: [["1.2M", "views"], ["3×", "sell-outs / month"]] },
    { svc: "social", title: "Vanta property tours", desc: "60-second walkthroughs for LinkedIn and Reels.", dur: 58, scene: "reel", bg: "#0A66C2", stats: [["2.3M", "impressions"], ["140", "site visits booked"]] }
  ],

  /* ---------- Testimonials (SAMPLE) ---------- */
  testimonials: [
    { svc: "web", q: "We came to Scaffold with just a logo. Six weeks later we had a website, a booking system and a WhatsApp bot answering patients at midnight.", n: "Dr. Meera Iyer", r: "Founder, Northwind Dental", i: "MI", m: "3.2× online bookings" },
    { svc: "web", q: "Our old site took eight seconds to load. The new one is instant and enquiries doubled in the first month.", n: "Anika Rao", r: "Principal, Lumen Interiors", i: "AR", m: "2× enquiry rate" },
    { svc: "fullstack", q: "They built our dispatch portal in seven weeks. My ops team got back almost a full working day every week.", n: "Rohan Mehta", r: "COO, Greenline Logistics", i: "RM", m: "18 hrs saved weekly" },
    { svc: "fullstack", q: "Scaffold felt like an in-house team. Clear weekly demos, no surprises on the invoice, and the app just works.", n: "Daniel Okafor", r: "Founder, Orbita Labs", i: "DO", m: "MVP in 7 weeks" },
    { svc: "ai", q: "The WhatsApp bot handles the first conversation with every buyer. My agents only talk to people who are ready to visit.", n: "Vikram Nair", r: "Director, Vanta Realty", i: "VN", m: "1,200 leads qualified" },
    { svc: "ai", q: "We used to type every invoice by hand. Now they appear in Zoho already checked. It paid for itself in five weeks.", n: "Priya Desai", r: "Finance Lead, Ledgerly", i: "PD", m: "600 invoices / week" },
    { svc: "content", q: "One team for the site, blog and Instagram means nothing gets lost between agencies. Traffic is up four times in a year.", n: "Kabir Shah", r: "Co-founder, Kettle & Crumb", i: "KS", m: "+410% organic traffic" },
    { svc: "content", q: "Their writers understood legal topics better than the last two agencies combined. Clients now mention our guides on the first call.", n: "Neha Kulkarni", r: "Managing Partner, Atlas Legal", i: "NK", m: "34 page-1 keywords" },
    { svc: "content", q: "The founder newsletter they ghost-write is our best sales channel. Half our trials now come from the blog and email.", n: "Daniel Okafor", r: "Founder, Orbita Labs", i: "DO", m: "1,100 trials from content" },
    { svc: "content", q: "Every course now has its own page that ranks. Enquiries more than doubled without increasing our ad budget.", n: "Farah Siddiqui", r: "Head of Growth, Mosaic Learning", i: "FS", m: "2.6× course enquiries" },
    { svc: "social", q: "Our reels went from 200 views to 40,000. The team shoots, edits and posts. I just show up and teach my classes.", n: "Sara Thompson", r: "Owner, Pulse Fitness", i: "ST", m: "48k new followers" },
    { svc: "social", q: "The 30-day challenge they ran filled two new batches. They reply to comments faster than we ever did.", n: "Ishita Bose", r: "Founder, Bloom Yoga", i: "IB", m: "6.1% engagement" }
  ],

  /* ---------- Client logos (SAMPLE) ---------- */
  clients: [
    { n: "Northwind Dental", c: "wm-1", ind: "Healthcare", res: "<b>3.2×</b> online bookings" },
    { n: "Kettle & Crumb", c: "wm-2", ind: "Food & café", res: "<b>+410%</b> organic traffic" },
    { n: "Orbita Labs", c: "wm-3", ind: "SaaS startup", res: "MVP live in <b>7 weeks</b>" },
    { n: "Vanta Realty", c: "wm-4", ind: "Real estate", res: "<b>1,200</b> leads via bot" },
    { n: "Greenline Logistics", c: "wm-5", ind: "Logistics", res: "<b>18 hrs</b> saved weekly" },
    { n: "Pulse Fitness", c: "wm-1", ind: "Fitness studios", res: "<b>48k</b> new followers" },
    { n: "Mosaic Learning", c: "wm-2", ind: "Education", res: "<b>2.6×</b> course sign-ups" },
    { n: "Atlas Legal", c: "wm-4", ind: "Professional services", res: "Page 1 for <b>34</b> keywords" }
  ]
};

/* =====================================================================
   PROBLEMS, APPROACH, SUCCESS STORIES, LEGAL
   ===================================================================== */

/* Problems shown on each service page: [problem, what we do, result] */
Object.assign(SITE.services.web, { problems: [
  ["No website, or one nobody can find on Google", "We build a fast, SEO-ready site around the searches your customers already make.", "Found on Google within weeks"],
  ["A slow, outdated site that makes you look small", "Custom design and a static build that loads in under a second on any phone.", "Visitors stay and enquire"],
  ["Visitors leave without calling or booking", "Clear calls to action, WhatsApp buttons and online booking on every page.", "More bookings from the same traffic"]
]});
Object.assign(SITE.services.fullstack, { problems: [
  ["The business runs on spreadsheets and WhatsApp groups", "A custom portal that puts orders, customers and staff in one place.", "One source of truth"],
  ["Off-the-shelf software doesn't fit how you work", "We map your real process first, then build only what you need.", "Software that fits the team"],
  ["An app idea but no technical co-founder", "A scoped MVP in weeks, built to grow into a full product.", "Live product to show investors"]
]});
Object.assign(SITE.services.ai, { problems: [
  ["Leads go cold in DMs and missed calls", "An AI assistant answers every enquiry instantly and qualifies the lead.", "Every lead answered in seconds"],
  ["Staff lose hours to copy-paste admin", "Workflows move data between email, forms, CRM and accounts automatically.", "Hours back every week"],
  ["Same questions answered 50 times a day", "A bot trained on your own documents handles the repeats and hands off the rest.", "Team focuses on real work"]
]});
Object.assign(SITE.services.content, { problems: [
  ["Blog posts that never rank or get read", "Keyword research first, then articles built to answer what buyers search for.", "Steady organic traffic"],
  ["No time to write consistently", "A monthly calendar and specialist writers who publish on schedule.", "Content goes out every week"],
  ["Traffic, but no leads from it", "Landing pages, lead magnets and newsletters that turn readers into enquiries.", "Readers become customers"]
]});
Object.assign(SITE.services.social, { problems: [
  ["Posting randomly with no growth", "A content strategy built on what your audience actually watches.", "Followers that grow every month"],
  ["No time to film, edit and post", "One shoot day a month gives us everything for the next four weeks.", "Daily presence, no daily effort"],
  ["Likes, but no customers", "Clear offers, story funnels and DM replies that turn followers into bookings.", "Social that drives sales"]
]});

/* Home and Approach page diagram: problem → service → outcome */
SITE.outcomes = ["Found on Google", "Leads answered 24/7", "Hours saved every week", "Content that compounds", "A brand people follow"];
SITE.problems = [
  { p: "No website, or one nobody finds", svc: "web", out: 0 },
  { p: "Slow, outdated site losing visitors", svc: "web", out: 0 },
  { p: "Business run on spreadsheets", svc: "fullstack", out: 2 },
  { p: "Leads lost in DMs and missed calls", svc: "ai", out: 1 },
  { p: "Hours of copy-paste admin", svc: "ai", out: 2 },
  { p: "Blog posts that never rank", svc: "content", out: 3 },
  { p: "Posting randomly, no growth", svc: "social", out: 4 }
];

/* Our approach: a repeating cycle */
SITE.approach = [
  { t: "Discover", wk: "Week 0", d: "A 45-minute call and a short audit of your site, tools and competitors. We find where you're losing customers and time.", out: ["Written roadmap", "Fixed quote", "Priority list"] },
  { t: "Build", wk: "Weeks 1–3", d: "Designs first, then development. You review a live staging link every Friday and nothing ships without your approval.", out: ["Approved designs", "Weekly demos", "Staging link"] },
  { t: "Launch", wk: "Week 4", d: "We handle domain, hosting, tracking, automations and training, then watch everything closely for the first two weeks.", out: ["Go-live checklist", "Analytics set up", "Team training"] },
  { t: "Grow", wk: "Every month", d: "Content, social and automation run every month. Reports show what worked, and we feed that back into the next cycle.", out: ["Monthly report", "New content", "Next-quarter plan"] }
];

/* Success stories (SAMPLE). Metrics are drawn to scale: b = before, a = after. lower: true means lower is better. */
SITE.stories = [
  { client: "Northwind Dental", ind: "Healthcare clinic", svcs: ["web", "ai"], time: "6 weeks", color: "#0E6E6E",
    title: "A dental clinic that now books patients while it's closed",
    challenge: "Patients couldn't book online. The old site took 8 seconds to load on mobile, and every after-hours call went to voicemail.",
    steps: ["Tracked where patients dropped off", "Built a fast site with online booking", "Added a WhatsApp bot for after-hours questions", "Set up an automatic Google review request"],
    headline: [["3.2×", "online bookings"], ["0.8s", "load time"], ["38%", "bookings after 8pm"]],
    metrics: [{ l: "Online bookings per month", b: 42, a: 136 }, { l: "Mobile load time (seconds)", b: 8.1, a: 0.8, lower: true }, { l: "Google reviews", b: 64, a: 212 }],
    quote: "Six weeks later we had a website, a booking system and a bot answering patients at midnight.", who: "Dr. Meera Iyer, Founder" },
  { client: "Greenline Logistics", ind: "Logistics", svcs: ["fullstack", "ai"], time: "7 weeks", color: "#0F7A4A",
    title: "Dispatch moved off spreadsheets and onto one live screen",
    challenge: "Orders arrived by email and were retyped into three spreadsheets. Drivers called in for updates and deliveries were missed every week.",
    steps: ["Mapped the order-to-delivery process with the ops team", "Built a dispatch portal with live driver tracking", "Automated email orders into jobs", "Trained staff and ran both systems for one week"],
    headline: [["18 hrs", "saved weekly"], ["12 min", "order to dispatch"], ["−87%", "missed deliveries"]],
    metrics: [{ l: "Admin hours per week", b: 26, a: 8, lower: true }, { l: "Order to dispatch (minutes)", b: 95, a: 12, lower: true }, { l: "Missed deliveries per month", b: 31, a: 4, lower: true }],
    quote: "My ops team got back almost a full working day every week.", who: "Rohan Mehta, COO" },
  { client: "Kettle & Crumb", ind: "Bakery & café", svcs: ["web", "content", "social"], time: "12 months", color: "#B4532A",
    title: "A neighbourhood bakery that became a known local brand",
    challenge: "Great bread, no online presence. The bakery relied on walk-ins and word of mouth, and weekend batches often went unsold.",
    steps: ["Built a site with menu and pre-orders", "Started a recipes blog targeting local searches", "Weekly behind-the-oven reels", "Monthly newsletter with new-menu drops"],
    headline: [["+410%", "organic traffic"], ["24k", "Instagram followers"], ["4.5×", "weekend pre-orders"]],
    metrics: [{ l: "Website visitors per month", b: 1900, a: 9700 }, { l: "Instagram followers", b: 2100, a: 24000 }, { l: "Weekend pre-orders", b: 40, a: 180 }],
    quote: "One team for the site, blog and Instagram means nothing gets lost between agencies.", who: "Kabir Shah, Co-founder" },
  { client: "Vanta Realty", ind: "Real estate", svcs: ["ai", "social"], time: "4 months", color: "#2840F0",
    title: "Every property enquiry answered in under a minute",
    challenge: "Hundreds of enquiries came in from ads and Instagram, but agents took hours to reply and most leads were never qualified.",
    steps: ["Listed the 40 questions buyers ask most", "Built a WhatsApp bot that answers and qualifies", "Synced qualified leads to HubSpot", "Ran video property tours on Reels and LinkedIn"],
    headline: [["1,200", "leads qualified"], ["<1 min", "first response"], ["3×", "site visits booked"]],
    metrics: [{ l: "Qualified leads per month", b: 90, a: 290 }, { l: "First response time (minutes)", b: 180, a: 1, lower: true }, { l: "Site visits booked per month", b: 22, a: 68 }],
    quote: "My agents only talk to people who are ready to visit.", who: "Vikram Nair, Director" },
  { client: "Pulse Fitness", ind: "Fitness studios", svcs: ["social"], time: "6 months", color: "#E9466B",
    title: "From 200 views a reel to sold-out classes",
    challenge: "The studio posted when it remembered. Reels got a few hundred views and new members came only from flyers.",
    steps: ["Studied which formats their audience watched", "Monthly shoot days with trainers", "30-day challenge campaign", "Story funnel to free trial bookings"],
    headline: [["48k", "new followers"], ["94%", "class occupancy"], ["4×", "trial sign-ups"]],
    metrics: [{ l: "Instagram followers", b: 3000, a: 51000 }, { l: "Class occupancy (%)", b: 58, a: 94 }, { l: "Free trial sign-ups per month", b: 40, a: 160 }],
    quote: "The team shoots, edits and posts. I just show up and teach my classes.", who: "Sara Thompson, Owner" }
];

/* Legal pages: TEMPLATE text. Have a lawyer review before publishing. */
SITE.legalName = "Scaffold Studio LLP";
SITE.updated = "21 October 2026";
SITE.legal = {
  terms: { title: "Terms of Service", intro: "These terms apply when you hire us for any website, software, automation, content or social media work, or use this website.", sections: [
    ["Our services", "We provide the services described in your proposal or the package you choose. Anything not listed in the proposal is out of scope and will be quoted separately before we start it."],
    ["Quotes and payment", "One-time projects are billed 50% before work starts and 50% before launch, unless your proposal says otherwise. Monthly services are billed in advance on the 1st of each month. Invoices are due within 7 days. Prices exclude applicable taxes such as GST."],
    ["Your responsibilities", "You agree to share content, logins, feedback and approvals on time. Delays on your side may move the delivery date. You confirm you have the rights to any material you give us."],
    ["Revisions and approvals", "Each package includes the number of revision rounds stated in it. Once you approve a design or deliverable, further changes are treated as new work."],
    ["Ownership", "Once all invoices for a project are paid, you own the final website, code, designs and content we created for you. We keep ownership of our internal tools and reusable code libraries, and grant you a permanent licence to use them in your project. We may show the work in our portfolio unless you ask us not to."],
    ["Third-party services", "Hosting, domains, AI models, ad platforms and other tools are provided by third parties under their own terms. Their fees are paid by you unless your proposal says otherwise. We are not responsible for their outages or policy changes."],
    ["Results", "We work to improve rankings, leads and engagement, but search engines and social platforms are outside our control, so we cannot guarantee specific results."],
    ["Monthly plans and cancellation", "Monthly plans run month to month. Either side can cancel with 30 days' written notice. Work already delivered in the notice period is billable."],
    ["Liability", "Our total liability for any claim is limited to the fees you paid us in the three months before the claim. We are not liable for indirect losses such as lost profits or data."],
    ["Governing law", "These terms are governed by the laws of India. Any dispute will first be discussed in good faith, and then handled by the courts of [your city]."],
    ["Contact", "Questions about these terms? Email hello@scaffold.studio."]
  ]},
  privacy: { title: "Privacy Policy", intro: "This policy explains what personal information we collect, why we collect it and how we keep it safe.", sections: [
    ["Information we collect", "When you contact us we collect your name, email, phone number, business name and the details you share about your project. Our website may also collect basic usage data such as pages visited, device type and approximate location through analytics tools."],
    ["How we use it", "We use your information to reply to enquiries, prepare quotes, deliver services, send invoices and, if you agree, send occasional updates. We do not sell your personal information."],
    ["Client data we handle", "When we build systems for you, we may process your customers' data on your behalf. We only use it to deliver the agreed work and follow your instructions. We will sign a data processing agreement on request."],
    ["Cookies and analytics", "This website may use cookies for analytics and to remember preferences such as dark mode. You can block cookies in your browser settings."],
    ["Sharing", "We share information only with service providers who help us operate, such as email, hosting, payments and project management tools, and only as much as they need. We may disclose information when required by law."],
    ["Storage and security", "We store data with reputable providers, limit access to team members who need it, and use strong passwords and two-factor authentication."],
    ["How long we keep it", "We keep enquiry data for up to 2 years and client records for as long as the law requires for tax and accounting."],
    ["Your rights", "You can ask to see, correct or delete your personal information, or withdraw consent for marketing, by emailing hello@scaffold.studio. We reply within 30 days."],
    ["Changes", "We may update this policy. The date at the top shows the latest version."]
  ]},
  refund: { title: "Refund & Cancellation Policy", intro: "We want every project to start with clear expectations. This policy explains what happens if you need to cancel.", sections: [
    ["Before work starts", "If you cancel within 7 days of paying the deposit and before any work has started, we refund the deposit in full."],
    ["During a project", "If you cancel after work has started, we keep payment for work completed to that point and refund any unused balance. You receive all completed files."],
    ["After launch", "Payments for delivered and approved work are not refundable. If something we built doesn't work as agreed, we fix it free of charge within the support period of your package."],
    ["Monthly services", "Monthly plans can be cancelled with 30 days' notice. Fees already paid for the current month are not refunded, but we deliver the month's work in full."],
    ["Third-party costs", "Fees paid to third parties on your behalf, such as domains, hosting, software licences and ad spend, can't be refunded by us."],
    ["How to request a refund", "Email hello@scaffold.studio with your invoice number. Approved refunds are paid to the original payment method within 7–10 working days."]
  ]}
};
