import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
    SPEECH_SYNTHESIS_VOICES,
    SpeechSynthesisUtteranceOptions,
} from '@ng-web-apis/speech';
import {tuiPure, tuiReplayedValueChangesFrom} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';

@Component({
    selector: 'main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    paused = true;

    voice = null;

    readonly control = new FormControl('Hit play/pause to speak this text');

    constructor(
        @Inject(SPEECH_SYNTHESIS_VOICES)
        readonly voices$: Observable<ReadonlyArray<SpeechSynthesisVoice>>,
    ) {}

    @tuiPure
    get text$(): Observable<string> {
        return tuiReplayedValueChangesFrom(this.control);
    }

    get options(): SpeechSynthesisUtteranceOptions {
        return this.getOptions(this.voice);
    }

    voiceByName(_: number, {name}: SpeechSynthesisVoice): string {
        return name;
    }

    onClick() {
        this.paused = !this.paused;
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
