import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import Seoul from '../utils/data/seoul_dong.geojson';

export default function DayThree() {
  const INITIAL_VIEW_STATE = {
    latitude: 37.5665,
    longitude: 126.978,
    zoom: 11,
    maxZoom: 16,
    pitch: 50,
    bearing: -30,
  };

  const colors = [
    [255, 220, 0],
    [227, 40, 45],
    [35, 50, 120],
  ];

  const layer = new GeoJsonLayer({
    id: 'SeoulDong',
    data: Seoul,
    getFillColor: [200, 200, 200, 200],
    getLineColor: [255, 255, 255],
    getLineWidth: 1,
    lineWidthMinPixels: 1,
    lineWidthScale: 10,
    filled: true,
    stroked: true,
    onHover: (info, e) => {
      info.object && console.log(info.object.properties.ADM_DR_NM);
    },
    autoHighlight: true,
    highlightColor: (d) => colors[d.object.properties.ADM_DR_CD % 3],
    pickable: true,
  });

  const MAP_STYLE =
    'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

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
