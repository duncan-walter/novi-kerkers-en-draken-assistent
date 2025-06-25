// Styling
import './Toaster.css';

// Components
import Toast from "../Toast/Toast.jsx";

function Toaster({toasts, removeToast}) {
  return (
    toasts.length > 0 && (
      <div className="toaster">
        {/* Reversing is needed since the toasts come from the top of the screen. */}
        {[...toasts].reverse().map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    )
  );
}

export default Toaster;