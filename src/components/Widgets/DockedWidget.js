import React from 'react';
import Widget from '@/components/Widgets/Widget';

const DockedWidget = ({ width, onPrepareUndock, headerContent, children }) => {
  return (
    <div style={{ width }} className="relative h-full">
      <Widget
        headerContent={headerContent}
        dragHandleProps={{ onMouseDown: onPrepareUndock }}
      >
        {children}
      </Widget>
    </div>
  );
};

export default DockedWidget;
