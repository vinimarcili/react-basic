
import './Button.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

// Componente de botão reutilizável
export function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
}
