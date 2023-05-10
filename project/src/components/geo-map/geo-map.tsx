import { Icon, Marker } from 'leaflet';
import { memo, useEffect, useRef } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import useMap from '../../hooks/use-map';
import { BookingInfo } from '../../types/booking';
import { Point } from '../../types/geo-map';

type MapProps = {
  center: [number, number] | undefined;
  points: Point[]; //BookingInfo[];
  selectedPoint: Point | null; //BookingInfo | null;
  onMarkerClick?: (placeId: string /*BookingInfo*/) => void;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function GeoMap({
  center,
  points,
  selectedPoint,
  onMarkerClick,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef);

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
    map?.setView(
      {
        lat: center ? center[0] : 0,
        lng: center ? center[1] : 0,
      },
      10
    );
  }, [map, center]);

  return (
    <div
      style={{ height: '100%' }}
      ref={mapRef}
    >
    </div>
  );
}

export default memo(GeoMap);
