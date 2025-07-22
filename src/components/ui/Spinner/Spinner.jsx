// Styling
import './Spinner.css';

// SVGs
import SpinnerSVG from '@assets/animations/spinner.svg?react';

function Spinner({size = 'small', variant = 'primary'}) {
  return (
    <SpinnerSVG className={`spinner spinner--${size} spinner--${variant}`}/>
  )
}

export default Spinner;