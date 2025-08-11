import { useState, useEffect } from 'react'
import type Review from 'models/review';
import UserList from 'components/UserList';
import ReviewChart from 'components/ReviewChart';
import './App.scss';

function App() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
    fetch('reviews.json')
      .then((response) => response.json())
      .then((data: Review[]) => setReviews(data));
    }, []);

  return (
    <div className='App'>
      <h1>Review results from past month</h1>
      <ReviewChart reviews={reviews}/>
      <div>
        <UserList reviews={reviews} />
      </div>
    </div>
  );
}

export default App;
