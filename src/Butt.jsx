import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './butt.css';

export default function Butt() {
  return (
    <div className="center">
      <Link to="/histogram">
        <Button className="butt">Submit</Button>
      </Link>
    </div>
  );
}
