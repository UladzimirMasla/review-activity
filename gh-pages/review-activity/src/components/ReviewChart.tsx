import './ReviewChart.scss';
import type Review from "models/review";
import { useMemo } from "react";
import { BarChart } from '@mui/x-charts/BarChart';

function ReviewChart({ reviews }: { reviews: Review[]; }) {

const formattedReviews = useMemo(() => {
  const personToReviewAmountDone: Record<string, number> = {};
  reviews.forEach((review) => {
    const person = review.user.login;
    if (!personToReviewAmountDone[person]) {
      personToReviewAmountDone[person] = 0;
    }
    personToReviewAmountDone[person]++;
  });

    return Object.entries(personToReviewAmountDone)
    .map(([name, reviewsAmount]) => ({ name, reviewsAmount }))
    .sort((a, b) => a.reviewsAmount - b.reviewsAmount);
  }, [reviews]);

  return (
      <div className='review-chart'>
        <BarChart
          xAxis={[
            {
              id: 'reviewersNames',
              data: formattedReviews.map((review) => review.name),
            },
          ]}
          series={[
            {
              data: formattedReviews.map((review) => review.reviewsAmount),
            },
          ]}
          height={300}
        />
      </div>
    );
}

export default ReviewChart;