import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
// import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSocialMediaData } from "../hooks/useSocialMediaData";
// import Sections from "../components/Sections";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useTheme } from "../components/context/ThemeContext";
import SocialCard from "../components/social-media-cards/SocialCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
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

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username") ?? "";
  const { themeObject } = useTheme();

  const { githubQuery } = useSocialMediaData({
    github: username,
  });

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
        <p>Failed to fetch data. Please try again later.</p>
      </Container>
    );
  }

  const data = {
    ...githubQuery.data,
    themeObject,
  };

  // const chartData = {
  //   labels: ["GitHub Followers", "GitHub Repos"],
  //   datasets: [
  //     {
  //       label: "Social Media Stats",
  //       data: [
  //         githubQuery.data.user?.followers ?? 0,
  //         githubQuery.data.user?.public_repos ?? 0,
  //       ],
  //       backgroundColor: ["#4A90E2", "#50E3C2"],
  //       borderRadius: 5,
  //     },
  //   ],
  // };

  return (
    <Container theme={themeObject}>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>
      <Header>Social Media Dashboard</Header>
      <Username>
        Displaying statistics for: <strong>{username}</strong>
      </Username>

      <CardsContainer>
        <SocialCard platform="github" data={data} />
        {/* Add more SocialCard components for other platforms as needed */}
      </CardsContainer>

      {/* <Sections title="Statistics Overview">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                enabled: true,
              },
            },
          }}
          style={{ height: "10px", marginBottom: "20px" }}
        />
      </Sections> */}
    </Container>
  );
};

export default Dashboard;
