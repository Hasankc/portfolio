// i18n.ts — Arabic / English translations for the whole portfolio
// To add a new string: add to both 'en' and 'ar' objects below.

export type Lang = 'en' | 'ar';

export const translations = {
  en: {
    // Navbar
    nav_about:      'About',
    nav_skills:     'Skills',
    nav_experience: 'Experience',
    nav_projects:   'Projects',
    nav_ai:         'AI Chat',
    nav_contact:    'Contact',
    nav_resume:     'Resume',
    nav_resume_dl:  'Download Resume',

    // Hero
    hello:          "Hello, I'm",
    available:      'Open to Opportunities',
    bio:            'Full-stack developer with 5+ years building web applications in Helsinki. I craft fast, accessible, and beautiful products — from pixel-perfect UIs to robust APIs.',
    location:       'Helsinki, Finland',
    get_in_touch:   'Get in Touch',
    view_projects:  'View Projects',
    scroll:         'Scroll',
    yrs_exp:        'yrs exp.',
    orgs:           'orgs.',

    // About
    about_label:    '// about me',
    about_heading:  'Passionate about',
    about_heading2: 'crafting',
    about_heading3: 'the web',
    about_p1:       "I'm a full-stack developer based in Helsinki with 5+ years building web applications people actually enjoy using. Currently at Cyberday | Agendium Oy, building the frontend of a cybersecurity compliance platform trusted by 1,000+ organizations worldwide.",
    about_p2:       'I thrive in collaborative Agile teams and believe great software comes from empathy for users, clean thinking, and a constant drive to improve.',
    about_p3:       'Outside of work I explore Web3. In 2022 I took 2nd place at Junction 2022 for building a marketplace using blockchain + Google Cloud Video Intelligence.',
    lets_work:      "Let's Work Together",
    view_github:    'View GitHub',
    stat_years:     'Years Experience',
    stat_bugs:      'Bugs Squashed',
    stat_orgs:      'Orgs on Platform',
    stat_awards:    'Hackathon Award',

    // Skills
    skills_label:   '// skills & technologies',
    skills_heading: 'My',
    skills_heading2:'Technical',
    skills_heading3:'Stack',
    skills_sub:     'Honest self-assessments — not marketing numbers.',

    // Experience
    exp_label:      '// journey',
    exp_heading:    'Experience &',
    exp_heading2:   'Education',

    // Projects
    proj_label:     '// projects',
    proj_heading:   "Things I've",
    proj_heading2:  'Built',
    proj_sub:       'Hackathon projects, side work, and professional builds.',
    proj_from_gh:   'From GitHub',
    proj_see_all:   'See all repositories',

    // AI Chat
    ai_label:       '// ai assistant',
    ai_heading:     'Ask Me',
    ai_heading2:    'Anything',
    ai_sub:         'AI trained on my portfolio — ask about skills, projects, or availability.',
    ai_name:        'Portfolio AI',
    ai_online:      'Online',
    ai_placeholder: 'Ask something about Alhasan…',
    ai_hint:        'Powered by AI · Enter to send',
    ai_reset:       'New conversation',
    ai_init:        "Hi! 👋 I'm an AI trained on Alhasan's portfolio. Ask me anything about his skills, experience, or availability.",
    ai_s1:          'What are your main skills?',
    ai_s2:          'Tell me about your experience',
    ai_s3:          'Are you open to work?',
    ai_s4:          'What projects are you proud of?',
    ai_error:       "Can't reach the server right now. Email Alhasan directly at alhasanal_qaysi@yahoo.com.",

    // Contact
    contact_label:  '// contact',
    contact_heading:"Let's",
    contact_heading2:'Connect',
    contact_sub:    "Got a project, job opening, or just want to chat? I'm always up for it.",
    contact_title:  'Get in touch',
    contact_open:   'Open to opportunities',
    contact_open_d: 'Full-time, freelance, or interesting collabs. Helsinki-based, open to remote internationally.',
    field_name:     'Name',
    field_email:    'Email',
    field_subject:  'Subject',
    field_message:  'Message',
    field_send:     'Send Message',
    field_sending:  'Sending…',
    privacy:        'Your data stays private — no spam, ever.',
    success_title:  'Message sent!',
    success_text:   "Thanks for reaching out. I'll reply within 24 hours.",
    send_another:   'Send another message',

    // Footer
    footer_nav:     'Navigation',
    footer_connect: 'Connect',
    footer_dl_cv:   'Download CV',
    footer_built:   'Built with',
    footer_rights:  'All rights reserved.',
    lang_switch:    'العربية',
  },

  ar: {
    // Navbar
    nav_about:      'عني',
    nav_skills:     'المهارات',
    nav_experience: 'الخبرة',
    nav_projects:   'المشاريع',
    nav_ai:         'المساعد الذكي',
    nav_contact:    'التواصل',
    nav_resume:     'السيرة الذاتية',
    nav_resume_dl:  'تحميل السيرة الذاتية',

    // Hero
    hello:          'مرحباً، أنا',
    available:      'متاح للفرص',
    bio:            'مطور ويب متكامل بخبرة أكثر من 5 سنوات في بناء تطبيقات الويب في هلسنكي. أصنع منتجات سريعة وجميلة — من واجهات المستخدم الدقيقة إلى واجهات برمجة التطبيقات القوية.',
    location:       'هلسنكي، فنلندا',
    get_in_touch:   'تواصل معي',
    view_projects:  'عرض المشاريع',
    scroll:         'مرر',
    yrs_exp:        'سنوات خبرة',
    orgs:           'منظمة',

    // About
    about_label:    '// عني',
    about_heading:  'شغوف بـ',
    about_heading2: 'صناعة',
    about_heading3:'الويب',
    about_p1:       'أنا مطور ويب متكامل مقيم في هلسنكي بخبرة أكثر من 5 سنوات في بناء تطبيقات ويب يستمتع بها الناس حقاً. أعمل حالياً في Cyberday | Agendium Oy، حيث أبني واجهة أمامية لمنصة امتثال للأمن السيبراني يثق بها أكثر من 1,000 منظمة حول العالم.',
    about_p2:       'أزدهر في فرق Agile التعاونية وأؤمن بأن البرامج الرائعة تأتي من التعاطف مع المستخدمين والتفكير النظيف.',
    about_p3:       'خارج العمل، أستكشف Web3. في عام 2022 حصلت على المركز الثاني في Junction 2022 لبناء سوق باستخدام blockchain + Google Cloud Video Intelligence.',
    lets_work:      'لنعمل معاً',
    view_github:    'عرض GitHub',
    stat_years:     'سنوات الخبرة',
    stat_bugs:      'أخطاء تم إصلاحها',
    stat_orgs:      'منظمة على المنصة',
    stat_awards:    'جائزة هاكاثون',

    // Skills
    skills_label:   '// المهارات والتقنيات',
    skills_heading: 'مجموعتي',
    skills_heading2:'التقنية',
    skills_heading3:'',
    skills_sub:     'تقييمات ذاتية صادقة — وليست أرقام تسويقية.',

    // Experience
    exp_label:      '// الرحلة',
    exp_heading:    'الخبرة و',
    exp_heading2:   'التعليم',

    // Projects
    proj_label:     '// المشاريع',
    proj_heading:   'أشياء',
    proj_heading2:  'بنيتها',
    proj_sub:       'مشاريع هاكاثون وأعمال جانبية ومهنية.',
    proj_from_gh:   'من GitHub',
    proj_see_all:   'عرض جميع المستودعات',

    // AI Chat
    ai_label:       '// المساعد الذكي',
    ai_heading:     'اسألني',
    ai_heading2:    'أي شيء',
    ai_sub:         'ذكاء اصطناعي مُدرَّب على محفظتي — اسأل عن المهارات أو المشاريع أو التوفر.',
    ai_name:        'المساعد الذكي',
    ai_online:      'متصل',
    ai_placeholder: 'اسأل شيئاً عن الحسن…',
    ai_hint:        'مدعوم بالذكاء الاصطناعي · Enter للإرسال',
    ai_reset:       'محادثة جديدة',
    ai_init:        'مرحباً! 👋 أنا ذكاء اصطناعي مُدرَّب على محفظة الحسن. اسألني أي شيء عن مهاراته أو خبرته أو توفره.',
    ai_s1:          'ما هي مهاراتك الرئيسية؟',
    ai_s2:          'حدثني عن خبرتك',
    ai_s3:          'هل أنت متاح للعمل؟',
    ai_s4:          'ما المشاريع التي تفخر بها؟',
    ai_error:       'تعذر الوصول إلى الخادم الآن. راسل الحسن مباشرة على alhasanal_qaysi@yahoo.com.',

    // Contact
    contact_label:  '// التواصل',
    contact_heading:'لنتواصل',
    contact_heading2:'',
    contact_sub:    'لديك مشروع أو وظيفة أو تريد فقط الدردشة؟ أنا دائماً مستعد.',
    contact_title:  'تواصل معي',
    contact_open:   'متاح للفرص',
    contact_open_d: 'دوام كامل أو عمل حر أو تعاون مثير. مقيم في هلسنكي ومنفتح على العمل عن بُعد دولياً.',
    field_name:     'الاسم',
    field_email:    'البريد الإلكتروني',
    field_subject:  'الموضوع',
    field_message:  'الرسالة',
    field_send:     'إرسال الرسالة',
    field_sending:  'جاري الإرسال…',
    privacy:        'بياناتك خاصة — لا رسائل مزعجة أبداً.',
    success_title:  'تم إرسال الرسالة!',
    success_text:   'شكراً للتواصل. سأرد في غضون 24 ساعة.',
    send_another:   'إرسال رسالة أخرى',

    // Footer
    footer_nav:     'التنقل',
    footer_connect: 'تواصل',
    footer_dl_cv:   'تحميل السيرة',
    footer_built:   'صُنع بـ',
    footer_rights:  'جميع الحقوق محفوظة.',
    lang_switch:    'English',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
