export interface EditorStyles {
  container?: React.CSSProperties;
  toolbar?: React.CSSProperties;
  button?: React.CSSProperties;
  editor?: React.CSSProperties;
}

export type onChangeType = (html: string) => void;

export interface EditorRef {
  exportToHTML: () => string;
}
