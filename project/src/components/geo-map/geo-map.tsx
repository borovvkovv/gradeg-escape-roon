import { Icon, Marker } from 'leaflet';
import { memo, useEffect, useRef } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import useMap from '../../hooks/use-map';
import { Point } from '../../types/geo-map';
import './geo-map.css';

type MapProps = {
  center: [number, number] | undefined;
  points: Point[];
  selectedPoint: Point | null;
  onMarkerClick?: (placeId: string) => void;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [23, 42],
  iconAnchor: [12, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [23, 42],
  iconAnchor: [12, 42],
});

const MAP_ID = 'map';

function GeoMap({
  center,
  points,
  selectedPoint,
  onMarkerClick,
}: MapProps): JSX.Element {
  const zoomIn = useRef(null);
  const zoomOut = useRef(null);
  const map = useMap(MAP_ID, zoomIn, zoomOut);

  useEffect(() => {
    let markers: Marker[] = [];

    if (map) {
      markers = points.map((point) => {
        const pointLocationLat = point.location.coords[0];
        const pointLocationLng = point.location.coords[1];
        const isPointSelected = point.id === selectedPoint?.id;

        const marker = new Marker({
          lat: pointLocationLat,
          lng: pointLocationLng,
        })
          .setIcon(isPointSelected ? currentCustomIcon : defaultCustomIcon)
          .addTo(map)
          .on('click', () => {
            if (onMarkerClick && selectedPoint && !isPointSelected) {
              onMarkerClick(point.id);
            }
          });

        return marker;
      });
    }

    return () => {
      if (map) {
        markers.forEach((marker) => map.removeLayer(marker));
      }
    };
  }, [map, points, selectedPoint, onMarkerClick]);

  useEffect(() => {
    const centerLat = center ? center[0] : 0;
    const centerLng = center ? center[1] : 0;
    const zoom = 10;

    map?.setView(
      {
        lat: centerLat,
        lng: centerLng,
      },
      zoom
    );
  }, [map, center]);

  return (
    <div id='geo-container'>
      <div
        id='geo-in'
        ref={zoomIn}
      >
      </div>
      <div
        id='geo-out'
        ref={zoomOut}
      >
      </div>
      <div
        style={{ height: '100%' }}
        id={MAP_ID}
      >
      </div>
    </div>
  );
}

export default memo(GeoMap);
