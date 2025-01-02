import { useTheme } from "@emotion/react";

export const AnxyIcon = ({ selected }: { selected: boolean }) => {
  const theme = useTheme();
  const orange = theme.anxy.colors.orange;
  return selected ? (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 9C11 9 13.625 7 18 7C22.375 7 25 9 25 9"
        stroke={orange}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="18" cy="18" r="16" stroke={orange} strokeWidth="1.6" />
      <path
        d="M15.5 20C15.5 20 16.2494 21.5 18 21.5C19.7506 21.5 20.5 20 20.5 20"
        stroke={orange}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="13.5" cy="13.5" rx="1.5" ry="2.5" fill={orange} />
      <ellipse cx="22.5" cy="13.5" rx="1.5" ry="2.5" fill={orange} />
      <path
        d="M16.5619 15.474L17.592 12.2694C17.7195 11.8728 18.2805 11.8728 18.408 12.2694L19.4381 15.474C19.4773 15.596 19.4599 15.7291 19.3906 15.8369L18.3605 17.4392C18.1918 17.7016 17.8082 17.7016 17.6395 17.4392L16.6094 15.8369C16.5401 15.7291 16.5227 15.596 16.5619 15.474Z"
        fill={orange}
      />
    </svg>
  ) : (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.2">
        <path
          d="M11 11C11 11 13.625 9 18 9C22.375 9 25 11 25 11"
          stroke="black"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="18" cy="18" r="16" stroke="black" strokeWidth="1.6" />
        <path
          d="M15.5 24C15.5 24 16.2494 25.5 18 25.5C19.7506 25.5 20.5 24 20.5 24"
          stroke="black"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <ellipse cx="13.5" cy="16.5" rx="1.5" ry="2.5" fill="black" />
        <ellipse cx="22.5" cy="16.5" rx="1.5" ry="2.5" fill="black" />
        <path
          d="M16.5619 19.474L17.592 16.2694C17.7195 15.8728 18.2805 15.8728 18.408 16.2694L19.4381 19.474C19.4773 19.596 19.4599 19.7291 19.3906 19.8369L18.3605 21.4392C18.1918 21.7016 17.8082 21.7016 17.6395 21.4392L16.6094 19.8369C16.5401 19.7291 16.5227 19.596 16.5619 19.474Z"
          fill="black"
        />
      </g>
    </svg>
  );
};
export const WorryIcon = ({ selected }: { selected: boolean }) => {
  const theme = useTheme();
  const orange = theme.anxy.colors.orange;
  return selected ? (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9738 1.40682L11.2157 1.66216V1.66216L11.9738 1.40682ZM11.0262 1.40682L11.7843 1.66216V1.66216L11.0262 1.40682ZM12.8197 3.91828L12.0615 4.17362C12.1305 4.37835 12.2793 4.54649 12.4741 4.6398C12.6689 4.73311 12.8932 4.74366 13.096 4.66906L12.8197 3.91828ZM23.1803 3.91828L22.904 4.66906C23.1068 4.74366 23.3311 4.73311 23.5259 4.6398C23.7207 4.54649 23.8695 4.37835 23.9385 4.17362L23.1803 3.91828ZM24.0262 1.40682L24.7843 1.66216V1.66216L24.0262 1.40682ZM24.9738 1.40682L24.2157 1.66216V1.66216L24.9738 1.40682ZM26.3691 5.54964L25.6109 5.80498C25.667 5.97154 25.7764 6.11499 25.9222 6.21317L26.3691 5.54964ZM9.6309 5.54964L10.0778 6.21317C10.2236 6.11499 10.333 5.97154 10.3891 5.80498L9.6309 5.54964ZM12.732 1.15148C12.3346 -0.028624 10.6654 -0.0286144 10.268 1.15148L11.7843 1.66216C11.6926 1.93449 11.3074 1.93449 11.2157 1.66216L12.732 1.15148ZM13.5778 3.66294L12.732 1.15148L11.2157 1.66216L12.0615 4.17362L13.5778 3.66294ZM13.096 4.66906C14.6234 4.10697 16.2749 3.79971 18 3.79971V2.19971C16.0836 2.19971 14.2451 2.54126 12.5434 3.16751L13.096 4.66906ZM18 3.79971C19.7251 3.79971 21.3766 4.10697 22.904 4.66906L23.4566 3.16751C21.7549 2.54126 19.9164 2.19971 18 2.19971V3.79971ZM23.268 1.15148L22.4222 3.66294L23.9385 4.17362L24.7843 1.66216L23.268 1.15148ZM25.732 1.15148C25.3346 -0.028624 23.6654 -0.0286144 23.268 1.15148L24.7843 1.66216C24.6926 1.93449 24.3074 1.93449 24.2157 1.66216L25.732 1.15148ZM27.1273 5.2943L25.732 1.15148L24.2157 1.66216L25.6109 5.80498L27.1273 5.2943ZM25.9222 6.21317C29.7107 8.76491 32.2 13.0918 32.2 17.9997H33.8C33.8 12.5372 31.0272 7.72251 26.816 4.88611L25.9222 6.21317ZM32.2 17.9997C32.2 25.8422 25.8424 32.1997 18 32.1997V33.7997C26.7261 33.7997 33.8 26.7258 33.8 17.9997H32.2ZM18 32.1997C10.1576 32.1997 3.8 25.8422 3.8 17.9997H2.2C2.2 26.7258 9.2739 33.7997 18 33.7997V32.1997ZM3.8 17.9997C3.8 13.0918 6.28925 8.76491 10.0778 6.21317L9.18399 4.88611C4.97279 7.72251 2.2 12.5372 2.2 17.9997H3.8ZM10.268 1.15148L8.87274 5.2943L10.3891 5.80498L11.7843 1.66216L10.268 1.15148Z"
        fill={orange}
      />
      <path
        d="M13 25H23"
        stroke={orange}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.53 18C20.5103 18.1616 20.5 18.3288 20.5 18.5C20.5 19.8807 21.1716 21 22 21C22.8284 21 23.5 19.8807 23.5 18.5C23.5 18.3288 23.4897 18.1616 23.47 18H20.53Z"
        fill={orange}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.53 18C12.5103 18.1616 12.5 18.3288 12.5 18.5C12.5 19.8807 13.1716 21 14 21C14.8284 21 15.5 19.8807 15.5 18.5C15.5 18.3288 15.4897 18.1616 15.47 18H12.53Z"
        fill={orange}
      />
    </svg>
  ) : (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3">
        <path
          d="M11.9719 1.40706L11.2137 1.6624V1.6624L11.9719 1.40706ZM11.0242 1.40706L11.7824 1.6624V1.6624L11.0242 1.40706ZM12.8177 3.91853L12.0596 4.17386C12.1285 4.37859 12.2773 4.54673 12.4722 4.64004C12.667 4.73336 12.8913 4.74391 13.094 4.6693L12.8177 3.91853ZM23.1784 3.91853L22.9021 4.6693C23.1048 4.74391 23.3291 4.73336 23.5239 4.64004C23.7188 4.54673 23.8676 4.37859 23.9365 4.17386L23.1784 3.91853ZM24.0242 1.40706L24.7824 1.6624V1.6624L24.0242 1.40706ZM24.9719 1.40706L24.2137 1.6624V1.6624L24.9719 1.40706ZM26.3671 5.54988L25.609 5.80522C25.6651 5.97178 25.7745 6.11523 25.9202 6.21341L26.3671 5.54988ZM9.62895 5.54988L10.0759 6.21341C10.2216 6.11523 10.331 5.97178 10.3871 5.80522L9.62895 5.54988ZM12.7301 1.15173C12.3326 -0.0283798 10.6635 -0.0283703 10.266 1.15173L11.7824 1.6624C11.6906 1.93473 11.3055 1.93474 11.2137 1.6624L12.7301 1.15173ZM13.5759 3.66319L12.7301 1.15173L11.2137 1.6624L12.0596 4.17386L13.5759 3.66319ZM13.094 4.6693C14.6214 4.10721 16.2729 3.79995 17.998 3.79995V2.19995C16.0816 2.19995 14.2432 2.54151 12.5414 3.16775L13.094 4.6693ZM17.998 3.79995C19.7231 3.79995 21.3747 4.10721 22.9021 4.6693L23.4547 3.16775C21.7529 2.54151 19.9145 2.19995 17.998 2.19995V3.79995ZM23.266 1.15173L22.4202 3.66319L23.9365 4.17386L24.7824 1.6624L23.266 1.15173ZM25.7301 1.15173C25.3326 -0.0283798 23.6635 -0.0283703 23.266 1.15173L24.7824 1.6624C24.6906 1.93473 24.3055 1.93474 24.2137 1.6624L25.7301 1.15173ZM27.1253 5.29455L25.7301 1.15173L24.2137 1.6624L25.609 5.80522L27.1253 5.29455ZM25.9202 6.21341C29.7088 8.76515 32.198 13.092 32.198 18H33.798C33.798 12.5374 31.0253 7.72276 26.8141 4.88636L25.9202 6.21341ZM32.198 18C32.198 25.8424 25.8405 32.2 17.998 32.2V33.8C26.7241 33.8 33.798 26.7261 33.798 18H32.198ZM17.998 32.2C10.1556 32.2 3.79805 25.8424 3.79805 18H2.19805C2.19805 26.7261 9.27195 33.8 17.998 33.8V32.2ZM3.79805 18C3.79805 13.092 6.2873 8.76515 10.0759 6.21341L9.18204 4.88636C4.97084 7.72276 2.19805 12.5374 2.19805 18H3.79805ZM10.266 1.15173L8.87079 5.29455L10.3871 5.80522L11.7824 1.6624L10.266 1.15173Z"
          fill="#26282C"
        />
        <path
          d="M13 23H23"
          stroke="#26282C"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <ellipse cx="22" cy="16.5" rx="1.5" ry="2.5" fill="#26282C" />
        <ellipse cx="14" cy="16.5" rx="1.5" ry="2.5" fill="#26282C" />
      </g>
    </svg>
  );
};