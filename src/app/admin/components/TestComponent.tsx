/**
 * Simple Test Component for Preview
 * This component is designed to work perfectly in the admin preview
 */

function MyComponent() {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <h1 className="text-4xl font-bold text-primary">
        Test Component
      </h1>
      <p className="text-lg text-muted">
        If you can see this, the preview is working!
      </p>
      <button className="px-6 py-3 bg-primary text-white rounded-lg font-bold transition hover:scale-105">
        Click Me
      </button>
    </div>
  );
}

export default MyComponent;
