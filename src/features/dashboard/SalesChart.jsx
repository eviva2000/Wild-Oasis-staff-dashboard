import styled from "styled-components";
import PropTypes from "prop-types";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useWindowSize } from "../../hooks/useWindowSize";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const { width } = useWindowSize();

  const isMobile = width <= 768;
  const isSmallMobile = width <= 480;

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  // Custom tooltip for mobile
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: colors.background,
            padding: isSmallMobile ? '0.6rem 1rem' : '0.8rem 1.2rem',
            border: '1px solid var(--color-grey-200)',
            borderRadius: 'var(--border-radius-sm)',
            boxShadow: 'var(--shadow-md)',
            fontSize: isSmallMobile ? '1.1rem' : '1.2rem',
          }}
        >
          <p style={{ margin: '0 0 0.4rem 0', fontWeight: 600, color: colors.text }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '0.2rem 0', color: entry.color }}>
              {entry.name}: ${entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
        color: PropTypes.string,
      })
    ),
    label: PropTypes.string,
  };

  // Responsive chart height
  const chartHeight = isSmallMobile ? 200 : isMobile ? 250 : 300;

  return (
    <StyledSalesChart>
      <Heading as={isMobile ? "h3" : "h2"}>
        Sales from {format(allDates.at(0), isMobile ? "MMM dd" : "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), isMobile ? "MMM dd" : "MMM dd yyyy")}{" "}
      </Heading>

      <ResponsiveContainer height={chartHeight} width="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis
            dataKey="label"
            tick={{ 
              fill: colors.text, 
              fontSize: isSmallMobile ? 10 : isMobile ? 11 : 12 
            }}
            tickLine={{ stroke: colors.text }}
            interval={isMobile ? 'preserveStartEnd' : 0}
          />
          <YAxis
            unit="$"
            tick={{ 
              fill: colors.text, 
              fontSize: isSmallMobile ? 10 : isMobile ? 11 : 12 
            }}
            tickLine={{ stroke: colors.text }}
            width={isSmallMobile ? 40 : isMobile ? 50 : 60}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={isMobile ? 1.5 : 2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={isMobile ? 1.5 : 2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

SalesChart.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      created_at: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
      extrasPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  numDays: PropTypes.number.isRequired,
};

export default SalesChart;
