import styled from "styled-components";
import { IVideo } from "@interfaces/components/Video";

export const Container = styled.div<IVideo>`
  width: 100%;
  position: ${({ isFullscreen }) => (isFullscreen ? "fixed" : "relative")};
  ${({ isFullscreen }) =>
    isFullscreen && "left: 0; right: 0;height: 100%; background: #000"};
`;

export const ControlsOverlay = styled.div`
  font-size: 1.6rem;
  position: absolute;
  color: #fff;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: grid;
  grid-template-areas:
    "top top top"
    "left center right"
    "left center right"
    "bottom bottom bottom";
`;

export const CenterControls = styled.div`
  grid-area: center;
`;

export const TopControls = styled.div`
  grid-area: top;
`;

export const LeftControls = styled.div`
  grid-area: left;
`;

export const RightControls = styled.div`
  grid-area: right;
`;

export const BottomControls = styled.div`
  grid-area: bottom;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0 0.9rem 0.9rem 0.9rem;
`;

export const ControlsContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
`;

export const BottomLeftControlsGroup = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export const BottomRightControlsGroup = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export const PlayButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.4rem;
  }
`;

export const VolumeButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.6rem;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.25rem;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  background: rgba(148, 148, 148, 0.4);
  &:focus {
    outline: red;
  }
`;

export const CurrentProgressBar = styled.div`
  height: 100%;
  width: 0%;
  background: red;
  border-radius: 1rem;
  overflow: hidden;
`;

export const TimeContainer = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  align-items: center;
`;

export const SettingsButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.4rem;
  }
`;

export const FullscreenButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.4rem;
  }
`;

export const PictureInPictureButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.4rem;
  }
`;

export const VideoContainer = styled.video`
  z-index: 1;
`;
