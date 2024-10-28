import { stateToHTML } from "draft-js-export-html";
import { convertFromHTML, EditorState } from "draft-js";
import { ContentState } from "draft-js";

export const contentStateToHtmlString = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  return stateToHTML(contentState);
};

export const htmlStringToEditorState = (html: string) => {
  const blocksFromHTML = convertFromHTML(html);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return EditorState.createWithContent(contentState);
};
