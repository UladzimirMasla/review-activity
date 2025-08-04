export async function loadReviews() {
  const response = await fetch('reviews.json');
  if (!response.ok) {
    throw new Error("HTTP error " + response.status);
  }

  return response.json();
}

export function groupReviewsByUser(reviews) {
    return reviews.reduce((acc, review) => {
          const { login } = review.user;
          if (!acc[login]) {
            acc[login] = [];
          }
          acc[login].push(review);
          return acc;
        }, {});
    }