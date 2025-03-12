// import { useSocialMediaData } from "../hooks/useSocialMediaData";
// import { useSearchParams } from "react-router-dom";
// import styled from "styled-components";
// import { ClipLoader } from "react-spinners";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Container = styled.div`
//   max-width: 1000px;
//   margin: 20px auto;
//   padding: 20px;
//   font-family: "Poppins", sans-serif;
//   background: #fff;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   text-align: center;
// `;

// const Header = styled.h2`
//   color: #333;
//   margin-bottom: 10px;
// `;

// const Username = styled.p`
//   font-size: 1.2rem;
//   color: #555;
// `;

// const Section = styled.div`
//   background: #f3f4f6;
//   padding: 20px;
//   border-radius: 8px;
//   margin: 20px 0;
//   text-align: left;
// `;

// const SectionTitle = styled.h3`
//   color: #222;
//   margin-bottom: 10px;
// `;

// const Stat = styled.p`
//   font-size: 1.1rem;
//   color: #444;
// `;

// const Loader = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 50vh;
// `;

// const Dashboard = () => {
//   const [searchParams] = useSearchParams();
//   const username = searchParams.get("username") ?? "";

//   const { githubQuery, instagramQuery } = useSocialMediaData({
//     github: username,
//     instagram: username,
//   });

//   if (!username) {
//     return (
//       <Container>
//         <p>No username provided.</p>
//       </Container>
//     );
//   }

//   if (githubQuery.isLoading || instagramQuery.isLoading) {
//     return (
//       <Loader>
//         <ClipLoader color="#6e8efb" size={50} />
//       </Loader>
//     );
//   }

//   if (githubQuery.isError || instagramQuery.isError) {
//     return (
//       <Container>
//         <p>Failed to fetch data. Please try again later.</p>
//       </Container>
//     );
//   }

//   const chartData = {
//     labels: ["GitHub Followers", "GitHub Repos", "Instagram Followers"],
//     datasets: [
//       {
//         label: "Social Media Stats",
//         data: [
//           githubQuery.data?.followers ?? 0,
//           githubQuery.data?.public_repos ?? 0,
//           instagramQuery.data?.followers_count ?? 0,
//         ],
//         backgroundColor: ["#4A90E2", "#50E3C2", "#FF6384"],
//         borderRadius: 5,
//       },
//     ],
//   };

//   return (
//     <Container>
//       <Header>Social Media Dashboard</Header>
//       <Username>
//         Displaying statistics for: <strong>{username}</strong>
//       </Username>

//       <Section>
//         <SectionTitle>GitHub</SectionTitle>
//         <Stat>Repositories: {githubQuery.data?.public_repos ?? "--"}</Stat>
//         <Stat>Followers: {githubQuery.data?.followers ?? "--"}</Stat>
//       </Section>

//       <Section>
//         <SectionTitle>Instagram</SectionTitle>
//         <Stat>Followers: {instagramQuery.data?.followers_count ?? "--"}</Stat>
//         <Stat>
//           Engagement Rate: {instagramQuery.data?.engagement_rate ?? "--"}%
//         </Stat>
//       </Section>

//       <Section>
//         <SectionTitle>Statistics Overview</SectionTitle>
//         <Bar
//           data={chartData}
//           options={{
//             responsive: true,
//             maintainAspectRatio: false,
//           }}
//           style={{ height: "400px" }}
//         />
//       </Section>
//     </Container>
//   );
// };

// export default Dashboard;

import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { Bar } from "react-chartjs-2";
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
import GitHubStats from "../components/GitHubStats";
import Sections from "../components/Sections";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useTheme } from "../components/context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  //   max-width: 1200px;
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

  const chartData = {
    labels: ["GitHub Followers", "GitHub Repos"],
    datasets: [
      {
        label: "Social Media Stats",
        data: [
          githubQuery.data.user?.followers ?? 0,
          githubQuery.data.user?.public_repos ?? 0,
        ],
        backgroundColor: ["#4A90E2", "#50E3C2"],
        borderRadius: 5,
      },
    ],
  };

  return (
    <Container theme={themeObject}>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>
      <Header>Social Media Dashboard</Header>
      <Username>
        Displaying statistics for: <strong>{username}</strong>
      </Username>

      <GitHubStats data={githubQuery.data} />

      <Sections title="Statistics Overview">
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
          style={{ height: "300px", marginBottom: "20px" }}
        />
      </Sections>
    </Container>
  );
};

export default Dashboard;
