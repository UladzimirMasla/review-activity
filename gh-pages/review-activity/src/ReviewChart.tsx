import type Review from "models/review";
import { useMemo, useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function ReviewChart({ reviews, className }: { reviews: Review[]; className?: string }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeoutId: number | undefined;
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setWidth(window.innerWidth);
      }, 150); // 150ms debounce
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

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
      <div className={className}>
          <BarChart
          width={width - 25}
          height={600}
          data={formattedReviews}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { name, reviewsAmount } = payload[0].payload;
                return (
                  <div>
                    <strong>{name}</strong>
                    <div>Reviews: {reviewsAmount}</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="reviewsAmount" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </div>
    );
}

export default ReviewChart;