import { fetchAuthSession } from 'aws-amplify/auth';

export interface DecomposeRequest {
  epicText: string;
}

export interface SSEEvent {
  type: string;
  data: any;
}

export async function streamDecompose(
  request: DecomposeRequest,
  onEvent: (event: SSEEvent) => void,
  signal?: AbortSignal
): Promise<void> {
  let token = '';
  try {
    const session = await fetchAuthSession();
    token = session.tokens?.idToken?.toString() || '';
  } catch (error) {
    // If not authenticated or during tests where Amplify is not configured, fallback gracefully
    console.warn('Failed to fetch auth session', error);
  }

  // Use environment variable or fallback to local API gateway URL
  const apiEndpoint = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8000/tasks/decompose';

  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({
      text: request.epicText,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`AI service returned error: ${response.status} ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error('Response body is empty');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      let currentEvent: Partial<SSEEvent> = {};

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
          // Empty line marks end of event
          if (currentEvent.type) {
            onEvent(currentEvent as SSEEvent);
          }
          currentEvent = {};
          continue;
        }

        if (trimmed.startsWith('event:')) {
          currentEvent.type = trimmed.substring(6).trim();
        } else if (trimmed.startsWith('data:')) {
          const dataStr = trimmed.substring(5).trim();
          try {
            currentEvent.data = JSON.parse(dataStr);
          } catch {
            currentEvent.data = dataStr;
          }
        }
      }
    }
    // Flush remaining buffer if it looks like an event
    if (buffer.trim()) {
      const trimmed = buffer.trim();
      if (trimmed.startsWith('data:')) {
        const dataStr = trimmed.substring(5).trim();
        try {
          onEvent({ type: 'message', data: JSON.parse(dataStr) });
        } catch {
          onEvent({ type: 'message', data: dataStr });
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
