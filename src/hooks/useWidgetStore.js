// src/hooks/useWidgetStore.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DOCK_PREVIEW_DELAY = 500;
const GRAB_MARGIN = 40;

let previewTimeout = null;

export const initialWidgets = {
  'widget1': {
    id: 'widget1',
    status: 'floating',
    previousStatus: 'docked-left',
    order: 0,
    x: 100, y: 100, width: 280, height: 300,
  },
  'widget2': {
    id: 'widget2',
    status: 'hidden',
    previousStatus: 'floating',
    order: 1,
    x: 400, y: 150, width: 280, height: 300,
  },
  'widget3': {
    id: 'widget3',
    status: 'hidden',
    previousStatus: 'floating',
    order: 2,
    x: 700, y: 200, width: 362, height: 347,
    isDockable: false,
  },
};

export const useWidgetStore = create(
  persist(
    (set, get) => ({
      widgets: initialWidgets,
      dockPreview: null,

      ensureWidgetIsInBounds: (widget) => {
        const { x, y, width, height } = widget;
        const finalPos = { x, y };
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Check horizontal boundaries
        if (finalPos.x + width < GRAB_MARGIN) {
          // Too far left
          finalPos.x = -width + GRAB_MARGIN;
        } else if (finalPos.x > viewportWidth - GRAB_MARGIN) {
          // Too far right
          finalPos.x = viewportWidth - GRAB_MARGIN;
        }

        // Check vertical boundaries
        if (finalPos.y < 0) {
          finalPos.y = 0;
        } 
        else if (finalPos.y > viewportHeight - GRAB_MARGIN) {
          finalPos.y = viewportHeight - GRAB_MARGIN;
        }

        return finalPos;
      },

      updateWidget: (id, newProps) => {
        set((state) => ({
          widgets: {
            ...state.widgets,
            [id]: { ...state.widgets[id], ...newProps },
          },
        }));
      },

      toggleWidget: (id) => {
        const widget = get().widgets[id];
        if (!widget) return;

        if (widget.status === 'hidden') {
          get().updateWidget(id, { status: widget.previousStatus });
        } else {
          get().updateWidget(id, {
            status: 'hidden',
            previousStatus: widget.status,
          });
        }
      },

      removeWidget: (id) => {
        set(state => {
          const newWidgets = { ...state.widgets };
          delete newWidgets[id];
          return { widgets: newWidgets };
        });
      },

      handleDragStop: (id, pos) => {
        const { dockPreview, widgets, updateWidget, ensureWidgetIsInBounds } = get();

        if (previewTimeout) clearTimeout(previewTimeout);
        set({ dockPreview: null });

        if (dockPreview && dockPreview.id === id) {
          const { side } = dockPreview;
          const widgetsInSide = Object.values(widgets).filter(w => w.status === `docked-${side}`);
          updateWidget(id, { status: `docked-${side}`, order: widgetsInSide.length });
        } else {
          const widget = { ...widgets[id], ...pos };
          const correctedPos = ensureWidgetIsInBounds(widget);
          updateWidget(id, { ...correctedPos, status: 'floating' });
        }
      },

      handleWidgetDrag: (id, pos, widgetSize, containerNode) => {
        const widget = get().widgets[id];
        if (widget.isDockable === false) {
          return;
        }

        if (!containerNode) return;
        const DOCK_THRESHOLD = 30;
        const containerWidth = containerNode.offsetWidth;
        let targetSide = null;

        if (pos.x < DOCK_THRESHOLD) {
          targetSide = 'left';
        } else if (containerWidth - pos.x - widgetSize.width < DOCK_THRESHOLD) {
          targetSide = 'right';
        }

        if (targetSide) {
          if (!get().dockPreview && !previewTimeout) {
            previewTimeout = setTimeout(() => {
              set({ dockPreview: { id, side: targetSide, width: widgetSize.width } });
              previewTimeout = null;
            }, DOCK_PREVIEW_DELAY);
          }
        } else {
          if (previewTimeout) {
            clearTimeout(previewTimeout);
            previewTimeout = null;
          }
          if (get().dockPreview) {
            set({ dockPreview: null });
          }
        }
      },

      prepareUndock: (id, pos) => {
        get().updateWidget(id, {
          status: 'floating',
          x: pos.x,
          y: pos.y,
        });
        return true;
      },

      resetWidgets: () => {
        set({
          widgets: initialWidgets,
          dockPreview: null,
        });
      },

      handleResizeStop: (id, size, position) => {
        const { widgets, updateWidget, ensureWidgetIsInBounds } = get();
        
        const updatedWidget = {
          ...widgets[id],
          width: size.width,
          height: size.height,
          ...position,
        };

        const correctedPos = ensureWidgetIsInBounds(updatedWidget);

        updateWidget(id, {
          width: updatedWidget.width,
          height: updatedWidget.height,
          ...correctedPos,
        });
      },

    }),
    {
      name: 'widget-layout-storage',
    }
  )
);
