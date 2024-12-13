import seed from "@/assets/anxy/store/seed.png";
export default function Seed({
  containerSize = 25,
}: {
  containerSize?: number;
}) {
  return (
    <img
      src={seed}
      css={{ width: `${containerSize}px`, height: `${containerSize}px` }}
    />
  );
}

export function SeedWithShadow() {
  return (
    <svg
      width="151"
      height="106"
      viewBox="0 0 151 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_218_8499)">
        <ellipse
          cx="29"
          cy="5.25"
          rx="29"
          ry="5.25"
          transform="matrix(-1 0 0 1 99.5 95)"
          fill="#F3F3F3"
        />
        <g filter="url(#filter0_i_218_8499)">
          <path
            d="M97.5 57.8C97.5 73.9267 85.4117 87 70.5 87C55.5883 87 43.5 73.9267 43.5 57.8C43.5 49.3243 50.958 37.6592 58.0346 28.4984C64.447 20.1974 76.553 20.1974 82.9654 28.4984C90.042 37.6592 97.5 49.3243 97.5 57.8Z"
            fill="url(#paint0_linear_218_8499)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_i_218_8499"
          x="43.5"
          y="22.2725"
          width="54"
          height="64.7275"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-3" dy="-4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_218_8499"
          />
        </filter>
        <linearGradient
          id="paint0_linear_218_8499"
          x1="70.5"
          y1="14"
          x2="70.5"
          y2="87"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D5E86F" />
          <stop offset="1" stopColor="#94A36A" />
        </linearGradient>
        <clipPath id="clip0_218_8499">
          <rect
            width="150"
            height="105"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
