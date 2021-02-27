import bikeSample from '../utils/data/publicBikeTracts.json';
import { useState } from 'react';
import styled from 'styled-components';
import { StaticMap } from 'react-map-gl';
import { ArcLayer } from '@deck.gl/layers';
import { DataFilterExtension } from '@deck.gl/extensions';
import DeckGL from '@deck.gl/react';
import ControlPanel from './ControlPanel';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: ${document.documentElement.clientWidth || document.body.clientWidth}px;
  height: ${document.documentElement.clientHeight ||
  document.body.clientHeight}px;
`;

const dataFilter = new DataFilterExtension({
  filterSize: 1,
  fp64: false,
});

export default function DayNine() {
  const [filterValue, setFilterValue] = useState([7, 9]);
  const INITIAL_VIEW_STATE = {
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 11,
    maxZoom: 16,
    pitch: 60,
    bearing: 0,
  };

  const MAP_STYLE =
    'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

  const layer = new ArcLayer({
    id: 'bike-paths',
    data: bikeSample,
    opacity: 0.8,
    getSourcePosition: (d) => [d['start_lng'], d['start_lat']],
    getTargetPosition: (d) => [d['end_lng'], d['end_lat']],
    getSourceColor: [244, 67, 54, 100],
    getTargetColor: [33, 150, 243, 100],
    getFilterValue: (d) => d.start_hour,
    filterRange: [filterValue[0] * 0.9, filterValue[1] * 1.1],
    extensions: [dataFilter],
  });

  return (
    <Container>
      <DeckGL
        layers={[layer]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
      </DeckGL>
      <ControlPanel onChange={setFilterValue} />
    </Container>
  );
}
