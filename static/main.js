const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const editor = document.querySelector(".code-editor");

function getCaretPosition(element) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return 0;
    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(element);
    preRange.setEnd(range.endContainer, range.endOffset);
    return preRange.toString().length;
}

function setCaretPosition(element, position) {
    const selection = window.getSelection();
    const range = document.createRange();
    let currentPos = 0;

    function traverseNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const nextPos = currentPos + node.length;
            if (nextPos >= position) {
                range.setStart(node, position - currentPos);
                range.setEnd(node, position - currentPos);
                return true;
            }
            currentPos = nextPos;
        } else {
            for (const child of node.childNodes) {
                if (traverseNodes(child)) return true;
            }
        }
        return false;
    }

    traverseNodes(element);
    selection.removeAllRanges();
    selection.addRange(range);
}

function applyHighlighting() {
    const caretPosition = getCaretPosition(editor);
    let code = editor.innerText;

    let highlighted = hljs.highlight(code, { language: "javascript" }).value;

    editor.innerHTML = highlighted.replace(/\n/g, "<br>");
    setCaretPosition(editor, caretPosition);
}

let timeout;
editor.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(applyHighlighting, 300);
});

editor.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const br = document.createElement("br");
        range.deleteContents();
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});

["Ins", "Code"].forEach((element, index) => {
    document.getElementById(element).addEventListener("click", () => {
        document.getElementById(["Ins", "Code"][index].toLowerCase()).style.display = "block";
        document.getElementById(["Ins", "Code"][0 ** index].toLowerCase()).style.display = "none";
    });
})

async function executeFunction(fn) {
    if (typeof fn !== 'function') {
        throw new Error("Argument must be a function");
    }
    
    const originalConsoleLog = console.log;
    let output = "";

    console.log = (...args) => {
        output += args.join(" ") + "\n";
        originalConsoleLog(...args);
    };

    await fn();

    console.log = originalConsoleLog;
    return output.trim();
}

function autoClickAndGetLogs(button) {
    if (!(button instanceof Element)) {
        console.error("oopsies!");
        return null;
    }

    const originalLog = console.log;
    const logs = [];

    console.log = function (...args) {
        logs.push(args.join(" ")); 
        originalLog.apply(console, args);
    };

    button.click();

    console.log = originalLog;

    return logs;
}