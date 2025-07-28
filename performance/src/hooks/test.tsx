import { useCallback } from "react";

const Component = ({ prop1, prop2 }: any) => {

  const sumValue = useMemoprop1 + prop2; // Sum values
  

  return (
    <div>
      {prop1} {prop2}
      <h1>Test Component</h1>
      <p>This is a test component for performance measurement.</p>
    </div>
  );
}