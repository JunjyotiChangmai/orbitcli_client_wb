import React, { useState, useEffect } from 'react';

const TypeWriter = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const words = ['developers', 'engineers', 'programmers', 'inventors', 'hackers', 'debuggers'];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setText(
                isDeleting 
                    ? fullText.substring(0, text.length - 1)
                    : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 75 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, words]);

    return (
        <>
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Cuprum:ital,wght@0,400..700;1,400..700&family=Inter:wght@100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Manrope:wght@200..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');`}
            </style>
            <section className="py-0 px-2 relative" style={{ fontFamily: "'Lora', serif" }}>
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Built for 
                            <span className="text-primary mx-2">{' > '}</span>
                            <span className="text-primary min-h-[1.2em] inline-block">
                                {text}
                                <span className={`inline-block w-0.5 h-full bg-primary ml-1 ${isDeleting ? '' : 'animate-pulse'}`}></span>
                            </span>
                        </h1>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TypeWriter;