import React from "react";
import { FillNa, SystemPrompt, TerminateAbruptly } from './index'
import { systemPromptRenderType } from "./interface";
export const FillNaPrompt = () => {
    const systemMessage = 'Do you want to fill values?'
    const renderUI: systemPromptRenderType = {
        'yes': {
            message: 'Yes I want to use fillNa',
            renderComponent: <FillNa />
        },
        'no': {
            message: 'No, I want to end this session',
            renderComponent: <TerminateAbruptly />
        }
    }
    return <SystemPrompt systemMessage={systemMessage} renderInterface={renderUI} />
};
