import { Loading } from '@/components/Loading';

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading size="large" text="Loading content..." />
    </div>
  );
}
