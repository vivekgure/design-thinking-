export type Language = 'en' | 'ta' | 'hi' | 'te';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' }
];

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Header
    'brand.tagline': 'Every Voice Matters. Together, We Create Change.',
    'nav.home': 'Home',
    'nav.community': 'Community Feed',
    'nav.report': 'Report Issue',
    'nav.registry': 'Referrals & Registry',
    'nav.explore': 'Explore & Map',
    'nav.organisations': 'Organisations',
    'nav.about': 'About',
    'nav.dashboard.citizen': 'My Dashboard',
    'nav.dashboard.gov': 'Gov Authority',
    'nav.dashboard.ngo': 'NGO Hub',
    'nav.dashboard.admin': 'Admin Panel',
    'nav.search': 'Search complaints, discussions, NGOs...',
    'nav.search.hint': 'Search... (Ctrl+K)',
    'nav.notifications': 'Notifications',
    'nav.markAllRead': 'Mark all read',
    'nav.noNotifications': 'No notifications for your profile yet.',
    'nav.signIn': 'Sign In / Switch Profile',

    // Prototype Banner
    'proto.badge': 'University Prototype',
    'proto.subtitle': 'Design Thinking & Civic Innovation • Simulated GCC Workflows',
    'proto.activePerspective': 'Active Perspective:',
    'proto.reset': 'Reset Sample Data',

    // Hero Section
    'hero.badge': 'Next-Gen Civic Engagement & Problem Solving',
    'hero.title1': 'Your Community.',
    'hero.title2': 'Your Voice.',
    'hero.title3': 'Your Change.',
    'hero.desc': 'Connect with your community, report local problems, share solutions, and work together with authorities and organisations to create meaningful change.',
    'hero.exploreBtn': 'Explore Community',
    'hero.reportBtn': 'Report an Issue',
    'hero.feat1': 'Reddit-Style Feeds',
    'hero.feat2': 'Confidential Reporting',
    'hero.feat3': 'NGO Co-Execution',

    // Stats
    'stats.title': 'Platform Impact Overview',
    'stats.subtitle': 'Demonstration platform statistics (simulated data for university project evaluation).',
    'stats.totalReported': 'Total Issues Reported',
    'stats.resolved': 'Issues Resolved',
    'stats.activeCommunities': 'Active Localities',
    'stats.verifiedOrgs': 'Verified NGOs',
    'stats.ongoingProjects': 'Collaborative Projects',

    // How it works
    'how.title': 'How VOXLY Drives Real Solutions',
    'how.subtitle': 'A continuous civic pipeline transforming individual frustrations into backed community solutions and verified outcomes.',
    'how.badge': 'Our 4-Step Methodology',
    'how.step1.title': '1. Report a Problem',
    'how.step1.desc': 'Citizens submit environmental or social issues with photographs, location pins, and choose between Public, Anonymous, or Private visibility.',
    'how.step2.title': '2. Discuss & Rally',
    'how.step2.desc': 'Public issues automatically generate Reddit-style community threads where neighbors comment, share evidence, and upvote to elevate urgency.',
    'how.step3.title': '3. Collaborate',
    'how.step3.desc': 'Verified NGOs discover community-backed grievances and submit structured collaboration proposals with solutions, budgets, and volunteer plans.',
    'how.step4.title': '4. Track & Resolve',
    'how.step4.desc': 'Transparent milestone updates, photographic resolution evidence, and final verification ensure real results with citizen reopening rights.',

    // Community Feed
    'feed.title': 'Community Discussion Feed',
    'feed.filter.latest': 'Latest',
    'feed.filter.trending': 'Trending',
    'feed.filter.mostSupported': 'Most Supported',
    'feed.filter.unresolved': 'Unresolved Issues',
    'feed.postPlaceholder': "Share an issue or start a discussion in your neighborhood...",
    'feed.postBtn': 'Publish Post',
    'feed.supportIssue': 'Support Issue',
    'feed.supported': 'Supported ✓',
    'feed.comments': 'Comments',
    'feed.save': 'Save',
    'feed.saved': 'Saved',
    'feed.share': 'Share',
    'feed.copied': 'Copied Link!',
    'feed.trackTimeline': 'Track Timeline',
    'feed.guidelines': 'Community Guidelines',

    // Report Issue
    'report.heading': 'Report an Issue in Your Neighborhood',
    'report.subheading': 'Submit local environmental, infrastructure, or public safety issues. Public complaints automatically create community discussion posts.',
    'report.dupWarning': 'An issue similar to yours has already been reported in this locality!',
    'report.supportExisting': 'Support Existing Complaint',
    'report.titleLabel': 'Complaint Title *',
    'report.descLabel': 'Detailed Description *',
    'report.catLabel': 'Issue Category *',
    'report.localityLabel': 'Locality / Sub-Municipality *',
    'report.addressLabel': 'Specific Street Address & Landmark *',
    'report.dateLabel': 'Date of Occurrence *',
    'report.deptLabel': 'Suggested Department',
    'report.photoLabel': 'Attach Photographs / Evidence (URL)',
    'report.visTitle': 'Complaint Visibility Level',
    'report.visPublic': 'Public',
    'report.visPublicDesc': 'Visible to everyone. Creates community feed post. Neighbors can vote & comment.',
    'report.visAnon': 'Anonymous Public',
    'report.visAnonDesc': 'Visible to everyone, but identity is hidden. Authorised officials can inspect.',
    'report.visPrivate': 'Private (Confidential)',
    'report.visPrivateDesc': 'Strictly confidential. Visible ONLY to complainant and authorized municipal officers.',
    'report.submitBtn': 'Register Official Complaint',

    // Complaint Tracker
    'track.title': 'Civic Complaint Status Tracker',
    'track.subtitle': 'Follow real-time municipal inspection, department dispatch, and NGO project resolution.',
    'track.lookup': 'Lookup Complaint ID',
    'track.printDocket': 'Print / Save as PDF Docket',
    'track.reopenBtn': 'Request Issue Reopening',
    'track.officialStatement': 'Official Authority Statement',
    'track.resolutionEvidence': 'Verified Resolution Evidence',

    // Statuses
    'status.submitted': 'Submitted',
    'status.underReview': 'Under Review',
    'status.verified': 'Verified',
    'status.assigned': 'Assigned',
    'status.inProgress': 'In Progress',
    'status.resolved': 'Resolved',
    'status.reopened': 'Reopened',

    // Roles
    'role.citizen': 'Citizen',
    'role.government': 'Government Authority',
    'role.ngo': 'NGO Lead',
    'role.admin': 'Platform Admin',

    // Footer & Common
    'footer.disclaimer': 'VOXLY is an academic prototype for Design Thinking and Civic Methodology evaluation.',
    'footer.privacy': 'Private complaints are strictly confidential between citizens and verified municipal authorities.',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.save': 'Save'
  },

  ta: {
    // தமிழ் (Tamil)
    'brand.tagline': 'ஒவ்வொரு குரலும் முக்கியம். ஒன்றிணைந்து, நாம் மாற்றத்தை உருவாக்குவோம்.',
    'nav.home': 'முகப்பு',
    'nav.community': 'சமூகப் பதிவு',
    'nav.report': 'புகார் பதிவு',
    'nav.registry': 'பரிந்துரைகள் & பதிவேடு',
    'nav.explore': 'வரைபடம் & ஆய்வுகள்',
    'nav.organisations': 'தன்னார்வ நிறுவனங்கள் (NGO)',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.dashboard.citizen': 'எனது கட்டுப்பாட்டகம்',
    'nav.dashboard.gov': 'அரசு நிர்வாகம்',
    'nav.dashboard.ngo': 'NGO மையம்',
    'nav.dashboard.admin': 'நிர்வாக மையம்',
    'nav.search': 'புகார்கள், விவாதங்கள், தன்னார்வக் குழுக்களைத் தேடுங்கள்...',
    'nav.search.hint': 'தேடல்... (Ctrl+K)',
    'nav.notifications': 'அறிவிப்புகள்',
    'nav.markAllRead': 'அனைத்தையும் வாசித்ததாகக் குறிக்கவும்',
    'nav.noNotifications': 'தங்களுக்கு இன்னும் எந்த அறிவிப்பும் வரவில்லை.',
    'nav.signIn': 'உள்நுழை / கணக்கை மாற்று',

    // Prototype Banner
    'proto.badge': 'பல்கலைக்கழக மாதிரி திட்டம்',
    'proto.subtitle': 'வடிவமைப்பு சிந்தனை & சமூகப் புதுமை • சென்னை மாநகராட்சி மாதிரி பணி ஓட்டம்',
    'proto.activePerspective': 'செயலில் உள்ள பார்வை:',
    'proto.reset': 'மாதிரி தரவை மீட்டமைக்க',

    // Hero Section
    'hero.badge': 'அடுத்த தலைமுறை சமூக ஈடுபாடு & மக்கள் தீர்வு',
    'hero.title1': 'உங்கள் சமூகம்.',
    'hero.title2': 'உங்கள் குரல்.',
    'hero.title3': 'உங்கள் மாற்றம்.',
    'hero.desc': 'உங்கள் ஊர் மக்களுடன் இணையுங்கள், உள்ளூர் பிரச்சனைகளைத் தெரிவியுங்கள், தீர்வுகளைப் பகிருங்கள் மற்றும் அரசு மற்றும் தன்னார்வ அமைப்புகளுடன் இணைந்து உண்மையான மாற்றத்தை ஏற்படுத்துங்கள்.',
    'hero.exploreBtn': 'சமூக விவாதங்களை காண்க',
    'hero.reportBtn': 'பிரச்சனையைப் புகாரளிக்கவும்',
    'hero.feat1': 'ரெடிட் பாணி விவாதங்கள்',
    'hero.feat2': 'ரகசியப் புகார் பாதுகாப்பு',
    'hero.feat3': 'தன்னார்வத் தொண்டு கூட்டுச் செயலாக்கம்',

    // Stats
    'stats.title': 'திட்டத்தின் தாக்கக் கண்ணோட்டம்',
    'stats.subtitle': 'செயல்விளக்க தள புள்ளிவிவரங்கள் (பல்கலைக்கழக மதிப்பீட்டிற்கான மாதிரி தரவு).',
    'stats.totalReported': 'பதிவு செய்யப்பட்ட புகார்கள்',
    'stats.resolved': 'தீர்க்கப்பட்ட பிரச்சனைகள்',
    'stats.activeCommunities': 'செயலில் உள்ள பகுதிகள்',
    'stats.verifiedOrgs': 'சரிபார்க்கப்பட்ட தன்னார்வ நிறுவனங்கள்',
    'stats.ongoingProjects': 'கூட்டுப் பணிகள்',

    // How it works
    'how.title': 'VOXLY எவ்வாறு செயல்படுகிறது',
    'how.subtitle': 'தனிநபரின் குறைகளைச் சமூக ஆதரவு பெற்ற தீர்வுகளாகவும் சரிபார்க்கப்பட்ட முடிவுகளாகவும் மாற்றும் தொடர் அமைப்பு.',
    'how.badge': 'எங்கள் 4-படி முறைமை',
    'how.step1.title': '1. புகாரைப் பதிவு செய்தல்',
    'how.step1.desc': 'சுற்றுச்சூழல் மற்றும் சமூகப் பிரச்சனைகளை புகைப்படங்கள், வரைபட இருப்பிடத்துடன் பொது, அநாமதேய அல்லது ரகசியத் தெரிவில் சமர்ப்பிக்கலாம்.',
    'how.step2.title': '2. கலந்துரையாடல் & ஆதரவு',
    'how.step2.desc': 'பொதுப் புகார்கள் உடனடியாகச் சமூக விவாதங்களாக மாறி, பொதுமக்கள் ஆதரவளித்து முக்கியத்துவத்தை உயர்த்துகின்றனர்.',
    'how.step3.title': '3. தன்னார்வ கூட்டு நடவடிக்கை',
    'how.step3.desc': 'சரிபார்க்கப்பட்ட தன்னார்வத் தொண்டு நிறுவனங்கள் தீர்வுகளை முன்மொழிந்து, நிதி மற்றும் தொண்டர்களுடன் அரசு அனுமதியைப் பெறுகின்றன.',
    'how.step4.title': '4. கண்காணித்தல் & தீர்வு',
    'how.step4.desc': 'தெளிவான முன்னேற்றப் புகைப்படங்கள் மற்றும் அரசு சரிபார்ப்பு மூலம் நிரந்தரத் தீர்வு உறுதி செய்யப்படுகிறது.',

    // Community Feed
    'feed.title': 'சமூகக் கலந்துரையாடல் ஓட்டம்',
    'feed.filter.latest': 'சமீபத்தியவை',
    'feed.filter.trending': 'பிரபலமானவை',
    'feed.filter.mostSupported': 'அதிக ஆதரவு பெற்றவை',
    'feed.filter.unresolved': 'தீர்க்கப்படாதவை',
    'feed.postPlaceholder': "உங்கள் பகுதியில் நடக்கும் நிகழ்வு அல்லது விவாதத்தைப் பகிருங்கள்...",
    'feed.postBtn': 'பதிவிடு',
    'feed.supportIssue': 'ஆதரவளி',
    'feed.supported': 'ஆதரவு அளிக்கப்பட்டது ✓',
    'feed.comments': 'கருத்துகள்',
    'feed.save': 'சேமிக்க',
    'feed.saved': 'சேமிக்கப்பட்டது',
    'feed.share': 'பகிரவும்',
    'feed.copied': 'இணைப்பு நகலெடுக்கப்பட்டது!',
    'feed.trackTimeline': 'நிலையைக் காண்க',
    'feed.guidelines': 'சமூக வழிகாட்டுதல்கள்',

    // Report Issue
    'report.heading': 'உங்கள் பகுதியில் உள்ள குறைகளைப் புகாரளிக்கவும்',
    'report.subheading': 'சுற்றுச்சூழல், சாலைகள், கழிவுநீர் அல்லது பொதுப் பாதுகாப்புப் பிரச்சனைகளைப் புகாரளிக்கவும். பொதுப் புகார்கள் உடனடியாக விவாதமாக மாறும்.',
    'report.dupWarning': 'இதேபோன்ற புகார் உங்கள் பகுதியில் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது!',
    'report.supportExisting': 'ஏற்கனவே உள்ள புகாருக்கு ஆதரவளிக்கவும்',
    'report.titleLabel': 'புகாரின் தலைப்பு *',
    'report.descLabel': 'விரிவான விளக்கம் *',
    'report.catLabel': 'பிரச்சனை வகை *',
    'report.localityLabel': 'பகுதி / மண்டலம் *',
    'report.addressLabel': 'சரியான தெரு முகவரி மற்றும் அடையாளம் *',
    'report.dateLabel': 'நிகழ்ந்த தேதி *',
    'report.deptLabel': 'பரிந்துரைக்கப்படும் அரசுத் துறை',
    'report.photoLabel': 'ஆதார புகைப்படங்கள் (இணைய முகவரி)',
    'report.visTitle': 'புகாரின் ரகசியத் தெரிவு',
    'report.visPublic': 'பொதுப் பார்வை (Public)',
    'report.visPublicDesc': 'அனைவருக்கும் தெரியும். சமூகப் பதிவாக மாறும். மக்கள் வாக்களிக்கவும் கருத்து தெரிவிக்கவும் முடியும்.',
    'report.visAnon': 'அநாமதேயம் (Anonymous Public)',
    'report.visAnonDesc': 'புகார் பொதுவில் தெரியும், ஆனால் உங்கள் பெயர் மறைக்கப்படும். அதிகாரிகள் சரிபார்க்கலாம்.',
    'report.visPrivate': 'முற்றிலும் ரகசியம் (Private)',
    'report.visPrivateDesc': 'மிகவும் ரகசியமானது. உங்களுக்கும் அரசு அதிகாரிகளுக்கும் மட்டுமே தெரியும். பொதுவில் அல்லது தன்னார்வலர்களுக்குத் தெரியாது.',
    'report.submitBtn': 'அதிகாரப்பூர்வ புகாரைப் பதிவு செய்க',

    // Complaint Tracker
    'track.title': 'புகார் நிலை கண்காணிப்புத் தளம்',
    'track.subtitle': 'மாநகராட்சி ஆய்வு, துறை ஒதுக்கீடு மற்றும் தன்னார்வ திட்ட முன்னேற்றத்தை நேரலையில் கண்காணிக்கவும்.',
    'track.lookup': 'புகார் எண்ணைத் தேடுங்கள்',
    'track.printDocket': 'PDF ஆவணமாக அச்சிடுங்கள்',
    'track.reopenBtn': 'மறுவிசாரணை கோரிக்கை',
    'track.officialStatement': 'அதிகாரப்பூர்வ அரசு அறிக்கை',
    'track.resolutionEvidence': 'சரிபார்க்கப்பட்ட தீர்வு ஆதாரங்கள்',

    // Statuses
    'status.submitted': 'சமர்ப்பிக்கப்பட்டது',
    'status.underReview': 'பரிசீலனையில்',
    'status.verified': 'சரிபார்க்கப்பட்டது',
    'status.assigned': 'துறைக்கு ஒதுக்கப்பட்டது',
    'status.inProgress': 'நடவடிக்கையில் உள்ளது',
    'status.resolved': 'தீர்வு காணப்பட்டது',
    'status.reopened': 'மீண்டும் திறக்கப்பட்டது',

    // Roles
    'role.citizen': 'குடிமகன்',
    'role.government': 'அரசு அதிகாரி',
    'role.ngo': 'தன்னார்வத் தலைவர் (NGO)',
    'role.admin': 'தள நிர்வாகி',

    // Footer & Common
    'footer.disclaimer': 'VOXLY என்பது வடிவமைப்பு சிந்தனை மற்றும் சமூகப் பிரச்சனைத் தீர்வுக்கான ஒரு கல்வி மாதிரி தளமாகும்.',
    'footer.privacy': 'தனிப்பட்ட புகார்கள் குடிமக்களுக்கும் மாநகராட்சி அதிகாரிகளுக்கும் இடையே முழுமையான ரகசியத்தன்மையுடன் பாதுகாக்கப்படுகின்றன.',
    'common.cancel': 'ரத்து செய்',
    'common.confirm': 'உறுதி செய்',
    'common.close': 'மூடு',
    'common.back': 'பின்செல்',
    'common.save': 'சேமி'
  },

  hi: {
    // हिंदी (Hindi)
    'brand.tagline': 'हर आवाज़ मायने रखती है। साथ मिलकर, हम बदलाव लाते हैं।',
    'nav.home': 'मुख्य पृष्ठ',
    'nav.community': 'सामुदायिक फ़ीड',
    'nav.report': 'शिकायत दर्ज करें',
    'nav.registry': 'रेफरल और रजिस्ट्री',
    'nav.explore': 'मानचित्र और खोज',
    'nav.organisations': 'एनजीओ संस्थाएं',
    'nav.about': 'हमारे बारे में',
    'nav.dashboard.citizen': 'मेरा डैशबोर्ड',
    'nav.dashboard.gov': 'सरकारी प्राधिकरण',
    'nav.dashboard.ngo': 'एनजीओ हब',
    'nav.dashboard.admin': 'व्यवस्थापक पैनल',
    'nav.search': 'शिकायतें, चर्चाएं, एनजीओ खोजें...',
    'nav.search.hint': 'खोजें... (Ctrl+K)',
    'nav.notifications': 'सूचनाएं',
    'nav.markAllRead': 'सभी को पढ़ा हुआ चिह्नित करें',
    'nav.noNotifications': 'आपके प्रोफ़ाइल के लिए अभी कोई सूचना नहीं है।',
    'nav.signIn': 'साइन इन / प्रोफ़ाइल बदलें',

    // Prototype Banner
    'proto.badge': 'विश्वविद्यालय प्रोटोटाइप',
    'proto.subtitle': 'डिज़ाइन थिंकिंग और नागरिक नवाचार • सिमुलेटेड नगर निगम कार्यप्रणाली',
    'proto.activePerspective': 'सक्रिय दृष्टिकोण:',
    'proto.reset': 'नमूना डेटा रीसेट करें',

    // Hero Section
    'hero.badge': 'अगली पीढ़ी का नागरिक जुड़ाव और समस्या समाधान',
    'hero.title1': 'आपका समुदाय।',
    'hero.title2': 'आपकी आवाज़।',
    'hero.title3': 'आपका बदलाव।',
    'hero.desc': 'अपने समुदाय से जुड़ें, स्थानीय समस्याओं की रिपोर्ट करें, समाधान साझा करें और वास्तविक बदलाव लाने के लिए अधिकारियों और संगठनों के साथ मिलकर काम करें।',
    'hero.exploreBtn': 'समुदाय से जुड़ें',
    'hero.reportBtn': 'शिकायत दर्ज करें',
    'hero.feat1': 'रेडिट-शैली सामुदायिक फ़ीड',
    'hero.feat2': 'गोपनीय शिकायत सुरक्षा',
    'hero.feat3': 'एनजीओ सहयोग निष्पादन',

    // Stats
    'stats.title': 'मंच का प्रभाव अवलोकन',
    'stats.subtitle': 'प्रदर्शन मंच सांख्यिकी (विश्वविद्यालय मूल्यांकन हेतु सिमुलेटेड डेटा)।',
    'stats.totalReported': 'कुल दर्ज शिकायतें',
    'stats.resolved': 'सुलझाई गई समस्याएं',
    'stats.activeCommunities': 'सक्रिय इलाके',
    'stats.verifiedOrgs': 'सत्यापित एनजीओ',
    'stats.ongoingProjects': 'सहयोगात्मक परियोजनाएं',

    // How it works
    'how.title': 'VOXLY कैसे काम करता है',
    'how.subtitle': 'एक निरंतर नागरिक प्रक्रिया जो व्यक्तिगत समस्याओं को समुदाय-समर्थित समाधानों और सत्यापित परिणामों में बदलती है।',
    'how.badge': 'हमारी 4-चरणीय कार्यप्रणाली',
    'how.step1.title': '1. समस्या दर्ज करें',
    'how.step1.desc': 'नागरिक फोटो, लोकेशन पिन के साथ समस्याएं दर्ज करते हैं और सार्वजनिक, गुमनाम या निजी दृश्यता चुनते हैं।',
    'how.step2.title': '2. चर्चा और समर्थन',
    'how.step2.desc': 'सार्वजनिक शिकायतें सीधे सामुदायिक पोस्ट बन जाती हैं जहां पड़ोसी समर्थन और वोट देकर गंभीरता बढ़ाते हैं।',
    'how.step3.title': '3. एनजीओ सहयोग',
    'how.step3.desc': 'सत्यापित एनजीओ समाधान, बजट और स्वयंसेवकों के साथ आधिकारिक सहयोग प्रस्ताव प्रस्तुत करते हैं।',
    'how.step4.title': '4. ट्रैक और समाधान',
    'how.step4.desc': 'पारदर्शी मील के पत्थर, फ़ोटो प्रमाण और सरकारी सत्यापन के साथ स्थायी समाधान सुनिश्चित होता है।',

    // Community Feed
    'feed.title': 'सामुदायिक चर्चा फ़ीड',
    'feed.filter.latest': 'नवीनतम',
    'feed.filter.trending': 'ट्रेंडिंग',
    'feed.filter.mostSupported': 'सर्वाधिक समर्थित',
    'feed.filter.unresolved': 'अनसुलझी समस्याएं',
    'feed.postPlaceholder': "अपने इलाके में किसी समस्या या चर्चा को साझा करें...",
    'feed.postBtn': 'पोस्ट प्रकाशित करें',
    'feed.supportIssue': 'मुद्दे का समर्थन करें',
    'feed.supported': 'समर्थित ✓',
    'feed.comments': 'टिप्पणियां',
    'feed.save': 'सहेजें',
    'feed.saved': 'सहेजा गया',
    'feed.share': 'साझा करें',
    'feed.copied': 'लिंक कॉपी हो गया!',
    'feed.trackTimeline': 'समयरेखा ट्रैक करें',
    'feed.guidelines': 'सामुदायिक दिशानिर्देश',

    // Report Issue
    'report.heading': 'अपने इलाके की समस्या दर्ज करें',
    'report.subheading': 'पर्यावरणीय, बुनियादी ढांचे या सार्वजनिक सुरक्षा से जुड़ी समस्याएं दर्ज करें। सार्वजनिक शिकायतें सीधे सामुदायिक चर्चा बन जाती हैं।',
    'report.dupWarning': 'आपके इलाके में इस प्रकार की समस्या पहले ही दर्ज की जा चुकी है!',
    'report.supportExisting': 'मौजूदा शिकायत का समर्थन करें',
    'report.titleLabel': 'शिकायत का शीर्षक *',
    'report.descLabel': 'विस्तृत विवरण *',
    'report.catLabel': 'समस्या श्रेणी *',
    'report.localityLabel': 'इलाका / उप-नगरपालिका *',
    'report.addressLabel': 'सटीक पता और लैंडमार्क *',
    'report.dateLabel': 'घटना की तारीख *',
    'report.deptLabel': 'सुझाया गया सरकारी विभाग',
    'report.photoLabel': 'प्रमाण फोटो जोड़ें (URL)',
    'report.visTitle': 'शिकायत की गोपनीयता स्तर',
    'report.visPublic': 'सार्वजनिक (Public)',
    'report.visPublicDesc': 'सभी को दिखाई देगा। सामुदायिक फ़ीड में पोस्ट बन जाएगा। नागरिक वोट और टिप्पणी कर सकते हैं।',
    'report.visAnon': 'गुमनाम सार्वजनिक (Anonymous Public)',
    'report.visAnonDesc': 'सार्वजनिक फ़ीड में दिखेगा परंतु आपका नाम गुप्त रहेगा। केवल अधिकृत अधिकारी विवरण देख सकते हैं।',
    'report.visPrivate': 'पूर्णतः गोपनीय (Private)',
    'report.visPrivateDesc': 'पूर्णतः निजी। केवल शिकायतकर्ता और नगर निगम अधिकारियों को दिखेगा। जनता या एनजीओ को नहीं।',
    'report.submitBtn': 'आधिकारिक शिकायत दर्ज करें',

    // Complaint Tracker
    'track.title': 'नागरिक शिकायत स्थिति ट्रैकर',
    'track.subtitle': 'वास्तविक समय में नगरपालिका निरीक्षण, विभाग आवंटन और एनजीओ परियोजना प्रगति को ट्रैक करें।',
    'track.lookup': 'शिकायत आईडी खोजें',
    'track.printDocket': 'PDF डॉकेट प्रिंट करें',
    'track.reopenBtn': 'मुद्दा दोबारा खोलने का अनुरोध',
    'track.officialStatement': 'आधिकारिक प्राधिकरण वक्तव्य',
    'track.resolutionEvidence': 'सत्यापित समाधान फोटो प्रमाण',

    // Statuses
    'status.submitted': 'जमा किया गया',
    'status.underReview': 'समीक्षाधीन',
    'status.verified': 'सत्यापित',
    'status.assigned': 'आवंटित',
    'status.inProgress': 'प्रगति पर है',
    'status.resolved': 'समाधान हो गया',
    'status.reopened': 'पुनः खोला गया',

    // Roles
    'role.citizen': 'नागरिक',
    'role.government': 'सरकारी अधिकारी',
    'role.ngo': 'एनजीओ प्रतिनिधि',
    'role.admin': 'मंच व्यवस्थापक',

    // Footer & Common
    'footer.disclaimer': 'VOXLY डिज़ाइन थिंकिंग और नागरिक समस्या समाधान मूल्यांकन के लिए एक शैक्षणिक प्रोटोटाइप है।',
    'footer.privacy': 'निजी शिकायतें नागरिकों और नगरपालिका अधिकारियों के बीच पूरी तरह से गोपनीय रखी जाती हैं।',
    'common.cancel': 'रद्द करें',
    'common.confirm': 'पुष्टि करें',
    'common.close': 'बंद करें',
    'common.back': 'पीछे',
    'common.save': 'सहेजें'
  },

  te: {
    // తెలుగు (Telugu)
    'brand.tagline': 'ప్రతి స్వరం ముఖ్యం. కలిసికట్టుగా, మనం మార్పును సృష్టిస్తాం.',
    'nav.home': 'హోమ్',
    'nav.community': 'కమ్యూనిటీ ఫీడ్',
    'nav.report': 'ఫిర్యాదు చేయండి',
    'nav.registry': 'రిఫరల్స్ & రిజిస్ట్రీ',
    'nav.explore': 'మ్యాప్ & అన్వేషణ',
    'nav.organisations': 'స్వచ్ఛంద సంస్థలు (NGOs)',
    'nav.about': 'మా గురించి',
    'nav.dashboard.citizen': 'నా డ్యాష్‌బోర్డ్',
    'nav.dashboard.gov': 'ప్రభుత్వ అధికారి',
    'nav.dashboard.ngo': 'NGO హబ్',
    'nav.dashboard.admin': 'అడ్మిన్ ప్యానెల్',
    'nav.search': 'ఫిర్యాదులు, చర్చలు, సంస్థలను శోధించండి...',
    'nav.search.hint': 'శోధన... (Ctrl+K)',
    'nav.notifications': 'నోటిఫికేషన్లు',
    'nav.markAllRead': 'అన్నీ చదివినట్లు గుర్తించు',
    'nav.noNotifications': 'మీ ప్రొఫైల్ కోసం ఇంకా నోటిఫికేషన్లు లేవు.',
    'nav.signIn': 'సైన్ ఇన్ / ఖాతా మార్చండి',

    // Prototype Banner
    'proto.badge': 'విశ్వవిద్యాలయ నమూనా ప్రాజెక్ట్',
    'proto.subtitle': 'డిజైన్ థింకింగ్ & ప్రజా సంక్షేమ ఆవిష్కరణ • సిమ్యులేటెడ్ మునిసిపల్ విధానం',
    'proto.activePerspective': 'ప్రస్తుత దృక్కోణం:',
    'proto.reset': 'నమూనా డేటా రీసెట్',

    // Hero Section
    'hero.badge': 'నెక్స్ట్-జెన్ పౌర భాగస్వామ్యం & సమస్య పరిష్కారం',
    'hero.title1': 'మీ కమ్యూనిటీ.',
    'hero.title2': 'మీ గళం.',
    'hero.title3': 'మీ మార్పు.',
    'hero.desc': 'మీ ప్రాంత ప్రజలతో కనెక్ట్ అవ్వండి, స్థానిక సమస్యలను నివేదించండి, పరిష్కారాలను పంచుకోండి మరియు అధికార యంత్రాంగం, స్వచ్ఛంద సంస్థలతో కలిసి నిజమైన మార్పును తీసుకురండి.',
    'hero.exploreBtn': 'కమ్యూనిటీని అన్వేషించండి',
    'hero.reportBtn': 'సమస్యను నివేదించండి',
    'hero.feat1': 'రెడ్డిట్ శైలి చర్చా వేదిక',
    'hero.feat2': 'గోప్యతా ఫిర్యాదు రక్షణ',
    'hero.feat3': 'NGO ఉమ్మడి కార్యాచరణ',

    // Stats
    'stats.title': 'ప్లాట్‌ఫారమ్ ప్రభావం అవలోకనం',
    'stats.subtitle': 'నమూనా ప్లాట్‌ఫారమ్ గణాంకాలు (విశ్వవిద్యాలయ మూల్యాంకనం కోసం నమూనా డేటా).',
    'stats.totalReported': 'మొత్తం నమోదైన ఫిర్యాదులు',
    'stats.resolved': 'పరిష్కరించబడిన సమస్యలు',
    'stats.activeCommunities': 'క్రియాశీల ప్రాంతాలు',
    'stats.verifiedOrgs': 'ధృవీకరించబడిన NGOs',
    'stats.ongoingProjects': 'ఉమ్మడి ప్రాజెక్టులు',

    // How it works
    'how.title': 'VOXLY ఎలా పనిచేస్తుంది',
    'how.subtitle': 'వ్యక్తిగత సమస్యలను సమాజ మద్దతు గల పరిష్కారాలుగా మరియు ధృవీకరించబడిన ఫలితాలుగా మార్చే నిరంతర ప్రక్రియ.',
    'how.badge': 'మా 4-దశల విధానం',
    'how.step1.title': '1. సమస్య నమోదు',
    'how.step1.desc': 'పౌరులు ఫోటోలు, మ్యాప్ లొకేషన్‌తో సమస్యలను సమర్పిస్తారు మరియు పబ్లిక్, అజ్ఞాత లేదా ప్రైవేట్ విధానాన్ని ఎంచుకుంటారు.',
    'how.step2.title': '2. చర్చ & మద్దతు',
    'how.step2.desc': 'పబ్లిక్ ఫిర్యాదులు స్వయంచాలకంగా కమ్యూనిటీ చర్చలుగా మారి, ప్రజలు ఓట్లతో మద్దతు తెలిపి తీవ్రతను పెంచుతారు.',
    'how.step3.title': '3. స్వచ్ఛంద సంస్థల సహకారం',
    'how.step3.desc': 'ధృవీకరించబడిన NGOs పరిష్కారాలు, బడ్జెట్ మరియు వాలంటీర్లతో ప్రభుత్వ ఆమోదం పొందుతాయి.',
    'how.step4.title': '4. ట్రాకింగ్ & పరిష్కారం',
    'how.step4.desc': 'స్పష్టమైన మైలురాళ్లు, ఫోటో సాక్ష్యాలు మరియు ప్రభుత్వ ధృవీకరణతో శాశ్వత పరిష్కారం లభిస్తుంది.',

    // Community Feed
    'feed.title': 'కమ్యూనిటీ చర్చా వేదిక',
    'feed.filter.latest': 'తాజావి',
    'feed.filter.trending': 'ట్రెండింగ్',
    'feed.filter.mostSupported': 'ఎక్కువ మద్దతు ఉన్నవి',
    'feed.filter.unresolved': 'పరిష్కారం కానివి',
    'feed.postPlaceholder': "మీ ప్రాంతంలోని సమస్య లేదా చర్చను పంచుకోండి...",
    'feed.postBtn': 'పోస్ట్ చేయండి',
    'feed.supportIssue': 'మద్దతు తెలపండి',
    'feed.supported': 'మద్దతు తెలిపారు ✓',
    'feed.comments': 'వ్యాఖ్యలు',
    'feed.save': 'సేవ్ చేయండి',
    'feed.saved': 'సేవ్ చేయబడింది',
    'feed.share': 'షేర్ చేయండి',
    'feed.copied': 'లింక్ కాపీ చేయబడింది!',
    'feed.trackTimeline': 'స్థితిని ట్రాక్ చేయండి',
    'feed.guidelines': 'కమ్యూనిటీ మార్గదర్శకాలు',

    // Report Issue
    'report.heading': 'మీ ప్రాంత సమస్యను నివేదించండి',
    'report.subheading': 'పర్యావరణ, రహదారులు, మురుగునీటి లేదా ప్రజా భద్రతా సమస్యలను నివేదించండి. పబ్లిక్ ఫిర్యాదులు స్వయంచాలకంగా చర్చగా మారతాయి.',
    'report.dupWarning': 'మీ ప్రాంతంలో ఇటువంటి సమస్య ఇప్పటికే నమోదై ఉంది!',
    'report.supportExisting': 'ఉన్న ఫిర్యాదుకు మద్దతు ఇవ్వండి',
    'report.titleLabel': 'ఫిర్యాదు శీర్షిక *',
    'report.descLabel': 'వివరణాత్మక వివరణ *',
    'report.catLabel': 'సమస్య విభాగం *',
    'report.localityLabel': 'ప్రాంతం / మునిసిపాలిటీ *',
    'report.addressLabel': 'ఖచ్చితమైన చిరునామా & ల్యాండ్‌మార్క్ *',
    'report.dateLabel': 'సమస్య ఏర్పడిన తేదీ *',
    'report.deptLabel': 'సూచించబడిన ప్రభుత్వ విభాగం',
    'report.photoLabel': 'సాక్ష్యపు ఫోటోలు (URL)',
    'report.visTitle': 'ఫిర్యాదు గోప్యతా స్థాయి',
    'report.visPublic': 'బహిరంగం (Public)',
    'report.visPublicDesc': 'అందరికీ కనిపిస్తుంది. కమ్యూనిటీ పోస్ట్‌గా మారుతుంది. ప్రజలు ఓటు మరియు కామెంట్ చేయవచ్చు.',
    'report.visAnon': 'అజ్ఞాతం (Anonymous Public)',
    'report.visAnonDesc': 'ఫీడ్‌లో కనిపిస్తుంది కానీ మీ పేరు దాచబడుతుంది. అధికారులు మాత్రమే తనిఖీ చేయగలరు.',
    'report.visPrivate': 'పూర్తి ప్రైవేట్ (Private)',
    'report.visPrivateDesc': 'పూర్తిగా గోప్యమైనది. ఫిర్యాదుదారునికి మరియు సంబంధిత మునిసిపల్ అధికారులకు మాత్రమే కనిపిస్తుంది.',
    'report.submitBtn': 'అధికారిక ఫిర్యాదును నమోదు చేయండి',

    // Complaint Tracker
    'track.title': 'పౌర ఫిర్యాదు స్థితి ట్రాకర్',
    'track.subtitle': 'మునిసిపల్ తనిఖీ, డిపార్ట్‌మెంట్ కేటాయింపు మరియు NGO ప్రాజెక్ట్ పురోగతిని నిజ సమయంలో ట్రాక్ చేయండి.',
    'track.lookup': 'ఫిర్యాదు ఐడీని శోధించండి',
    'track.printDocket': 'PDF డాకెట్‌గా ప్రింట్ చేయండి',
    'track.reopenBtn': 'పునఃపరిశీలన అభ్యర్థన',
    'track.officialStatement': 'అధికారిక ప్రకటన',
    'track.resolutionEvidence': 'ధృవీకరించబడిన పరిష్కార సాక్ష్యం',

    // Statuses
    'status.submitted': 'సమర్పించబడింది',
    'status.underReview': 'సమీక్షలో ఉంది',
    'status.verified': 'ధృవీకరించబడింది',
    'status.assigned': 'కేటాయించబడింది',
    'status.inProgress': 'పురోగతిలో ఉంది',
    'status.resolved': 'పరిష్కరించబడింది',
    'status.reopened': 'పునఃప్రారంభించబడింది',

    // Roles
    'role.citizen': 'పౌరుడు',
    'role.government': 'ప్రభుత్వ అధికారి',
    'role.ngo': 'NGO ప్రతినిధి',
    'role.admin': 'ప్లాట్‌ఫారమ్ అడ్మిన్',

    // Footer & Common
    'footer.disclaimer': 'VOXLY అనేది డిజైన్ థింకింగ్ మరియు పౌర సమస్య పరిష్కార మూల్యాంకనం కోసం రూపొందించబడిన విద్యా నమూనా.',
    'footer.privacy': 'ప్రైవేట్ ఫిర్యాదులు పౌరులు మరియు మునిసిపల్ అధికారుల మధ్య పూర్తి గోప్యతతో భద్రపరచబడతాయి.',
    'common.cancel': 'రద్దు చేయండి',
    'common.confirm': 'నిర్ధారించండి',
    'common.close': 'మూసివేయండి',
    'common.back': 'వెనుకకు',
    'common.save': 'సేవ్ చేయండి'
  }
};

