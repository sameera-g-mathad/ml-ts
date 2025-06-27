import React, { memo } from "react";
import { SystemPrompt } from "./index";
import { DropNaPrompt, FilterColumns } from './index';
import { systemPromptRenderType } from "./interface";

export const FilterColumnsPrompt = memo(() => {
    const systemMessage: string = '<p>Do you want to filter or select some columns to continue with?</p>'
    const renderUI: systemPromptRenderType = {
        'yes': {
            message: 'Yes, help me filter some of the columns.',
            renderComponent: <FilterColumns />
        },
        'no': {
            message: 'No, I am fine with my data, I want to proceed.',
            renderComponent: <DropNaPrompt />
        }
    }
    return <SystemPrompt systemMessage={systemMessage} renderInterface={renderUI} />;
});
