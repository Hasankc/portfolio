// lib/i18n.ts — Complete bilingual translation file
// Arabic (ar) + English (en) for every string on the portfolio.
// When you add a new string: add to BOTH en and ar sections below.
// Keys are grouped by which section they belong to.

export type Lang = 'en' | 'ar';

export const translations = {
  en: {
    // ── META ──────────────────────────────────────────────────────────────
    lang_toggle: 'عربي',   // the button label — shows Arabic word when in English mode
    dir:         'ltr',

    // ── NAVBAR ────────────────────────────────────────────────────────────
    nav_about:      'About',
    nav_skills:     'Skills',
    nav_experience: 'Experience',
    nav_projects:   'Projects',
    nav_ai:         'AI Chat',
    nav_contact:    'Contact',
    nav_resume:     'Resume',
    nav_resume_dl:  'Download Resume',

    // ── HERO ──────────────────────────────────────────────────────────────
    hero_greeting:    "Hello, I'm",
    hero_name:        'Alhasan Al-Qaysi',
    hero_available:   'Open to Opportunities',
    hero_bio:         'Full-stack developer with 5+ years building web applications in Helsinki. I craft fast, accessible, and beautiful products — from pixel-perfect UIs to robust APIs.',
    hero_location:    'Helsinki, Finland',
    hero_cta_contact: 'Get in Touch',
    hero_cta_projects:'View Projects',
    hero_scroll:      'Scroll',
    hero_badge_years: 'yrs exp.',
    hero_badge_orgs:  'orgs.',
    hero_role_1:      'Full-Stack Developer',
    hero_role_2:      'React & TypeScript Engineer',
    hero_role_3:      'Vue.js Specialist',
    hero_role_4:      'Node.js Developer',
    hero_role_5:      'Python Backend Dev',

    // ── ABOUT ─────────────────────────────────────────────────────────────
    about_section_label: '// about me',
    about_heading:       'Passionate about',
    about_heading_grad:  'crafting',
    about_heading_end:   'the web',
    about_p1:            "I'm a full-stack developer based in Helsinki with 5+ years building web applications people actually enjoy using. Currently at Cyberday | Agendium Oy, building the frontend of a cybersecurity compliance platform trusted by 1,000+ organizations worldwide.",
    about_p2:            'I thrive in collaborative Agile teams and believe great software comes from empathy for users, clean thinking, and a constant drive to improve. I pick up new tools fast and love solving problems that actually matter.',
    about_p3:            'Outside of work I explore Web3. In 2022 I took 2nd place at Junction 2022 for building a marketplace using blockchain + Google Cloud Video Intelligence to ensure fair pay for content creators based on actual performance.',
    about_cta_work:      "Let's Work Together",
    about_cta_github:    'View GitHub',
    about_stat_years:    'Years Experience',
    about_stat_bugs:     'Bugs Squashed',
    about_stat_orgs:     'Orgs on Platform',
    about_stat_awards:   'Hackathon Award',

    // ── SKILLS ────────────────────────────────────────────────────────────
    skills_label:       '// skills & technologies',
    skills_heading:     'My',
    skills_heading_grad:'Technical',
    skills_heading_end: 'Stack',
    skills_subtext:     'Honest self-assessments — not marketing numbers.',
    skills_tab_frontend:'Frontend',
    skills_tab_backend: 'Backend',
    skills_tab_database:'Database',
    skills_tab_tools:   'Tools',

    // ── EXPERIENCE ────────────────────────────────────────────────────────
    exp_label:       '// journey',
    exp_heading:     'Experience &',
    exp_heading_grad:'Education',

    // Cyberday job
    exp_cyberday_title:  'Software Developer',
    exp_cyberday_org:    'Cyberday | Agendium Oy',
    exp_cyberday_period: '2023 – Present',
    exp_cyberday_loc:    'Helsinki, Finland',
    exp_cyberday_b1:     'Built and maintained Vue.js frontend for a cybersecurity compliance platform used by 1,000+ organizations.',
    exp_cyberday_b2:     'Created a reusable component library that cut repeated UI work across the entire app.',
    exp_cyberday_b3:     'Found and fixed 50+ high-priority bugs — silent failures, broken data displays, edge-case crashes.',
    exp_cyberday_b4:     'Improved load performance by removing dead code and reducing redundant API calls.',
    exp_cyberday_b5:     'Contributed to Python backend: REST API design and business logic supporting frontend features.',
    exp_cyberday_b6:     'Worked in Agile sprints with designers and backend engineers.',

    // Taitotalo education
    exp_taitotalo_title:  'ICT / Python Programme',
    exp_taitotalo_org:    'Taitotalo',
    exp_taitotalo_period: 'Nov 2024 – Jun 2025',
    exp_taitotalo_loc:    'Helsinki, Finland',
    exp_taitotalo_b1:     'Python programming and broader ICT fundamentals.',

    // Full Stack Open
    exp_fso_title:  'Full Stack Open',
    exp_fso_org:    'University of Helsinki',
    exp_fso_period: '2022 – 2023',
    exp_fso_loc:    'Online',
    exp_fso_b1:     'React, Node.js, TypeScript, GraphQL, CI/CD, containers, testing. One of the best online courses I have done.',

    // Junction 2022 award
    exp_junction_title:  '2nd Place — TX Web3 Challenge',
    exp_junction_org:    'Junction 2022 Hackathon',
    exp_junction_period: 'Nov 2022',
    exp_junction_loc:    'Helsinki, Finland',
    exp_junction_b1:     '48-hour hackathon. Built a Web3 marketplace + Google Cloud Video Intelligence ensuring fair pay for content creators.',
    exp_junction_b2:     'Judges awarded 2nd place in the TX Web3 challenge track.',

    // Integrify bootcamp
    exp_integrify_title:  'Software Development Academy',
    exp_integrify_org:    'Integrify',
    exp_integrify_period: 'Jan – Jun 2022',
    exp_integrify_loc:    'Helsinki, Finland',
    exp_integrify_b1:     'Intensive bootcamp — real full-stack code from week one. Where it all properly started.',

    // ── PROJECTS ──────────────────────────────────────────────────────────
    proj_label:       '// projects',
    proj_heading:     "Things I've",
    proj_heading_grad:'Built',
    proj_subtext:     'Hackathon projects, side work, and professional builds.',
    proj_adverse_name:'Adverse Marketplace',
    proj_adverse_desc:'Web3 marketplace ensuring fair pay for content creators based on actual performance. Built with React, Node.js, blockchain, and Google Cloud Video Intelligence API in 48 hours at Junction 2022.',
    proj_adverse_award:'🏆 Junction 2022 — 2nd Place',
    proj_tinbike_name:'TinBike',
    proj_tinbike_desc:'Mobile app concept for motorcyclists — connects nearby riders on a map and enables group rides. Think Tinder, but for finding riding buddies.',
    proj_from_github: 'From GitHub',
    proj_see_all:     'See all repositories',
    proj_no_desc:     'No description.',
    proj_error_text:  "Couldn't load GitHub repos right now.",
    proj_retry:       'Retry',

    // ── AI CHAT ───────────────────────────────────────────────────────────
    ai_label:       '// ai assistant',
    ai_heading:     'Ask Me',
    ai_heading2:    'Anything',
    ai_sub:         'AI trained on my portfolio — ask about skills, projects, or availability.',
    ai_name:        'Portfolio AI',
    ai_online:      'Online',
    ai_placeholder: 'Ask something about Alhasan…',
    ai_hint:        'Powered by AI · Enter to send · Shift+Enter for new line',
    ai_reset:       'New conversation',
    ai_init:        "Hi! 👋 I'm an AI trained on Alhasan's portfolio. Ask me anything about his skills, experience, or availability.",
    ai_s1:          'What are your main skills?',
    ai_s2:          'Tell me about your experience',
    ai_s3:          'Are you open to work?',
    ai_s4:          'What projects are you proud of?',
    ai_error:       "Can't reach the server right now. Email Alhasan directly at alhasanal_qaysi@yahoo.com.",

    // ── CONTACT ───────────────────────────────────────────────────────────
    contact_label:       '// contact',
    contact_heading:     "Let's",
    contact_heading_grad:'Connect',
    contact_subtext:     "Got a project, job opening, or just want to chat? I'm always up for it.",
    contact_card_title:  'Get in touch',
    contact_open_title:  'Open to opportunities',
    contact_open_desc:   'Full-time, freelance, or interesting collabs. Helsinki-based, open to remote internationally.',
    contact_label_name:  'Name',
    contact_label_email: 'Email',
    contact_label_subj:  'Subject',
    contact_label_msg:   'Message',
    contact_ph_name:     'Your name',
    contact_ph_email:    'you@example.com',
    contact_ph_subj:     "What's this about?",
    contact_ph_msg:      'Tell me about your project or opportunity…',
    contact_send:        'Send Message',
    contact_sending:     'Sending…',
    contact_privacy:     'Your data stays private — no spam, ever.',
    contact_success_title:'Message sent!',
    contact_success_text: "Thanks for reaching out. I'll reply within 24 hours.",
    contact_send_another: 'Send another message',
    contact_err_name:    'Name must be at least 2 characters',
    contact_err_email:   'Please enter a valid email address',
    contact_err_subj:    'Subject is too short',
    contact_err_msg:     'Message must be at least 10 characters',

    // ── FOOTER ────────────────────────────────────────────────────────────
    footer_tagline:   'Full-stack developer in Helsinki. Building fast, accessible, honest software.',
    footer_dl_cv:     'Download CV',
    footer_nav_title: 'Navigation',
    footer_soc_title: 'Connect',
    footer_built:     'Built with',
    footer_using:     'using Next.js & FastAPI',
    footer_rights:    'All rights reserved.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARABIC TRANSLATIONS
  // ═══════════════════════════════════════════════════════════════════════
  ar: {
    // ── META ──────────────────────────────────────────────────────────────
    lang_toggle: 'English',  // the button label — shows English when in Arabic mode
    dir:         'rtl',

    // ── NAVBAR ────────────────────────────────────────────────────────────
    nav_about:      'عني',
    nav_skills:     'المهارات',
    nav_experience: 'الخبرة',
    nav_projects:   'المشاريع',
    nav_ai:         'المساعد الذكي',
    nav_contact:    'التواصل',
    nav_resume:     'السيرة الذاتية',
    nav_resume_dl:  'تحميل السيرة الذاتية',

    // ── HERO ──────────────────────────────────────────────────────────────
    hero_greeting:    'مرحباً، أنا',
    hero_name:        'الحسن القيسي',
    hero_available:   'متاح للفرص الوظيفية',
    hero_bio:         'مطور ويب متكامل بخبرة أكثر من 5 سنوات في بناء تطبيقات الويب في هلسنكي. أصنع منتجات سريعة وجميلة وسهلة الوصول — من واجهات المستخدم الدقيقة إلى واجهات برمجة التطبيقات القوية.',
    hero_location:    'هلسنكي، فنلندا',
    hero_cta_contact: 'تواصل معي',
    hero_cta_projects:'عرض المشاريع',
    hero_scroll:      'مرر للأسفل',
    hero_badge_years: 'سنوات خبرة',
    hero_badge_orgs:  'منظمة',
    hero_role_1:      'مطور ويب متكامل',
    hero_role_2:      'مهندس React و TypeScript',
    hero_role_3:      'متخصص Vue.js',
    hero_role_4:      'مطور Node.js',
    hero_role_5:      'مطور Python للخادم',

    // ── ABOUT ─────────────────────────────────────────────────────────────
    about_section_label: '// عني',
    about_heading:       'شغوف بـ',
    about_heading_grad:  'صناعة',
    about_heading_end:   'الويب',
    about_p1:            'أنا مطور ويب متكامل مقيم في هلسنكي بخبرة أكثر من 5 سنوات في بناء تطبيقات ويب يستمتع بها الناس حقاً. أعمل حالياً في شركة Cyberday | Agendium Oy، حيث أبني واجهة أمامية لمنصة امتثال للأمن السيبراني يثق بها أكثر من 1,000 منظمة حول العالم.',
    about_p2:            'أزدهر في فرق Agile التعاونية وأؤمن بأن البرمجيات الرائعة تأتي من التعاطف مع المستخدمين والتفكير الواضح والسعي المستمر للتحسين. أتقن أدوات جديدة بسرعة وأحب حل المشكلات التي تهم الناس فعلاً.',
    about_p3:            'خارج العمل، أستكشف Web3. في عام 2022 حصلت على المركز الثاني في هاكاثون Junction 2022 ببناء سوق إلكتروني باستخدام تقنية البلوك تشين + Google Cloud Video Intelligence لضمان الأجر العادل لصانعي المحتوى.',
    about_cta_work:      'لنعمل معاً',
    about_cta_github:    'عرض GitHub',
    about_stat_years:    'سنوات الخبرة',
    about_stat_bugs:     'أخطاء تم إصلاحها',
    about_stat_orgs:     'منظمة تستخدم المنصة',
    about_stat_awards:   'جائزة هاكاثون',

    // ── SKILLS ────────────────────────────────────────────────────────────
    skills_label:       '// المهارات والتقنيات',
    skills_heading:     'مجموعتي',
    skills_heading_grad:'التقنية',
    skills_heading_end: '',
    skills_subtext:     'تقييمات ذاتية صادقة — وليست أرقاماً تسويقية.',
    skills_tab_frontend:'الواجهة الأمامية',
    skills_tab_backend: 'الخادم',
    skills_tab_database:'قواعد البيانات',
    skills_tab_tools:   'الأدوات',

    // ── EXPERIENCE ────────────────────────────────────────────────────────
    exp_label:       '// الرحلة',
    exp_heading:     'الخبرة و',
    exp_heading_grad:'التعليم',

    // Cyberday
    exp_cyberday_title:  'مطور برمجيات',
    exp_cyberday_org:    'Cyberday | Agendium Oy',
    exp_cyberday_period: '2023 – حتى الآن',
    exp_cyberday_loc:    'هلسنكي، فنلندا',
    exp_cyberday_b1:     'بناء وصيانة واجهة Vue.js الأمامية لمنصة امتثال الأمن السيبراني المستخدمة من قبل أكثر من 1,000 منظمة.',
    exp_cyberday_b2:     'إنشاء مكتبة مكونات قابلة لإعادة الاستخدام قللت من العمل المتكرر في واجهة المستخدم.',
    exp_cyberday_b3:     'اكتشاف وإصلاح أكثر من 50 خطأً ذا أولوية عالية — أعطال صامتة وعرض بيانات مكسور وحالات حافة.',
    exp_cyberday_b4:     'تحسين أداء التحميل عن طريق إزالة الكود القديم وتقليل طلبات API غير الضرورية.',
    exp_cyberday_b5:     'المساهمة في الواجهة الخلفية Python: تصميم REST API ومنطق الأعمال.',
    exp_cyberday_b6:     'العمل في سبرينتات Agile مع المصممين ومهندسي الخادم.',

    // Taitotalo
    exp_taitotalo_title:  'برنامج ICT / Python',
    exp_taitotalo_org:    'Taitotalo',
    exp_taitotalo_period: 'نوفمبر 2024 – يونيو 2025',
    exp_taitotalo_loc:    'هلسنكي، فنلندا',
    exp_taitotalo_b1:     'برمجة Python وأساسيات تقنية المعلومات والاتصالات.',

    // Full Stack Open
    exp_fso_title:  'Full Stack Open',
    exp_fso_org:    'جامعة هلسنكي',
    exp_fso_period: '2022 – 2023',
    exp_fso_loc:    'عبر الإنترنت',
    exp_fso_b1:     'React وNode.js وTypeScript وGraphQL وCI/CD والحاويات والاختبار. من أفضل الدورات الإلكترونية التي أكملتها.',

    // Junction 2022
    exp_junction_title:  'المركز الثاني — تحدي TX للويب 3',
    exp_junction_org:    'هاكاثون Junction 2022',
    exp_junction_period: 'نوفمبر 2022',
    exp_junction_loc:    'هلسنكي، فنلندا',
    exp_junction_b1:     'هاكاثون 48 ساعة. بناء سوق Web3 + Google Cloud Video Intelligence لضمان الأجر العادل لصانعي المحتوى.',
    exp_junction_b2:     'فاز المشروع بالمركز الثاني في مسار تحدي TX للويب 3.',

    // Integrify
    exp_integrify_title:  'أكاديمية تطوير البرمجيات',
    exp_integrify_org:    'Integrify',
    exp_integrify_period: 'يناير – يونيو 2022',
    exp_integrify_loc:    'هلسنكي، فنلندا',
    exp_integrify_b1:     'بوتكامب مكثف — كود حقيقي متكامل من الأسبوع الأول. هنا بدأ كل شيء.',

    // ── PROJECTS ──────────────────────────────────────────────────────────
    proj_label:       '// المشاريع',
    proj_heading:     'أشياء',
    proj_heading_grad:'بنيتها',
    proj_subtext:     'مشاريع هاكاثون وأعمال جانبية وبناءات مهنية.',
    proj_adverse_name:'Adverse Marketplace',
    proj_adverse_desc:'سوق إلكتروني Web3 يضمن الأجر العادل لصانعي المحتوى بناءً على الأداء الفعلي. مبني بـ React وNode.js والبلوك تشين وGoogle Cloud Video Intelligence في 48 ساعة في Junction 2022.',
    proj_adverse_award:'🏆 Junction 2022 — المركز الثاني',
    proj_tinbike_name:'TinBike',
    proj_tinbike_desc:'تطبيق موبايل للدراجين النارية — يربط الدراجين القريبين على الخريطة ويتيح تنظيم رحلات جماعية.',
    proj_from_github: 'من GitHub',
    proj_see_all:     'عرض جميع المستودعات',
    proj_no_desc:     'لا يوجد وصف.',
    proj_error_text:  'تعذر تحميل مستودعات GitHub الآن.',
    proj_retry:       'إعادة المحاولة',

    // ── AI CHAT ───────────────────────────────────────────────────────────
    ai_label:       '// المساعد الذكي',
    ai_heading:     'اسألني',
    ai_heading2:    'أي شيء',
    ai_sub:         'ذكاء اصطناعي مُدرَّب على محفظتي — اسأل عن المهارات أو المشاريع أو التوفر.',
    ai_name:        'مساعد المحفظة',
    ai_online:      'متصل',
    ai_placeholder: 'اسأل شيئاً عن الحسن…',
    ai_hint:        'مدعوم بالذكاء الاصطناعي · Enter للإرسال',
    ai_reset:       'محادثة جديدة',
    ai_init:        'مرحباً! 👋 أنا ذكاء اصطناعي مُدرَّب على محفظة الحسن القيسي. اسألني عن مهاراته أو خبرته أو توفره للعمل.',
    ai_s1:          'ما هي مهاراتك الرئيسية؟',
    ai_s2:          'حدثني عن خبرتك',
    ai_s3:          'هل أنت متاح للعمل؟',
    ai_s4:          'ما المشاريع التي تفخر بها؟',
    ai_error:       'تعذر الوصول إلى الخادم الآن. راسل الحسن مباشرة على alhasanal_qaysi@yahoo.com.',

    // ── CONTACT ───────────────────────────────────────────────────────────
    contact_label:        '// التواصل',
    contact_heading:      'لنتواصل',
    contact_heading_grad: '',
    contact_subtext:      'لديك مشروع أو وظيفة أو تريد فقط الدردشة؟ أنا دائماً مستعد.',
    contact_card_title:   'تواصل معي',
    contact_open_title:   'متاح للفرص',
    contact_open_desc:    'دوام كامل أو عمل حر أو تعاون مثير للاهتمام. مقيم في هلسنكي ومنفتح على العمل عن بُعد دولياً.',
    contact_label_name:   'الاسم',
    contact_label_email:  'البريد الإلكتروني',
    contact_label_subj:   'الموضوع',
    contact_label_msg:    'الرسالة',
    contact_ph_name:      'اسمك',
    contact_ph_email:     'example@email.com',
    contact_ph_subj:      'ما موضوع رسالتك؟',
    contact_ph_msg:       'أخبرني عن مشروعك أو الفرصة…',
    contact_send:         'إرسال الرسالة',
    contact_sending:      'جاري الإرسال…',
    contact_privacy:      'بياناتك خاصة تماماً — لا رسائل مزعجة أبداً.',
    contact_success_title:'تم إرسال الرسالة!',
    contact_success_text: 'شكراً للتواصل. سأرد في غضون 24 ساعة.',
    contact_send_another: 'إرسال رسالة أخرى',
    contact_err_name:     'الاسم يجب أن يكون حرفين على الأقل',
    contact_err_email:    'يرجى إدخال بريد إلكتروني صحيح',
    contact_err_subj:     'الموضوع قصير جداً',
    contact_err_msg:      'الرسالة يجب أن تكون 10 أحرف على الأقل',

    // ── FOOTER ────────────────────────────────────────────────────────────
    footer_tagline:   'مطور ويب متكامل في هلسنكي. أبني برمجيات سريعة وسهلة الوصول وصادقة.',
    footer_dl_cv:     'تحميل السيرة الذاتية',
    footer_nav_title: 'التنقل',
    footer_soc_title: 'تواصل',
    footer_built:     'صُنع بـ',
    footer_using:     'باستخدام Next.js و FastAPI',
    footer_rights:    'جميع الحقوق محفوظة.',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
