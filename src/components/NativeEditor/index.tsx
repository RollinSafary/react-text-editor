import React, { forwardRef } from "react";
import PureEditor from "./PureEditor";
import { EditorContextProvider } from "../context/EditorContextProvider";
import { EditorStyles, onChangeType } from "./types";

export interface NativeEditorProps {
  initialState?: string;
  customStyles?: EditorStyles;
  onChange?: onChangeType;
}

export const NativeEditor = forwardRef(
  ({ initialState, onChange, customStyles }: NativeEditorProps, ref) => {
    return (
      <EditorContextProvider initialState={initialState}>
        <PureEditor {...{ ref, customStyles, onChange }} />
      </EditorContextProvider>
    );
  }
);

NativeEditor.displayName = "NativeEditor";
