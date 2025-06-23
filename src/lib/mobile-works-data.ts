export interface MobileWork {
  id: string;
  name: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  screenshots: string[];
  rating: {
    average: number;
    count: number;
  };
  reviews: string[];
  price: string;
  releaseDate: string;
  totalCommits: number;
  builtWith: string;
  appStoreUrl: string;
}

export const mobileWorksData: MobileWork[] = [
  {
    id: 'daygram',
    name: 'Daygram',
    icon: '/images/works/daygram-icon.png',
    title: 'Daygram : My Secret Diary',
    subtitle: 'Simple journaling',
    description: 'Minimal diary app designed to capture thoughts and feelings with intuitive interface. Features password protection and cloud sync.',
    screenshots: [
      '/images/works/daygram-screenshot-1.jpg',
      '/images/works/daygram-screenshot-2.jpg',
      '/images/works/daygram-screenshot-3.jpg'
    ],
    rating: { average: 4.6, count: 17 },
    reviews: [
      'There is an elegance to DayGram. It allows me to have the timeline benefits of a journal without running into a plethora of interface distractions.',
      'This app is the best, it has a minimalist feel to it. Other apps were too busy and this one is so easy to write a quick note!'
    ],
    price: '$1.99',
    releaseDate: 'May 2015',
    totalCommits: 771,
    builtWith: 'Swift',
    appStoreUrl: 'https://apps.apple.com/us/app/daygram-my-secret-diary/id977949232'
  },
  {
    id: 'flink',
    name: 'Flink',
    icon: '/images/works/flink-icon.png',
    title: 'Flink : Daily Planner & Tasks',
    subtitle: 'Bullet Notes / MinimalList TODO',
    description: 'Ultimate tool for schedule management and to-do list organization with sleek design and e-ink style interface.',
    screenshots: [
      '/images/works/flink-screenshot-1.jpg',
      '/images/works/flink-screenshot-2.jpg',
      '/images/works/flink-screenshot-3.jpg'
    ],
    rating: { average: 3.5, count: 20 },
    reviews: [
      'Full marks, I wish it can have an iPad version and the ability to use Dropbox or iCloud. Otherwise, loving it.'
    ],
    price: '$1.99',
    releaseDate: 'May 2017',
    totalCommits: 224,
    builtWith: 'Swift',
    appStoreUrl: 'https://apps.apple.com/us/app/flink-daily-planner-tasks/id1234490078'
  },
  {
    id: 'otter',
    name: 'Otter',
    icon: '/images/works/otter-icon.png',
    title: 'Otter - Diet Diary',
    subtitle: 'Easy Calorie Counter',
    description: 'Simple food diary app to track daily calories with minimalist design and easy food entry system.',
    screenshots: [
      '/images/works/otter-screenshot-1.jpg',
      '/images/works/otter-screenshot-2.jpg',
      '/images/works/otter-screenshot-3.jpg'
    ],
    rating: { average: 4.4, count: 50 },
    reviews: [
      'The app is clean, simple and I like the general idea. The UI is just perfect.',
      'Great app. Just what I needed. I was looking for a plain and easy-to-use app!'
    ],
    price: '$0.99',
    releaseDate: 'Feb 2021',
    totalCommits: 277,
    builtWith: 'Flutter',
    appStoreUrl: 'https://apps.apple.com/us/app/otter-diet-diary/id1551273147'
  },
  {
    id: 'tables',
    name: 'Tables',
    icon: '/images/works/tables-icon.png',
    title: 'Tables - Grid Planner',
    subtitle: 'Designed for Simple Scheduling',
    description: 'Grid-based planner app for organizing life with customizable layouts and visual task management.',
    screenshots: [
      '/images/works/tables-screenshot-1.jpg',
      '/images/works/tables-screenshot-2.jpg',
      '/images/works/tables-screenshot-3.jpg'
    ],
    rating: { average: 4.0, count: 8 },
    reviews: [
      'Wonderful! This app has a nice minimal UI and fits my needs. Looking forward to future updates!',
      'Awesome. Finally a simple planner. Worth the money. Sometimes simple is best.'
    ],
    price: '$0.99',
    releaseDate: 'Oct 2020',
    totalCommits: 174,
    builtWith: 'Flutter',
    appStoreUrl: 'https://apps.apple.com/us/app/tables-grid-planner/id1537292587'
  },
  {
    id: 'fews',
    name: 'Fews',
    icon: '/images/works/fews-icon.png',
    title: 'fews - Habit Starter',
    subtitle: 'Well begun is half done',
    description: 'Build habits with minimal friction. Simple habit tracker focused on getting started rather than complex systems.',
    screenshots: [
      '/images/works/fews-screenshot-1.jpg',
      '/images/works/fews-screenshot-2.jpg',
      '/images/works/fews-screenshot-3.jpg'
    ],
    rating: { average: 3.8, count: 12 },
    reviews: [
      'This is a really good app. It helps me see what I should be doing in a clear list!',
      'Simple and clean habit tracker'
    ],
    price: '$0.99',
    releaseDate: 'Sep 2019',
    totalCommits: 130,
    builtWith: 'Flutter',
    appStoreUrl: 'https://apps.apple.com/us/app/fews-habit-starter/id1480926210'
  },
  {
    id: 'kipkam',
    name: 'Kipkam',
    icon: '/images/works/kipkam-icon.png',
    title: 'kipkam',
    subtitle: 'Take a deep breath',
    description: 'Breathing exercise app with visual guides and calming animations for stress relief and mindfulness.',
    screenshots: [
      '/images/works/kipkam-screenshot-1.jpg',
      '/images/works/kipkam-screenshot-2.jpg',
      '/images/works/kipkam-screenshot-3.jpg'
    ],
    rating: { average: 4.9, count: 54 },
    reviews: [
      'This app is so pretty and useful. I highly recommend it. Hope to see new updates!',
      'Great app - simple to use with a clean layout. Works as it should.'
    ],
    price: '$0.99',
    releaseDate: 'May 2020',
    totalCommits: 30,
    builtWith: 'Flutter',
    appStoreUrl: 'https://apps.apple.com/us/app/kipkam/id1408618623'
  },
  {
    id: 'campnight',
    name: 'CampNight',
    icon: '/images/works/campnight-icon.png',
    title: 'CampNight - Sleep Sounds',
    subtitle: 'Nature sounds for better sleep',
    description: 'Natural sleep sounds app featuring campfire, rain, and nature ambience for better sleep quality.',
    screenshots: [
      '/images/works/campnight-screenshot-1.jpg',
      '/images/works/campnight-screenshot-2.jpg',
      '/images/works/campnight-screenshot-3.jpg'
    ],
    rating: { average: 4.5, count: 17 },
    reviews: [
      'Simple, minimalist, and effective. I appreciate that the rain actually sounds like rain!',
      'Nice, simple interface. Would love to see a timer function added.'
    ],
    price: 'Free',
    releaseDate: 'May 2020',
    totalCommits: 70,
    builtWith: 'Flutter',
    appStoreUrl: 'https://apps.apple.com/us/app/campnight-sleep-sounds/id1511933716'
  },
  {
    id: 'haru',
    name: 'Haru',
    icon: '/images/works/haru-icon.png',
    title: 'Haru : Daily calendar & Memo',
    subtitle: 'Have a good day!',
    description: 'Elegant calendar app with memo features combining scheduling and note-taking in minimalist design.',
    screenshots: [
      '/images/works/haru-screenshot-1.jpg',
      '/images/works/haru-screenshot-2.jpg',
      '/images/works/haru-screenshot-3.jpg'
    ],
    rating: { average: 5.0, count: 3 },
    reviews: [
      'Seamless iCloud sync and very clean app! Cheers to the developer!',
      'Beautiful calendar app!'
    ],
    price: '$0.99',
    releaseDate: 'May 2023',
    totalCommits: 116,
    builtWith: 'Flutter',
    appStoreUrl: 'https://apps.apple.com/us/app/haru-daily-calendar-memo/id6448709147'
  },
  {
    id: 'tabatach',
    name: 'Tabatach',
    icon: '/images/works/tabatach-icon.png',
    title: 'Tabatach',
    subtitle: 'Interval workout timer',
    description: 'Tabata interval training timer with customizable workouts and visual progress tracking for fitness enthusiasts.',
    screenshots: [
      '/images/works/tabatach-screenshot-1.jpg',
      '/images/works/tabatach-screenshot-2.jpg',
      '/images/works/tabatach-screenshot-3.jpg'
    ],
    rating: { average: 4.3, count: 32 },
    reviews: [
      'Great timer for working out. It does its job simply, nothing more and nothing less.',
      'Has all the options I need in a Tabata timer without being overly complicated.'
    ],
    price: '$0.99',
    releaseDate: 'April 2015',
    totalCommits: 236,
    builtWith: 'Obj-C',
    appStoreUrl: 'https://apps.apple.com/us/app/tabatach/id982434641'
  }
];
