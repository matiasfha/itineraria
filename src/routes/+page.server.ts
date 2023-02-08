import type { Actions } from './$types';
import pkg from 'zod-form-data';
const { zfd } = pkg;
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
			console.log(result)
			return { success: true, result: marked.parse(result as string) };
	} catch(err) {
		console.log(err);
		throw error(500, 'Something went wrong');
	}
}
} satisfies Actions;

function generatePrompt(data: z.infer<typeof schema>) {
	const { location, family, kids, days, experiences } = data;

	const intro = `You are a travel advisor. You help families and individuals to plan their vacations. You provide advise and ideas of places to visit, activities to enjoy, places to eat, etc.
	You answer with an itinerary for the visit. 2 activies per day minimum, split by morning/afternoon.
	Provide night activity if romantic or gastronomy was selected as experiece.
	Anwser based on the follwing context and request.`;

	let context = `Context:I'll travel to ${location}  for ${days} nights. I want to enjoy different experiences like (but not limited): ${experiences.join(',')}.`;

	if (family) {
		context = `${context} I'm traveling with my family.`;
	}
	if (kids) {
		context = `${context} I'm traveling with ${kids} kids.\n`;
	}

	const request =
		'The result shoud be in spanish. Include 5 points of interest based on the result.';

	return `${intro} ${context} ${request}. Rules: anwser cannot be longer than 3192 characters. do not repeat activities if the numbers of days is less than 4`;
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
				max_tokens: 3192,
				temperature: 0.2,
				presence_penalty: 0.5
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
