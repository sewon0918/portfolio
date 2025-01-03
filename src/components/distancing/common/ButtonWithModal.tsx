import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Box, Typography } from "@mui/joy";
import React, { useState } from "react";
import { addAlpha } from "@/utils/helpers";

export default function ButtonWithModal({
  title,
  subtitle,
  textAlign,
  content,
  onClick,
  action,
  actionText,
  render,
  isWide,
}: {
  title?: string;
  subtitle?: string;
  textAlign?: "center";
  content?: React.ReactNode;
  onClick?: () => void;
  action?: () => void;
  actionText?: string;
  onClose?: () => void;
  render?: React.ReactNode;
  actionAfterFetch?: () => void;
  isWide?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setOpen(true);
  };

  return (
    <React.Fragment>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {render}
      </div>

      <Modal
        open={open}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            (e as MouseEvent).stopPropagation();
          }
          setOpen(false);
        }}
        sx={{
          "&>.MuiModal-backdrop": {
            backdropFilter: "none",
            backgroundColor: addAlpha("#000000", 0.3),
            opacity: open ? 1 : 0,
            transition: "all 0.3s",
          },
        }}
      >
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            ...(isWide && {
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                maxWidth: "600px",
              },
            }),
          })}
          onClick={(e) => {
            // e.preventDefault();
            e.stopPropagation();
          }}
        >
          {title && (
            <Typography
              id="nested-modal-title"
              level="h2"
              sx={{ textAlign: textAlign }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography id="nested-modal-description" textColor="text.tertiary">
              {subtitle}
            </Typography>
          )}
          {content}
          {actionText && (
            <Box
              sx={{
                mt: 1,
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row-reverse" },
              }}
            >
              {actionText && (
                <Button
                  variant="solid"
                  size="lg"
                  color={"primary"}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (action) {
                      action();
                    }
                    setOpen(false);
                  }}
                  sx={{
                    width: "auto",
                  }}
                >
                  {actionText}
                </Button>
              )}
            </Box>
          )}
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
