import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer } from '@deck.gl/layers';
import GL from '@luma.gl/constants';

export default function DayOne() {
  const testUrl =
    'https://raw.githubusercontent.com/Aete/deckgl-60days-challenge/master/src/utils/data/citibikeSample_202101.json';

  const INITIAL_VIEW_STATE = {
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 11,
    maxZoom: 16,
    pitch: 0,
    bearing: 0,
  };

  const MAP_STYLE =
    'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

  const layer = new LineLayer({
    id: 'bike-paths',
    data: testUrl,
    opacity: 0.8,
    getSourcePosition: (d) => [
      d['start station longitude'],
      d['start station latitude'],
    ],
    getTargetPosition: (d) => [
      d['end station longitude'],
      d['end station latitude'],
    ],
    getColor: (d) => [244, 67, 54, 50],
  });

  return (
    <DeckGL
      layers={[layer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      parameters={{
        blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
        blendEquation: GL.FUNC_ADD,
      }}
    >
      <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}
