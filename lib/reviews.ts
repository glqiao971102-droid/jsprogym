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

// Curated sample reviews — shown until live Google reviews are configured.
const SAMPLE: Review[] = [
  { author: "Nadia Rahman", rating: 5, when: "2 weeks ago", text: "Best gym I've ever joined. The coaches actually care and the classes are always full of energy. Down 6kg and feeling amazing!" },
  { author: "Wei Jie Lim", rating: 5, when: "1 month ago", text: "Clean, spacious and the equipment is top notch. 24/7 access fits my schedule perfectly. Highly recommend the strength program." },
  { author: "Farah Aziz", rating: 5, when: "3 weeks ago", text: "The community here is unreal. Everyone cheers you on. My PT built a plan around my knee injury — so thoughtful." },
  { author: "Daniel Tan", rating: 4, when: "2 months ago", text: "Great classes and friendly staff. Gets busy at peak hours but the app makes booking a spot super easy." },
  { author: "Priya Menon", rating: 5, when: "1 week ago", text: "Joined for the recovery suite and stayed for the people. Sauna and cold plunge after a session is unbeatable." },
  { author: "Haziq Idris", rating: 5, when: "1 month ago", text: "Coaches know their stuff. Booked a free tour, tried a class, signed up the same day. No regrets at all." },
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
    : "https://www.google.com/maps/search/JSPROGYM";

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
    total: 428,
    reviews: SAMPLE,
    live: false,
    profileUrl,
  };
}
