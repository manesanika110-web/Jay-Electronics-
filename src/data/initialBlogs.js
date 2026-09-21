export const initialBlogs = [
  {
    id: 'blog-1',
    author: 'JAY ELECTRONICS Engineering Team',
    authorRole: 'System Integration Division',
    avatar: '/images/cctv_hero_bg.jpg',
    date: 'September 12, 2026',
    title: 'Modernizing Municipal Security: The Evolution of 4K IP CCTV & Fiber Networks in City Surveillance',
    category: 'City Surveillance',
    image: '/images/city_surveillance.jpg',
    caption: `City surveillance has transformed from basic analog monitoring into intelligent, high-speed optical fiber networks capable of processing thousands of high-definition video feeds concurrently. 

At JAY ELECTRONICS PVT LTD, our execution of major municipal projects—such as the Panvel, Hinjewadi, and Kolhapur City Surveillance Projects—demonstrates how high-capacity IP CCTV camera grids integrate directly with central police command centers.

Key elements of modern city surveillance include:
1. Low-latency optical fiber backbone cabling engineered for uninterrupted 24/7 uptime.
2. AI-driven video analytics including ANPR (Automatic Number Plate Recognition) for automated traffic monitoring.
3. Centralized Control Room Video Walls displaying real-time situational feeds across critical intersections.

Reliable infrastructure requires precise engineering, robust surge protection, and redundant failover storage systems to ensure continuous municipal protection.`,
    likes: 42,
    comments: [
      { id: 'c1', user: 'Tech Specialist', text: 'Impression city surveillance network layout! Fiber splicing quality is top notch.' },
      { id: 'c2', user: 'Municipal Officer', text: 'Essential insights for urban security planners.' }
    ],
    status: 'Published'
  },
  {
    id: 'blog-2',
    author: 'JAY ELECTRONICS Telecom Team',
    authorRole: 'Networking & Telecommunication Lead',
    avatar: '/images/telecom_av.jpg',
    date: 'August 28, 2026',
    title: 'Why Enterprise IP-PBX & Structured Cat6A Cabling Are Essential for Modern Corporate Offices',
    category: 'Networking',
    image: '/images/network_rack.jpg',
    caption: `In today's fast-paced corporate environment, communication bottlenecks can cripple business agility. Upgrading to a modern IP-PBX (Internet Protocol Private Branch Exchange) combined with structured Cat6A optical fiber cabling provides unprecedented bandwidth and flexibility.

Our telecom team recently upgraded executive government offices including Collector Office Sangli and Kolhapur with multi-extension voice platforms and structured telecom infrastructure.

Key benefits of structured telecommunication:
- Unified voice, video, and data communication over a single standardized cable network.
- Scalable extension switching with zero call drop rate.
- Reduced maintenance overhead and seamless integration with corporate AV boardrooms.

Whether building new premises or retrofitting legacy infrastructure, structured cabling guarantees network longevity for decades to come.`,
    likes: 38,
    comments: [
      { id: 'c3', user: 'IT Infrastructure Director', text: 'Great writeup on Cat6A vs fiber backbone integration.' }
    ],
    status: 'Published'
  },
  {
    id: 'blog-3',
    author: 'JAY ELECTRONICS Security Engineering',
    authorRole: 'Special Projects Group',
    avatar: '/images/cctv_hero_bg.jpg',
    date: 'July 15, 2026',
    title: 'Perimeter Security in Maximum Protection Facilities: Lessons from Sangli Jail Project',
    category: 'Security',
    image: '/images/cctv_hero_bg.jpg',
    caption: `High-security facilities present unique engineering challenges. Thermal imaging cameras, tamper-proof housings, and isolated server racks are mandatory to guarantee 100% operational vigilance.

When executing the Sangli Jail Surveillance Project, JAY ELECTRONICS engineered a closed-loop IP CCTV architecture with infrared night illumination and localized UPS backup power arrays.

Technical highlights for high-security environments:
- Zero blind-spot camera placement with overlapping field of view.
- VMS (Video Management System) failover storage clusters.
- Encrypted data links preventing external network interception.

Proper planning and robust hardware selection ensure seamless security compliance under all environmental conditions.`,
    likes: 56,
    comments: [],
    status: 'Published'
  }
];
