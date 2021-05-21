export type EditorProps = {
  options?: any;
  value?: string;
  toolbar?: string[];
  plugins?: string[];
  modelValue?: string;
  height?: number;
  width?: string | number;
  ediRef?: any | null;
  onChange: Function;
};
