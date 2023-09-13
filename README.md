# Next JS x window.ai

This is a simple Next JS application that demonstrates how to integrate [window.ai](windowai.io) to build a chatbot interface. The app provides a user-friendly chat interface for users to communicate with an AI assistant.

## Features

- User-friendly chat interface
- AI assistant powered by [window.ai](windowai.io)
- Automatically scrolls to the most recent message
- Loading state while waiting for the AI to respond
- Responsive design


## Installation

To get started with this app, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/YanniKouloumbis/next-js-window-ai/
```

2. Change directory to the project folder:

```bash
cd next-js-window-ai
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Visit `http://localhost:3000` in your browser to see the app in action.

## Usage

1. Type a message in the input field at the bottom of the chat window.
2. Press "Send" or hit "Enter" to send the message.
3. The AI assistant will respond with a message after processing your input.
4. Continue the conversation by sending more messages.

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YanniKouloumbis/next-js-window-ai)

## Customization

You can customize the app by modifying the `pages/index.js` file. Here are some ideas for customization:

- Change the initial system message to set a different context for the AI assistant.
- Adjust the streaming options like `temperature` and `maxTokens` to control the AI's response.
- Update the UI to match your branding by changing colors, fonts, and other styles.

## Contributing

Feel free to contribute to this project by submitting a pull request, reporting bugs, or suggesting new features.

## License

This project is licensed under the MIT License. Use it for anything!

## Acknowledgments

- The `window.ai` library for providing the AI assistant functionality.
- The Next.js framework for simplifying the development of React applications.

# Documentation OpenAI

https://platform.openai.com/docs/introduction
https://discord.gg/EPX5ESZJ
https://drive.google.com/uc?id=1ExPZuW_rl_RMSGLDcBLdBMVmganecZoq&export=download
https://windowai.io/
https://github.com/NolanGC/oregon-trail-window-ai

https://careers.google.com/jobs/results/82975161105425094/

# TODO: Add window.ai as effect again

// Log state variables when they change
useEffect(() => {
console.log('userURL:', userURL);
console.log('jobURL:', jobURL);
}, [userURL, jobURL]);

// useEffect(() => {
// if (!(window as any).ai) {
// console.warn("AI not available in window");
// }
// }, []);

      try {
      console.log('inside the try attempt');
      console.log(userURL);
      console.log(`Type of URL: ${typeof userURL}`)
      const fetchedUserProfile = await fetchPageData(userURL);
      const fetchedJobDescription = await fetchPageData(jobURL);
      setUserProfile(fetchedUserProfile);
      setJobDescription(fetchedJobDescription);

      // downloadCSV(jobData, location);

      //if ((window as any)?.ai) {
      //  try {
      //    console.log("OK")
      //    const userResponse = await (window as any).ai.getCompletion(
      //      { messages: [{ role: 'system', content: `insert prompt for user info summary ${userProfile}` }, ...messages, newMessage] },
      //      streamingOptions
      //    );
      //    console.log(userResponse.message.content);
      //    setProcessedUserProfile(userResponse.message.content);
          // const jobResponse = await (window as any).ai.getCompletion(
          //   { messages: [{ role: 'system', content: `insert prompt for job info summary ${jobDescription}` }] }
          // );
          // console.log(jobResponse.message.content);
          // setProcessedUserProfile(jobResponse.message.content);
      //  } catch (e) {
      //    console.error(e);
      //  }
