import * as React from 'react';
import './index.css';

interface IMarketProps {
  text: string;
}

export const Marker: React.SFC<IMarketProps> = ({ text }) => (
  <div className="b-marker">
    {text}
  </div>
);
