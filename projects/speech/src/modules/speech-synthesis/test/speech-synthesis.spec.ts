import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SpeechSynthesisUtteranceOptions} from '../../../interfaces/speech-synthesis-utterance-options';
import {SpeechSynthesisModule} from '../speech-synthesis.module';

describe('SpeechSynthesis', () => {
    @Component({
        template: `
            <ng-container
                [waTextToSpeech]="text | waUtterance: options"
                [waTextToSpeechPaused]="paused"
                (waTextToSpeechError)="onError($event.error)"
            ></ng-container>
            <ng-container
                [waTextToSpeech]="utterance"
                [waTextToSpeechPaused]="paused"
                (waTextToSpeechMark)="onMark()"
                (waTextToSpeechBoundary)="onBoundary()"
                (waTextToSpeechEnd)="onEnd()"
            ></ng-container>
        `,
    })
    class TestComponent {
        text = 'Test 1';
        options?: SpeechSynthesisUtteranceOptions;
        paused = true;
        readonly utterance = new SpeechSynthesisUtterance('Test 2');
        readonly onError = jasmine.createSpy('onError');
        readonly onMark = jasmine.createSpy('onMark');
        readonly onBoundary = jasmine.createSpy('onBoundary');
        readonly onEnd = jasmine.createSpy('onEnd');
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SpeechSynthesisModule],
            declarations: [TestComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Throws error when not allowed', () => {
        expect(testComponent.onError).toHaveBeenCalledWith('not-allowed');

        // Just to cover both missing and empty argument branches
        testComponent.options = {};
        fixture.detectChanges();
    });

    it('Accepts options', () => {
        testComponent.paused = false;
        testComponent.options = {
            voice: null,
            rate: 1,
            pitch: 1,
            volume: 1,
            lang: 'en-EN',
        };
        fixture.detectChanges();

        expect(testComponent.onError).toHaveBeenCalledWith('not-allowed');
    });

    it('Emits events', () => {
        testComponent.utterance.onmark!('a' as any);
        testComponent.utterance.onboundary!('b' as any);
        testComponent.utterance.onend!('c' as any);

        expect(testComponent.onMark).toHaveBeenCalled();
        expect(testComponent.onBoundary).toHaveBeenCalled();
        expect(testComponent.onEnd).toHaveBeenCalled();
    });
});
