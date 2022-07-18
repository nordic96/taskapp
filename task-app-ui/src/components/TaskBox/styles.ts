import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const TaskBoxStyle = (color: string): SxProps<Theme> => ({
    borderLeft: `10px solid ${color}`,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    width: '40vw',
    maxWidth: 600,
    minHeight: 50,
    borderRadius: '4px',
    padding: '16px 24px',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
});
