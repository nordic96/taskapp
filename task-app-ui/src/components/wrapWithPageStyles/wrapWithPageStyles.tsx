import React from "react";
import { Box, SxProps } from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const pageStyle: SxProps = {
    position: 'absolute',
    top: 70,
    width: '-webkit-fill-available',
    padding: '0 24px 32px 24px',
    overflowY: 'auto',
};

/**
 * @param PageNode PageNode Component to be wrapped with page styles
 * @returns ReactJSX Element that is wrapped with Page Node and Page Styles
 */
export function wrapWithPageStyles<P>(PageNode: React.ComponentType<P>) {
    return (props: P): ReactJSXElement => {
        return (
            <Box id={'pagebody'} sx={pageStyle}>
                <PageNode {...props} />
            </Box>
        );
    };
};