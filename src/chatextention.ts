import * as vscode from 'vscode';
import axios from 'axios';

export function registerChatExtension(context: vscode.ExtensionContext) {
  const chatApiEndpoint = process.env.CHAT_API_ENDPOINT;
  if (!chatApiEndpoint) {
    throw new Error('CHAT_API_ENDPOINT is not set');
  }

  const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) => {
    try {
      const response = await axios.post<any>(chatApiEndpoint, { query: request.prompt }, { responseType: 'stream' });
      response.data.on('data', (chunk: Buffer) => {
        stream.markdown(chunk.toString());
      });
      response.data.on('end', () => {
        stream.markdown(''); 
      });
    } catch (error) {
      console.error('Error sending message to API:', error);
      stream.markdown('Error sending message to API');
      stream.markdown(''); 
    }
  };

  const chatParticipant = vscode.chat.createChatParticipant('azure-rag-system', handler);
  chatParticipant.iconPath = vscode.Uri.joinPath(context.extensionUri, 'azure-icon.png');
  context.subscriptions.push(chatParticipant);
}