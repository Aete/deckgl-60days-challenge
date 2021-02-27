import { useState } from 'react';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 20px;
  background-color: rgba(65, 65, 65, 100);
  border-radius: 25px;
  width: 600px;
  height: 75px;
  padding: 0 15px;
  display: flex;
  align-items: center;
`;

// const PlayButton = styled.div`
//   height: 50px;
//   width: 50px;
//   border-radius: 50%;
//   background-color: #00bcd4;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #ffffff;
//   margin-right: 25px;
// `;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5393ff',
      main: '#2979ff',
      dark: '#1c54b2',
      contrastText: '#000',
    },
  },
});

export default function ControlPanel({ onChange }) {
  const [isPlay, setIsPlay] = useState(true);
  const onClickButton = () => {
    setIsPlay((prev) => !prev);
  };
  return (
    <Container>
      {/* <PlayButton>
        {isPlay ? (
          <PlayIcon
            style={{ width: '30px', height: '30px' }}
            onClick={onClickButton}
          />
        ) : (
          <PauseIcon
            style={{ width: '30px', height: '30px' }}
            onClick={onClickButton}
          />
        )}
      </PlayButton> */}
      <ThemeProvider theme={theme}>
        <Slider
          color="primary"
          defaultValue={[7, 9]}
          min={0}
          max={23}
          step={1}
          aria-labelledby="range-slider"
          valueLabelDisplay="auto"
          marks
          onChange={(e, info) => {
            onChange(info);
          }}
        />
      </ThemeProvider>
    </Container>
  );
}
