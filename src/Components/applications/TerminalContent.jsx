"use client";

import { useState, useEffect, useRef } from "react";
import {
  Bio,
  skills,
  projects,
  experiences,
  totalYears,
} from "../../data/constants.js";

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

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    });
  };

  const handleCommand = (cmd) => {
    const responses = {
      help: [
        {
          type: "colored",
          label: "help",
          value: "This will list all available options.",
        },
        {
          type: "colored",
          label: "shortcuts",
          value: "This will list all shortcuts options available.",
        },
        {
          type: "colored",
          label: "time",
          value: "This will give current time.",
        },
        {
          type: "colored",
          label: "whoami",
          value: "This will tell about me.",
        },
        {
          type: "colored",
          label: "skills",
          value: "This will show my technical skills.",
        },
        {
          type: "colored",
          label: "projects",
          value: "This will give the list of my recent projects.",
        },
        {
          type: "colored",
          label: "experiences",
          value: "This will give the list of my recent experiences.",
        },
        {
          type: "colored",
          label: "contact",
          value: "This will show my contact informations.",
        },
        {
          type: "colored",
          label: "clear",
          value: "Clear the terminal.",
        },
      ],
      time: [`${formatDate(new Date())} ${formatTime(new Date())}`],
      whoami: [
        { type: "colored", label: "Name", value: Bio.name },
        { type: "colored", label: "Experience", value: `${totalYears} years` },
        { type: "colored", label: "Description", value: Bio.description },
        { type: "colored", label: "Role", value: "Backend Developer" },
      ],
      shortcuts: [
        "Ctrl+M : Minimize All",
        "Ctrl+Q : Close All",
        "Ctrl+R : Restore All",
      ],
      skills: [
        ...skills.flatMap((category) => [
          {
            type: "category",
            content: category.title,
          },
          ...category.skills.map((skill) => ({
            type: "skill",
            content: skill.name,
          })),
        ]),
      ],
      projects: [
        ...projects.map((project, index) => ({
          type: "project",
          content: {
            name: `${index + 1}. ${project.title}`,
            description: project.description.split("\n")[0],
            status: project.isDone ? "✓ Completed" : "🔄 In Progress",
            github: project.github,
            demo: project.webapp,
          },
        })),
      ],
      experiences: [
        ...experiences.map((exp, index) => ({
          type: "experience",
          content: {
            companyname: `${index + 1}. ${exp.company}`,
            role: exp.role,
            description: exp.desc.split("\n")[0],
            startDate: exp.startDate,
            endDate: exp.endDate,
            present: exp.present,
          },
        })),
      ],
      contact: [
        {
          type: "colored",
          label: "Email",
          value: "abhijitnanda8249@gmail.com",
        },
        { type: "colored", label: "Phone", value: "+91-8249001710" },
        { type: "colored", label: "GitHub", value: Bio.github },
        { type: "colored", label: "LinkedIn", value: Bio.linkedin },
        { type: "colored", label: "Twitter", value: Bio.twitter },
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
        `Command not found: ${cmd}. Type 'help' for available commands.`,
      ];

      setCommands((prev) => [
        ...prev,
        { type: "command", content: cmd },
        ...response.map((r) => {
          // FIXED: Don't wrap objects that already have a type - just add response wrapper
          if (typeof r === "object" && r !== null && r.type) {
            return { type: "response", content: r };
          }
          // For strings, wrap them directly
          return { type: "response", content: r };
        }),
      ]);
    }

    setCurrentInput("");
    setHistoryIndex(-1);
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
      return (
        <pre key={index} className="text-green-300">
          {cmd}
        </pre>
      );
    }

    if (cmd.type === "command") {
      return (
        <div key={index} className="flex">
          <span className="text-blue-400">
            abhijit-nanda@portfolio:~#&nbsp;
          </span>
          <span className="text-green-400">{cmd.content}</span>
        </div>
      );
    }

    if (cmd.type === "response") {
      const content = cmd.content;

      // Colored object (used in `whoami`, `contact`, `help`)
      if (
        typeof content === "object" &&
        content !== null &&
        content.type === "colored"
      ) {
        return (
          <div key={index} className="flex">
            <span className="text-cyan-400 font-semibold">{content.label}</span>
            <span className="text-cyan-400 font-semibold">:&nbsp;</span>
            <span className="text-yellow-300">{content.value}</span>
          </div>
        );
      }

      // Skill object
      if (
        typeof content === "object" &&
        content !== null &&
        content.type === "skill"
      ) {
        return (
          <div key={index} className="text-green-300 pl-4">
            • {content.content}
          </div>
        );
      }

      // Skill category
      if (
        typeof content === "object" &&
        content !== null &&
        content.type === "category"
      ) {
        return (
          <div key={index} className="text-yellow-400 font-bold mt-2">
            {content.content}
          </div>
        );
      }

      // Project object
      if (
        typeof content === "object" &&
        content !== null &&
        content.type === "project"
      ) {
        return (
          <div key={index} className="text-green-300 space-y-1 mb-2">
            <div className="font-bold text-yellow-300">
              {content.content.name}
            </div>
            <div>{content.content.description}</div>
            <div>Status: {content.content.status}</div>
            <div>
              GitHub:{" "}
              <a
                href={content.content.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400 hover:text-blue-300"
              >
                {content.content.github}
              </a>
            </div>
            <div>
              Demo:{" "}
              <a
                href={content.content.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400 hover:text-blue-300"
              >
                {content.content.demo}
              </a>
            </div>
          </div>
        );
      }

      // Experience object
      if (
        typeof content === "object" &&
        content !== null &&
        content.type === "experience"
      ) {
        return (
          <div key={index} className="text-green-300 space-y-1 mb-2">
            <div className="font-bold text-yellow-300">
              {content.content.companyname}
            </div>
            <div className="text-white">{content.content.role}</div>
            <div className="text-blue-400">{`${content.content.startDate}-${
              content.content.present ? "Present" : content.content.endDate
            }`}</div>
            <div>{content.content.description}</div>
          </div>
        );
      }

      // Default string
      if (typeof content === "string") {
        return (
          <div key={index} className="text-green-300">
            {content}
          </div>
        );
      }

      // Fallback for unrecognized content
      return (
        <div key={index} className="text-red-500">
          [Unsupported response format: {typeof content}]
        </div>
      );
    }

    // Fallback for unrecognized command types
    return (
      <div key={index} className="text-red-500">
        [Unrecognized command type: {cmd.type}]
      </div>
    );
  };

  return (
    <div
      ref={terminalRef}
      className="bg-black px-2 py-6 rounded-lg font-mono text-green-400 text-sm h-full overflow-auto relative"
    >
      <div className="space-y-1 mb-4 min-h-0">
        {commands.map((cmd, index) => renderCommand(cmd, index))}
      </div>
      <div className="flex items-center sticky bottom-0 bg-black pt-2">
        <span className="text-blue-400">abhijit-nanda@portfolio:~#&nbsp;</span>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none text-green-400 flex-1"
          placeholder="Type a command..."
          autoFocus
        />
        <span className="animate-pulse text-green-400">█</span>
      </div>
    </div>
  );
};

export default TerminalContent;
