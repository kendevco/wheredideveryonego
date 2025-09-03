// Where Did Everyone Go? - Book Content Data
// Converted from TypeScript for easier import in seeding scripts

export const bookData = [
  {
    text: `
      <h4>Something's Wrong With The World</h4>
      <p class="text-black-50 mb-0">People everywhere can sense it—something just isn't right. Some feel a growing dread, as if something terrible is about to unfold. And then there are the Christians, who keep saying, "Jesus is coming soon." The Bible lays out a <b>prophetic blueprint explaining our present chaos and the storm still ahead</b>. The Rapture will come without warning—like a thief in the night—leaving the world stunned and reeling. A charismatic figure will rise in the aftermath, offering answers that sound like hope. But every word he speaks will be a deception straight from the pit of hell.</p>
      <p class="text-black-50 mb-0">This book is a humble attempt to answer the biggest question people will have at that moment: "Where did everyone go?" When millions vanish in an instant, homes will be looted, fear will spread, and the search for truth will begin. Books like this are meant to be found in that hour of desperation—<b>to point to the only truth that matters</b>.</p>
      
      <h4>Don't Ignore the Turmoil Around You</h4>
      <p class="text-black-50 mb-0">Everything's changing so fast, and <b>it's been a brutal, nonstop grind</b>. First, the COVID-19 pandemic, then the riots, and now our world is on the verge of being overthrown from within and without—all while the World Economic Forum is implementing its plan for world domination.</p>
      <p class="text-black-50 mb-0">Has the world gone crazy? <b>The issues we face today are unprecedented</b>: pipeline sabotage, drought, food and water shortages, fuel crises, moral decay, artificial intelligence disruptions, the dollar's decline, government corruption, concentration camps, geopolitical tensions in Ukraine and Taiwan, child trafficking, abortion, mass shootings, constant surveillance, a boiling crisis in the Middle East, global instability, looming nuclear war, the risk of an electromagnetic pulse (EMP) shutting down everything—the list goes on. Catastrophic natural disasters and increasing satanic influences only add to the chaos.</p>
      <p class="text-black-50 mb-0">Plus, we are now hit with <b>extreme division in our country</b>. Organized chaos is erupting across the nation and the world. Some advocate for violent revolution, <b>disregarding life and liberty</b>. With calls to defund the police, murder rates in cities have doubled and tripled, crime rates are soaring, gangs are multiplying, and cities are burning.</p>
    `,
    image: "page_001.png"
  },
  // Note: This is just the first page as an example
  // The full content would include all 26 pages from the original bookdata.ts
  // For now, we'll use the text file fallback for the complete content
]

// Helper function to get total pages
export const getTotalPages = () => 26

// Helper function to get page content
export const getPageContent = (pageNumber) => {
  if (pageNumber < 1 || pageNumber > bookData.length) {
    return null
  }
  return bookData[pageNumber - 1]
}
