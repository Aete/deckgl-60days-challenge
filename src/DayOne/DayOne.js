import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer } from '@deck.gl/layers';
import GL from '@luma.gl/constants';

export default function DayOne() {
  const testUrl =
    'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/line/heathrow-flights.json';

  const INITIAL_VIEW_STATE = {
    latitude: 47.65,
    longitude: 7,
    zoom: 4.5,
    maxZoom: 16,
    pitch: 50,
    bearing: 0,
  };

  const MAP_STYLE =
    'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

  function getTooltip({ object }) {
    return (
      object &&
      `\
    ${object.country || object.abbrev || ''}
    ${object.name.indexOf('0x') >= 0 ? '' : object.name}`
    );
  }

  const layer = new LineLayer({
    id: 'flight-paths',
    data: testUrl,
    opacity: 0.8,
    getSourcePosition: (d) => d.start,
    getTargetPosition: (d) => d.end,
    getColor: (d) => [244, 67, 54],
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
      getTooltip={getTooltip}
    >
      <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}
