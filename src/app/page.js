// app/page.js

"use client";

import React, { useRef, useMemo, useState, useCallback } from 'react';
import { useWidgetStore } from '@/hooks/useWidgetStore';
import { useHasHydrated } from '@/hooks/useHasHydrated';
import Sidebar from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";
import MainContent from "@/components/Layout/MainContent";
import Footer from "@/components/Layout/Footer";
import FloatingWidget from '@/components/Widgets/FloatingWidget';
import { QuickTradeHeader, QuickTradeBody } from '@/components/Widgets/QuickTradeContent';
import { IoClose } from "react-icons/io5";

const sortWidgets = (a, b) => (a.order || 0) - (b.order || 0);
const UNDOCK_THRESHOLD = 30;

export default function Home() {
  const hasHydrated = useHasHydrated();

  const {
    widgets, toggleWidget, handleDragStop,
    prepareUndock, dockPreview, handleWidgetDrag,
    handleResizeStop
  } = useWidgetStore();

  const getWidgetContent = useCallback((widgetId, onClose) => {
    const customHeader = (
      <div className="flex justify-between items-center text-white w-full">
        <span className="font-bold text-sm">{widgetId}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close Widget"
        >
          <IoClose className="w-4 h-4 text-[#686F83]" />
        </button>
      </div>
    );

    switch (widgetId) {
      case 'widget3':
        return {
          header: <QuickTradeHeader />,
          body: <QuickTradeBody onClose={onClose} />,
        };
      default:
        return { header: customHeader, body: <div className="p-4">Content for {widgetId}</div> };
    }
  }, []);

  const [leftDocked, rightDocked, floatingWidgets] = useMemo(() => {
    if (!hasHydrated) return [[], [], []];

    const allWidgets = Object.values(widgets);
    const left = allWidgets.filter(w => w.status === 'docked-left').sort(sortWidgets);
    const right = allWidgets.filter(w => w.status === 'docked-right').sort(sortWidgets);
    const floating = allWidgets.filter(w => w.status === 'floating');
    return [left, right, floating];
  }, [widgets, hasHydrated]);

  const [dragInitiation, setDragInitiation] = useState(null);
  const mainContentRef = useRef(null);
  const pageContainerRef = useRef(null);

  const handleUndockInitiation = useCallback((id, side, mousedownEvent) => {
    if (!pageContainerRef.current) return;

    const handleElement = mousedownEvent.currentTarget;
    const pageRect = pageContainerRef.current.getBoundingClientRect();
    const initialX = mousedownEvent.clientX;
    const initialY = mousedownEvent.clientY;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - initialX;
      const deltaY = moveEvent.clientY - initialY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance > UNDOCK_THRESHOLD) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        const handleRect = handleElement.getBoundingClientRect();
        const handleOffsetX = mousedownEvent.clientX - handleRect.left;
        const handleOffsetY = mousedownEvent.clientY - handleRect.top;
        const x = mousedownEvent.clientX - pageRect.left - handleOffsetX;
        const y = mousedownEvent.clientY - pageRect.top - handleOffsetY;

        if (prepareUndock(id, { x, y })) {
          setDragInitiation({ widgetId: id, event: mousedownEvent });
        }
      }
    };
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [prepareUndock, pageContainerRef]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <div ref={pageContainerRef} className="min-h-screen bg-[#0b0b11] text-gray-300 p-2.5 font-sans flex gap-1.5 relative">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <Header />
          <MainContent
            mainContentRef={mainContentRef}
            leftDocked={leftDocked}
            rightDocked={rightDocked}
            dockPreview={dockPreview}
            prepareUndock={handleUndockInitiation}
            toggleWidget={toggleWidget}
            widgets={widgets}
            getWidgetContent={getWidgetContent}
          />
        </div>
        <Footer />
      </div>

      {floatingWidgets.map((widget) => {
        const { header, body } = getWidgetContent(widget.id, () => toggleWidget(widget.id));
        return (
          <FloatingWidget
            key={widget.id}
            widget={widget}
            onDragStop={(id, d) => handleDragStop(id, d)}
            onDrag={(id, d) => handleWidgetDrag(id, d, widget, mainContentRef.current)}
            onResizeStop={(id, ref, pos) => handleResizeStop(id, { width: ref.offsetWidth, height: ref.offsetHeight }, pos)}
            onClose={() => toggleWidget(widget.id)}
            dragInitiation={dragInitiation}
            onDragInitiationComplete={() => setDragInitiation(null)}
            headerContent={header}
          >
            {body}
          </FloatingWidget>
        );
      })}
    </div>
  );
}
