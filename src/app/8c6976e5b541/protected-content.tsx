// Separate component for protected content
export function ProtectedContent({ routeName }: { routeName: string }) {
    const capitalizedRoute = routeName.charAt(0).toUpperCase() + routeName.slice(1);
  
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">
          Protected {capitalizedRoute} Page
        </h1>
        <p className="text-muted-foreground">
          This is a protected page only accessible with valid credentials.
        </p>
      </div>
    );
  }