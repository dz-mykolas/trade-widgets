// src/components/Widgets/QuickTradeContent.js

import React from 'react';
import { IoIosArrowDown } from "react-icons/io";

const ActionButton = ({ children, variant = 'buy' }) => {
  const baseClasses = "flex-1 rounded-md py-2 font-normal !rounded-[10px] transition-colors";
  const variantClasses = variant === 'buy'
    ? "bg-[#1C3028] text-[#51FF71] hover:bg-opacity-80"
    : "bg-[#FF000021] text-[#FF0000] hover:bg-opacity-80";
  return <button className={`${baseClasses} ${variantClasses}`}>{children}</button>;
};

const Divider = () => <div className='border-t border-[#1F1F2B] my-2'></div>;

const GasInfo = () => (
  <div className="flex gap-2 text-[10px] text-[#686F83] font-a p-0.5">
    <span>GAS $4.33</span>
    <span className='text-[#31354B]'>|</span>
    <span>PRIOR $0.1</span>
    <span className='text-[#31354B]'>|</span>
    <span>BRIBE $0.2</span>
    <span className='text-[#31354B]'>|</span>
    <span>$0.2</span>
  </div>
);

const FooterButton = ({ children, icon, active = false }) => {
  const baseClasses = "flex flex-1 items-center px-3 py-2.5 rounded-[10px] justify-center font-semibold gap-2 text-[#686F83]";
  const activeClasses = active ? "bg-[#2D2D3D] " : "bg-[#1F1F2B] hover:bg-white/5";
  return (
    <button className={`${baseClasses} ${activeClasses}`} >
      {icon}
      {children}
    </button>
  );
};

export const QuickTradeHeader = () => (
  <div className='absolute w-full h-3 flex items-center justify-center -top-4 h-4'>
    <img src="/widget/handle.svg" className="absolute select-none pointer-events-none" />
  </div>
);

export const QuickTradeBody = ({ onClose }) => (
  <div className="flex flex-col text-sm">
    {/* Header Section */}
    <div className="flex items-center justify-between w-full font-[500] text-[14px]">
      <div className="flex flex-row gap-1.5">
        <img src="/widget/lighting.svg" />
        <span>Quick Trade</span>
      </div>
      <div className='flex items-center gap-1.25'>
        <div className="flex items-center gap-3 bg-[#1F1F2B] p-2 rounded-lg text-[12px] h-10">
          <div className='bg-[#2C2C3C] p-1.75 rounded-lg'><img src="/widget/wallet.svg" /></div>
          <div className='flex gap-2'>
            <span className=''>1</span>
            <span className="font-normal text-[#51FF71]">$10,56</span>
          </div>
          <IoIosArrowDown className="text-[#60657F] mr-0.5" />
        </div>
        <button onClick={ onClose } className="flex items-center bg-[#1F1F2B] p-3.75 rounded-lg text-[12px] h-10">
          <img src="/widget/close.svg" alt="Close" className="w-2.5 h-2.5" />
        </button>
      </div>
    </div>

    <Divider />
    {/* Quick Buy Section */}
    <div className="flex flex-col gap-2 font-b text-[12px]">
      <div className="flex justify-between items-center">
        <span className="font-bold text-[#51FF71] text-[12px]">Quick Buy</span>
        <div className="flex items-center gap-2 text-gray-300 text-[12px]">
          <img src="/widget/solana.svg" alt="Solana Logo" className="" />
          <span className="font-mono ">0.267</span>
        </div>
      </div>
      <div className="flex gap-1">
        <ActionButton variant="buy">0.001</ActionButton>
        <ActionButton variant="buy">0.01</ActionButton>
        <ActionButton variant="buy">0.1</ActionButton>
        <ActionButton variant="buy">0.5</ActionButton>
        <ActionButton variant="buy">1</ActionButton>
      </div>
      <GasInfo />
    </div>

    <Divider />
    {/* Quick Sell Section */}
    <div className="flex flex-col gap-2 font-b text-[12px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#FF0000]">Quick Sell</span>
          <div className="flex font-bold text-[#686F83] gap-2.25">
            <div className='text-[#FFFFFF] font-normal'>%</div>
            <img src="/widget/arrows.svg" />
            SOL
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <div className='bg-[#2C2C3C] p-1.25 rounded-xl'>{<img src="/widget/ghost.svg" />}</div>
          <span className='font-[400] text-white'>xxx tokens</span>
        </div>
      </div>
      <div className="flex gap-1">
        <ActionButton variant="sell">10%</ActionButton>
        <ActionButton variant="sell">25%</ActionButton>
        <ActionButton variant="sell">50%</ActionButton>
        <ActionButton variant="sell">75%</ActionButton>
        <ActionButton variant="sell">100%</ActionButton>
      </div>
      <GasInfo />
    </div>

    <Divider />
    {/* Footer */}
    <div className='flex items-center rounded-lg gap-1 font-a text-[10px] py-2'>
      <FooterButton>PRESETS</FooterButton>
      <FooterButton icon={<img src="/widget/fast.svg" className="" />} active>FAST</FooterButton>
      <FooterButton icon={<img src="/widget/glasses.svg" className="" />}>NORMAL</FooterButton>
      <FooterButton icon={<img src="/widget/smile.svg" className="" />}>SLOW</FooterButton>
    </div>
  </div>
);
