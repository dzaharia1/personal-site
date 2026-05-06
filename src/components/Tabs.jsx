import React from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${(props) => (props.$active ? "#CDFF8C" : "#D7ECBC")};
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #cdff8c;
  }
`;

export default function Tabs({ categories, activeTab, onTabClick }) {
  return (
    <TabsContainer>
      {categories.map((category, i) => (
        <>
          <TabButton
            key={category}
            $active={activeTab === category}
            onClick={() => onTabClick(category)}
          >
            {category}
          </TabButton>
          {i < categories.length - 1 && <p style={{ margin: "0" }}>|</p>}
        </>
      ))}
    </TabsContainer>
  );
}
