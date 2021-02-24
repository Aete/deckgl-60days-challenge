import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import NYCNTA from '../utils/data/nycTract.geojson';
import publicBike from '../utils/data/publicBikeTracts.csv';
import * as d3 from 'd3';
import { useEffect, useState, useMemo } from 'react';

function calculateArcs(data, selectedNTA) {
  if (!data || !selectedNTA) return [];
  return data.filter((d) => d.NTACode === selectedNTA);
}

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

export default function DaySix() {
  const [data, setData] = useState(null);
  const [selectedNTA, setNTA] = useState(null);
  const arcs = useMemo(() => calculateArcs(data, selectedNTA), [
    data,
    selectedNTA,
  ]);

  useEffect(() => {
    if (!data) {
      d3.csv(publicBike).then((csv) => {
        console.log(csv);
        setData(csv);
      });
    }
  }, [data]);

  const arcLayer = new ArcLayer({
    id: 'bike-paths',
    data: arcs,
    opacity: 0.5,
    getSourcePosition: (d) => [+d['start_lng'], +d['start_lat']],
    getTargetPosition: (d) => [+d['end_lng'], +d['end_lat']],
    getSourceColor: (d) => [244, 67, 54],
    getTargetColor: (d) => [33, 150, 243],
  });

  const tractLayer = new GeoJsonLayer({
    id: 'nycNTA',
    data: NYCNTA,
    getFillColor: [50, 50, 50, 100],
    getLineColor: [60, 60, 60],
    getLineWidth: 1,
    lineWidthMinPixels: 1,
    lineWidthScale: 10,
    filled: true,
    stroked: true,
    autoHighlight: true,
    highlightColor: [180, 180, 180, 100],
    pickable: true,
    onHover: ({ object }) => {
      if (object && object.properties.NTACode !== selectedNTA) {
        setNTA(object.properties.NTACode);
      }
    },
  });

  const endPointLayer = new ScatterplotLayer({
    id: 'endPoint',
    data: arcs,
    radiusScale: 1,
    radiusMinPixels: 0.25,
    getPosition: (d) => [+d.end_lng, +d.end_lat],
    getFillColor: [33, 150, 243],
    getRadius: 75,
  });
  
  return (
    <DeckGL
      layers={[arcLayer, tractLayer, endPointLayer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
    >
      <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}
