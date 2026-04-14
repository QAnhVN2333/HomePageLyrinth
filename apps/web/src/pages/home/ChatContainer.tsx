import {useEffect, useState} from "react";
import {ScrollDownButton} from "../../features/util/components/util.tsx";

const titleLines = [
    "Just type your question below and let's get started!",
    'What would you like to do today? ',
    'Welcome to your AI assistant! ',
    'What would you like to do today? ',
    'How can I assist you today? ',
    'Welcome back! ',
    'Ready to help you with anything!',
    'Your personal AI assistant is here!',
    'Need assistance? Just ask!',
    'Your AI companion is ready to assist!',
    'How can I make your day better?',
];

const placeholderHints = [
    'Type your message here...',
    'Ask me to explain a concept in simple terms.',
    'Need help drafting an email or document?',
    'Paste your idea and let me structure it.',
    'Want a quick summary? Drop your text here.',

    // 🔎 SEARCH
    'Search latest info about a topic.',
    'Find reliable sources for this question.',
    'Look up recent news for me.',
    'Search and summarize key points.',
    'Compare information from multiple sources.',
    'Search videos and images for me.',

    // 🧠 THINK
    'Explain this step by step.',
    'Break this problem into smaller parts.',
    'Help me understand the logic behind this.',
    'Think through this problem with me.',
    'Find the best solution and explain why.',
    'What are the pros and cons of this idea?',
    'Give me a simple real-world example.',

    // 📚 STUDY
    'Create a 4-option multiple choice quiz.',
    'Make a true/false quiz for this topic.',
    'Generate fill-in-the-blank questions.',
    'Create a matching columns exercise.',
    'Quiz me and check my answers.',
    'Make an easy quiz for beginners.',
    'Make a harder test to challenge me.',
    'Summarize this lesson for me.',
    'Turn this into flashcards.',
    'Give me key points to remember.',
    'Test me after I study this.',

    // 🌍 DAILY LIFE (đa lĩnh vực)
    'What should I eat today?',
    'Give me a quick workout plan.',
    'Suggest a movie to watch tonight.',
    'How can I save money effectively?',
    'What’s a good habit to build?',
    'Help me plan my day.',
    'Give me a simple healthy meal idea.',
    'What should I learn today?',
    'Explain a trending topic.',
    'Help me stay focused while studying.',

    // 💻 TECH / CODING
    'Debug this code for me.',
    'Explain this error message.',
    'Optimize this code for performance.',
    'Convert this idea into code.',
    'Suggest a project I can build.',
    'Explain this concept with an example.',

    // 🎯 FUN / RANDOM
    'Tell me something interesting.',
    'Ask me a fun question.',
    'Give me a random fact.',
    'Challenge me with a puzzle.',
    'Let’s play a quick quiz game.',

    //IMAGE UNSTANDING
    'Describe the content of this image.',
    'What objects can you identify in this picture?',
    'What is this MEME about?',
    'Where do you think this photo was taken?',

    //FILE UNDERSTANDING
    'Summarize the content of this document.',
    'What are the key points in this file?',
    'Can you extract important information from this file?',
];
const fallbackPlaceholderText = 'Type your message here...';
const typeSpeedMs = 55;
const deleteSpeedMs = 10;
const pauseAfterTypeMs = 1100;
const pauseAfterDeleteMs = 300;

type PlaceholderPhase = 'typing' | 'holdAfterTyping' | 'deleting' | 'holdAfterDeleting';

function pickRandomTitle(lines: string[]): string {
    const randomIndex = Math.floor(Math.random() * lines.length);
    return lines[randomIndex];
}

function AnimatedPlaceholderText() {
    const [hintIndex, setHintIndex] = useState<number>(0);
    const [charIndex, setCharIndex] = useState<number>(0);
    const [displayText, setDisplayText] = useState<string>('');
    const [phase, setPhase] = useState<PlaceholderPhase>('typing');

    useEffect(() => {
        if (!placeholderHints.length) {
            return;
        }

        const currentHint = placeholderHints[hintIndex] ?? fallbackPlaceholderText;
        let timerId: ReturnType<typeof setTimeout> | undefined;

        // Type one character per tick until the full hint is visible.
        if (phase === 'typing') {
            if (charIndex < currentHint.length) {
                timerId = setTimeout(() => {
                    const nextCharIndex = charIndex + 1;
                    setCharIndex(nextCharIndex);
                    setDisplayText(currentHint.slice(0, nextCharIndex));
                }, typeSpeedMs);
            } else {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setPhase('holdAfterTyping');
            }
        }

        // Keep the full text visible for a short pause.
        if (phase === 'holdAfterTyping') {
            timerId = setTimeout(() => {
                setPhase('deleting');
            }, pauseAfterTypeMs);
        }

        // Delete one character per tick until the hint is empty.
        if (phase === 'deleting') {
            if (charIndex > 0) {
                timerId = setTimeout(() => {
                    const nextCharIndex = charIndex - 1;
                    setCharIndex(nextCharIndex);
                    setDisplayText(currentHint.slice(0, nextCharIndex));
                }, deleteSpeedMs);
            } else {
                setPhase('holdAfterDeleting');
            }
        }

        // Pause briefly, then move to the next hint and start typing again.
        if (phase === 'holdAfterDeleting') {
            timerId = setTimeout(() => {
                setHintIndex((prevIndex) => (prevIndex + 1) % placeholderHints.length);
                setCharIndex(0);
                setDisplayText('');
                setPhase('typing');
            }, pauseAfterDeleteMs);
        }

        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [charIndex, hintIndex, phase]);

    return <span>{placeholderHints.length ? displayText : fallbackPlaceholderText}</span>;
}

export function ChatContainer() {
    const [title] = useState<string>(() => pickRandomTitle(titleLines));

    return (
        <div className="home-chat__container" id="home">
            <div className="home-chat__chat-header">
                <h1 className="home-chat__title">{title}</h1>
            </div>
            <div className="home-chat__chat-input-wrapper home-chat__chat-input-wrapper--default">
                <div className="home-chat__chat-input">

                    <textarea
                        id="text-redirect-input"
                        placeholder=""
                        rows={1}
                        onInput={(e) => {
                            // Toggle default wrapper class based on whether textarea has content.
                            const wrapper = document.querySelector('.home-chat__chat-input-wrapper') as HTMLDivElement;
                            if ((e.currentTarget as HTMLTextAreaElement).value.trim()) {
                                wrapper.classList.remove('home-chat__chat-input-wrapper--default');
                            } else {
                                wrapper.classList.add('home-chat__chat-input-wrapper--default');
                            }
                            const target = e.currentTarget;
                            const from = target.offsetHeight;

                            target.style.height = 'auto';
                            const to = target.scrollHeight;

                            target.style.height = `${from}px`;
                            requestAnimationFrame(() => {
                                target.style.height = `${to}px`;
                            });
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                const button = document.querySelector('.home-chat__chat-button-redirect') as HTMLButtonElement;
                                button.click();
                            }
                        }}
                    />
                    <div className="home-chat__chat-input-placeholder">
                        <AnimatedPlaceholderText />
                    </div>
                </div>
                <button className="home-chat__chat-button-redirect" onClick={(e) => {
                    const button = e.currentTarget;
                    button.disabled = true;
                    button.classList.add('loading');
                    const query = (document.getElementById('text-redirect-input') as HTMLTextAreaElement).value.trim();
                    setTimeout(() => {
                        window.open('https://chat.lyrinth.com' + (query ? `?q=${encodeURIComponent(query)}` : ''), '_blank', 'noopener,noreferrer');
                        button.disabled = false;
                        button.classList.remove('loading');
                    }, 1000);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         className="feather feather-send">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
            <ScrollDownButton />
        </div>
    )
}