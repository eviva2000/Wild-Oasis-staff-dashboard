import BookingRow from "./BookingRow";
import BookingCard from "./BookingCard";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import styled from "styled-components";

import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    .desktop-table {
      display: none;
    }
  }

  @media (min-width: 769px) {
    .mobile-cards {
      display: none;
    }
  }
`;

const MobileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const ResponsiveTable = styled(Table)`
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <ResponsiveContainer>
        {/* Desktop Table View */}
        <div className="desktop-table">
          <ResponsiveTable columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
            <Table.Header>
              <div>Cabin</div>
              <div>Guest</div>
              <div>Dates</div>
              <div>Status</div>
              <div>Amount</div>
              <div></div>
            </Table.Header>

            <Table.Body
              data={bookings}
              render={(booking) => (
                <BookingRow key={booking.id} booking={booking} />
              )}
            />

            <Table.Footer>
              <Pagination count={count} />
            </Table.Footer>
          </ResponsiveTable>
        </div>

        {/* Mobile Card View */}
        <div className="mobile-cards">
          <MobileCardContainer>
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </MobileCardContainer>
          <Pagination count={count} />
        </div>
      </ResponsiveContainer>
    </Menus>
  );
}

export default BookingTable;