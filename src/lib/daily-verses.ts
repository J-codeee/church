// Daily Bible Verses - Rotates based on the day of the year
export interface DailyVerse {
  text: string;
  reference: string;
}

export const dailyVerses: DailyVerse[] = [
  {
    text: "For where two or three gather in my name, there am I with them.",
    reference: "Matthew 18:20"
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding.",
    reference: "Proverbs 3:5"
  },
  {
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13"
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9"
  },
  {
    text: "The Lord is my shepherd, I lack nothing.",
    reference: "Psalm 23:1"
  },
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16"
  },
  {
    text: "Cast all your anxiety on him because he cares for you.",
    reference: "1 Peter 5:7"
  },
  {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28"
  },
  {
    text: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
    reference: "Zephaniah 3:17"
  },
  {
    text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9"
  },
  {
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reference: "Isaiah 40:31"
  },
  {
    text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    reference: "Psalm 34:18"
  },
  {
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    reference: "Philippians 4:6"
  },
  {
    text: "Jesus replied, 'What is impossible with man is possible with God.'",
    reference: "Luke 18:27"
  },
  {
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28"
  },
  {
    text: "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.",
    reference: "Deuteronomy 31:8"
  },
  {
    text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
    reference: "1 Corinthians 13:4"
  },
  {
    text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    reference: "2 Corinthians 5:17"
  },
  {
    text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    reference: "John 14:27"
  },
  {
    text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.",
    reference: "Proverbs 18:10"
  },
  {
    text: "Delight yourself in the Lord, and he will give you the desires of your heart.",
    reference: "Psalm 37:4"
  },
  {
    text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
    reference: "Philippians 4:19"
  },
  {
    text: "Commit to the Lord whatever you do, and he will establish your plans.",
    reference: "Proverbs 16:3"
  },
  {
    text: "The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness; he will quiet you by his love; he will exult over you with loud singing.",
    reference: "Zephaniah 3:17"
  },
  {
    text: "He heals the brokenhearted and binds up their wounds.",
    reference: "Psalm 147:3"
  },
  {
    text: "The Lord is good, a refuge in times of trouble. He cares for those who trust in him.",
    reference: "Nahum 1:7"
  },
  {
    text: "In their hearts humans plan their course, but the Lord establishes their steps.",
    reference: "Proverbs 16:9"
  },
  {
    text: "The Lord will fight for you; you need only to be still.",
    reference: "Exodus 14:14"
  },
  {
    text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    reference: "Matthew 6:33"
  },
  {
    text: "Let us hold unswervingly to the hope we profess, for he who promised is faithful.",
    reference: "Hebrews 10:23"
  },
  {
    text: "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation, my stronghold.",
    reference: "Psalm 18:2"
  }
];

/**
 * Gets the verse for today based on the current date
 * Uses the day of the year to ensure consistent daily rotation
 * @returns The verse object for today
 */
export function getTodaysVerse(): DailyVerse {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Use modulo to cycle through verses if we have more days than verses
  const verseIndex = (dayOfYear - 1) % dailyVerses.length;

  return dailyVerses[verseIndex];
}

/**
 * Gets a preview of the next few days' verses (useful for testing)
 * @param days Number of days to preview (default: 7)
 * @returns Array of verse objects for the upcoming days
 */
export function getUpcomingVerses(days: number = 7): DailyVerse[] {
  const upcoming: DailyVerse[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const verseIndex = (dayOfYear - 1) % dailyVerses.length;

    upcoming.push(dailyVerses[verseIndex]);
  }

  return upcoming;
}