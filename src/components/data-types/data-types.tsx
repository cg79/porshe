export type ButtonProps = {
  onClick: Function;
  text: string;
};

export type ErrorProps = {
  message: string;
};

export type LabelProps = {
  text: string;
  htmlFor: string;
};

export type AvatarProps = {
  picture: string;
};

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface BarChartProps {
  props: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}
