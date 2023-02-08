import type { Actions } from './$types';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { error, fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { Configuration, OpenAIApi } from 'openai';
import { marked } from 'marked'

const schema = zfd.formData({
	location: zfd.text(),
	family: zfd.checkbox(),
	kids: zfd.checkbox(),
	days: zfd.numeric(z.number()),
	experiences: zfd.repeatable()
});


export const actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();
			const dataObject = schema.parse(data);
			const prompt = generatePrompt(dataObject);
			const result = await requestGPT(prompt);
			return { success: true, result: marked.parse(result) };
	} catch(err) {
		console.log(err);
		throw error(500, 'Something went wrong');
	}
}
} satisfies Actions;

function generatePrompt(data: z.infer<typeof schema>) {
	const { location, family, kids, days, experiences } = data;

	const intro = `You are a travel advisor. You help families and individuals to plan their travels and vacations to allow them to 
	enjoy the places their visit at maximum level. You provide advise and ideas of places to visit, activities to enjoy, places to eat, etc.
	You help anyone that asks you provinding them with an itinerary for all the days they ask. Each itinerary option have at least 2 activities 
	to perform during the day: one in the morning and one in the afternoon. Based on preference (if romantic or gastronomy was selected as desirable experiece) you may or may not provide a night activity.
	Now let's anwser the following request based on the context given.`;

	let context = `Context: I'll be traveling to ${location} staying there for ${days} nights. I'm looking to enjoy different experiences 
	like the following (but not limited): ${experiences.join(',')}.`;

	if (family) {
		context = `${context} I'm traveling with my family.`;
	}
	if (kids) {
		context = `${context} I'm also travling with my ${kids} kids.\n`;
	}

	const request =
		'Generate the itinerary options for the above context in spanish. Include a list of at least 5 points of interest based on the result of your previous taks.';

	return `${intro} ${context} ${request}. Rule: Your anwser cannot be longer than 2048 characters`;
}

const configuration = new Configuration({
	apiKey: env.GPT_KEY
});
const openai = new OpenAIApi(configuration);

async function requestGPT(prompt: string) {
	try {
		const completion = await openai.createCompletion(
			{
				model: 'text-davinci-003',
				prompt,
				max_tokens: 2048,
				temperature: 0
			},
			{
				timeout: 250000
			}
		);
		console.log({ completion })
		const result = completion.data.choices[0].text;
		console.log({ result })
		return result;
	} catch (error) {
		console.log(error)
		if (error.response) {
			return fail(error.response.data);
		}
		return fail(error.message);
	}
}
