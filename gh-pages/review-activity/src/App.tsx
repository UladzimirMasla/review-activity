import ReviewChart from './ReviewChart';
import { useState, useEffect } from 'react'
import type Review from './models/review';
import ReviewsList from './UserList';
import './App.css';

function App() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
    fetch('reviews.json')
      .then((response) => response.json())
      .then((data: Review[]) => setReviews(data));
    }, []);

  return (
    <div className='App'>
      <h1>Reviews</h1>
      <ReviewChart reviews={reviews} className='ReviewChart'/>
      <br/>
      <div>
        <ReviewsList reviews={reviews} />
      </div>
    </div>
  );
}

export default App;
