import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ArcLayer } from '@deck.gl/layers';

export default function DayTwo() {
  const testUrl =
    'https://raw.githubusercontent.com/Aete/deckgl-60days-challenge/master/src/utils/data/citibikeSample_202101.json';

  const INITIAL_VIEW_STATE = {
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 11,
    maxZoom: 16,
    pitch: 50,
    bearing: 0,
  };

  const MAP_STYLE =
    'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

  const layer = new ArcLayer({
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
    getSourceColor: (d) => [244, 67, 54, 100],
    getTargetColor: (d) => [33, 150, 243, 100],
  });

  return (
    <DeckGL
      layers={[layer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
    >
      <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}
