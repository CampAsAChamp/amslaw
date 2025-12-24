import type { YelpReview } from "@/types/data"

/**
 * Static Yelp reviews data
 * These are actual reviews from our Yelp business page
 *
 * To update: When you get a new review on Yelp, simply add it to this array
 * Source: https://www.yelp.com/biz/anna-m-schneider-torrance
 */
export const yelpReviews: YelpReview[] = [
  {
    id: "mary-lyn-m-2023",
    url: "https://www.yelp.com/biz/anna-m-schneider-torrance?hrid=xF6EvQIlscSsmxjF5D3mzw&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)",
    text: "After my mother passed away, suddenly there were new complications to my estate plan and I was referred by a friend to Anna to start from the ground up. I was overwhelmed, but she made it easy, walking me through the steps, until it was magically completed! Being able to determine exactly how I wanted it and her advice about what was possible were not only helpful, but I slept better knowing exactly how things would be done. She is a very gentle spirit, but super smart - it's great combination for an estate planning attorney!",
    rating: 5,
    time_created: "2023-03-23T00:00:00Z",
    user: {
      id: "mary-lyn-m",
      profile_url: "https://www.yelp.com/user_details?userid=mary-lyn-m",
      image_url: null,
      name: "Mary Lyn M.",
    },
  },
  {
    id: "debby-b-2022",
    url: "https://www.yelp.com/biz/anna-m-schneider-torrance?hrid=_xs9wv0HyGAsjAVWkLP6Ag&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)",
    text: "There are not words to express my gratitude for the help I received from Anna Schneider. Anna is not only incredibly knowledgeable, she is kind, compassionate and caring. Anna took the time to explain everything to my 82 year old Mom and was very patient with her repeated questions. She will always be my hero and the only call I will ever make for trusts and wills and their administration.",
    rating: 5,
    time_created: "2022-08-02T00:00:00Z",
    user: {
      id: "debby-b",
      profile_url: "https://www.yelp.com/user_details?userid=debby-b",
      image_url: null,
      name: "Debby B.",
    },
  },
]
