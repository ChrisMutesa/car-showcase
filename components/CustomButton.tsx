'use client';
import { CustomButtonProps } from '@/types';
import Image from 'next/image';

function CustomButton({
  title,
  containerStyles,
  handleClick,
  btnType,
  rightIcon,
  isDisabled,
  textStyles,
}: CustomButtonProps) {
  return (
    <button
      disabled={isDisabled}
      type={btnType}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="arrow_left"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
}

export default CustomButton;
