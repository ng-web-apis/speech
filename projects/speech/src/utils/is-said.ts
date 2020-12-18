export function isSaid(phrase: string): (results: SpeechRecognitionResult[]) => boolean {
    const parsed = phrase.toLowerCase().trim();

    return results =>
        !!results.find(
            result =>
                result.isFinal &&
                result[0] &&
                result[0].transcript.toLowerCase().trim() === parsed,
        );
}
