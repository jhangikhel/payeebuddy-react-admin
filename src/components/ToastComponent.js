import React, { useEffect, useRef } from "react";
import { CToaster, CToastBody, CToastHeader, CToast } from "@coreui/react";

export const ToastComponent = ({ msg }) => {


    return (
        <CToaster
            className="p-3" placement="top-end"
        >
            <CToast
                animation={true}
                autohide={true}
                delay={7000}
                color="danger"
                visible={true}
            >
                <CToastBody>{msg}</CToastBody>
            </CToast>
        </CToaster >
    );
};
