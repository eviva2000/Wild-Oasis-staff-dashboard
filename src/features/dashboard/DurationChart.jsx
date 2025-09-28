import styled from "styled-components";
import PropTypes from "prop-types";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { useWindowSize } from "../../hooks/useWindowSize";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
  }

  @media (max-width: 768px) {
    padding: 1.6rem 2rem;
    
    & > *:first-child {
      margin-bottom: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1.2rem 1.6rem;
  }
`;

const MobileChartContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
  }
`;

const MobileLegend = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    width: 100%;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const LegendColor = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    width: 1rem;
    height: 1rem;
  }
`;

const LegendText = styled.span`
  color: var(--color-grey-600);
  font-weight: 500;
`;

const LegendValue = styled.span`
  color: var(--color-grey-700);
  font-weight: 600;
  margin-left: auto;
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);
  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const { width } = useWindowSize();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  const isMobile = width <= 768;
  const isSmallMobile = width <= 480;

  // Custom tooltip for better mobile experience
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div
          style={{
            backgroundColor: 'var(--color-grey-0)',
            padding: isSmallMobile ? '0.6rem 1rem' : '0.8rem 1.2rem',
            border: '1px solid var(--color-grey-200)',
            borderRadius: 'var(--border-radius-sm)',
            boxShadow: 'var(--shadow-md)',
            fontSize: isSmallMobile ? '1.1rem' : '1.2rem',
          }}
        >
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-grey-700)' }}>
            {data.name}: {data.value} stay{data.value !== 1 ? 's' : ''}
          </p>
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
      })
    ),
  };

  // Responsive chart dimensions
  const chartHeight = isSmallMobile ? 200 : isMobile ? 220 : 240;
  const innerRadius = isSmallMobile ? 45 : isMobile ? 60 : 85;
  const outerRadius = isSmallMobile ? 75 : isMobile ? 90 : 110;

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <MobileChartContainer>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <Pie
              data={data}
              nameKey="duration"
              dataKey="value"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              cx="50%"
              cy="50%"
              paddingAngle={isMobile ? 2 : 3}
            >
              {data.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {/* Show default legend only on desktop */}
            {!isMobile && (
              <Legend
                verticalAlign="middle"
                align="right"
                width="30%"
                layout="vertical"
                iconSize={15}
                iconType="circle"
              />
            )}
          </PieChart>
        </ResponsiveContainer>

        {/* Custom mobile legend */}
        {isMobile && (
          <MobileLegend>
            {data.map((entry) => (
              <LegendItem key={entry.duration}>
                <LegendColor color={entry.color} />
                <LegendText>{entry.duration}</LegendText>
                <LegendValue>{entry.value}</LegendValue>
              </LegendItem>
            ))}
          </MobileLegend>
        )}
      </MobileChartContainer>
    </ChartBox>
  );
}

DurationChart.propTypes = {
  confirmedStays: PropTypes.arrayOf(
    PropTypes.shape({
      numNights: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DurationChart;
