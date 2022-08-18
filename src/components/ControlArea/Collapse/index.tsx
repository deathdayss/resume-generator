import { Collapse, CollapseProps } from "@mui/material"
import React, { useContext } from "react";

interface CollapsePanelprops extends CollapseProps {
    collapseId: string;
}

export const CollapsePanel = (props: CollapsePanelprops) => {
    const { in: boolean, collapseId, ...CollapseProps } = props;
    const collapseState = useContext(CollapseContext);
    return <Collapse {...CollapseProps} in={collapseState.includes(collapseId)} />
}

interface CollapseAllProps {
    children: React.ReactNode;
    collapseState: string[];
}

const CollapseContext = React.createContext<string[]>([]);

export const CollapseAll = ({ collapseState, children }: CollapseAllProps) => {
    return <CollapseContext.Provider value={collapseState}>{children} </CollapseContext.Provider>
}

