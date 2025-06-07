// src/components/Widgets/Widget.js

import React, { forwardRef } from 'react';

const Widget = forwardRef(({ id, onClose, dragHandleProps, children, headerContent }, ref) => (
  <div className="bg-[#16161f] rounded-xl flex flex-col h-full overflow-hidden p-4 border-1 border-[#1f1f2b]">
    {/* Header (The Draggable Handle) */}
    <div
      ref={ref}
      {...dragHandleProps}
      className="relative drag-handle text-white rounded-t-xl cursor-move flex justify-between items-center"
    >
      {/* Render custom header content if provided, otherwise default */}
      {headerContent || <span className="font-bold text-sm">Widget {id}</span>}
    </div>

    {/* Widget Content */}
    <div className="flex-1 h-full overflow-auto text-white">
      {children}
    </div>
  </div>
));

Widget.displayName = 'Widget';

export default Widget;
