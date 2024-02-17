import React, { useEffect } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, TileWMS } from "ol/source";
import { fromLonLat } from "ol/proj";
import { Feature, MapBrowserEvent } from "ol";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import { defaults as defaultInteractions } from "ol/interaction";

import IMAGES from "../../../../assets";

export const OpenLayersMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    useEffect(() => {
        const centerCoordinate = fromLonLat([longitude, latitude]);

        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                new TileLayer({
                    source: new TileWMS({
                        url: "https://ahocevar.com/geoserver/wms",
                        params: { LAYERS: "topp:states", TILED: true },
                    }),
                }),
            ],
            view: new View({
                center: centerCoordinate,
                zoom: 14,
                enableRotation: false,
            }),
            interactions: defaultInteractions({
                mouseWheelZoom: true,
                keyboard: false,
                dragPan: false,
                pinchRotate: false,
                pinchZoom: true,
            }),
        });

        const pinFeature = new Feature(new Point(centerCoordinate));
        const pinStyle = new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: IMAGES.map_pin,
            }),
        });
        pinFeature.setStyle(pinStyle);

        const pinLayer = new VectorLayer({
            source: new VectorSource({
                features: [pinFeature],
            }),
        });

        map.addLayer(pinLayer);

        return () => {
            map.dispose();
        };
    }, [latitude, longitude]);

    return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};
