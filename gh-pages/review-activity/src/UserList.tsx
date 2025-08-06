import type Review from "models/review";
import UserCard from './UserCard';
import { useMemo } from "react";

function UserList({ reviews }: { reviews: Review[] }) {

  const userToReviews = useMemo(() => {
    // This will map users to their reviews
    const userReviewsMap: Record<string, Review[]> = {};
    reviews.forEach(review => {
      const userLogin = review.user.login;
      if (!userReviewsMap[userLogin]) {
        userReviewsMap[userLogin] = [];
      }
      userReviewsMap[userLogin].push(review);
    });
    return userReviewsMap;
  }, [reviews]);

  return (
    <div className="UserList">
      {Object.entries(userToReviews).map(([userLogin, userReviews]) => (
        <UserCard key={userLogin} user={userReviews[0]?.user} userReviews={userReviews} />
      ))}
    </div>
  );
}

export default UserList;