// This file is a workaround for the missing @types/tomtom-international__web-sdk-maps package.
// It provides a minimal set of type declarations to allow TypeScript to compile.
declare namespace tt {
    export function map(options: MapOptions): Map;

    export interface Map {
        on(type: string, listener: (evt: any) => void): this;
        remove(): void;
    }

    export interface MapOptions {
        key: string;
        container: HTMLElement | string;
        center?: [number, number] | { lat: number; lng: number };
        zoom?: number;
        style?: string;
    }

    export class Marker {
        constructor(options?: MarkerOptions);
        setLngLat(lngLat: [number, number]): this;
        setPopup(popup: Popup): this;
        addTo(map: Map): this;
    }

    export interface MarkerOptions {
        element?: HTMLElement;
        color?: string;
    }

    export class Popup {
        constructor(options?: PopupOptions);
        setHTML(html: string): this;
        setText(text: string): this;
    }

    export interface PopupOptions {
        offset?: number | { [key: string]: [number, number] };
    }
}
