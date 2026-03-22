import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  label: string;
}

export default function WeatherCardSkeleton({ label }: Props) {
  return (
    <Card
      className="w-full max-w-[350px] shadow-xl"
      role="status"
      aria-busy="true"
      aria-label={label}
    >
      <CardHeader aria-hidden="true">
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-4 w-15" />
          <Skeleton className="h-7.5 w-20" />
        </CardTitle>
      </CardHeader>
      <CardContent aria-hidden="true">
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
