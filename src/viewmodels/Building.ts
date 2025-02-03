//Building.ts
export interface Building {
    campus: string;
    building: string;
    buildingName: string;
    buildingLongName: string;
    address: string;
    latitude: number;
    longitude: number;
    polygonCoordinates: number[][];
}