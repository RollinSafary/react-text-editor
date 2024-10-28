import React, { useCallback, useContext, useImperativeHandle } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "./PureEditor.css";
import { EditorStyles, onChangeType } from "./types";
import { EditorContext } from "../context/EditorContext";

export interface PureEditorProps {
  placeholder?: string;
  customStyles?: EditorStyles;
  onChange?: onChangeType;
}

const PureEditor = React.forwardRef(
  ({ placeholder, onChange, customStyles }: PureEditorProps, ref) => {
    const {
      editorState,
      setEditorState,
      toggleBold,
      toggleItalic,
      toggleUnderline,
      handleKeyCommand,
      exportToHTML,
      importFromHTML,
    } = useContext(EditorContext);

    useImperativeHandle(ref, () => ({
      exportToHTML,
    }));

    const handleChange = useCallback((editorState: EditorState) => {
      if (onChange) {
        onChange(exportToHTML());
      }
      setEditorState(editorState);
    }, []);

    return (
      <div className="editor-container" style={customStyles?.container}>
        <div className="toolbar" style={customStyles?.toolbar}>
          <button onMouseDown={toggleBold}>Bold</button>
          <button onMouseDown={toggleItalic}>Italic</button>
          <button onMouseDown={toggleUnderline}>Underline</button>
        </div>
        <div className="editor" style={customStyles?.editor}>
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }
);

export default PureEditor;
