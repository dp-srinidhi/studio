'use server';
/**
 * @fileOverview An AI agent for predicting the urgency of a pothole report based on its description.
 *
 * - predictPotholeUrgency - A function that takes a pothole description and suggests a severity level.
 * - PredictPotholeUrgencyInput - The input type for the predictPotholeUrgency function.
 * - PredictPotholeUrgencyOutput - The return type for the predictPotholeUrgency function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictPotholeUrgencyInputSchema = z.object({
  description: z.string().describe('The description of the pothole.'),
});
export type PredictPotholeUrgencyInput = z.infer<typeof PredictPotholeUrgencyInputSchema>;

const PredictPotholeUrgencyOutputSchema = z.object({
  severity: z
    .enum(['low', 'medium', 'high'])
    .describe('The predicted severity level of the pothole (low, medium, or high).'),
  reasoning: z
    .string()
    .describe('Explanation of why the model determined the severity it did.'),
});
export type PredictPotholeUrgencyOutput = z.infer<typeof PredictPotholeUrgencyOutputSchema>;

export async function predictPotholeUrgency(input: PredictPotholeUrgencyInput): Promise<PredictPotholeUrgencyOutput> {
  return predictPotholeUrgencyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictPotholeUrgencyPrompt',
  input: {schema: PredictPotholeUrgencyInputSchema},
  output: {schema: PredictPotholeUrgencyOutputSchema},
  prompt: `You are an AI assistant that predicts the severity of pothole reports based on the user's description.

  Analyze the following description and determine if the pothole is low, medium, or high severity.

  Description: {{{description}}}

  Explain the reasoning for your determination, and return a JSON object with the severity and reasoning.
  `,
});

const predictPotholeUrgencyFlow = ai.defineFlow(
  {
    name: 'predictPotholeUrgencyFlow',
    inputSchema: PredictPotholeUrgencyInputSchema,
    outputSchema: PredictPotholeUrgencyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
