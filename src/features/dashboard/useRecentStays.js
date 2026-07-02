import { useQuery } from "@tanstack/react-query";
import { addDays, startOfDay, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
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

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate, endDate),
    queryKey: ["stays", `last-${last ?? numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );


  return { isLoading, stays, confirmedStays, numDays, isUpcoming };
}