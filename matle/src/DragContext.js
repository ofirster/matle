// DragContext.js
import React from 'react';

const DragContext = React.createContext({
  draggedItem: null,
  setDraggedItem: () => {},
});

export default DragContext;
