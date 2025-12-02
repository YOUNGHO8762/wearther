import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function WeatherCardSkeleton() {
  return (
    <Card className="w-[350px] shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-4 w-15" />
          <Skeleton className="h-7.5 w-20" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col items-center gap-2">
          <div className="mb-2 size-16">
            <Skeleton className="h-full w-full rounded-full" />
          </div>
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-5.5 w-16" />
            <Skeleton className="h-5.5 w-20" />
            <Skeleton className="h-5.5 w-14" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
