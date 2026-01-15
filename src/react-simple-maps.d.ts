declare module 'react-simple-maps' {
  import { ComponentType, CSSProperties } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      rotate?: [number, number, number];
      center?: [number, number];
      scale?: number;
    };
    style?: CSSProperties;
    children?: React.ReactNode;
  }

  export interface GeographiesProps {
    geography: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    children?: (data: { geographies: any[] }) => React.ReactNode;
  }

  export interface GeographyProps {
    geography: any;
    key?: string | number;
  }

  export interface AnnotationProps {
    subject: [number, number];
    dx?: number;
    dy?: number;
    connectorProps?: {
      stroke?: string;
      strokeWidth?: number;
      strokeLinecap?: string;
    };
    children?: React.ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Annotation: ComponentType<AnnotationProps>;
}
