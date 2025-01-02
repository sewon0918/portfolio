import { addAlpha } from "@/utils/helpers";
import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/Avatar" {
  interface AvatarPropsColorOverrides {
    primary: true;
    secondary: true;
  }
}
declare module "@mui/joy/Button" {
  interface ButtonPropsColorOverrides {
    primary: true;
    secondary: true;
    white: true;
  }
  interface ButtonPropsVariantOverrides {
    plain: true;
    soft: true;
    solid: true;
  }
  interface ButtonPropsSizeOverrides {
    xs: true;
  }
}

declare module "@mui/joy/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    primary: true;
    soft: true;
    positive: true;
    background3: true;
  }
}
declare module "@mui/joy/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    primary: true;
  }
}
declare module "@mui/joy/Typography" {
  interface TypographyPropsColorOverrides {
    positive: true;
    negative: true;
  }
}
declare module "@mui/joy/Checkbox" {
  interface CheckboxPropsColorOverrides {
    primary: true;
  }
}

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    // apply to all Joy UI components that support `color` prop
    primary: true;
    card: true;
    text: true;
    divider: true;
    transparent: true;
    common: true;
  }

  interface Palette {
    // this will make the node `secondary` configurable in `extendTheme`
    // and add `secondary` to the theme's palette.
    primary: {
      solid: string;
      soft: string;
      deactivated: string;
    };
    secondary: {
      solid: string;
      soft: string;
      deactivated: string;
    };
    background: {
      level1: string;
      level2: string;
      level3: string;
    };
    card: { background: string; lightStroke: string };
    text: {
      positive: string;
      negative: string;
      green: string;
      blue: string;
      orange: string;
    };
    divider: string;
    transparent: string;
    common: { black: string; white: string };
  }
}

export const theme = extendTheme({
  // fontFamily: {
  //   display: "Roboto", // applies to `h1`–`h4`
  //   body: "Roboto", // applies to `title-*` and `body-*`
  // },

  // fontFamily: "Arial, sans-serif",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solid: "#2B9FDF",
          soft: "#D6EFFE",
          deactivated: "#D6E3EB",
        },
        secondary: {
          solid: "#4B6D8A",
          soft: "#DDE8F1",
          deactivated: "#BAC9D5",
        },
        neutral: { 100: "#F6F9FA", 200: "#E5E9F0", 300: "#D7DBE3" },
        common: {
          black: "#20242B",
          white: "#ffffff",
        },
        background: {
          level3: "#E6EFF2",
          level2: "#EEF3F5",
          level1: "#F6F9FA",
        },
        card: {
          background: addAlpha("#FFFFFF", 0.85),
          lightStroke: "#FFFFFF",
        },
        text: {
          positive: "#1E1E1E",
          negative: "#FFFFFF",
          green: "#349434",
          blue: "#4747A6",
          orange: "#CC7611",
        },
        divider: addAlpha("#2E2B2B", 0.1),
        transparent: addAlpha("#ffffff", 0),
      },
    },
  },
  components: {
    // JoyCircularProgress: {
    //   defaultProps: {
    //     color: "primary",
    //   },
    //   styleOverrides: {
    //     root: ({ ownerState, theme }) => ({
    //       ...(ownerState.color === "primary" && {
    //         stroke: theme.vars.palette.primary.solid,
    //       }),
    //     }),
    //   },
    // },
    JoyCheckbox: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        checkbox: ({ ownerState, theme }) => ({
          ...(ownerState.color === "primary" && {
            borderColor: theme.vars.palette.primary.solid,
            "&:hover": {
              backgroundColor: ownerState.checked
                ? theme.vars.palette.primary.solid
                : theme.vars.palette.primary.soft,
            },
            ...(ownerState.checked && {
              backgroundColor: theme.vars.palette.primary.solid,
              color: theme.vars.palette.text.negative,
            }),
          }),
        }),
      },
    },
    JoySvgIcon: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === "primary" && {
            color: theme.vars.palette.primary.solid,
          }),
          ...(ownerState.color === "soft" && {
            color: theme.vars.palette.primary.soft,
          }),
          ...(ownerState.color === "positive" && {
            color: theme.vars.palette.text.positive,
          }),
          ...(ownerState.color === "background3" && {
            color: theme.vars.palette.background.level3,
          }),
        }),
      },
    },
    JoyTypography: {
      defaultProps: {
        level: "body-sm",
        color: "positive",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === "positive" && {
            color: theme.vars.palette.text.positive,
          }),
          ...(ownerState.color === "negative" && {
            color: theme.vars.palette.text.negative,
          }),
          ...(ownerState.color === "primary" && {
            color: theme.vars.palette.primary.solid,
          }),
        }),
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === "primary" && {
            backgroundColor: theme.vars.palette.primary.soft,
            color: theme.vars.palette.primary.solid,
          }),
          ...(ownerState.color === "secondary" && {
            backgroundColor: theme.vars.palette.secondary.solid,
            color: theme.vars.palette.text.negative,
          }),
        }),
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderWidth: "0px",
          borderRadius: "6px",
          borderStyle: "solid",
          whiteSpace: "normal",

          ...(ownerState.size === "xs" && {
            fontSize: theme.vars.fontSize.xs,
            paddingInline: "1rem",
            minHeight: "2rem",
          }),
          ...(ownerState.size === "sm" && {
            fontSize: "14px",
            fontWeight: 700,
            paddingInline: "1rem",
            minHeight: "36px",
            borderRadius: "6px",
          }),
          ...(ownerState.size === "md" && {
            fontSize: "1rem",
            fontWeight: 700,
            paddingInline: "1rem",
            minHeight: "46px",
            borderRadius: "6px",
          }),

          ...(ownerState.size === "lg" && {
            fontSize: "1rem",
            minHeight: "54px",
            borderRadius: "12px",
          }),

          ...(ownerState.variant === "solid" && {
            ...(ownerState.color === "primary"
              ? {
                  backgroundColor: theme.vars.palette.primary.solid,
                  color: theme.vars.palette.text.negative,
                  "@media (min-width: 1024px)": {
                    // 모바일에서 터치 끝나도 hover로 잡는 문제 때문에 hover은 1024 이상에서만 적용
                    //ios : 버튼 클릭 후 touchend 해도 hover
                    "&:hover": {
                      backgroundColor: theme.vars.palette.primary.solid,
                      color: theme.vars.palette.text.negative,
                      opacity: 0.6,
                    },
                  },
                  "@media (max-width: 1024px)": {
                    // 모바일에서 터치 끝나도 hover로 잡는 문제 때문에 hover은 1024 이상에서만 적용
                    //ios : 버튼 클릭 후 touchend 해도 hover
                    "&:hover": {
                      backgroundColor: theme.vars.palette.primary.solid,
                      color: theme.vars.palette.text.negative,
                    },
                  },
                  //클릭 이후 포커스 상태
                  "&:focus": {
                    backgroundColor: theme.vars.palette.primary.solid,
                  },
                  //모바일 클릭
                  "&:active": {
                    backgroundColor: theme.vars.palette.primary.solid,
                    opacity: 0.6,
                  },

                  "&.Mui-disabled": {
                    backgroundColor: theme.vars.palette.primary.deactivated,
                    color: theme.vars.palette.secondary.deactivated,
                  },
                  "&.MuiButton-loading": {
                    backgroundColor: theme.vars.palette.primary.solid,
                    color: "transparent",
                    opacity: 0.6,
                  },
                }
              : ownerState.color === "secondary"
              ? {
                  backgroundColor: theme.vars.palette.secondary.solid,
                  color: theme.vars.palette.text.negative,
                  "@media (min-width: 1024px)": {
                    // 모바일에서 터치 끝나도 hover로 잡는 문제 때문에 hover은 1024 이상에서만 적용
                    //ios : 버튼 클릭 후 touchend 해도 hover
                    "&:hover": {
                      backgroundColor: theme.vars.palette.secondary.solid,
                      color: theme.vars.palette.text.negative,
                      opacity: 0.6,
                    },
                  },
                  //클릭 이후 포커스 상태
                  "&:focus": {
                    backgroundColor: theme.vars.palette.secondary.solid,
                  },
                  //모바일 클릭
                  "&:active": {
                    backgroundColor: theme.vars.palette.secondary.solid,
                    opacity: 0.6,
                  },

                  "&.Mui-disabled": {
                    backgroundColor: theme.vars.palette.primary.deactivated,
                    color: theme.vars.palette.secondary.deactivated,
                  },
                  "&.MuiButton-loading": {
                    backgroundColor: theme.vars.palette.secondary.solid,
                    color: "transparent",
                    opacity: 0.6,
                  },
                }
              : ownerState.color === "danger"
              ? {
                  backgroundColor: theme.vars.palette.danger[500],
                  color: theme.vars.palette.text.negative,
                  "@media (min-width: 1024px)": {
                    // 모바일에서 터치 끝나도 hover로 잡는 문제 때문에 hover은 1024 이상에서만 적용
                    //ios : 버튼 클릭 후 touchend 해도 hover
                    "&:hover": {
                      backgroundColor: theme.vars.palette.danger[500],
                      color: theme.vars.palette.text.negative,
                      opacity: 0.6,
                    },
                  },
                  //클릭 이후 포커스 상태
                  "&:focus": {
                    backgroundColor: theme.vars.palette.danger[500],
                  },
                  //모바일 클릭
                  "&:active": {
                    backgroundColor: theme.vars.palette.danger[500],
                    opacity: 0.6,
                  },

                  "&.Mui-disabled": {
                    backgroundColor: theme.vars.palette.primary.deactivated,
                    color: theme.vars.palette.secondary.deactivated,
                  },
                  "&.MuiButton-loading": {
                    backgroundColor: theme.vars.palette.danger[500],
                    color: "transparent",
                    opacity: 0.6,
                  },
                }
              : ownerState.color === "white"
              ? {
                  backgroundColor: theme.vars.palette.common.white,
                  color: theme.vars.palette.primary.solid,
                  "@media (min-width: 1024px)": {
                    // 모바일에서 터치 끝나도 hover로 잡는 문제 때문에 hover은 1024 이상에서만 적용
                    //ios : 버튼 클릭 후 touchend 해도 hover
                    "&:hover": {
                      backgroundColor: theme.vars.palette.common.white,
                      color: theme.vars.palette.primary.solid,
                      opacity: 0.6,
                    },
                  },
                  //클릭 이후 포커스 상태
                  "&:focus": {
                    backgroundColor: theme.vars.palette.common.white,
                  },
                  //모바일 클릭
                  "&:active": {
                    backgroundColor: theme.vars.palette.common.white,
                    opacity: 0.6,
                  },

                  "&.Mui-disabled": {
                    backgroundColor: theme.vars.palette.common.white,
                    color: theme.vars.palette.primary.solid,
                  },
                  "&.MuiButton-loading": {
                    backgroundColor: theme.vars.palette.common.white,
                    color: "transparent",
                    opacity: 0.6,
                  },
                }
              : {}),
          }),

          ...(ownerState.variant === "soft" && {
            ...(ownerState.color === "primary"
              ? {
                  backgroundColor: theme.vars.palette.primary.soft,
                  color: theme.vars.palette.primary.solid,

                  "@media (min-width: 1024px)": {
                    "&:hover": {
                      backgroundColor: theme.vars.palette.primary.soft,
                      opacity: 0.6,
                    },
                  },
                  "@media (max-width: 1024px)": {
                    "&:hover": {
                      backgroundColor: theme.vars.palette.primary.soft,
                      color: theme.vars.palette.primary.solid,
                    },
                  },
                  "&:focus": {
                    backgroundColor: theme.vars.palette.primary.soft,
                  },
                  "&:active": {
                    backgroundColor: theme.vars.palette.primary.soft,
                    opacity: 0.6,
                  },
                  "&.Mui-disabled": {
                    backgroundColor: theme.vars.palette.primary.deactivated,
                    color: theme.vars.palette.secondary.deactivated,
                  },
                  "&.MuiButton-loading": {
                    backgroundColor: theme.vars.palette.primary.soft,
                    color: "transparent",
                    opacity: 0.6,
                  },
                }
              : {
                  backgroundColor: theme.vars.palette.secondary.soft,
                  color: theme.vars.palette.secondary.solid,

                  "@media (min-width: 1024px)": {
                    "&:hover": {
                      backgroundColor: theme.vars.palette.secondary.soft,
                      opacity: 0.6,
                    },
                  },
                  "@media (max-width: 1024px)": {
                    "&:hover": {
                      backgroundColor: theme.vars.palette.secondary.soft,
                      color: theme.vars.palette.secondary.solid,
                    },
                  },
                  "&:focus": {
                    backgroundColor: theme.vars.palette.secondary.soft,
                  },
                  "&:active": {
                    backgroundColor: theme.vars.palette.secondary.soft,
                    opacity: 0.6,
                  },
                  "&.Mui-disabled": {
                    backgroundColor: theme.vars.palette.primary.deactivated,
                    color: theme.vars.palette.secondary.deactivated,
                  },
                  "&.MuiButton-loading": {
                    backgroundColor: theme.vars.palette.secondary.soft,
                    color: "transparent",
                    opacity: 0.6,
                  },
                }),
          }),

          ...(ownerState.variant === "plain" && {
            color: theme.vars.palette.secondary.solid,
            backgroundColor: theme.vars.palette.transparent,
            "@media (min-width: 1024px)": {
              "&:hover": {
                backgroundColor: theme.vars.palette.transparent,
                opacity: 0.6,
              },
            },
            "@media (max-width: 1024px)": {
              "&:hover": {
                backgroundColor: theme.vars.palette.transparent,
              },
            },
            "&:active": {
              backgroundColor: theme.vars.palette.transparent,
              opacity: 0.6,
            },
            "&.Mui-disabled": {
              backgroundColor: theme.vars.palette.transparent,
              color: theme.vars.palette.secondary.deactivated,
            },
          }),
          ...(ownerState.variant === "outlined" && {
            ...(ownerState.color === "primary"
              ? {
                  backgroundColor: theme.vars.palette.transparent,
                  boxShadow: `inset 0 0 0 1px ${theme.vars.palette.primary.solid}`,
                  color: theme.vars.palette.primary.solid,

                  "@media (min-width: 1024px)": {
                    "&:hover": {
                      backgroundColor: theme.vars.palette.transparent,
                      opacity: 0.6,
                    },
                  },
                  "@media (max-width: 1024px)": {
                    "&:hover": {
                      backgroundColor: theme.vars.palette.transparent,
                    },
                  },
                  "&:active": {
                    backgroundColor: theme.vars.palette.transparent,
                    opacity: 0.6,
                  },
                  "&.Mui-disabled": {
                    backgroundColor: theme.vars.palette.transparent,
                    boxShadow: `inset 0 0 0 1px ${theme.vars.palette.primary.deactivated}`,
                    color: theme.vars.palette.primary.deactivated,
                  },
                }
              : {
                  //secondary
                  backgroundColor: theme.vars.palette.transparent,
                  boxShadow: `inset 0 0 0 1px ${theme.vars.palette.secondary.soft}`,
                  color: theme.vars.palette.secondary.solid,

                  "@media (min-width: 1024px)": {
                    "&:hover": {
                      backgroundColor: theme.vars.palette.transparent,
                      opacity: 0.6,
                    },
                  },
                  "@media (max-width: 1024px)": {
                    "&:hover": {
                      backgroundColor: theme.vars.palette.transparent,
                    },
                  },
                  "&:active": {
                    backgroundColor: theme.vars.palette.transparent,
                    opacity: 0.6,
                  },
                  "&.Mui-disabled": {
                    backgroundColor: theme.vars.palette.transparent,
                    boxShadow: `inset 0 0 0 1px ${theme.vars.palette.secondary.deactivated}`,
                    color: theme.vars.palette.secondary.deactivated,
                  },
                }),
          }),
        }),
      },
    },
  },
});
