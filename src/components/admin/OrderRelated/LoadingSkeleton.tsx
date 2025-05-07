// components/ui/loading-skeleton.tsx
export default function LoadingSkeleton() {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-gray-100 rounded animate-pulse" />
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      </div>
    )
  }