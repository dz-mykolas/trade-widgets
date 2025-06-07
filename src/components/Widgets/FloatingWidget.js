// FloatingWidget.js

import React, { useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import Widget from '@/components/Widgets/Widget';

const FloatingWidget = ({
  widget,
  onDragStop,
  onDrag,
  onResizeStop,
  onClose,
  dragInitiation,
  onDragInitiationComplete,
  children,
  headerContent,
}) => {
  const dragHandleRef = useRef(null);

  useEffect(() => {
    if (dragInitiation && dragInitiation.widgetId === widget.id && dragHandleRef.current) {
      const originalEvent = dragInitiation.event;
      dragHandleRef.current.dispatchEvent(
        new MouseEvent('mousedown', {
          bubbles: true, cancelable: true, clientX: originalEvent.clientX, clientY: originalEvent.clientY,
        })
      );
      onDragInitiationComplete();
    }
  }, [dragInitiation, widget.id, onDragInitiationComplete]);

  return (
    <Rnd
      size={{ width: widget.width, height: widget.height }}
      position={{ x: widget.x, y: widget.y }}
      onDragStop={(e, d) => onDragStop(widget.id, d)}
      onDrag={(e, d) => onDrag(widget.id, d)}
      onResizeStop={(e, direction, ref, delta, position) => {
        onResizeStop(widget.id, ref, position);
      }}
      minWidth={362} minHeight={347} maxWidth={500} maxHeight={600}
      className="z-50"
      dragHandleClassName="drag-handle"
    >
      <Widget
        id={widget.id}
        ref={dragHandleRef}
        onClose={onClose}
        headerContent={headerContent}
      >
        {children}
      </Widget>
    </Rnd>
  );
};

export default FloatingWidget;
