"use client";

import { useState, useEffect, useRef } from "react";

const TerminalContent = () => {
  const [commands, setCommands] = useState([
    "Welcome",
    "    $$     $$$$$$ $     $  $$$$$$  $$$$$$ $$$$$$ $$$$$$",
    "  $    $   $    $ $     $    $$       $     $$     $$",
    " $$$$$$$$  $$$$$$ $$$$$$$    $$       $     $$     $$",
    "$        $ $    $ $     $    $$       $     $$     $$",
    "$        $ $$$$$$ $     $  $$$$$$ $$$$$$  $$$$$$   $$",
    "------------------------------------------------------",
    "                     ABHIJIT                          ",
    "Welcome to my terminal",
    'Type "help" to see the list of command available',
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);

  // Auto-scroll to bottom when commands change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const handleCommand = (cmd) => {
    const responses = {
      welcome: [
        "Welcome",
        "--------------------------------------------------------",
        "    $$     $$$$$$ $     $  $$$$$$  $$$$$$ $$$$$$ $$$$$$",
        "  $    $   $    $ $     $    $$       $     $$     $$",
        " $$$$$$$$  $$$$$$ $$$$$$$    $$       $     $$     $$",
        "$        $ $    $ $     $    $$       $     $$     $$",
        "$        $ $$$$$$ $     $  $$$$$$ $$$$$$  $$$$$$   $$",
        "-------------------------------------------------------",
        "                     ABHIJIT                          ",
        "Welcome to my terminal",
        'Type "help" to see the list of command available',
      ],
      help: [
        "help\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0This will list all available options.",
        "shortcuts\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0This will list all shortcuts options available.",
        "whoami\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Display user information",
        "skills\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Show technical skills",
        "projects\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0List recent projects",
        "contact\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Show contact information",
        "clear\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Clear the terminal screen",
      ],
      whoami: [
        "Name : Abhijit Nanda",
        "Description : I am a Backend Developer",
      ],
      shortcuts: [
        "Ctrl+M : Minimize All",
        "Ctrl+Q : Close All",
        "Ctrl+R : Restore All",
      ],
      skills: [
        "Frontend: React, Vue, TypeScript",
        "Backend: Node.js, Python",
        "Database: MongoDB, PostgreSQL",
      ],
      projects: [
        "1. E-commerce Platform",
        "2. Task Management App",
        "3. Weather Dashboard",
      ],
      contact: [
        "Email: abhijitnanda8249@gmail.com",
        "GitHub: github.com/portfolio",
        "LinkedIn: linkedin.com/in/portfolio",
      ],
      clear: [],
    };

    // Add command to history if it's not empty and not the same as the last command
    if (
      cmd &&
      (commandHistory.length === 0 ||
        commandHistory[commandHistory.length - 1] !== cmd)
    ) {
      setCommandHistory((prev) => [...prev, cmd]);
    }

    if (cmd === "clear") {
      setCommands([]);
    } else {
      const response = responses[cmd] || [
        `Command not found: #{cmd}. Type 'help' for available commands.`,
      ];
      setCommands((prev) => [
        ...prev,
        { type: "command", content: cmd },
        ...response.map((r) => ({ type: "response", content: r })),
      ]);
    }

    setCurrentInput("");
    setHistoryIndex(-1); // Reset history index after executing command
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(currentInput.trim());
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const renderCommand = (cmd, index) => {
    if (typeof cmd === "string") {
      // Handle initial "Welcome" message
      return (
        <pre key={index} className="text-green-300">
          {" "}
          {cmd}
        </pre>
      );
    }

    if (cmd.type === "command") {
      return (
        <div key={index} className="flex">
          <span className="text-blue-400">abhijit-nanda@portfolio:~# </span>
          <span className="text-green-400">{cmd.content}</span>
        </div>
      );
    }

    if (cmd.type === "response") {
      return (
        <div key={index} className="text-green-300">
          {cmd.content}
        </div>
      );
    }
  };

  return (
    <div
      ref={terminalRef}
      className="bg-black px-2 py-6 rounded-lg font-mono text-green-400 text-sm h-full overflow-auto"
    >
      <div className="space-y-1 mb-4">
        {commands.map((cmd, index) => renderCommand(cmd, index))}
      </div>
      <div className="flex items-center">
        <span className="text-blue-400">abhijit-nanda@portfolio:~# </span>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none text-green-400 ml-1 flex-1"
          placeholder="Type a command..."
          autoFocus
        />
        <span className="animate-pulse text-green-400">█</span>
      </div>
    </div>
  );
};

export default TerminalContent;
