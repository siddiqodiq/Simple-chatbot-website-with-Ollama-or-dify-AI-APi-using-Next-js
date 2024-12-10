# Simple chatbot with Ollama using next.js

This project is a **React-based Chat Application** that uses an AI assistant model for generating responses. It leverages TailwindCSS for styling, `ollama-ai-provider` for AI interactions, and incorporates live streaming of AI-generated text.

---

## 🚀 Features
- **AI-Powered Chat**: Integrates with a large language model for generating conversational responses.
- **Real-time Streaming**: Messages are displayed as they are generated by the AI.
- **TailwindCSS Styling**: Responsive and modern design powered by TailwindCSS.
- **Interactive UI**: Smooth input handling and message display.

---

## 🛠️ Installation and Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **NPM** or **Yarn** package manager

### Steps to Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/chat-app.git
   cd chat-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add ShadCN components (for UI elements):
   ```bash
   npx shadcn@latest add button input card scroll-area
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the app at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure
- **`pages/index.tsx`**: Main entry point for the chat interface.
- **`actions.ts`**: Defines AI-related functions and streaming logic.
- **`components/ui/`**: UI elements like buttons, inputs, cards, and scroll areas.
- **`globals.css`**: Custom TailwindCSS styles.
- **`lib/utils.ts`**: Utility functions for className merging.

---

## 📋 Usage

1. Type a message in the chat input box.
2. Press the **Send** button.
3. The AI assistant will respond with a streaming message.

---

## 🛠️ Dependencies
- **Next.js**: React framework for server-side rendering.
- **TailwindCSS**: CSS utility-first framework.
- **Lucide React**: For icons like loading spinners.
- **Ollama-AI Provider**: Integration for language model interactions.

---

## 📘 Customization

### AI Model
The AI model used can be modified in `actions.ts`:
```typescript
const model = ollama("hf.co/ojisetyawan/llama3-8b-cpt-sahabatai-v1-instruct-Q4_K_M-GGUF");
```
Replace the model with your desired model URL.

### Styles
Modify `globals.css` for customizing the theme and styles.

---

## ⚡ Commands

- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Run Production Build**: `npm start`

---

## 🤝 Contribution
Feel free to contribute to this project by opening issues or submitting pull requests.

---

## 📄 License
This project is licensed under the MIT License.

---

## 💬 Feedback
For any questions, feedback, or suggestions, please reach out via [siddiqodiq.me].
```

