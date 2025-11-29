import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Copy, Check, Terminal } from 'lucide-react';

const InstallOrbitCLI = () => {
    const [copied, setCopied] = useState(false);
    const command = 'npm install -g orbitcli';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="w-full max-w-xl mx-auto p-4 ">
            <div className="flex flex-col gap-2 rounded-xl shadow-2xl glow-border">
                
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-muted-foreground select-none font-mono text-sm">$</span>
                    </div>
                    <code className="block w-full rounded-md border border-input bg-muted/40 px-8 py-3 text-sm font-mono text-foreground transition-colors group-hover:bg-muted/60">
                        {command}
                    </code>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={copyToClipboard}
                        >
                            {copied ? (
                                <Check className="w-3.5 h-3.5" />
                            ) : (
                                <Copy className="w-3.5 h-3.5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstallOrbitCLI;