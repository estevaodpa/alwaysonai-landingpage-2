"use client";

import { useEffect, useRef, useState } from "react";
import {
  conversation,
  LINE_INTERVAL,
  RESTART_DELAY,
  type ConversationLine,
} from "../lib/conversation";

export type ConversationState = {
  lines: ConversationLine[];
  isTyping: boolean;
  activeHeroAction: number;
  activeCaseStep: number;
};

/**
 * Reproduz a conversa real linha a linha.
 * Cada instância é independente — uma para o hero, outra para o Case Real.
 */
export function useConversation(): ConversationState {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (index >= conversation.length) {
      timer.current = setTimeout(() => setIndex(0), RESTART_DELAY);
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }

    // A linha atual é a que está "sendo digitada". O delay é menor para
    // mensagens da secretária, simulando uma resposta rápida.
    const line = conversation[index];
    const delay = line.kind === "outgoing"
      ? Math.round(LINE_INTERVAL * 0.75)
      : LINE_INTERVAL;

    timer.current = setTimeout(() => setIndex((i) => i + 1), delay);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index]);

  const lines = conversation.slice(0, index);

  let activeHeroAction = -1;
  let activeCaseStep = -1;
  for (const line of lines) {
    if (line.heroAction !== undefined) activeHeroAction = line.heroAction;
    if (line.caseStep !== undefined) activeCaseStep = line.caseStep;
  }

  return {
    lines,
    isTyping: conversation[index]?.kind === "outgoing",
    activeHeroAction,
    activeCaseStep,
  };
}
