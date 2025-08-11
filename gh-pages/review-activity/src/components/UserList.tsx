import type Review from "models/review";
import UserCard from 'components/UserCard';
import { useMemo } from "react";
import './UserList.scss';

function UserList({ reviews }: { reviews: Review[] }) {

  const userToReviews = useMemo(() => {
    const userReviewsMap: Record<string, Review[]> = {};
    reviews.forEach(review => {
      const userLogin = review.user.login;
      if (!userReviewsMap[userLogin]) {
        userReviewsMap[userLogin] = [];
      }
      userReviewsMap[userLogin].push(review);
    });

    let userPosition = 1;
    return Object.entries(userReviewsMap).map(([_, userReviews]) => {
      return { user: userReviews[0]?.user, reviews: userReviews, reviewsCount: userReviews.length };
    })
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .map(({ user, reviews, reviewsCount }) => ({
      user,
      reviews,
      reviewsCount,
      userPosition: userPosition++
    }));
  }, [reviews]);

  return (
    <div className="UserList">
      {userToReviews.map(({ user, reviews, userPosition }) => (
        <UserCard key={user.login} user={user} userReviews={reviews} userPosition={userPosition} />
      ))}
    </div>
  );
}

export default UserList;