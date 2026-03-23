import React, { useState } from "react";
import styled from "styled-components";
import { projects, allCategories } from "./data";
import Listing from "./components/Listing";
import Tabs from "./components/Tabs";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  margin: 0;
  padding: 40px 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 80px 48px;
    align-items: flex-start;
  }
`;

const HeaderSection = styled.div`
  width: 100%;
  margin-bottom: 48px;

  @media (min-width: 768px) {
    position: sticky;
    top: 80px;
    margin-bottom: 0;
    padding-right: 48px;
    max-width: 300px;
  }
`;

const MainHeading = styled.h1`
  color: #cdff8c;
  font-size: 2.2rem;
  font-weight: normal;
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.2;
`;

const SubHeading = styled.h2`
  color: #d7ecbc;
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.2;
`;

const ContentSection = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    padding-top: 10px; /* align with header */
  }
`;

const YearHeading = styled.h2`
  color: #cdff8c;
  font-size: 1.5rem;
  font-weight: normal;
  margin: 40px 0 24px 0;

  &:first-of-type {
    margin-top: 0;
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeTab));

  // Group by year
  const projectsByYear = filteredProjects.reduce((acc, project) => {
    if (!acc[project.year]) acc[project.year] = [];
    acc[project.year].push(project);
    return acc;
  }, {});

  // Sort years descending
  const sortedYears = Object.keys(projectsByYear).sort((a, b) => b - a);

  return (
    <AppContainer>
      <HeaderSection>
        <MainHeading>Dan Zaharia</MainHeading>
        <SubHeading>projects</SubHeading>
      </HeaderSection>
      <ContentSection>
        <Tabs
          categories={allCategories}
          activeTab={activeTab}
          onTabClick={setActiveTab}
        />

        {sortedYears.map((year) => (
          <div key={year}>
            <YearHeading>{year}</YearHeading>
            {projectsByYear[year].map((project, idx) => (
              <Listing key={idx} project={project} />
            ))}
          </div>
        ))}
      </ContentSection>
    </AppContainer>
  );
}

export default App;
