import bikeSample from '../utils/data/publicBikeTracts.json';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

export default function DayEight() {
  const INITIAL_VIEW_STATE = {
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 11,
    maxZoom: 16,
  };

  const MAP_STYLE =
    'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

  const heatmapLayer = new HeatmapLayer({
    id: 'bikeHexMap',
    data: bikeSample,
    getPosition: (d) => [d.start_lng, d.start_lat],
    pickable: true,
    intensity: 1.5,
    threshold: 0.03,
    radiusPixels: 30,
  });
  return (
    <DeckGL
      layers={[heatmapLayer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
    >
      <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}
