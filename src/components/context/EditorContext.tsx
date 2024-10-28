import React, { createContext } from "react";
import { EditorState, DraftHandleValue } from "draft-js";

export interface EditorContextType {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  exportToHTML: () => string;
  importFromHTML: (html: string) => void;
  handleKeyCommand: (
    command: string,
    editorState: EditorState
  ) => DraftHandleValue;
}

export const EditorContext = createContext<EditorContextType>({
  editorState: EditorState.createEmpty(),
  setEditorState: () => {},
  toggleBold: () => {},
  toggleItalic: () => {},
  toggleUnderline: () => {},
  exportToHTML: () => "",
  importFromHTML: () => {},
  handleKeyCommand: () => "not-handled",
});
