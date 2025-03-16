import { useTranslation } from "react-i18next";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { useSocialMediaData } from "../hooks/useSocialMediaData";
import Sections from "../components/Sections";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useTheme } from "../components/context/ThemeContext";
import SocialCard from "../components/social-media-cards/SocialCard";
import { darkTheme } from "../types/theme";
import { useEffect, useState } from "react";
import ChartWrapper from "../components/charts/ChartWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
  }[];
}

const Container = styled.div`
  // max-width: 1200px;
  // margin: 20px auto;
  padding: 20px;
  font-family: "Poppins", sans-serif;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const ThemeToggleWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.color};
  margin-bottom: 20px;
  font-size: 2rem;
`;

const Username = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.subtext};
  margin-bottom: 30px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin: 0 auto;
`;

const Dashboard = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username") ?? "";
  const { themeObject } = useTheme();

  const { githubQuery } = useSocialMediaData({
    github: username,
  });

  const [lineChartData, setLineChartData] = useState<LineChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (githubQuery.data) {
      const labels = githubQuery.data.monthlyGrowth.map((item) => item.month);
      const data = githubQuery.data.monthlyGrowth.map((item) => item.followers);
      setLineChartData({
        labels,
        datasets: [
          {
            label: "Followers Growth",
            data,
            borderColor: "#4A90E2",
            fill: false,
          },
        ],
      });
    }
  }, [githubQuery.data]);

  if (!username) {
    return (
      <Container>
        <p>No username provided.</p>
      </Container>
    );
  }

  if (githubQuery.isLoading) {
    return (
      <Loader>
        <ClipLoader color="#6e8efb" size={50} />
      </Loader>
    );
  }

  if (githubQuery.isError || !githubQuery.data) {
    return (
      <Container>
        <p>{t("dashboard.error")}</p>
        <p>Failed to fetch data. Please try again later.</p>
      </Container>
    );
  }

  const data = {
    ...githubQuery.data,
    themeObject,
  };

  const chartData = {
    labels: ["GitHub Followers", "GitHub Repos"],
    datasets: [
      {
        label: "Social Media Stats",
        data: [
          githubQuery.data.user?.followers ?? 0,
          githubQuery.data.user?.public_repos ?? 0,
        ],
        backgroundColor: darkTheme
          ? ["#6e8efb", "#50E3C2"]
          : ["#4A90E2", "#50E3C2"],
        borderRadius: 5,
      },
    ],
  };

  const pieChartData = {
    labels: ["Likes", "Comments", "Shares"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#4A90E2", "#50E3C2", "#FF6384"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const followerGoal = 1000;
  const currentFollowers = githubQuery.data.user?.followers ?? 0;
  const progress = (currentFollowers / followerGoal) * 100;

  return (
    <Container theme={themeObject}>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>
      <Header>{t("dashboard.title")}</Header>
      <Username>
        {t("dashboard.username")} <strong>{username}</strong>
      </Username>

      <CardsContainer>
        <SocialCard platform="github" data={data} />
        {/* Add more SocialCard components for other platforms as needed */}
      </CardsContainer>

      <Sections title="Statistics Overview">
        <ChartContainer>
          <ChartWrapper type="bar" data={chartData} options={chartOptions} />
        </ChartContainer>
      </Sections>
      <Sections title="Followers Growth Over Time">
        <ChartContainer>
          <ChartWrapper
            type="line"
            data={lineChartData}
            options={chartOptions}
          />
        </ChartContainer>
      </Sections>

      <Sections title="Engagement Distribution">
        <ChartContainer>
          <ChartWrapper type="pie" data={pieChartData} options={chartOptions} />
        </ChartContainer>
      </Sections>

      <Sections title="Follower Goal Progress">
        <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
      </Sections>
    </Container>
  );
};

export default Dashboard;
