"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";

const EditorStateContext = createContext(null);
const EditorControlContext = createContext(null);

export function EditorProvider({ children }) {
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const { projectId } = useParams();

  const openEditor = useCallback((type, id = null) => {
    setEditId(id);
    setEditType(type);
    setIsEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setEditId(null);
    setEditType(null);
    setIsEditorOpen(false);
  }, []);

  useLayoutEffect(() => {
    closeEditor();
  }, [projectId, closeEditor]);

  const editorStateContextValue = useMemo(
    () => ({ editId, editType, isEditorOpen }),
    [editId, editType, isEditorOpen],
  );

  const editorControlContextValue = useMemo(
    () => ({ openEditor, closeEditor }),
    [openEditor, closeEditor],
  );

  return (
    <EditorStateContext.Provider value={editorStateContextValue}>
      <EditorControlContext.Provider value={editorControlContextValue}>
        {children}
      </EditorControlContext.Provider>
    </EditorStateContext.Provider>
  );
}

export function useEditorState() {
  return useContext(EditorStateContext);
}

export function useEditorControl() {
  return useContext(EditorControlContext);
}
