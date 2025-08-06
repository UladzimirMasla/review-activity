import type Review from "models/review";
import type User from "models/user";
import { useMemo } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from "@mui/material/CardMedia";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

function UserCard({ user, userReviews }: { user: User, userReviews: Review[] }) {

  var reviewStateToReviews: Record<string, Review[]> = useMemo(() => {
    const stateToReviews: Record<string, Review[]> = {};
    userReviews.forEach(review => {
      if (!stateToReviews[review.state]) {
        stateToReviews[review.state] = [];
      }
      stateToReviews[review.state].push(review);
    });
    return stateToReviews;
  }, [userReviews]);
  
  return (
    <Card className="UserCard" variant="outlined">
      <CardContent>
        <h3>{user.login}</h3>
        <CardMedia
          component="img"
          image={user.avatar_url}
          style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: '50%' }}
          alt={`${user.login}'s avatar`}
        />
        {Object.entries(reviewStateToReviews).map(([state, reviews]) => (
          <Accordion key={state}>
            <AccordionSummary>
              <h4>{state} - {reviews.length}</h4>
            </AccordionSummary>
            <AccordionDetails>
              {reviews.map(review => (
                <div key={review.submitted_at.toString()}>
                  <a href={review.html_url}>{review.state}</a>
                  <span>{new Date(review.submitted_at).toLocaleDateString()}</span>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
}

export default UserCard;