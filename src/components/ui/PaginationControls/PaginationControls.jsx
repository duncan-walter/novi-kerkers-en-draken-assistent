// Styling
import './PaginationControls.css';

// Icons
import {CaretLeftIcon, CaretRightIcon} from '@phosphor-icons/react';

// Components
import Button from "../Button/Button.jsx";

function PaginationControls({currentPage, pageSize, resultCount, onNext, onPrevious}) {
  const disableNext = currentPage * pageSize >= resultCount;
  const disablePrevious = currentPage <= 1;

  return (
    <div className="pagination-controls">
      <Button
        icon={CaretLeftIcon}
        onClick={onPrevious}
        disabled={disablePrevious}
      />

      <span className="pagination-controls__current-page">
        {currentPage}/{Math.ceil(resultCount / pageSize)}
      </span>

      <Button
        icon={CaretRightIcon}
        onClick={onNext}
        disabled={disableNext}
      />
    </div>
  );
}

export default PaginationControls;