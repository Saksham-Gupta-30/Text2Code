import { OpenAIApi, Configuration } from "openai";
import { config } from "dotenv";

config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const func = async (text) => {
    let res = "";
    try {
        const response = await openai.createCompletion({
            model: "code-cushman-001",
            prompt: text,
            temperature: 0,
            max_tokens: 256,
            top_p: 1.0,
            frequency_penalty: 0,
            presence_penalty: 0,
            // stop: "\n",
        });
        res = response.data;
    } catch (error) {
        res = "Error Generating Code"
    }
    return res;
}

export { func };