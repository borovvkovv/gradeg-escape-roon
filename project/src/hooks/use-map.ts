import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';

export default function useMap(
  mapContainerselector: string,
  zoomInRef: MutableRefObject<HTMLElement | null>,
  zoomOutRef: MutableRefObject<HTMLElement | null>
): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (
      zoomInRef.current !== null &&
      zoomOutRef.current !== null &&
      !isRenderedRef.current
    ) {
      const instance = new Map(mapContainerselector, { zoomControl: false });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      instance.addLayer(layer);

      setMap(instance);

      isRenderedRef.current = true;
    }
  }, [mapContainerselector, zoomInRef, zoomOutRef, map]);

  useEffect(() => {
    if (map !== null) {
      zoomInRef.current?.addEventListener('click', () =>
        map.setZoom(map.getZoom() - 1)
      );
      zoomOutRef.current?.addEventListener('click', () =>
        map.setZoom(map.getZoom() + 1)
      );
    }

    isRenderedRef.current = true;
  }, [zoomInRef, zoomOutRef, map]);

  return map;
}
