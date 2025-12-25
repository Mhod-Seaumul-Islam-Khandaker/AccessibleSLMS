// accessibility test page
// pages/index.tsx
import FontSizeAdjuster from "../components/textSize";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <FontSizeAdjuster />
    </main>
  );
}
