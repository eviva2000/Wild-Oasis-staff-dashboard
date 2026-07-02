import { useQuery } from "@tanstack/react-query";
import { addDays, startOfDay, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const last = searchParams.get("last");
  const isUpcoming = last === "upcoming";

  let numDays = 7;
  if (isUpcoming) numDays = 90;
  else if (last) numDays = Number(last);

  const today = startOfDay(new Date());
  const queryDate = (isUpcoming ? today : subDays(today, numDays)).toISOString();
  const endDate = (isUpcoming
    ? addDays(today, numDays)
    : new Date()
  ).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate, endDate),
    queryKey: ["bookings", `last-${last ?? numDays}`],
  });

  return { isLoading, bookings };
}