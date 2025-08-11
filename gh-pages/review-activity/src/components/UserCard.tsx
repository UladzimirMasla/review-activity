import type Review from "models/review";
import type User from "models/user";
import { useMemo } from "react";
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

interface UserCardProps {
  user: User;
  userReviews: Review[];
  userPosition: number;
}

function UserCard({ user, userReviews, userPosition }: UserCardProps) {

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
        <CardHeader
          avatar={RenderAvatarContent(user, userPosition)}
          title={user.login}
        />
        <div>
          <h4>Review Count: {userReviews.length}</h4>
        </div>
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

function RenderAvatarContent(user: User, userPosition: number){
  if(userPosition < 4)
  {
    return (
      <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Avatar src={`./crowns/${userPosition}.svg`} />
          }
        >
          <Avatar
            alt={`${user.login}'s avatar`}
            src={user.avatar_url}
          />
      </Badge>
    );
  }

  return(
    <Avatar
        alt={`${user.login}'s avatar`}
        src={user.avatar_url}
    />
  );
}

export default UserCard;