"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { fetchTags } from "~/config/tags";
import { apiUrl } from "~/services/api/api";

export const QuantyCircle = ({ userToken }: { userToken: string }) => {
  const queryClient = useQueryClient();
  const pathName = usePathname();
  const { data, isLoading, refetch } = useQuery({
    queryKey: [fetchTags.qrCodeQuantity],
    queryFn: async () => {
      try {
        const res = await fetch(`${apiUrl}/qr-codes/count`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        return res.json() as Promise<number>;
      } catch (e) {
        console.error(e);
        return 0;
      }
    },
    refetchInterval: 1000 * 45,
  });

  useEffect(() => {
    refetch();
  }, [pathName]);

  const quantity = data || 0;
  const capacity = 15;

  const percentage = (quantity / capacity) * 100;
  const offset = 100 - percentage;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className=" text-lg">Capacity</CardTitle>
        <CardDescription className="text-sm">
          Your have the free plan
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 py-0">
        {isLoading ? (
          <div className="flex u mx-auto  gap-2">
            <Skeleton className="rounded-full my-3 mx-auto w-[80px] h-[80px]" />
          </div>
        ) : (
          <div className="mx-auto aspect-square max-h-[100px]">
            {/* Circular Progress */}
            <div className="relative p-2">
              <svg
                className="size-full -rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-gray-200 dark:text-neutral-700"
                  strokeWidth="2"
                ></circle>
                {/* Progress Circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-blue-600 dark:text-blue-500"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset={`${offset}`}
                  strokeLinecap="round"
                ></circle>
              </svg>
              {/* Percentage Text */}
              <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-2xl font-bold text-blue-600 dark:text-blue-500">
                  {`${percentage.toFixed(0)}%`}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <Button className="w-full">Upgrade plan</Button>
      </CardFooter>
    </Card>
  );
};
