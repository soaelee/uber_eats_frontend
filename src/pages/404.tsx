import React from 'react';
import { Helmet } from 'react-helmet-async';
import Linking from '../components/link';
import { Title } from '../components/title';

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <Helmet>
      <title>Not found | Suber Eats</title>
    </Helmet>
    <Title message="Page Not Found" />
    <h4 className="font-medium text-base mb-5">The Page you're looking for does not exist or has moved</h4>
    <Linking to="/" message="Go back home &rarr;" />
  </div>
);
