export type Review = {
  author: string;
  rating: number;
  text: string;
  when: string;
  photo?: string;
};

export type ReviewData = {
  rating: number;
  total: number;
  reviews: Review[];
  live: boolean;
  profileUrl: string;
};

// Real Google reviews for JS PRO GYM (manually synced from Google Maps).
// To auto-update these live, set GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID.
const SAMPLE: Review[] = [
  { author: "Jia Jun Foo", rating: 5, when: "a year ago", text: "The gym itself is spotless and well-maintained. The equipment is top-notch, modern, and there's a great variety to cater to all types of workouts — whether you're into weightlifting or cardio. I especially love the spacious layout, which never feels overcrowded, even during peak hours." },
  { author: "guna s", rating: 5, when: "a year ago", text: "Loved this gym! Super friendly vibe, lots of equipment to choose from, and everything is clean and well kept. Had an awesome workout here during my visit." },
  { author: "Keith Ong", rating: 5, when: "a year ago", text: "By far the best gym in Johor Bahru — no other gym can beat this. A huge range of equipment (RealLeader USA, Hoist, Nautilus, Cybex) and so big compared to others, with 2 full storeys of machines." },
  { author: "Chong Ko Win", rating: 5, when: "a year ago", text: "Very great gym and the environment is very clean. Everyone working there is super friendly. Highly recommended — especially for girls, because there's a dedicated ladies zone!" },
  { author: "Sean Ng", rating: 5, when: "a year ago", text: "Dropped by during my day trip to JB. Seriously impressive gym — it has all the best equipment you'd ever need. Honestly beats most gyms in KL in terms of equipment, comfort and cleanliness." },
  { author: "Christ Arthur", rating: 5, when: "a year ago", text: "The best gym in Johor Bahru. The staff is friendly, the environment is clean, and the equipment is more than sufficient. Recommend everyone to go! 🔥💪" },
];

function average(list: Review[]) {
  if (!list.length) return 0;
  return list.reduce((s, r) => s + r.rating, 0) / list.length;
}

/**
 * Returns Google reviews. If GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are set,
 * it pulls live reviews from the Google Places API (v1). Otherwise it falls
 * back to the curated sample above so the UI always looks complete.
 */
export async function getReviews(): Promise<ReviewData> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const profileUrl = placeId
    ? `https://search.google.com/local/reviews?placeid=${placeId}`
    : "https://search.google.com/local/reviews?placeid=ChIJCTYKjLZz2jERF0n0gOuzDc0";

  if (key && placeId) {
    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}` +
          `?fields=rating,userRatingCount,reviews&key=${key}`,
        { next: { revalidate: 3600 } }
      );
      if (res.ok) {
        const data = await res.json();
        const reviews: Review[] = (data.reviews ?? []).map((r: any) => ({
          author: r.authorAttribution?.displayName ?? "Google user",
          rating: r.rating ?? 5,
          text: r.text?.text ?? r.originalText?.text ?? "",
          when: r.relativePublishTimeDescription ?? "",
          photo: r.authorAttribution?.photoUri,
        }));
        if (reviews.length) {
          return {
            rating: data.rating ?? average(reviews),
            total: data.userRatingCount ?? reviews.length,
            reviews,
            live: true,
            profileUrl,
          };
        }
      }
    } catch {
      // fall through to sample
    }
  }

  return {
    rating: 4.9,
    total: 301,
    reviews: SAMPLE,
    live: false,
    profileUrl,
  };
}
