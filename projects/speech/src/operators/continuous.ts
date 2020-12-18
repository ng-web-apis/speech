import {MonoTypeOperatorFunction} from 'rxjs';
import {scan} from 'rxjs/operators';

export function continuous(): MonoTypeOperatorFunction<SpeechRecognitionResult[]> {
    return scan<SpeechRecognitionResult[]>(
        (result, current) => [...result.filter(({isFinal}) => isFinal), ...current],
        [],
    );
}
