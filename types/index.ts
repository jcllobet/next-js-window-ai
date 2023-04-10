//index.ts
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface Messages {
  messages: Message[];
}

export interface RequestOptions extends Messages {
  model: string;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: Map<number, number>;
  user?: string;
}
