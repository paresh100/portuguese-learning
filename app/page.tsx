'use client';
import React, { useState, useEffect, useCallback } from 'react';

// --- Type Definitions ---
type Word = {
    portuguese: string;
    phonetic: string;
    pronunciation: string;
    english: string;
    mnemonic: string;
    category: string;
};

type QuizQuestion = {
    question: string;
    options: Word[];
    answer: string;
    mnemonic: string;
};


// --- Data ---
const initialPortugueseWords: Word[] = [
    // Greetings (6)
    {
        portuguese: "Olá",
        phonetic: "Oh-lah",
        pronunciation: "o-lah",
        english: "Hello",
        mnemonic: "Imagine an 'Owl' named 'Ah' saying Hello to you.",
        category: "Greetings"
    },
    {
        portuguese: "Bom dia",
        phonetic: "Bom jee-ah",
        pronunciation: "bom jee-ah",
        english: "Good morning",
        mnemonic: "Picture an exploding 'Bomb' waking up a 'Jeep' in the morning.",
        category: "Greetings"
    },
    {
        portuguese: "Boa noite",
        phonetic: "Boh-ah noy-chee",
        pronunciation: "boh-ah noy-chee",
        english: "Good evening",
        mnemonic: "Think of a 'Boa' constrictor eating 'Noisy Cheese' for dinner in the evening.",
        category: "Greetings"
    },
    {
        portuguese: "Adeus",
        phonetic: "Ah-deh-oos",
        pronunciation: "ah-deh-oos",
        english: "Goodbye",
        mnemonic: "Picture waving goodbye to 'A day' that has 'Ooze' all over it.",
        category: "Greetings"
    },
    {
        portuguese: "Prazer",
        phonetic: "Prah-zehr",
        pronunciation: "prah-zehr",
        english: "Nice to meet you",
        mnemonic: "Imagine it's nice to meet a 'Prowler' carrying a 'Laser'.",
        category: "Greetings"
    },
    {
        portuguese: "Como vai?",
        phonetic: "Koh-moh vai",
        pronunciation: "koh-moh vai",
        english: "How are you?",
        mnemonic: "Asking a 'Comb' named 'Mo' how it is doing in a 'Van'.",
        category: "Greetings"
    },

    // Essentials (10)
    {
        portuguese: "Obrigado",
        phonetic: "Oh-bree-gah-doh",
        pronunciation: "oh-bree-gah-doh",
        english: "Thank you",
        mnemonic: "Picture an 'Old brie' cheese that 'Got dough' and politely says Thank you.",
        category: "Essentials"
    },
    {
        portuguese: "Com licença",
        phonetic: "Cohm lee-sen-sah",
        pronunciation: "cohm lee-sen-sah",
        english: "Excuse me",
        mnemonic: "Excuse me, I'm 'Com'ing with a 'License' for my 'Saw'.",
        category: "Essentials"
    },
    {
        portuguese: "Sim",
        phonetic: "Seeng",
        pronunciation: "seeng",
        english: "Yes",
        mnemonic: "Say 'Yes' to 'Sing'ing a song (with a nasal sound).",
        category: "Essentials"
    },
    {
        portuguese: "Não",
        phonetic: "Now",
        pronunciation: "now (nasal)",
        english: "No",
        mnemonic: "Say 'No' right 'Now'!",
        category: "Essentials"
    },
    {
        portuguese: "Por favor",
        phonetic: "Pohr fah-vohr",
        pronunciation: "pohr fah-vohr",
        english: "Please",
        mnemonic: "Please 'Pour' some 'Flavor' into my drink.",
        category: "Essentials"
    },
    {
        portuguese: "Desculpe",
        phonetic: "Des-kool-peh",
        pronunciation: "des-kool-peh",
        english: "I'm sorry",
        mnemonic: "Say I'm sorry to 'This cool pet'.",
        category: "Essentials"
    },
    {
        portuguese: "Não entendo",
        phonetic: "Now en-ten-doh",
        pronunciation: "now en-ten-doh",
        english: "I don't understand",
        mnemonic: "I 'Now' play 'Nintendo' because I don't understand my homework.",
        category: "Essentials"
    },
    {
        portuguese: "Não falo português",
        phonetic: "Now fah-loh pohr-too-gays",
        pronunciation: "now fah-loh pohr-too-gays",
        english: "I can't speak Portuguese",
        mnemonic: "'Now', I will 'Follow' the 'Poor Two Geese' because I can't speak their language.",
        category: "Essentials"
    },
    {
        portuguese: "Tudo bem",
        phonetic: "Too-doh beng",
        pronunciation: "too-doh beng",
        english: "It's okay / All good",
        mnemonic: "It's all good, a 'Two-toe' sloth just heard a 'Bang'.",
        category: "Essentials"
    },
    {
        portuguese: "Legal",
        phonetic: "Leh-gow",
        pronunciation: "leh-gow",
        english: "Cool / Nice",
        mnemonic: "It's considered 'Cool' to play with 'Lego's.",
        category: "Essentials"
    },

    // Shopping (6)
    {
        portuguese: "Quanto custa?",
        phonetic: "Kwan-toh koos-tah",
        pronunciation: "kwan-toh koos-tah",
        english: "How much is it?",
        mnemonic: "How much is the 'Quantum' 'Coaster'?",
        category: "Shopping"
    },
    {
        portuguese: "O que é isso?",
        phonetic: "Oo kee eh ee-soh",
        pronunciation: "oo kee eh ee-soh",
        english: "What is this?",
        mnemonic: "What is this? 'A key' on an 'Igloo'?",
        category: "Shopping"
    },
    {
        portuguese: "Cartão de crédito?",
        phonetic: "Kahr-tow de kreh-jee-toh",
        pronunciation: "kahr-tow ji kreh-jee-toh",
        english: "Credit card?",
        mnemonic: "Can I use my credit card to buy a 'Carton' of 'Crazy Toes'?",
        category: "Shopping"
    },
    {
        portuguese: "Vou levar",
        phonetic: "Voh leh-vahr",
        pronunciation: "voh leh-vahr",
        english: "I'll take this",
        mnemonic: "I'll take this and 'Vote' for the 'Lever'.",
        category: "Shopping"
    },
    {
        portuguese: "Posso provar?",
        phonetic: "Poh-soh proh-vahr",
        pronunciation: "poh-soh proh-vahr",
        english: "Can I try it on?",
        mnemonic: "Can I try it on? I'll 'Pose' like a 'Pro' at the 'Bar'.",
        category: "Shopping"
    },
    {
        portuguese: "Uma sacola",
        phonetic: "Oo-mah sah-koh-lah",
        pronunciation: "oo-mah sah-koh-lah",
        english: "A bag",
        mnemonic: "I need a bag for 'Ouma's' 'Sack of Cola'.",
        category: "Shopping"
    },

    // Directions (7)
    {
        portuguese: "Onde é o banheiro?",
        phonetic: "On-jee eh oo bahn-yay-roh",
        pronunciation: "on-jee eh oo bahn-yay-roh",
        english: "Where is the toilet?",
        mnemonic: "Where is the toilet for 'Angie' the 'Barn Hero'?",
        category: "Directions"
    },
    {
        portuguese: "Onde é a estação?",
        phonetic: "On-jee eh ah ehs-tah-sown",
        pronunciation: "on-jee eh ah ehs-tah-sown",
        english: "Where is the station?",
        mnemonic: "'Angie' is at the station looking at an 'Estate sown' with seeds.",
        category: "Directions"
    },
    {
        portuguese: "Em frente",
        phonetic: "Em fren-chee",
        pronunciation: "em fren-chee",
        english: "Straight ahead",
        mnemonic: "Straight ahead is 'M' the 'Frenchy' dog.",
        category: "Directions"
    },
    {
        portuguese: "Direita",
        phonetic: "Jee-ray-tah",
        pronunciation: "jee-ray-tah",
        english: "Right",
        mnemonic: "Turn right at the 'Jeep' with the 'Ray' gun on 'Top'.",
        category: "Directions"
    },
    {
        portuguese: "Esquerda",
        phonetic: "Es-kehr-dah",
        pronunciation: "es-kehr-dah",
        english: "Left",
        mnemonic: "Turn left if you see 'S-care' the 'Dog'.",
        category: "Directions"
    },
    {
        portuguese: "Aqui",
        phonetic: "Ah-kee",
        pronunciation: "ah-kee",
        english: "Here",
        mnemonic: "I have 'A key' right here.",
        category: "Directions"
    },
    {
        portuguese: "Socorro!",
        phonetic: "Soh-koh-hoo",
        pronunciation: "soh-koh-hoo",
        english: "Help!",
        mnemonic: "Help! 'Soak' a 'Hoo' with water!",
        category: "Directions"
    },

    // Food (7)
    {
        portuguese: "Delicioso",
        phonetic: "Deh-lee-see-oh-zoh",
        pronunciation: "deh-lee-see-oh-zoh",
        english: "Delicious",
        mnemonic: "The 'Deli' 'Sees' an 'Ozone' that is delicious.",
        category: "Food"
    },
    {
        portuguese: "Água, por favor",
        phonetic: "Ah-gwah pohr fah-vohr",
        pronunciation: "ah-gwah pohr fah-vohr",
        english: "Water, please",
        mnemonic: "'Aqua' please to 'Pour' with 'Flavor'.",
        category: "Food"
    },
    {
        portuguese: "O cardápio",
        phonetic: "Oo kahr-dah-pee-oh",
        pronunciation: "oo kahr-dah-pee-oh",
        english: "Menu, please",
        mnemonic: "A menu is like a 'Card' for a 'Happy Oh' meal.",
        category: "Food"
    },
    {
        portuguese: "A conta",
        phonetic: "Ah kohn-tah",
        pronunciation: "ah kohn-tah",
        english: "The bill, please",
        mnemonic: "The bill is brought by 'A count' (Count Dracula).",
        category: "Food"
    },
    {
        portuguese: "Bom apetite",
        phonetic: "Bom ah-peh-chee-chee",
        pronunciation: "bom ah-peh-chee-chee",
        english: "Let's eat",
        mnemonic: "Let's eat a 'Bomb' of 'Appetite' and 'Cheetahs'.",
        category: "Food"
    },
    {
        portuguese: "Estou satisfeito",
        phonetic: "Es-tow sah-chees-fay-toh",
        pronunciation: "es-tow sah-chees-fay-toh",
        english: "I am full. (Thank you)",
        mnemonic: "I'm full from a 'Stow' of 'Salty Cheese' and 'Fay's Toe'.",
        category: "Food"
    },
    {
        portuguese: "Saúde!",
        phonetic: "Sah-oo-jee",
        pronunciation: "sah-oo-jee",
        english: "Cheers!",
        mnemonic: "Cheers! To 'Sawing' an 'O.G.' tree.",
        category: "Food"
    },

    // Numbers (10)
    { portuguese: "Um", phonetic: "Oong", pronunciation: "oong", english: "One", mnemonic: "I have 'One' single 'Lung' (Oong).", category: "Numbers" },
    { portuguese: "Dois", phonetic: "Doys", pronunciation: "doys", english: "Two", mnemonic: "I have 'Two' 'Toys'.", category: "Numbers" },
    { portuguese: "Três", phonetic: "Trehs", pronunciation: "trehs", english: "Three", mnemonic: "'Three' 'Trays' of food.", category: "Numbers" },
    { portuguese: "Quatro", phonetic: "Kwah-troh", pronunciation: "kwah-troh", english: "Four", mnemonic: "'Four' 'Quarters' make a dollar.", category: "Numbers" },
    { portuguese: "Cinco", phonetic: "Seen-koh", pronunciation: "seen-koh", english: "Five", mnemonic: "'Five' ships 'Sink oh' no.", category: "Numbers" },
    { portuguese: "Seis", phonetic: "Says", pronunciation: "says", english: "Six", mnemonic: "Simon 'Says' number Six.", category: "Numbers" },
    { portuguese: "Sete", phonetic: "Seh-chee", pronunciation: "seh-chee", english: "Seven", mnemonic: "I have a 'Set' of 'Cheese' with Seven pieces.", category: "Numbers" },
    { portuguese: "Oito", phonetic: "Oy-toh", pronunciation: "oy-toh", english: "Eight", mnemonic: "'Oh, a Toy' with Eight legs.", category: "Numbers" },
    { portuguese: "Nove", phonetic: "Noh-vee", pronunciation: "noh-vee", english: "Nine", mnemonic: "I have 'No V' necks, actually I have Nine of them.", category: "Numbers" },
    { portuguese: "Dez", phonetic: "Dehz", pronunciation: "dehz", english: "Ten", mnemonic: "Ten 'Desks'.", category: "Numbers" }
];

// --- Helper Components ---

const SvgIcon = ({ d, className = "w-6 h-6" }: { d: string, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
);

const NavButton = ({ children, onClick, active }: { children: React.ReactNode, onClick: () => void, active: boolean }) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center gap-2 px-4 py-3 font-semibold transition-all duration-300 rounded-lg ${active
            ? 'bg-red-500 text-white shadow-lg scale-105'
            : 'bg-white text-gray-700 hover:bg-red-100 hover:shadow-md'
            }`}
    >
        {children}
    </button>
);

// --- Modal Component for Adding Words ---
const AddWordModal = ({ onAddWord, onClose }: { onAddWord: (word: Word) => void, onClose: () => void }) => {
    const [formData, setFormData] = useState({
        portuguese: '',
        phonetic: '',
        pronunciation: '',
        english: '',
        mnemonic: '',
        category: 'Custom'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.portuguese || !formData.phonetic || !formData.english) {
            console.error('Please fill in at least the Portuguese, Phonetic, and English fields.');
            return;
        }
        onAddWord(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                    <SvgIcon d="M6 18L18 6M6 6l12 12" className="w-7 h-7" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Word</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="portuguese" value={formData.portuguese} onChange={handleChange} placeholder="Portuguese (e.g., Gato)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
                    <input type="text" name="phonetic" value={formData.phonetic} onChange={handleChange} placeholder="Phonetic (e.g., Gah-toh)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
                    <input type="text" name="pronunciation" value={formData.pronunciation} onChange={handleChange} placeholder="Pronunciation (e.g., gah-too)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
                    <input type="text" name="english" value={formData.english} onChange={handleChange} placeholder="English (e.g., Cat)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
                    <textarea name="mnemonic" value={formData.mnemonic} onChange={handleChange} placeholder="Mnemonic (e.g., A cat with a gat)" rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"></textarea>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">Add Word</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Main Components ---

const StudyBar = ({ count, onStartStudy }: { count: number, onStartStudy: (page: string) => void }) => {
    if (count === 0) return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-20 p-4 transform transition-transform duration-300 translate-y-0">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-700">
                    <span className="bg-red-500 text-white rounded-full px-3 py-1 mr-2">{count}</span>
                    {count === 1 ? 'word selected' : 'words selected'}
                </p>
                <div className="flex gap-4">
                    <button onClick={() => onStartStudy('flashcards')} className="flex items-center gap-2 px-5 py-2 font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200">
                        <SvgIcon d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
                        Flashcards
                    </button>
                    <button onClick={() => onStartStudy('quiz')} className="flex items-center gap-2 px-5 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">
                        <SvgIcon d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

const WordListPage = ({ words, selectedWords, onWordSelect, handleSpeak }: { words: Word[], selectedWords: string[], onWordSelect: (portugueseWord: string) => void, handleSpeak: (text: string) => void }) => {
    return (
        <div className="space-y-4 pb-24">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Tourist Phrasebook</h2>
                    <p className="text-gray-600">Select words to start a study session.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {words.map((word) => {
                    const isSelected = selectedWords.includes(word.portuguese);
                    return (
                        <div
                            key={word.portuguese}
                            onClick={() => onWordSelect(word.portuguese)}
                            className={`p-5 bg-white rounded-xl shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden ${isSelected ? 'ring-2 ring-red-500 scale-105' : 'hover:shadow-xl hover:-translate-y-1'}`}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSpeak(word.portuguese);
                                }}
                                className="absolute top-2 left-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Speak"
                            >
                                <SvgIcon d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </button>
                            <div className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isSelected ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}>
                                {isSelected && <SvgIcon d="M4.5 12.75l6 6 9-13.5" className="w-4 h-4 text-white" />}
                            </div>
                            <p className="text-2xl font-semibold text-red-500 text-center mt-6">{word.portuguese}</p>
                            <p className="text-lg text-gray-700 text-center">{word.phonetic}</p>
                            <p className="text-md text-gray-500 italic text-center">{word.pronunciation}</p>
                            <p className="mt-2 text-lg font-medium text-gray-800 text-center">{word.english}</p>
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-sm text-gray-600"><span className="font-bold">Mnemonic:</span> {word.mnemonic}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const FlashcardPage = ({ words, onExitStudy, handleSpeak }: { words: Word[], onExitStudy: (() => void) | null, handleSpeak: (text: string) => void }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [words]);

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 150);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
        }, 150);
    };

    if (!words || words.length === 0) {
        return <div className="text-center text-gray-600">No words in this study session. Go back to the list to select some!</div>;
    }

    const currentWord = words[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center">
            {onExitStudy && (
                <button onClick={onExitStudy} className="mb-6 text-red-500 font-semibold hover:underline">
                    &larr; Back to full word list
                </button>
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Flashcards</h2>
            <div className="w-full max-w-md h-80 perspective-1000">
                <div
                    className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front of the card */}
                    <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white rounded-2xl shadow-xl cursor-pointer p-6">
                        <p className="text-4xl font-bold text-gray-800 text-center">{currentWord.english}</p>
                    </div>

                    {/* Back of the card */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-red-500 text-white rounded-2xl shadow-xl cursor-pointer p-6 flex flex-col justify-center items-center text-center">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSpeak(currentWord.portuguese);
                            }}
                            className="absolute top-4 right-4 text-white opacity-70 hover:opacity-100 transition-opacity"
                            title="Speak"
                        >
                            <SvgIcon d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </button>
                        <p className="text-4xl font-bold mb-2">{currentWord.portuguese}</p>
                        <p className="text-2xl font-semibold">{currentWord.phonetic}</p>
                        <p className="italic mb-4">({currentWord.pronunciation})</p>
                        <p className="text-sm bg-red-400 p-3 rounded-lg">{currentWord.mnemonic}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-600">
                Card {currentIndex + 1} of {words.length}
            </div>
            <div className="flex gap-4 mt-4">
                <button onClick={handlePrev} className="px-6 py-3 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors">Previous</button>
                <button onClick={handleNext} className="px-6 py-3 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors">Next</button>
            </div>
        </div>
    );
};


const QuizPage = ({ words, allWords, onExitStudy }: { words: Word[], allWords: Word[], onExitStudy: (() => void) | null }) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);

    const generateQuestions = useCallback(() => {
        if (!words || words.length === 0) {
            setQuestions([]);
            return;
        }

        if (allWords.length < 4 && words.length > 1) {
            console.warn("Not enough words for a full quiz, some answers may repeat.");
        }

        const shuffledStudyWords = [...words].sort(() => 0.5 - Math.random());

        const quizQuestions = shuffledStudyWords.map(correctWord => {
            const incorrectOptions: Word[] = [...allWords]
                .filter(word => word.portuguese !== correctWord.portuguese)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            const options = [correctWord, ...incorrectOptions].sort(() => 0.5 - Math.random());

            return {
                question: correctWord.english,
                options: options,
                answer: correctWord.portuguese,
                mnemonic: correctWord.mnemonic
            };
        });
        setQuestions(quizQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setQuizFinished(false);
    }, [words, allWords]);

    useEffect(() => {
        generateQuestions();
    }, [generateQuestions]);

    const handleAnswer = (option: Word) => {
        if (isAnswered) return;

        setSelectedAnswer(option.portuguese);
        setIsAnswered(true);

        if (option.portuguese === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setIsAnswered(false);
        setSelectedAnswer(null);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const restartQuiz = () => {
        generateQuestions();
    }

    if (allWords.length < 4) {
        return <div className="text-center text-gray-600">You need at least 4 words in your total list to start a quiz.</div>;
    }

    if (!words || words.length === 0) {
        return <div className="text-center text-gray-600">No words in this study session. Go back to the list to select some!</div>;
    }


    if (quizFinished) {
        return (
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                {onExitStudy && (
                    <button onClick={onExitStudy} className="mb-6 text-red-500 font-semibold hover:underline">
                        &larr; Back to full word list
                    </button>
                )}
                <h2 className="text-4xl font-bold text-gray-800">Quiz Complete!</h2>
                <p className="text-2xl mt-4 text-gray-600">Your score: <span className="font-bold text-red-500">{score} / {questions.length}</span></p>
                <button onClick={restartQuiz} className="mt-8 px-8 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors">
                    Try Again
                </button>
            </div>
        );
    }

    if (questions.length === 0) {
        return <div>Loading quiz...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="w-full max-w-2xl mx-auto">
            {onExitStudy && (
                <button onClick={onExitStudy} className="mb-6 text-red-500 font-semibold hover:underline">
                    &larr; Back to full word list
                </button>
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Quiz Time!</h2>
            <p className="text-center text-gray-500 mb-6">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-8 min-h-[100px] flex flex-col justify-center">
                    <p className="text-4xl font-bold text-gray-800">{currentQuestion.question}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option: Word, index: number) => {
                        const isCorrect = option.portuguese === currentQuestion.answer;
                        let buttonClass = 'bg-white text-gray-800 hover:bg-red-100 border border-gray-300';

                        if (isAnswered) {
                            if (isCorrect) {
                                buttonClass = 'bg-green-500 text-white border-green-500';
                            } else if (selectedAnswer === option.portuguese) {
                                buttonClass = 'bg-red-500 text-white border-red-500';
                            } else {
                                buttonClass = 'bg-gray-200 text-gray-500 border-gray-200 opacity-70';
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                                className={`p-4 rounded-lg font-semibold text-left transition-all duration-300 flex flex-col justify-center min-h-[8rem] ${buttonClass}`}
                            >
                                {!isAnswered ? (
                                    <span className="block text-2xl">{option.phonetic}</span>
                                ) : (
                                    <>
                                        <span className="block text-2xl">{option.portuguese}</span>
                                        <span className="block text-md text-gray-400 italic">{option.phonetic}</span>
                                        <span className="block text-sm text-gray-500">({option.pronunciation})</span>
                                        <span className="block text-base mt-1">{option.english}</span>
                                    </>
                                )}
                            </button>
                        );
                    })}
                </div>

                {isAnswered && (
                    <div className="mt-6 text-center">
                        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
                            <p className="text-yellow-800"><span className="font-bold">Mnemonic:</span> {currentQuestion.mnemonic}</p>
                        </div>
                        <button
                            onClick={handleNextQuestion}
                            className="mt-6 px-8 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
                        >
                            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- App ---

export default function App() {
    const [activePage, setActivePage] = useState('home');
    const [words, setWords] = useState(initialPortugueseWords);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [studyList, setStudyList] = useState<Word[] | null>(null);

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR';
            utterance.rate = 0.6; // Even slower speech rate
            window.speechSynthesis.speak(utterance);
        } else {
            console.error('Speech synthesis not supported in this browser.');
        }
    };

    const handleWordSelect = (portugueseWord: string) => {
        setSelectedWords(prevSelected => {
            if (prevSelected.includes(portugueseWord)) {
                return prevSelected.filter(w => w !== portugueseWord);
            } else {
                return [...prevSelected, portugueseWord];
            }
        });
    };

    const handleStartStudy = (page: string) => {
        const newStudyList = words.filter(word => selectedWords.includes(word.portuguese));
        setStudyList(newStudyList);
        setActivePage(page);
        setSelectedWords([]);
    };

    const handleExitStudy = () => {
        setStudyList(null);
        setActivePage('home');
    };

    const handleNavigation = (page: string) => {
        if (page === 'home') {
            setStudyList(null);
        } else if (studyList === null) {
            // If we are not in study mode and navigate, stay out of study mode
            setStudyList(null);
        }
        // If we are in study mode and navigate between flashcards/quiz, keep the study list
        setActivePage(page);
    };

    const handleAddWord = (newWord: Word) => {
        setWords(prevWords => [newWord, ...prevWords]);
    };

    const handleAddWordAndCloseModal = (newWord: Word) => {
        handleAddWord(newWord);
        setIsModalOpen(false);
    };

    const renderPage = () => {
        const isStudying = studyList !== null;
        const wordsForComponent = isStudying ? studyList : words;

        switch (activePage) {
            case 'home':
                return <WordListPage words={words} selectedWords={selectedWords} onWordSelect={handleWordSelect} handleSpeak={handleSpeak} />;
            case 'flashcards':
                return <FlashcardPage words={wordsForComponent} onExitStudy={isStudying ? handleExitStudy : null} handleSpeak={handleSpeak} />;
            case 'quiz':
                return <QuizPage words={wordsForComponent} allWords={words} onExitStudy={isStudying ? handleExitStudy : null} />;
            default:
                return <WordListPage words={words} selectedWords={selectedWords} onWordSelect={handleWordSelect} handleSpeak={handleSpeak} />;
        }
    };

    return (
        <>
            {isModalOpen && <AddWordModal onAddWord={handleAddWordAndCloseModal} onClose={() => setIsModalOpen(false)} />}

            <style>{`
              .perspective-1000 { perspective: 1000px; }
              .transform-style-preserve-3d { transform-style: preserve-3d; }
              .rotate-y-180 { transform: rotateY(180deg); }
              .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
            `}</style>

            <div className="min-h-screen bg-gray-50 font-sans">
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center gap-3 mb-4 sm:mb-0">
                            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                PT
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">Português Navigator</h1>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <nav className="flex gap-2 sm:gap-4 bg-gray-100 p-2 rounded-xl">
                                <NavButton onClick={() => handleNavigation('home')} active={activePage === 'home'}>
                                    <SvgIcon d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                    Words
                                </NavButton>
                                <NavButton onClick={() => handleNavigation('flashcards')} active={activePage === 'flashcards'}>
                                    <SvgIcon d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
                                    Flashcards
                                </NavButton>
                                <NavButton onClick={() => handleNavigation('quiz')} active={activePage === 'quiz'}>
                                    <SvgIcon d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    Quiz
                                </NavButton>
                            </nav>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center justify-center gap-2 px-4 py-3 font-semibold transition-all duration-300 rounded-lg bg-red-100 text-red-600 hover:bg-red-500 hover:text-white hover:shadow-md"
                                title="Add a new word"
                            >
                                <SvgIcon d="M12 4.5v15m7.5-7.5h-15" />
                                <span className="hidden sm:inline">Add Word</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto p-4 sm:p-8">
                    {renderPage()}
                </main>

                {activePage === 'home' && <StudyBar count={selectedWords.length} onStartStudy={handleStartStudy} />}

                <footer className="bg-white mt-12 py-6">
                    <div className="container mx-auto px-4 text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Português Navigator. Happy learning!</p>
                        <p className="text-sm mt-1">Made with ❤️ for Portuguese language enthusiasts.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

