import DOMPurify from "dompurify";
import {
  EditorState,
  RichUtils,
  ContentState,
  DraftHandleValue,
  convertFromHTML,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import React, { PropsWithChildren, useContext, useState } from "react";
import { EditorContext } from "./EditorContext";
import { htmlStringToEditorState } from "../../utils/data";

interface EditorProviderProps extends PropsWithChildren {
  initialState?: string;
}

export const EditorContextProvider: React.FC<EditorProviderProps> = ({
  initialState,
  children,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    initialState
      ? htmlStringToEditorState(initialState)
      : EditorState.createEmpty()
  );

  const toggleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const toggleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const toggleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const exportToHTML = () => {
    const contentState = editorState.getCurrentContent();
    return DOMPurify.sanitize(stateToHTML(contentState));
  };

  const importFromHTML = (html: string) => {
    const sanitizedHTML = DOMPurify.sanitize(html);
    const blocksFromHTML = convertFromHTML(sanitizedHTML);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(contentState));
  };

  return (
    <EditorContext.Provider
      value={{
        editorState,
        setEditorState,
        toggleBold,
        toggleItalic,
        toggleUnderline,
        exportToHTML,
        importFromHTML,
        handleKeyCommand,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
