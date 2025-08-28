'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zones } from '@/lib/data';
import { predictPotholeUrgency, PredictPotholeUrgencyOutput } from '@/ai/flows/predict-pothole-urgency';
import { useState } from 'react';
import { Loader, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  description: z.string().min(20, 'Please provide a detailed description (min. 20 characters).').max(500),
  location: z.string().min(2, 'Please provide a location.'),
  zone: z.string({ required_error: 'Please select a zone.' }),
  severity: z.enum(['Low', 'Medium', 'High']).optional(),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ReportForm() {
    const { toast } = useToast();
    const [isPredicting, setIsPredicting] = useState(false);
    const [prediction, setPrediction] = useState<PredictPotholeUrgencyOutput | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      location: '',
    },
  });

  const descriptionValue = form.watch('description');

  async function handlePredictUrgency() {
    if (!descriptionValue || descriptionValue.length < 20) {
        toast({
            title: 'Description too short',
            description: 'Please enter at least 20 characters to predict urgency.',
            variant: 'destructive',
          });
      return;
    }
    setIsPredicting(true);
    setPrediction(null);
    try {
        const result = await predictPotholeUrgency({ description: descriptionValue });
        setPrediction(result);
        const severityCapitalized = (result.severity.charAt(0).toUpperCase() + result.severity.slice(1)) as "Low" | "Medium" | "High";
        form.setValue('severity', severityCapitalized);
    } catch (error) {
        console.error('Prediction failed:', error);
        toast({
          title: 'Prediction Failed',
          description: 'Could not get AI prediction. Please select severity manually.',
          variant: 'destructive',
        });
    } finally {
        setIsPredicting(false);
    }
  }

  function onSubmit(values: FormValues) {
    console.log(values);
    toast({
      title: "Report Submitted!",
      description: "Thank you for helping improve Chennai's roads.",
    });
    form.reset();
    setPrediction(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pothole Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., A very large and deep pothole is located in the middle of the road, causing issues for traffic..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide as much detail as possible. This will help in assessing the urgency.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4 rounded-lg border bg-card p-4">
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <FormLabel className="mb-2 sm:mb-0">Urgency Prediction</FormLabel>
                <Button type="button" onClick={handlePredictUrgency} disabled={isPredicting || !descriptionValue || descriptionValue.length < 20}>
                    {isPredicting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Analyze Urgency with AI
                </Button>
            </div>
            {prediction && (
                <Alert>
                    <Wand2 className="h-4 w-4" />
                    <AlertTitle>AI Prediction: <span className="font-bold">{prediction.severity.toUpperCase()}</span></AlertTitle>
                    <AlertDescription>{prediction.reasoning}</AlertDescription>
                </Alert>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Location / Address</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Near T. Nagar bus depot" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="zone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Zone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Chennai zone" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {zones.map((zone) => (
                        <SelectItem key={zone.name} value={zone.name}>
                        {zone.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="severity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Severity Level</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the severity, or use the AI prediction.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Photo (Optional)</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg">Submit Report</Button>
      </form>
    </Form>
  );
}
