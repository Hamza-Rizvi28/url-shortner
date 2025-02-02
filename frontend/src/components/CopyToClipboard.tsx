import { Button } from '@mui/material';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface CopyToClipboardProps {
    copiedText: string | undefined;
} 

const CopyToClipboardComponent: React.FC<CopyToClipboardProps> = ({copiedText}) => {
    const [copied, setCopied] = useState(false);

    return (
        <div>
            <CopyToClipboard
                text={copiedText}
                onCopy={() => setCopied(true)}
            >
                <Button variant='contained' color='primary' sx={{marginTop:2}}>
                {copied ? "Copied!" : "Copy to Clipboard"}
                </Button>
            </CopyToClipboard>
        </div>
    );
};

export default CopyToClipboardComponent;
