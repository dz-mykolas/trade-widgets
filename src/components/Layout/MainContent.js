"use client";

import React from 'react';
import DockedWidget from '@/components/Widgets/DockedWidget';

const DockPreview = ({ width }) => (
  <div
    style={{ width }}
    className="h-full bg-white/5 rounded-xl border-2 border-dashed border-gray-500 animate-dock-preview"
  />
);

export default function MainContent({
  mainContentRef,
  leftDocked,
  rightDocked,
  dockPreview,
  prepareUndock,
  toggleWidget,
  widgets = {},
  getWidgetContent,
}) {
  return (
    <main className="bg-[#0b0b11] flex-1 flex flex-col gap-1 relative overflow-hidden">
      <div className="bg-[#16161f] flex justify-end items-center p-1 rounded-2xl">
        <div className="h-[40px]"></div>
      </div>

      <div ref={mainContentRef} className="flex flex-row flex-1 gap-1.5 relative">
        {dockPreview?.side === 'left' && <DockPreview width={dockPreview.width} />}

        {leftDocked.map(({ id, width }) => {
          const { header, body } = getWidgetContent(id, () => toggleWidget(id));
          return (
            <DockedWidget
              key={id}
              width={width}
              onPrepareUndock={(e) => prepareUndock(id, 'left', e)}
              headerContent={header}
            >
              {body}
            </DockedWidget>
          );
        })}

        <div className="flex-1 bg-[#16161f] rounded-2xl shadow-md p-4 flex flex-col items-center gap-4">
          {widgets['widget1']?.status === 'hidden' && (
            <button
              onClick={() => toggleWidget('widget1')}
              className="bg-[#2a2a3e] hover:bg-[#3a3a5e] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Toggle Dockable Widget 1
            </button>
          )}

          {/* --- DEBUGGING START --- */}
          <div className="border border-dashed border-yellow-500 p-2 w-full text-left mb-4">
            <p className="font-bold text-yellow-400">Debugging Info for 'widget1':</p>
            <p>Condition Result: {widgets['widget1']?.status === 'hidden' ? 'TRUE (Button Should Show)' : 'FALSE (Button Is Hidden)'}</p>
            <p>Actual Status: <span className="font-bold text-white">{widgets['widget1']?.status || 'Not Found'}</span></p>
            <p className="mt-2 font-bold text-yellow-400">Full 'widgets' object:</p>
            <pre><code>{JSON.stringify(widgets['widget1'], null, 2)}</code></pre>
          </div>
          {/* --- DEBUGGING END --- */}
        </div>

        <div className="flex-1 bg-[#16161f] rounded-2xl shadow-md p-4 flex flex-col items-center gap-4">
          {widgets['widget2']?.status === 'hidden' && (
            <button
              onClick={() => toggleWidget('widget2')}
              className="bg-[#2a2a3e] hover:bg-[#3a3a5e] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Toggle Dockable Widget 2
            </button>
          )}

          {/* --- DEBUGGING START --- */}
          <div className="border border-dashed border-yellow-500 p-2 w-full text-left mb-4">
            <p className="font-bold text-yellow-400">Debugging Info for 'widget2':</p>
            <p>Condition Result: {widgets['widget1']?.status === 'hidden' ? 'TRUE (Button Should Show)' : 'FALSE (Button Is Hidden)'}</p>
            <p>Actual Status: <span className="font-bold text-white">{widgets['widget2']?.status || 'Not Found'}</span></p>
            <p className="mt-2 font-bold text-yellow-400">Full 'widgets' object:</p>
            <pre><code>{JSON.stringify(widgets['widget2'], null, 2)}</code></pre>
          </div>
          {/* --- DEBUGGING END --- */}
        </div>

        <div className="flex-1 bg-[#16161f] rounded-2xl shadow-md p-4 flex flex-col items-center gap-4">
          {widgets['widget3']?.status === 'hidden' && (
            <button
              onClick={() => toggleWidget('widget3')}
              className="bg-[#2a2a3e] hover:bg-[#3a3a5e] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Toggle Non-Dockable Widget 1
            </button>
          )}

          {/* --- DEBUGGING START --- */}
          <div className="border border-dashed border-yellow-500 p-2 w-full text-left mb-4">
            <p className="font-bold text-yellow-400">Debugging Info for 'widget3':</p>
            <p>Condition Result: {widgets['widget1']?.status === 'hidden' ? 'TRUE (Button Should Show)' : 'FALSE (Button Is Hidden)'}</p>
            <p>Actual Status: <span className="font-bold text-white">{widgets['widget3']?.status || 'Not Found'}</span></p>
            <p className="mt-2 font-bold text-yellow-400">Full 'widgets' object:</p>
            <pre><code>{JSON.stringify(widgets['widget3'], null, 2)}</code></pre>
          </div>
          {/* --- DEBUGGING END --- */}
        </div>

        {rightDocked.map(({ id, width }) => {
            const { header, body } = getWidgetContent(id, () => toggleWidget(id));
            return (
              <DockedWidget
                key={id}
                width={width}
                onPrepareUndock={(e) => prepareUndock(id, 'right', e)}
                headerContent={header}
              >
                {body}
              </DockedWidget>
            );
        })}

        {dockPreview?.side === 'right' && <DockPreview width={dockPreview.width} />}
      </div>
    </main>
  );
}
