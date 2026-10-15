import { useNavigate } from 'react-router-dom';

// Circular "home" image button that returns to the splash screen.
export default function HomeButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      style={{ width: 'clamp(55px, 8vw, 85px)', height: 'clamp(55px, 8vw, 85px)', backgroundColor: 'rgba(247, 179, 124, 0.9)' }}
      className="rounded-full overflow-hidden shadow-lg hover:scale-110 transition-transform flex items-center justify-center no-touch"
    >
      <img
        src="/images/5d2d4d14b_home-btn.png"
        alt="בית"
        className="w-[70%] h-[70%] object-cover"
        draggable={false}
      />
    </button>
  );
}