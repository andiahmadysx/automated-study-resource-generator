import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from "@google/generative-ai";
import topics from "./topics.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class Ai {
    constructor({apiKey, model, title, topics}) {
        this.title = title;
        this.topics = topics;
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model });
        this.counter = 0;
        this.interval = 180000; // interval for each hit api
    }

    run() {

        // first call
        this.createMarkdownFiles(this.counter);
        this.counter++;

        // interval
        setInterval(() => {
            if (this.counter < this.topics.length) {
                this.createMarkdownFiles(this.counter);
                this.counter++;
            } else {
                console.log(this.title + ' done!');
            }
        }, this.interval);
    }

    async generateMarkdownContent(topic) {

        // get format string
        const format = fs.readFileSync('./format.txt').toString();

        // main prompt
        const prompt = `Buatlah materi belajar ${this.title} lengkap, topiknya tentang ${topic}. ${format}`;

        // hit ai
        try {
            const result = await this.model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error(`Error get data for topic: ${topic}`, error);
            return null;
        }
    }

    async createMarkdownFiles(index) {
        console.log("Processing " + this.title + "... please wait.");

        const content = await this.generateMarkdownContent(this.topics[index]);

        if (content) {
            const folderPath = path.join(__dirname, this.title);

            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            const fileName = `${this.topics[index].replace(/\s+/g, " ")}.md`;
            const filePath = path.join(folderPath, fileName);

            fs.writeFileSync(filePath, `${content}`);
            console.log(`✅ Material for topic "${this.topics[index]}" has been created in file: ${filePath}`);
        } else {
            fs.writeFileSync(`${this.title.replace(' ', '-').toLowerCase()}-log.txt`, `"${this.topics[index]}",\n`, { flag: 'a' });
            console.log(`❌ Failed to create material for topic "${this.topics[index]}"`);
        }
    }
}


// you can create multiple object with different api key and topics
const linearAlgebra = new Ai({
    apiKey: 'GeminiApiKey',
    model: 'gemini-1.5-flash-002',
    title: topics.linearAlgebra.title,
    topics: topics.linearAlgebra.data
})

linearAlgebra.run();
