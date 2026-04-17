function checkAndProcessDonationTime() {
    const clickTime = localStorage.getItem('donateClickTime');
    if (clickTime) {
        const elapsed = Date.now() - parseInt(clickTime, 10);
        if (elapsed >= 60000) { // 1 minute = 60000 ms
            localStorage.setItem('hideDonationModalsUntil', Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            localStorage.removeItem('donateClickTime');
        } else if (document.visibilityState === 'visible' && elapsed > 0) {
            // Came back too early, unqualify the ongoing donation attempt
            localStorage.removeItem('donateClickTime');
        }
    }
}

function initModals() {
    checkAndProcessDonationTime();

    const modal1 = document.getElementById('modal1');
    const modal2 = document.getElementById('modal2');
    const mainContent = document.getElementById('main-content');
    
    const hideUntil = localStorage.getItem('hideDonationModalsUntil');
    const shouldHide = hideUntil && Date.now() < parseInt(hideUntil, 10);

    if (shouldHide) {
        if(modal1) modal1.classList.remove('active');
        if(modal2) modal2.classList.remove('active');
        if(mainContent && mainContent.classList.contains('hidden')) {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
        }
    } else {
        if(mainContent && mainContent.classList.contains('hidden') && modal1) {
            modal1.classList.add('active');
        }
    }
}

// Handle bfcache and tab switching dynamic returns
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        checkAndProcessDonationTime();
        initModals();
    }
});
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        checkAndProcessDonationTime();
        initModals();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initModals();

    // Open untrusted destinations in an isolated browsing context.
    function openExternalSafe(url) {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    }

    const modal1 = document.getElementById('modal1');
    const modal2 = document.getElementById('modal2');
    const mainContent = document.getElementById('main-content');
    
    const btnSkip1 = document.getElementById('btn-skip-1');
    const btnDonate1 = document.getElementById('btn-donate-1');
    const btnSkip2 = document.getElementById('btn-skip-2');
    const btnDonate2 = document.getElementById('btn-donate-2');

    function handleDonateClick(e) {
        e.preventDefault();
        localStorage.setItem('donateClickTime', Date.now());
        window.location.href = "https://razorpay.me/@rishavbiswas";
    }

    if (btnSkip1) {
        btnSkip1.addEventListener('click', () => {
            modal1.classList.remove('active');
            setTimeout(() => {
                modal2.classList.add('active');
            }, 400);
        });
    }

    if (btnDonate1) {
        btnDonate1.addEventListener('click', handleDonateClick);
    }

    if (btnSkip2) {
        btnSkip2.addEventListener('click', () => {
            modal2.classList.remove('active');
            setTimeout(() => {
                mainContent.classList.remove('hidden');
                mainContent.classList.add('visible');
            }, 400);
        });
    }

    if (btnDonate2) {
        btnDonate2.addEventListener('click', handleDonateClick);
    }

    // 1. Intersection Observer for Scroll Fade-ins
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Primary CTA links
    const btnInstall = document.getElementById('btn-install');
    const btnDemo = document.getElementById('btn-demo');

    if (btnInstall) {
        btnInstall.addEventListener('click', () => {
            window.location.href = 'https://github.com/rishwebb/Apk/releases/download/V1.0/PhoneGuard.apk';
        });
    }

    if (btnDemo) {
        btnDemo.addEventListener('click', () => {
            openExternalSafe('https://youtu.be/e5_maodnyOs?si=1JXbUVSxJE6s6X51');
        });
    }

    // 3. Support popup logic
    const supportModal = document.getElementById('support-modal');
    const btnSupport = document.getElementById('btn-support');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnDonateFinal = document.getElementById('btn-donate-final');

    if (btnSupport && supportModal) {
        btnSupport.addEventListener('click', () => {
            supportModal.classList.add('active');
        });
    }

    if (btnCloseModal && supportModal) {
        btnCloseModal.addEventListener('click', () => {
            supportModal.classList.remove('active');
        });
    }

    if (btnDonateFinal) {
        btnDonateFinal.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('donateClickTime', Date.now());
            window.location.href = "https://razorpay.me/@rishavbiswas";
        });
    }

    // --- CHATBOT LOGIC ---

    const chatData = {
        security: {
            title: 'Security and Privacy',
            items: [
                { q: 'Can someone bypass it?', a: 'No. Even if someone unlocks your phone, they still cannot access protected apps without the correct PIN.' },
                { q: 'Is my data safe?', a: 'Yes. Everything is stored locally on your device. No cloud upload, no tracking, no sharing.' },
                { q: 'Can it capture someone secretly?', a: 'It only captures when protection is active and the phone is accessed. It is built for security, not spying.' }
            ]
        },
        howItWorks: {
            title: 'How It Works',
            items: [
                { q: 'What does PhoneGuard do?', a: 'PhoneGuard detects unauthorized access and captures a front-camera photo as evidence.' },
                { q: 'How does the capture flow work?', a: 'When the phone is unlocked, protection can trigger and create a timestamped session with capture logs.' },
                { q: 'Does it work with fingerprint or face unlock?', a: 'Yes. Device unlock can still happen normally, but app-level protection can request your PhoneGuard PIN.' }
            ]
        },
        features: {
            title: 'Features and Usage',
            items: [
                { q: 'How do I start?', a: 'Install the app, set your guard PIN, grant camera permission, then start protection.' },
                { q: 'Where are captures stored?', a: 'Captures are saved locally in secure session folders on your device.' },
                { q: 'Will it drain battery?', a: 'Battery usage is optimized because capture logic only runs when relevant security events occur.' }
            ]
        },
        support: {
            title: 'Support and Access',
            items: [
                { q: 'How can I support this project?', a: 'Use the Support button or donation links in this page. It helps maintain updates.' },
                { q: 'How do I get the latest build?', a: 'Tap the install button on this page, or message the creator with the project name.' },
                { q: 'What if I forget my password?', a: 'Use your recovery option and recovery code inside the app to reset access.' }
            ]
        }
    };

    const btnChat = document.getElementById('btn-chat');
    const chatWindow = document.getElementById('chat-window');
    const btnCloseChat = document.getElementById('btn-close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatOptions = document.getElementById('chat-options');
    const chatBottomActions = document.getElementById('chat-bottom-actions');
    const btnAnother = document.getElementById('btn-another');
    const btnGoBack = document.getElementById('btn-go-back');
    const btnClear = document.getElementById('btn-clear');
    const btnContinue = document.getElementById('btn-continue');

    let currentCategory = null;
    let currentScreen = 'categories';

    function scrollChatToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function appendBubble(text, type) {
        if (!chatMessages) return;
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${type === 'user' ? 'user-bubble' : 'bot-bubble'}`;
        bubble.textContent = text;
        chatMessages.appendChild(bubble);
        scrollChatToBottom();
    }

    function renderOptions(options, includeBackToCategories = false) {
        if (!chatOptions) return;
        chatOptions.innerHTML = '';

        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'chat-option-btn';
            button.textContent = option.label;
            button.addEventListener('click', option.onClick);
            chatOptions.appendChild(button);
        });

        if (includeBackToCategories) {
            const backButton = document.createElement('button');
            backButton.className = 'chat-option-back-btn';
            backButton.textContent = 'Back to Categories';
            backButton.addEventListener('click', showCategories);
            chatOptions.appendChild(backButton);
        }

        scrollChatToBottom();
    }

    function showCategories() {
        currentScreen = 'categories';
        currentCategory = null;
        if (chatBottomActions) chatBottomActions.classList.add('hidden');

        appendBubble('Choose a topic and I will guide you quickly.', 'bot');
        renderOptions([
            { label: 'Security and Privacy', onClick: () => showQuestions('security') },
            { label: 'How It Works', onClick: () => showQuestions('howItWorks') },
            { label: 'Features and Usage', onClick: () => showQuestions('features') },
            { label: 'Support and Access', onClick: () => showQuestions('support') }
        ]);
    }

    function showQuestions(categoryKey) {
        const category = chatData[categoryKey];
        if (!category) return;

        currentScreen = 'questions';
        currentCategory = categoryKey;
        if (chatBottomActions) chatBottomActions.classList.add('hidden');

        appendBubble(category.title, 'user');
        appendBubble('Pick your question:', 'bot');

        renderOptions(category.items.map(item => ({
            label: item.q,
            onClick: () => showAnswer(item.q, item.a)
        })), true);
    }

    function showAnswer(question, answer) {
        currentScreen = 'answer';
        appendBubble(question, 'user');
        appendBubble(answer, 'bot');
        if (chatOptions) chatOptions.innerHTML = '';
        if (chatBottomActions) chatBottomActions.classList.remove('hidden');
    }

    function resetChat() {
        if (chatMessages) chatMessages.innerHTML = '';
        if (chatOptions) chatOptions.innerHTML = '';
        appendBubble('Hi, I am your PhoneGuard Assistant.', 'bot');
        showCategories();
    }

    if (btnChat && chatWindow) {
        btnChat.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
            document.body.classList.toggle('chat-open', chatWindow.classList.contains('open'));
            if (chatWindow.classList.contains('open') && chatMessages && chatMessages.children.length === 0) {
                resetChat();
            }
        });
    }

    if (btnCloseChat && chatWindow) {
        btnCloseChat.addEventListener('click', () => {
            chatWindow.classList.remove('open');
            document.body.classList.remove('chat-open');
        });
    }

    if (btnAnother) {
        btnAnother.addEventListener('click', () => {
            if (currentCategory) {
                showQuestions(currentCategory);
            } else {
                showCategories();
            }
        });
    }

    if (btnGoBack) {
        btnGoBack.addEventListener('click', () => {
            if (currentScreen === 'answer' && currentCategory) {
                showQuestions(currentCategory);
                return;
            }
            showCategories();
        });
    }

    if (btnClear) {
        btnClear.addEventListener('click', () => {
            resetChat();
        });
    }

    if (btnContinue) {
        btnContinue.addEventListener('click', () => {
            const installBtn = document.getElementById('btn-install');
            if (installBtn) {
                installBtn.click();
            }
        });
    }

    // Close modal on click outside
    if (supportModal) {
        supportModal.addEventListener('click', (e) => {
            if (e.target === supportModal) {
                supportModal.classList.remove('active');
            }
        });
    }

    // Initial check for elements already in view (hero section)
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if(hero) hero.classList.add('visible');
    }, 100);
});
