# React Text Editor

A feature-rich text editor component built with React and Draft.js.

## Installation

```bash
npm install @rollinsafary/react-text-editor
```

## Usage

```tsx
import React, { useRef } from 'react';
import { NativeEditor, EditorRef } from 'react-text-editor';

const App = () => {
  const editorRef = useRef<EditorRef>(null);

  const handleExport = () => {
    if (editorRef.current) {
      const html = editorRef.current.exportToHTML();
      console.log(html);
    }
  };

  return (
    <div>
      <NativeEditor ref={editorRef} />
      <button onClick={handleExport}>Export Content</button>
    </div>
  );
};

export default App;
```