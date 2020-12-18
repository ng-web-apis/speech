import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
    continuous,
    isSaid,
    skipUntilSaid,
    SPEECH_SYNTHESIS_VOICES,
    SpeechRecognitionService,
    SpeechSynthesisUtteranceOptions,
    takeUntilSaid,
} from '@ng-web-apis/speech';
import {TuiContextWithImplicit, tuiPure} from '@taiga-ui/cdk';
import {merge, Observable} from 'rxjs';
import {filter, mapTo, repeat, retry, share} from 'rxjs/operators';

@Component({
    selector: 'main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    paused = true;

    voice = null;

    text = 'Hit play/pause to speak this text';

    readonly nameExtractor = ({
        $implicit,
    }: TuiContextWithImplicit<SpeechSynthesisVoice>) => $implicit.name;

    constructor(
        @Inject(SPEECH_SYNTHESIS_VOICES)
        readonly voices$: Observable<ReadonlyArray<SpeechSynthesisVoice>>,
        @Inject(SpeechRecognitionService)
        private readonly recognition$: Observable<SpeechRecognitionResult[]>,
    ) {}

    @tuiPure
    get record$(): Observable<SpeechRecognitionResult[]> {
        return this.result$.pipe(
            skipUntilSaid('Okay Angular'),
            takeUntilSaid('Thank you Angular'),
            repeat(),
            continuous(),
        );
    }

    @tuiPure
    get open$(): Observable<boolean> {
        return merge(
            this.result$.pipe(filter(isSaid('Show sidebar')), mapTo(true)),
            this.result$.pipe(filter(isSaid('Hide sidebar')), mapTo(false)),
        );
    }

    get options(): SpeechSynthesisUtteranceOptions {
        return this.getOptions(this.voice);
    }

    @tuiPure
    private get result$(): Observable<SpeechRecognitionResult[]> {
        return this.recognition$.pipe(retry(), repeat(), share());
    }

    voiceByName(_: number, {name}: SpeechSynthesisVoice): string {
        return name;
    }

    onClick() {
        this.paused = !this.paused;
        // Re-trigger utterance pipe:
        this.text = this.paused ? this.text + ' ' : this.text;
    }

    onEnd() {
        console.log('Speech synthesis ended');
    }

    @tuiPure
    private getOptions(
        voice: SpeechSynthesisVoice | null,
    ): SpeechSynthesisUtteranceOptions {
        return {
            lang: 'en-US',
            voice,
        };
    }
}
