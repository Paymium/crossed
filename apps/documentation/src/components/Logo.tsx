/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export const Logo = ({ size = 24 }: { size?: number } = {}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width={size}
    height={size}
    viewBox="5 5 90 90"
  >
    <g fill="#0f79d7">
      <path d="M5 70.48l19.108-19.108a2.029 2.029 0 0 0 0-2.87L5.058 29.45l7.545-7.546 21.89 21.89a8.685 8.685 0 0 1 0 12.283L12.659 77.912 5 70.48zm90-41.03L75.892 48.559a2.029 2.029 0 0 0 0 2.87l19.05 19.051-7.545 7.546-21.89-21.89a8.685 8.685 0 0 1 0-12.283l21.834-21.834L95 29.45zM29.428 5l19.108 19.108a2.029 2.029 0 0 0 2.87 0l19.052-19.05 7.546 7.545-21.89 21.89a8.685 8.685 0 0 1-12.283 0L21.997 12.659 29.428 5zm41.144 90L51.463 75.892a2.029 2.029 0 0 0-2.87 0l-19.051 19.05-7.546-7.545 21.89-21.89a8.685 8.685 0 0 1 12.283 0l21.834 21.834L70.572 95z" />
    </g>
  </svg>
);
