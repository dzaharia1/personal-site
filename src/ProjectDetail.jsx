import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { projects } from "./data";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 80px 48px;
    align-items: flex-start;
  }
`;

const HeaderSection = styled.div`
  flex: 1;
  margin-bottom: 48px;

  @media (min-width: 768px) {
    position: sticky;
    top: 80px;
    margin-bottom: 0;
    padding-right: 48px;
    max-width: 300px;
  }
`;

const HomeLink = styled(Link)`
  color: #cdff8c;
  text-decoration: none;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  margin-bottom: 24px;

  &:hover {
    text-decoration: underline;
  }
`;

const MainHeading = styled.h1`
  color: #cdff8c;
  font-size: 2.2rem;
  font-weight: normal;
  margin: 0 0 8px 0;
  white-space: pre-wrap;
  line-height: 1.2;
`;

const MetaData = styled.div`
  color: #d7ecbc;
  font-size: 1rem;
`;

const ContentSection = styled.div`
  flex: 2;
  @media (min-width: 768px) {
    padding-top: 52px; /* aligns description somewhat with header depending on spacing */
  }
`;

const OpenLink = styled.a`
  color: #cdff8c;
  text-decoration: none;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  margin-bottom: 24px;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.p`
  color: #d7ecbc;
  font-size: 1rem;
  margin: 0 0 32px 0;
  line-height: 1.4;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 10000;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ProjectVideo = styled.video`
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 10000;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(19, 21, 10, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  padding: 24px;
  touch-action: none;
  user-select: none;
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  touch-action: none;
  user-select: none;
`;

const LightboxImg = styled.img`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  transform: translate(${props => props.$pan.x}px, ${props => props.$pan.y}px) scale(${props => props.$zoom});
  transition: ${props => props.$isDragging ? 'none' : 'transform 0.1s ease-out'};
  cursor: ${props => props.$zoom > 1 ? (props.$isDragging ? "grabbing" : "grab") : "default"};
`;

const LightboxVid = styled.video`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  transform: translate(${props => props.$pan.x}px, ${props => props.$pan.y}px) scale(${props => props.$zoom});
  transition: ${props => props.$isDragging ? 'none' : 'transform 0.1s ease-out'};
  cursor: ${props => props.$zoom > 1 ? (props.$isDragging ? "grabbing" : "grab") : "default"};
`;

const CloseMessage = styled.div`
  color: #cdff8c;
  margin-top: 16px;
  font-size: 1rem;
  cursor: pointer;
  z-index: 20001;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ZoomSliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  color: #cdff8c;
  font-size: 0.9rem;
  z-index: 20001;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ZoomSlider = styled.input`
  accent-color: #cdff8c;
`;

const NotFound = styled.div`
  color: #cdff8c;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 100px;
`;

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleOpenLightbox = (src) => {
    setLightboxSrc(src);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleCloseLightbox = () => {
    setLightboxSrc(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.1, 5));
    } else {
      setZoom((prev) => {
        const newZoom = Math.max(prev - 0.1, 1);
        if (newZoom === 1) setPan({ x: 0, y: 0 });
        return newZoom;
      });
    }
  };

  const handlePointerDown = (e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  if (!project) {
    return (
      <Container>
        <NotFound>project not found.</NotFound>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderSection>
        <HomeLink to="/">← home</HomeLink>
        <MainHeading>{project.title}</MainHeading>
        <MetaData>
          {project.year} | {project.categories.join(" | ")}
        </MetaData>
      </HeaderSection>
      <ContentSection>
        {project.href && <OpenLink href={project.href} target="_blank">play with the app</OpenLink>}
        <Description>{project.description}</Description>
        {project.images && project.images.length > 0 && (
          <ImageGrid>
            {project.images.map((src, idx) => {
              const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
              if (isVideo) {
                return (
                  <ProjectVideo
                    key={idx}
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onClick={() => handleOpenLightbox(src)}
                  />
                );
              }
              return (
                <ProjectImage
                  key={idx}
                  src={src}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  onClick={() => handleOpenLightbox(src)}
                />
              );
            })}
          </ImageGrid>
        )}
      </ContentSection>

      {lightboxSrc && (
        <LightboxOverlay onClick={handleCloseLightbox} onWheel={handleWheel}>
          <LightboxContent 
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {(lightboxSrc.endsWith(".mp4") || lightboxSrc.endsWith(".webm")) ? (
              <LightboxVid src={lightboxSrc} autoPlay loop muted playsInline controls={zoom === 1} $zoom={zoom} $pan={pan} $isDragging={isDragging} />
            ) : (
              <LightboxImg src={lightboxSrc} alt="Enlarged view" $zoom={zoom} $pan={pan} $isDragging={isDragging} />
            )}
            
            <ZoomSliderContainer>
              <span>zoom:</span>
              <ZoomSlider 
                type="range" 
                min="1" 
                max="5" 
                step="0.1" 
                value={zoom} 
                onChange={(e) => setZoom(parseFloat(e.target.value))} 
              />
            </ZoomSliderContainer>

            <CloseMessage onClick={handleCloseLightbox}>
              [ close ]
            </CloseMessage>
          </LightboxContent>
        </LightboxOverlay>
      )}
    </Container>
  );
}
