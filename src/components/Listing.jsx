import React from "react";
import styled from "styled-components";

const ListingContainer = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.div`
  color: #cdff8c;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const Description = styled.div`
  color: #d7ecbc;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export default function Listing({ project }) {
  return (
    <ListingContainer>
      <Title>{project.title}</Title>
      <Description>{project.description}</Description>
    </ListingContainer>
  );
}
