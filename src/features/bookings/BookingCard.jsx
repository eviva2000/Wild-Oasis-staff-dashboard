import styled from "styled-components";
import PropTypes from "prop-types";
import { format, isToday } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Button from "../../ui/Button";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  box-shadow: var(--shadow-sm);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.2rem;
`;

const CabinName = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  font-family: "Sono";
  margin: 0;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-500);
    flex-shrink: 0;
  }
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;

  & span:first-child {
    font-weight: 500;
    color: var(--color-grey-700);
  }

  & span:last-child {
    font-size: 1.1rem;
    color: var(--color-grey-500);
  }
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-grey-200);
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--color-grey-700);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1.2rem;
  flex-wrap: wrap;
`;

function BookingCard({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Card>
      <CardHeader>
        <CabinName>{cabinName}</CabinName>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
      </CardHeader>

      <CardContent>
        <InfoRow>
          <HiOutlineUser />
          <InfoContent>
            <span>{guestName}</span>
            <span>{email}</span>
          </InfoContent>
        </InfoRow>

        <InfoRow>
          <HiOutlineCalendarDays />
          <InfoContent>
            <span>
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}{" "}
              → {numNights} night{numNights !== 1 ? "s" : ""}
            </span>
            <span>
              {format(new Date(startDate), "MMM dd")} –{" "}
              {format(new Date(endDate), "MMM dd, yyyy")}
            </span>
          </InfoContent>
        </InfoRow>

        <StatusRow>
          <Tag type={statusToTagName[status]}>
            {status?.replace("-", " ") || "Unknown"}
          </Tag>
          <Amount>{formatCurrency(totalPrice)}</Amount>
        </StatusRow>

        <ActionButtons>
          <Button
            size="small"
            variation="secondary"
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            <HiEye /> Details
          </Button>

          {status === "unconfirmed" && (
            <Button
              size="small"
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              <HiArrowDownOnSquare /> Check in
            </Button>
          )}

          {status === "checked-in" && (
            <Button
              size="small"
              onClick={() => checkout(bookingId)}
              disabled={isCheckingOut}
            >
              <HiArrowUpOnSquare /> Check out
            </Button>
          )}
        </ActionButtons>
      </CardContent>

      <Modal>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Card>
  );
}

BookingCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in", "checked-out"])
      .isRequired,
    guests: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    cabins: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookingCard;