import { useRef, useState, useEffect, useCallback } from "react";
import {
  FaPlay,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaPause,
  FaCompress,
  FaCog,
  FaExternalLinkAlt,
  FaForward,
  FaBackward,
} from "react-icons/fa";

import {
  Container,
  VideoContainer,
  ControlsOverlay,
  CenterControls,
  TopControls,
  BottomControls,
  LeftControls,
  RightControls,
  PlayButton,
  ControlsContainer,
  VolumeButton,
  BottomLeftControlsGroup,
  BottomRightControlsGroup,
  FullscreenButton,
  SettingsButton,
  PictureInPictureButton,
  ProgressBar,
  CurrentProgressBar,
  TimeContainer,
  VolumeSlider,
  VolumeSliderContainer,
  VolumeAndSliderContainer,
} from "@styles/components/Video";

const Video = () => {
  const ref = useRef(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] =
    useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isForwarded, setIsForwarded] = useState<boolean>(false);
  const [isBackwards, setIsBackwards] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const video: HTMLVideoElement = ref.current.querySelector("video");
    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const playIcon = ref.current.querySelector(".playIcon");
    const video: HTMLVideoElement = ref.current.querySelector("video");

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }

    playIcon.classList.add("active");

    setTimeout(() => {
      playIcon.classList.remove("active");
    }, 500);
  }, [isPaused]);

  const handlePlayVideo = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  const toggleMuteVideo = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleVolumeSlider = useCallback(() => {
    setIsVolumeSliderVisible(!isVolumeSliderVisible);
  }, [isVolumeSliderVisible]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handlePictureInPicture = useCallback(() => {
    const video: HTMLVideoElement = ref.current.querySelector("video");
    video.requestPictureInPicture();
  }, []);

  const handlePlayonSpaceBar = (e) => {
    if (e.keyCode == 32) {
      const video: HTMLVideoElement = ref.current.querySelector("video");
      handlePlayVideo();
    }
  };

  const getCurrentTime = (container: HTMLElement, video: HTMLVideoElement) => {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

    const currentTime = container.querySelector("#currentTime");
    const duration = container.querySelector("#duration");

    currentTime.innerHTML = `${currentMinutes}:${
      currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
    }`;
    duration.innerHTML = `${durationMinutes}:${durationSeconds}`;
  };

  const handleTimeUpdate = () => {
    const videoContainer: HTMLVideoElement = ref.current;
    const video: HTMLVideoElement = videoContainer.querySelector("video");

    getCurrentTime(videoContainer, video);
    const percentage = (video.currentTime / video.duration) * 100;

    const progressBar: HTMLElement =
      videoContainer.querySelector("#currentProgress");

    progressBar.style.width = `${percentage}%`;
  };

  const handleClickProgress = (e) => {
    const progressBar: HTMLElement = ref.current.querySelector("#progressBar");
    const video: HTMLVideoElement = ref.current.querySelector("video");

    const progressTime =
      (e.nativeEvent.offsetX / progressBar.offsetWidth) * video.duration;

    video.currentTime = progressTime;
  };

  const handleChangeVolume = (e) => {
    const video: HTMLVideoElement = ref.current.querySelector("video");
    const volumeSliderContainer = ref.current.querySelector("#volumeSlider");
    const volumeSlider = volumeSliderContainer.querySelector("div");

    const volume = e.nativeEvent.offsetY / volumeSliderContainer.offsetHeight;

    console.log("volume:", volume);
    console.log(`${volume * 100}%`);

    if (volume > 1) {
      video.volume = 1;
    } else {
      video.volume = volume;
    }

    volumeSlider.style.height = `${volume * 100}%`;
  };

  const handleDoubleClickLeft = () => {
    const backwardsIcon = ref.current.querySelector(".backwardsIcon");
    const video: HTMLVideoElement = ref.current.querySelector("video");

    setIsBackwards(true);

    video.currentTime -= 10;

    backwardsIcon.classList.add("active");

    setTimeout(() => {
      backwardsIcon.classList.remove("active");
      setIsBackwards(false);
    }, 500);
  };

  const handleDoubleClickRight = () => {
    const forwardIcon = ref.current.querySelector(".forwardIcon");
    const video: HTMLVideoElement = ref.current.querySelector("video");

    setIsForwarded(true);

    video.currentTime += 10;

    forwardIcon.classList.add("active");

    setTimeout(() => {
      forwardIcon.classList.remove("active");
      setIsForwarded(false);
    }, 500);
  };

  const handleDoubleClickCenter = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Container
      ref={ref}
      isFullscreen={isFullscreen}
      onKeyPress={(e) => handlePlayonSpaceBar(e)}
    >
      <ControlsOverlay>
        <TopControls></TopControls>
        <LeftControls onDoubleClick={handleDoubleClickLeft}>
          <div className="backwardsIcon">
            {isLoaded && isBackwards && <FaBackward />}
          </div>
        </LeftControls>
        <CenterControls
          onClick={handlePlayVideo}
          onDoubleClick={handleDoubleClickCenter}
        >
          <div className="playIcon">
            {isLoaded && isPaused ? <FaPause /> : <FaPlay />}
          </div>
        </CenterControls>
        <RightControls onDoubleClick={handleDoubleClickRight}>
          <div className="forwardIcon">
            {isLoaded && isForwarded && <FaForward />}
          </div>
        </RightControls>
        <BottomControls>
          <ControlsContainer>
            <BottomLeftControlsGroup>
              <PlayButton onClick={handlePlayVideo}>
                {isLoaded && isPaused ? <FaPause /> : <FaPlay />}
              </PlayButton>
              <VolumeAndSliderContainer>
                {isVolumeSliderVisible && (
                  <VolumeSliderContainer onClick={(e) => handleChangeVolume(e)}>
                    <VolumeSlider id="volumeSlider">
                      <div />
                    </VolumeSlider>
                  </VolumeSliderContainer>
                )}
                <VolumeButton
                  onClick={toggleMuteVideo}
                  onMouseEnter={toggleVolumeSlider}
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </VolumeButton>
              </VolumeAndSliderContainer>
            </BottomLeftControlsGroup>
            <ProgressBar
              onClick={(e) => handleClickProgress(e)}
              id="progressBar"
            >
              <CurrentProgressBar id="currentProgress" />
            </ProgressBar>
            <BottomRightControlsGroup>
              <TimeContainer>
                <span id="currentTime">0:00</span>
                {"/"}
                <span id="duration">0:00</span>
              </TimeContainer>
              <SettingsButton>
                <FaCog />
              </SettingsButton>
              <PictureInPictureButton onClick={handlePictureInPicture}>
                <FaExternalLinkAlt />
              </PictureInPictureButton>
              <FullscreenButton onClick={toggleFullscreen}>
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </FullscreenButton>
            </BottomRightControlsGroup>
          </ControlsContainer>
        </BottomControls>
      </ControlsOverlay>
      <VideoContainer
        controls={false}
        height="100%"
        width="100%"
        onTimeUpdate={handleTimeUpdate}
        autoPlay={false}
        // onKeyPress={}
      >
        <source src={`${process.env.VIDEO_ENDPOINT}/stream/video`} />
      </VideoContainer>
    </Container>
  );
};

export default Video;
