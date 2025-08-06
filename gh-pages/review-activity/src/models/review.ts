import type User from './user';

export default interface Review {
  submitted_at: Date;
  state: string;
  html_url: string;
  user: User;
}