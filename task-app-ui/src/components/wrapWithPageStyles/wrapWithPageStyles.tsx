import React from "react";
import { Box, SxProps } from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const pageStyle: SxProps = {
    position: 'absolute',
    top: 80,
    width: '100%',
    // height: '100vh',
    padding: '16px 24px 32px 24px',
    overflowY: 'auto',
    // backgroundColor: '#fafafa',
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