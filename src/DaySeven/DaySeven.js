import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import bikeSample from '../utils/data/publicBikeTracts.json';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

export default function DaySeven() {
  const material = {
    ambient: 0.64,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [51, 51, 51],
  };

  const INITIAL_VIEW_STATE = {
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 11,
    maxZoom: 16,
    pitch: 60,
    bearing: 0,
  };

  const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78],
  ];

  const MAP_STYLE =
    'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

  const hexLayer = new HexagonLayer({
    id: 'bikeHexMap',
    colorRange,
    coverage: 0.5,
    data: bikeSample,
    elevationRange: [0, 75],
    elevationScale: 50,
    extruded: true,
    getPosition: (d) => [d.start_lng, d.start_lat],
    pickable: true,
    radius: 50,
    material,
    transitions: {
      elevationScale: 3000,
    },
  });
  return (
    <DeckGL
      layers={[hexLayer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
    >
      <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}
